# feat: Real-Time Suburb Market Data + Google Review Automation

**Status:** active
**Created:** 2026-07-02
**Depth:** Standard

## Summary

Two of the three CLAUDE.md "Week 1 Quick Win" priorities, planned together (SMS Alert System is held per user request). Priority 2 replaces the disabled, mock-data market-search endpoint with a real VaultRE-backed market data block on all 20 suburb pages. Priority 3 builds a post-settlement Google review request sequence to grow review volume for Local 3-Pack ranking.

These are independent features with no shared runtime dependency — they can ship as two separate PRs — but share the "no mock data, real VaultRE only" constraint and are grouped here because they were prioritized together.

---

## Problem Frame

- Suburb pages show a hardcoded "Median House Price" stat with no real sales data, days-on-market, or trend visibility — CLAUDE.md flags this as the #1 quick win for SEO/engagement.
- A prior market-search API route (`src/app/api/properties/market-search/route.ts`) was disabled after it shipped with mock-data fallback, violating the project's explicit no-mock-data policy. It must be rebuilt using only real VaultRE data, with honest empty/error states instead of fallback data.
- There is no review-generation system. Reviews page is static hardcoded testimonials. No email automation, no settlement-date tracking exists in the schema.

## Requirements

- R1: Suburb pages display real median price, days-on-market, and (where the VaultRE API supports it) recent comparable sales — sourced live or from a short-TTL cache, never mocked.
- R2: If VaultRE cannot supply a given metric, the UI shows an honest "unavailable" state, not a fabricated number.
- R3: A settlement event (manual entry initially — no CRM webhook exists) triggers a scheduled email asking for a Google review, with a one-click review link.
- R4: Review requests are tracked (sent/opened/reviewed) to avoid duplicate sends and to measure conversion.

## Key Technical Decisions

**KTD1 — Verify VaultRE sales/comparables endpoint before building UI.** `suburbAPI.getSuburbDetails()` in `src/services/api.ts` looks aspirational (typed return shape assumes `medianPrice`/`demographics` fields that may not exist in VaultRE's actual response). The first implementation unit is a spike to confirm what VaultRE v1.3 actually returns for sold listings/comparables per suburb — this determines whether R1 ships in full or in a reduced form (e.g., median price + days-on-market only, no trend chart, if historical sales aren't queryable).

**KTD2 — Shared component, not 20 copies.** Each suburb page is a hand-written `page.tsx`. Rather than duplicating market-data-fetch logic 20 times, build one `<SuburbMarketData suburb="Berwick" />` component consumed by all pages, backed by one cached service function.

**KTD3 — Cache pattern follows existing services.** `propertyCache.ts` / `openHomesCache.ts` / `auctionsCache.ts` already establish a TTL-cache-in-`src/services` convention. New `salesCache.ts` follows the same shape rather than introducing a different caching approach (e.g., Next.js `revalidate` alone).

**KTD4 — No chart library yet; ship numbers first.** No chart lib is installed. Trend charts are deferred to follow-up (see Scope Boundaries) — ship median price / days-on-market / recent-sales-count as text/stat-tile first, add a chart lib only once real trend data is confirmed available (KTD1).

**KTD5 — Review automation needs new infra: email provider + settlement tracking + cron.** None of the three exist today. Lazy picks:
- Email: Resend (lightest-weight transactional email SDK, no infra to run) over Twilio SendGrid — smaller surface, good Next.js docs.
- Settlement tracking: two new Prisma models (`Settlement`, `ReviewRequest`) — no CRM webhook exists, so settlement date entry is manual (agent enters it) for this iteration; automatic VaultRE settlement-status polling is a follow-up.
- Scheduling: Vercel Cron (`vercel.json` `crons` array) hitting a new API route daily — matches the existing Vercel deployment, no new scheduler service needed.

**KTD6 — Public env vars carry the VaultRE API key/token client-side.** Pre-existing issue (`NEXT_PUBLIC_CRM_API_KEY`/`NEXT_PUBLIC_CRM_ACCESS_TOKEN`), out of scope to fix here, but the new market-data service function should call VaultRE server-side (from the API route) rather than adding another client-side call, so this plan doesn't compound the exposure.

---

## Scope Boundaries

**In scope:**
- Real VaultRE-backed market stats (median price, days-on-market, recent sales count) on suburb pages
- `SuburbMarketData` shared component + `salesCache.ts` service + rebuilt `/api/properties/market-search` route
- Manual settlement-entry → scheduled review-request email → tracked review link flow

