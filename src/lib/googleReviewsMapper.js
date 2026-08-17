// Pure mapper for Google Places API (New) place details -> site review shape.
// Plain JS (JSDoc types) so scripts/check-reviews-mapper.js can require() the
// real implementation without a TS runner. Follows src/lib/stats.js precedent.

/**
 * @typedef {Object} MappedReview
 * @property {string} author
 * @property {string | null} photoUrl
 * @property {string | null} profileUrl
 * @property {number} rating
 * @property {string | null} relativeTime
 * @property {string} text
 */

/**
 * Map a raw Places API (New) place response to the site's review shape.
 * `reviews[].text` / `originalText` are LocalizedText objects {text, languageCode};
 * the inner `.text` is extracted, preferring originalText. Reviews with empty or
 * missing text are filtered out (R7).
 * @param {any} raw
 * @returns {{rating: number | null, count: number | null, reviews: MappedReview[]} | null}
 */
function mapPlaceReviews(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const reviews = (Array.isArray(raw.reviews) ? raw.reviews : [])
    .map((r) => {
      const text = (r.originalText && r.originalText.text) || (r.text && r.text.text) || '';
      return {
        author: (r.authorAttribution && r.authorAttribution.displayName) || '',
        photoUrl: (r.authorAttribution && r.authorAttribution.photoUri) || null,
        profileUrl: (r.authorAttribution && r.authorAttribution.uri) || null,
        rating: r.rating,
        relativeTime: r.relativePublishTimeDescription || null,
        text: typeof text === 'string' ? text.trim() : '',
      };
    })
    .filter((r) => r.text.length > 0);
  return {
    rating: typeof raw.rating === 'number' ? raw.rating : null,
    count: typeof raw.userRatingCount === 'number' ? raw.userRatingCount : null,
    reviews,
  };
}

module.exports = { mapPlaceReviews };
