// Server-only Google reviews fetch layer (Places API New).
// Caching is owned by segment-level ISR (`export const revalidate`) on the
// pages that call this — the fetch itself is uncached (AbortSignal bypasses
// the Next 13 data cache), so each ISR regeneration gets fresh data.

import { mapPlaceReviews } from './googleReviewsMapper';

export interface GoogleReview {
  author: string;
  photoUrl: string | null;
  profileUrl: string | null;
  rating: number;
  relativeTime: string | null;
  text: string;
}

export interface GoogleReviewsData {
  rating: number | null;
  count: number | null;
  reviews: GoogleReview[];
}

export { mapPlaceReviews };

async function fetchPlace(apiKey: string, placeId: string): Promise<Response> {
  return fetch(
    `https://places.googleapis.com/v1/places/${placeId}?languageCode=en-AU`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      },
      signal: AbortSignal.timeout(5000),
    }
  );
}

class NonRetryableError extends Error {}

async function fetchReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  // ponytail: one retry on timeout/5xx, no backoff — 5s timeout is backoff enough
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchPlace(apiKey, placeId);
      if (res.ok) return mapPlaceReviews(await res.json());
      if (res.status < 500) {
        // 4xx (bad key, wrong place ID, API disabled) — retrying cannot help
        throw new NonRetryableError(`Google Places API responded ${res.status}`);
      }
      if (attempt === 0) continue;
      throw new Error(`Google Places API responded ${res.status}`);
    } catch (err) {
      if (err instanceof NonRetryableError) throw err;
      if (attempt === 0) continue;
      throw err;
    }
  }
  return null; // unreachable
}

/** Never throws. Returns null when unconfigured or on any failure. Used by /sell (strip absence beats a 500). */
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  try {
    return await fetchReviews();
  } catch {
    return null;
  }
}

/**
 * Keep-last-good variant for ISR pages: when env is configured and the fetch
 * fails, throws so a background revalidation keeps serving the previous good
 * snapshot — except during the production build phase, where it returns null
 * so an API blip can't fail the build. Unconfigured env always returns null.
 */
export async function getGoogleReviewsOrThrow(): Promise<GoogleReviewsData | null> {
  if (!process.env.GOOGLE_PLACES_API_KEY || !process.env.GOOGLE_PLACE_ID) return null;
  try {
    return await fetchReviews();
  } catch (err) {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.error('[googleReviews] fetch failed during build — building without review data:', err);
      return null;
    }
    throw err;
  }
}