**Deferred to Follow-Up Work:**
- Price trend charts (needs chart lib + confirmed historical data availability, KTD1/KTD4)
- Automatic settlement detection from VaultRE (no webhook/poll exists yet — manual entry only in this plan)
- GMB API auto-posting of listings/market updates (separate CLAUDE.md sub-bullet, distinct integration)
- SMS Alert System (explicitly held by user)
- Review-response automation, non-Google platforms (Facebook review automation)

**Out of scope / non-goals:**
- Changing the client-side VaultRE env var exposure (KTD6) — flagged, not fixed here
- Any mock/fallback data path, per standing project policy

---

## Implementation Units

### U1. Spike: confirm VaultRE sales/comparables data availability
**Goal:** Determine exactly what suburb-level sales data VaultRE v1.3 exposes (median price, recent sold listings, days-on-market aggregates) before building UI against assumptions.
**Requirements:** R1, R2
**Dependencies:** none
**Files:** none (research spike); findings recorded as comments in `src/services/api.ts` near `suburbAPI.getSuburbDetails`
**Approach:** Hit the VaultRE API directly (via existing API key) for a `/listings` search filtered by suburb + status=sold, and check for any dedicated `/suburbs/{id}/stats`-style endpoint. Confirm field availability for median price and settlement/days-on-market.
**Verification:** Written confirmation of which R1 metrics are supported live vs. require client-side aggregation from raw sold-listing data vs. unsupported (drop from scope).

### U2. Build `salesCache.ts` + rebuild market-search API route
**Goal:** Real, cached suburb market data service, replacing the disabled mock endpoint.
**Requirements:** R1, R2
**Dependencies:** U1
**Files:** `src/services/salesCache.ts` (new), `src/app/api/properties/market-search/route.ts` (rewrite, currently returns 410)
**Approach:** Mirror `openHomesCache.ts`'s TTL-cache-then-fetch-then-cache shape. Route accepts `?suburb=`, returns `{ medianPrice, daysOnMarket, recentSalesCount, source: 'live'|'cache', unavailable: string[] }` — `unavailable` lists any metric VaultRE couldn't supply (R2), never a fabricated number.
**Patterns to follow:** `src/services/openHomesCache.ts`, `src/services/auctionsCache.ts`
**Test scenarios:**
- VaultRE returns full data → route returns populated stats with `source: 'live'`
- VaultRE returns partial data (e.g., no days-on-market) → response marks that field in `unavailable`, other fields still populate
- VaultRE call fails/times out → route returns 200 with all fields in `unavailable` (not a fabricated fallback, not a 500 that breaks the page)
- Second request within cache TTL → served from cache, `source: 'cache'`
**Verification:** Manual suburb query against the route returns real numbers for at least one known-active suburb, and gracefully lists `unavailable` for any unsupported metric.

### U3. `SuburbMarketData` shared component
**Goal:** One component rendering market stats, used across all 20 suburb pages.
**Requirements:** R1, R2
**Dependencies:** U2
**Files:** `src/components/suburbs/SuburbMarketData.tsx` (new), `src/app/suburbs/berwick/page.tsx` (integrate first, replace hardcoded median price stat)
**Approach:** Client component, fetches `/api/properties/market-search?suburb=`, renders stat tiles for available metrics and an "Unavailable" note (not zero/blank) for any metric in the `unavailable` list.
**Patterns to follow:** existing "Housing & Market" section markup in `berwick/page.tsx` as the visual anchor point.
**Test scenarios:**
- Renders populated stat tiles when all data available
- Renders "data unavailable" state for a specific metric without breaking layout
- Renders full unavailable state gracefully if the API call errors
**Verification:** Berwick suburb page shows live data replacing the hardcoded stat; no console errors on missing fields.

### U4. Roll `SuburbMarketData` out to remaining 19 suburb pages
**Goal:** Consistent live market data across all suburb pages.
**Requirements:** R1
**Dependencies:** U3
**Files:** all `src/app/suburbs/*/page.tsx` (19 remaining pages)
**Approach:** Swap each page's hardcoded median-price stat/section for `<SuburbMarketData suburb="..." />`, passing the suburb name matching VaultRE's expected filter value confirmed in U1.
**Test expectation:** none — mechanical rollout of a component already covered by U3's test scenarios; spot-check 2-3 pages for suburb-name-matching correctness.
**Verification:** All 20 suburb pages render market data without hardcoded stats remaining.

