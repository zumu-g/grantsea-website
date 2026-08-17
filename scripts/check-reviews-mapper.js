// Self-check for src/lib/googleReviewsMapper.js against a realistic captured
// Places API (New) response shape. Run: node scripts/check-reviews-mapper.js
const assert = require('node:assert');
const { mapPlaceReviews } = require('../src/lib/googleReviewsMapper');

// Realistic Places API (New) sample: nested LocalizedText, one empty-text
// review, one review missing photoUri, one preferring originalText.
const sample = {
  rating: 4.8,
  userRatingCount: 312,
  reviews: [
    {
      rating: 5,
      relativePublishTimeDescription: '2 months ago',
      text: { text: 'Fantastic service selling our Berwick home.', languageCode: 'en' },
      originalText: { text: 'Fantastic service selling our Berwick home.', languageCode: 'en' },
      authorAttribution: {
        displayName: 'Jane Citizen',
        uri: 'https://www.google.com/maps/contrib/1234',
        photoUri: 'https://lh3.googleusercontent.com/a/photo1',
      },
    },
    {
      // rating-only review, no text -> must be filtered (R7)
      rating: 4,
      relativePublishTimeDescription: 'a year ago',
      authorAttribution: {
        displayName: 'Silent Reviewer',
        uri: 'https://www.google.com/maps/contrib/5678',
        photoUri: 'https://lh3.googleusercontent.com/a/photo2',
      },
    },
    {
      // missing photoUri -> photoUrl null; only `text`, no originalText
      rating: 5,
      relativePublishTimeDescription: '3 weeks ago',
      text: { text: 'Great local knowledge.', languageCode: 'en' },
      authorAttribution: {
        displayName: 'John Smith',
        uri: 'https://www.google.com/maps/contrib/9012',
      },
    },
  ],
};

const out = mapPlaceReviews(sample);
assert.strictEqual(out.rating, 4.8, 'rating passthrough');
assert.strictEqual(out.count, 312, 'userRatingCount -> count');
assert.strictEqual(out.reviews.length, 2, 'empty-text review filtered');
assert.strictEqual(out.reviews[0].author, 'Jane Citizen');
assert.strictEqual(out.reviews[0].photoUrl, 'https://lh3.googleusercontent.com/a/photo1');
assert.strictEqual(out.reviews[0].profileUrl, 'https://www.google.com/maps/contrib/1234');
assert.strictEqual(out.reviews[0].rating, 5);
assert.strictEqual(out.reviews[0].relativeTime, '2 months ago');
assert.strictEqual(out.reviews[0].text, 'Fantastic service selling our Berwick home.');
assert.strictEqual(out.reviews[1].photoUrl, null, 'missing photoUri -> null');
assert.strictEqual(out.reviews[1].text, 'Great local knowledge.', 'falls back to text.text');

// Null/undefined/garbage raw -> null
assert.strictEqual(mapPlaceReviews(null), null);
assert.strictEqual(mapPlaceReviews(undefined), null);
assert.strictEqual(mapPlaceReviews('nope'), null);

// Place with no reviews field still maps
const bare = mapPlaceReviews({ rating: 5, userRatingCount: 1 });
assert.deepStrictEqual(bare.reviews, []);

console.log('check-reviews-mapper: all assertions passed');
