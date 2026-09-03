---
title: Google Reviews on the Website - Plan
type: feat
date: 2026-08-17
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# Google Reviews on the Website - Plan

## Goal Capsule

Display Grant's Estate Agents' real Google reviews on the website — server-rendered so AI crawlers and search engines see them — fetched live from the Places API with graceful degradation and Google-compliant attribution.

Authority: Requirements govern behaviour; KTDs govern mechanism. The no-mock-data policy overrides everything: no fabricated ratings or fallback review content, ever.

Stop conditions: stop and surface if the Google Place ID cannot be resolved for the business, or if the Places API response shape differs materially from the documented contract.

---

## Product Contract

### Summary

Fetch the business's Google reviews server-side via the Places API (New), render them on the reviews page with a rating summary, add a compact rating strip to the sell page, and carry aggregateRating in the site's JSON-LD. Reviews refresh automatically via ISR. The full review history (Business Profile API) is deferred follow-up work.

### Problem Frame

The reviews page currently shows 8 hardcoded testimonial objects — static content that sits awkwardly with the site's no-mock-data policy and never updates. The agency has real Google reviews on its Business Profile that prospective vendors check anyway. Showing them on-site, server-rendered, adds trust signals where sellers make decisions and gives AI answer engines citable review content (review signals are a dominant factor in "best agent in X" answers).

### Requirements

- R1. The reviews page displays the business's live Google reviews (author name, avatar, star rating, relative date, text) with an overall rating + total review count summary.
- R2. Reviews are fetched server-side and present in initial HTML (visible to non-JS crawlers), refreshing automatically at least every 6 hours without a deploy.
- R3. Google attribution requirements are met: "powered by Google" mark near the reviews, each review credits its author with name, photo, and profile link from `authorAttribution`.
- R4. The sell page shows a compact rating strip (stars, rating value, review count, link to the reviews page).
- R5. The org JSON-LD carries `aggregateRating` sourced from the live Places data. (Known limit per KTD4: no star rich-results — AI-engine visibility only.)
- R6. On Places API failure or missing configuration, review sections render nothing (or only the existing non-Google testimonials); no cached-stale-forever content, no placeholder numbers, no crash.
- R7. Reviews with a rating but empty text are excluded from the review cards but still counted in the aggregate figures Google supplies.
- R8. The existing 8 testimonials remain available as a visually distinct "Client stories" section below the Google reviews — clearly not presented as Google data.

### Success Criteria

- `curl` of the reviews page returns real review text and the rating summary in raw HTML.
- The displayed rating/count matches the Google Business Profile dashboard.
- With `GOOGLE_PLACES_API_KEY` unset (local dev), both pages render without errors and without review content.

### Scope Boundaries

- Out of scope: review-generation automation (post-settlement email asks — CLAUDE.md Priority 3), review reply management, reviews on property/agent pages, third-party widgets.

#### Deferred to Follow-Up Work
- **Full review history via the Google Business Profile API** — returns all reviews with pagination, free, but requires OAuth plus a manual Google access application (~14-day review; project starts with zero quota). Worth doing once the Places integration proves value; the fetch layer in U1 is built so a GBP-backed source can slot in behind the same interface.
- Per-office review splits if additional Google Business listings exist (plan assumes one primary listing; U1 surfaces what the Place ID lookup finds).

### Open Questions

- (Deferred, non-blocking) Whether the business has one Google listing or one per office. U1's setup step resolves this; the fetch layer takes a single Place ID today and can accept a list later.

---

## Planning Contract

### Key Technical Decisions

- KTD1. **Places API (New) Place Details, server-side.** (session-settled: user-approved — chosen over the Business Profile API: its manual approval gate (~14 days, zero default quota) blocks immediate delivery; and over embed widgets: monthly fees and client-side scripts invisible to AI crawlers.) One Place Details call with the `reviews`, `rating`, and `userRatingCount` fields; falls in the Enterprise+Atmosphere SKU with 1,000 free calls/month — ISR at 6-hour revalidation uses ~120/month.
- KTD2. **ISR-cached live fetch, revalidate 21600 (6h).** Google's Maps terms say place content (other than IDs) should not be stored; a short server cache via ISR is the accepted practical pattern but is a ToS grey zone — kept short deliberately, and author photo URLs are re-fetched each revalidation because Google's user-content URLs are not stable (see Risks). Never persist reviews to disk or a database.
- KTD3. **Failure renders absence, not substitutes.** Per the no-mock-data policy: fetch errors or missing env vars return null and the Google-review sections don't render. The hardcoded testimonials (R8) are retained as a separate labelled section — they are the site's own collected stories, not a stand-in for Google data.
- KTD4. **aggregateRating JSON-LD ships despite dead rich results.** Google has ignored self-serving review markup since 2019 — no stars in search results, no penalty. The markup ships anyway via the existing `realEstateAgent(overrides)` hook because structured review data aids AI answer-engine extraction, which is the strategic goal from the AI-visibility work.
- KTD5. **Fetch layer is source-agnostic.** `getGoogleReviews()` returns a normalised `{rating, count, reviews[]}` shape so the deferred GBP API source can replace the Places call without touching the pages.