### U5. Settlement + review-request Prisma models
**Goal:** Persistent tracking for the review-request flow.
**Requirements:** R3, R4
**Dependencies:** none
**Files:** `prisma/schema.prisma` (add `Settlement`, `ReviewRequest` models), new migration
**Approach:** `Settlement { id, propertyAddress, clientName, clientEmail, settlementDate, agentId }`; `ReviewRequest { id, settlementId, sentAt, reviewedAt?, reviewToken (unique) }`. `reviewToken` is the one-click link identifier.
**Test scenarios:**
- Migration applies cleanly against existing schema (Account/Session/User/VerificationToken/SavedProperty)
- Unique constraint on `reviewToken` prevents collision
**Verification:** `prisma migrate dev` succeeds; models queryable.

### U6. Settlement entry form + review-request email via Resend
**Goal:** Agent manually logs a settlement; system schedules and sends a review-request email.
**Requirements:** R3
**Dependencies:** U5
**Files:** `src/app/backstage/settlements/page.tsx` (new, reuses existing `backstage` area for internal tooling), `src/app/api/settlements/route.ts` (new, POST to create `Settlement`), `src/services/reviewEmail.ts` (new, Resend send wrapper + templated content with `reviewToken` link)
**Approach:** Simple internal form (address, client name/email, settlement date) → creates `Settlement` row. Email send itself is triggered by the cron job (U7), not immediately on form submit, so timing (e.g., "send 3 days post-settlement") is controllable in one place.
**Patterns to follow:** existing `backstage` directory for internal/admin-style pages.
**Test scenarios:**
- Valid form submission creates a `Settlement` row
- Missing required field (email) rejected with validation error
- Duplicate settlement for the same property/client is allowed (agents may re-list) but flagged in UI for awareness
**Verification:** Submitting the form creates a row visible via a DB query; no email sent at submit time (deferred to cron).

### U7. Vercel Cron: daily review-request dispatch
**Goal:** Automated, scheduled sending of review-request emails N days after settlement, exactly once per settlement.
**Requirements:** R3, R4
**Dependencies:** U5, U6
**Files:** `vercel.json` (add `crons` entry), `src/app/api/cron/review-requests/route.ts` (new)
**Approach:** Daily cron hits the route; route queries `Settlement`s where `settlementDate` is N days ago and no `ReviewRequest` exists yet, sends via `reviewEmail.ts`, creates the `ReviewRequest` row (marking it sent) so the same settlement is never emailed twice.
**Test scenarios:**
- Settlement exactly N days old with no existing `ReviewRequest` → email sent, `ReviewRequest` row created
- Settlement already has a `ReviewRequest` → skipped, no duplicate send
- Settlement younger than N days → not yet processed
- Resend send failure → error logged, no `ReviewRequest` row created (so it retries next day rather than silently dropping)
**Verification:** Manually inserting a settlement dated N days ago and invoking the cron route locally results in exactly one email send and one `ReviewRequest` row.

### U8. Review click-through landing + `reviewedAt` tracking
**Goal:** One-click link in the email lands on a page that redirects to Google review and records the click.
**Requirements:** R4
**Dependencies:** U5
**Files:** `src/app/review/[token]/page.tsx` (new)
**Approach:** Looks up `ReviewRequest` by `reviewToken`, sets `reviewedAt` if not already set, redirects to the agency's Google review URL.
**Test scenarios:**
- Valid unexpired token → `reviewedAt` set, redirect fires
- Second visit to same token → redirect still fires but `reviewedAt` not overwritten
- Invalid/unknown token → friendly 404, no crash
**Verification:** Visiting a generated link with a real token redirects correctly and the DB row updates once.

---

## Risks & Dependencies

- **VaultRE data gap risk (KTD1):** if VaultRE doesn't expose sold-listing/median-price data at the suburb level, R1 shrinks to whatever is available — U1 must land before U2/U3/U4 are estimated with confidence.
- **Manual settlement entry is a process dependency**, not just a technical one — agents must remember to log settlements. Flag to Stuart as an adoption risk; automatic detection is follow-up work.
- **Email deliverability**: Resend requires domain verification (SPF/DKIM) before production sends — a one-time setup step outside the codebase, worth confirming before U7 goes live.

## Sources & Research

- Local codebase research (this session): `src/services/api.ts`, `src/app/api/properties/market-search/route.ts` (disabled endpoint + policy comment), `src/app/suburbs/berwick/page.tsx`, `src/app/reviews/page.tsx`, `prisma/schema.prisma`, `vercel.json`, `package.json` (no chart lib, no email SDK present).