### Assumptions

- The user can create a Google Cloud project, enable Places API (New), attach billing, and create a server-restricted API key (guided by U3's checklist).
- One primary Google Business listing exists; its Place ID is discoverable via Google's Place ID Finder or the GBP dashboard.

### Sequencing

U1 (fetch layer) blocks U2 and U4. U3 (setup checklist) can land with U1. U2 and U4 are independent of each other.

---

## Implementation Units

### U1. Google reviews fetch layer

**Goal:** A server-side module returning normalised live review data, degrading to null.
**Requirements:** R2, R6, R7; KTD1, KTD2, KTD5.
**Dependencies:** none.
**Files:** `src/lib/googleReviews.ts` (new), `.env.example`, `scripts/check-reviews-mapper.js` (new self-check).
**Approach:**
1. Module-level env consts following the `src/lib/serverProperties.ts` idiom: `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` (server-only, no `NEXT_PUBLIC_`).
2. `getGoogleReviews()`: GET to Places API (New) `places/{placeId}` with the field mask sent via the `X-Goog-FieldMask` header (`rating,userRatingCount,reviews`) plus `X-Goog-Api-Key`, `languageCode=en-AU`, and `AbortSignal.timeout` (new addition per the AI-visibility branch review learning — every external fetch carries a timeout). Cache policy is enforced by segment-level `export const revalidate = 21600` on the consuming routes, **not** fetch-level `next.revalidate` — a fetch carrying an AbortSignal can be excluded from the Next 13 data cache, and segment-level ISR means the fetch only runs at regeneration anyway (~120 calls/month). Returns `{rating, count, reviews: [{author, photoUrl, profileUrl, rating, relativeTime, text}]}` or `null` on any failure/missing env (log a warning, never throw to the page).
3. Mapper filters reviews with empty text (R7). Note: `reviews[].text` and `reviews[].originalText` are LocalizedText objects (`{text, languageCode}`), not strings — extract the inner `.text` from whichever is present, and the empty-text filter tests that inner string. The captured sample in the self-check uses the real nested shape.
4. Pure mapper function exported separately; `scripts/check-reviews-mapper.js` asserts its behaviour on a captured sample response shape (empty-text filtering, missing photo, null response) — follows the `scripts/check-stats.js` pattern.
**Patterns to follow:** `src/lib/serverProperties.ts` (env pattern, graceful empty — the timeout is a new addition, not an existing idiom in that file), `src/lib/stats.js` + `scripts/check-stats.js` (testable pure functions).
**Test scenarios:**
- Mapper: sample response with 5 reviews, one empty-text → 4 cards, count/rating passthrough unchanged.
- Mapper: review missing `authorAttribution.photoUri` → card data with null photo (UI shows fallback avatar).
- `getGoogleReviews()` with unset env → null, no throw, one warning log.
- Fetch rejection/timeout → null, no throw.
**Verification:** `node scripts/check-reviews-mapper.js` passes; typecheck/build pass with env unset.

### U2. Reviews page: live Google reviews, server-rendered

**Goal:** The reviews page leads with real Google reviews and a rating summary in initial HTML.
**Requirements:** R1, R2, R3, R6, R8; KTD2, KTD3.
**Dependencies:** U1.
**Files:** `src/app/reviews/page.tsx` (becomes server component), `src/app/reviews/ReviewsPageClient.tsx` (renamed client component), `src/app/reviews/layout.tsx` (new shim: metadata + breadcrumb, matching sibling shims), `src/lib/metadata.ts` (add `pageMetadata.reviews()`), `src/components/GoogleReviewCard.tsx` (new, server-renderable).
**Approach:**
1. Split per the established pattern (`src/app/suburbs/berwick/page.tsx` + `BerwickPageClient.tsx`): server `page.tsx` with `revalidate = 21600` calls `getGoogleReviews()` and passes data down.
2. Google reviews section renders first: overall rating + count summary, review cards (stars, author name/photo with `onerror` fallback avatar, profile link, relative date, text), "powered by Google" attribution (R3).
3. Existing 8 testimonials and their filter pills move below under a distinct "Client stories" heading (R8) — client component internals otherwise unchanged.
4. When data is null the Google section is absent entirely; the page still renders hero + client stories (R6).
5. Reviews-page JSON-LD: breadcrumb via the shim; review/aggregateRating markup comes from U4's org node, not duplicated here.
**Patterns to follow:** server/client split and `CrawlerListings`-style server-rendered section from the AI-visibility work; inline-style idiom of the existing reviews page.
**Test scenarios:**
- Raw HTML (`curl` after build) contains a real review's text and the rating summary.
- Env unset: page renders hero + client stories, no Google section, no errors.
- Review card for an author with no photo shows the fallback avatar, not a broken image.
- Filter pills still work for the client-stories section after the split.
**Verification:** curl check on the built page; build/typecheck pass both with and without env vars.

### U3. Google Cloud setup checklist (user actions)

**Goal:** The user can provision the API in one sitting.
**Requirements:** enables R1–R5.
**Dependencies:** none (do alongside U1).
**Files:** `docs/plans/google-reviews-setup-checklist.md` (new).
**Approach:** concise steps: create/choose GCP project; enable Places API (New); attach billing (note the 1,000 free Enterprise-SKU calls/month and our ~120/month usage); create an API key restricted to Places API (New) with server IP/none referrer restriction; find the Place ID (Place ID Finder link + GBP dashboard route); note whether multiple listings exist (feeds the deferred per-office work); set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` in Vercel.
**Test scenarios:** Test expectation: none — documentation.
**Verification:** user completes checklist; a `curl` of the Places endpoint with the key returns the business's rating.

### U4. Sell-page rating strip and org aggregateRating

**Goal:** Trust signal where vendors decide; review data in the org JSON-LD.
**Requirements:** R4, R5, R6; KTD4.
**Dependencies:** U1.
**Files:** `src/app/sell/layout.tsx` (server shim — fetch + strip + JSON-LD), `src/components/RatingStrip.tsx` (new, server-renderable), `src/lib/jsonLd.ts` (no change expected — use the existing `realEstateAgent(overrides)` hook).
**Approach:**
1. `src/app/sell/layout.tsx` is already a server component rendering JSON-LD; make it async, call `getGoogleReviews()`, and when data exists render `RatingStrip` above `children` styled to sit under the hero, plus `realEstateAgent({aggregateRating: {...}})` replacing the plain org node on this route.
2. Add `export const revalidate = 21600` to `src/app/sell/layout.tsx` — the sell route currently exports no revalidate anywhere, so without this the layout fetch is cached at build time forever (violating R2/R6). Segment config is valid on layouts.
3. Strip: stars, "4.8 from 214 Google reviews", link to `/reviews`, "powered by Google" mark (R3 applies here too).
4. Null data → no strip, plain org node (R6).
5. The async server layout is the default approach — in Next 13.5 an awaited fetch in a layout does not force dynamic rendering (only cookies/headers/searchParams or `no-store` do), and it participates in ISR once step 2's revalidate is exported. The server `page.tsx` split remains a contingency only.
**Patterns to follow:** existing sell layout shim; suburb-page ISR precedent.
**Test scenarios:**
- Raw HTML of /sell contains the rating value and count when env is set.
- Env unset: sell page renders exactly as today (no strip, base org JSON-LD).
- JSON-LD on /sell validates with the aggregateRating node present.
**Verification:** curl + schema validator on /sell; build/typecheck both env states.

---

## Verification Contract

- `npm run typecheck`, `npm run build` pass with and without the new env vars.
- `node scripts/check-reviews-mapper.js` passes.
- Raw-HTML curl checks: reviews page shows live review text; sell page shows the rating strip.
- Displayed aggregate matches the GBP dashboard (manual spot check).
- validator.schema.org on /sell with aggregateRating present.

## Definition of Done

- U1–U4 verified; R1–R8 each traceable to a shipped unit.
- No review content persisted anywhere (KTD2); no mock/fallback data in any failure path (KTD3).
- Attribution requirements visibly met on both surfaces.
- Setup checklist delivered and env-var names documented in `.env.example`.
- No abandoned experimental code left in the diff.

---

## Risks & Dependencies

- **ToS grey zone on caching:** Google's terms say don't store place content; the 6-hour ISR window is the industry-common compromise but not formally sanctioned. Mitigation: short window, no persistence, easy to shorten.
- **Photo URL instability:** `googleusercontent.com` URLs can expire between revalidations. Mitigation: `onerror` fallback avatar; URLs re-fetched every cycle.
- **Only 5 reviews, relevance-sorted:** the newest review may not appear; count/rating are still complete. The GBP API follow-up removes this cap.
- **Billing dependency:** Places API requires a billing account even within the free tier — flagged in U3 so it isn't a surprise.

## Sources & Research

- Repo: reviews page structure (8 hardcoded testimonials, client component, no layout shim), sell layout shim with JSON-LD, `serverProperties.ts` fetch idiom, `realEstateAgent(overrides)` hook, no existing Google API keys (map uses Leaflet).
- External (2026): Places API (New) 5-review cap and Enterprise+Atmosphere SKU with 1,000 free calls/month; Maps terms on caching and attribution; GBP API manual access gate (~14 days, zero default quota) and full-history reviews endpoint; Google's 2019 self-serving review rich-results policy; widget pricing and their client-side-only rendering.
