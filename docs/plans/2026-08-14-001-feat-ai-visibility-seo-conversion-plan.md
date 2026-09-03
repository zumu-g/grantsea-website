---
title: AI Visibility, Search Recovery, and Lead Conversion - Plan
type: feat
date: 2026-08-14
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# AI Visibility, Search Recovery, and Lead Conversion - Plan

## Goal Capsule

Make grantsea.com.au visible and citable to AI answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews), arrest the decline in Google Search impressions, and fix lead-conversion measurement (currently zero because GA4 is not installed).

Authority: this plan's Requirements govern product behaviour; KTDs govern implementation mechanism. Protected open-homes files and the property-details design (see Scope Boundaries) override this plan — do not modify them without explicit approval.

Stop conditions: stop and surface if the canonical production domain cannot be confirmed (U1), if a change would touch a protected file, or if real VaultRE data is unavailable for a content feature (never substitute mock data).

---

## Product Contract

### Summary

Ship three streams on the existing Next.js site: an AI/answer-engine visibility layer (crawler access, server-rendered content, structured data, answer-shaped suburb content), technical search recovery (domain/canonical fixes, sitemap hygiene, Bing/IndexNow), and conversion measurement (GA4 install plus lead events at the API choke point).

### Problem Frame

The Stepps analytics report (7–13 Aug 2026) shows users roughly halved since January (2,922 → ~1,386/month), Google impressions falling from ~80k/month, and zero recorded form conversions. Research shows the conversion number is a measurement gap — no analytics library is installed at all. Separately, the site's content is almost entirely client-rendered, and the major AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute JavaScript — so property data, suburb stats, and most page content are invisible to the engines the business wants to appear in. Industry data shows ~68% of Google searches are now zero-click; recovery means being cited inside AI answers and capturing leads on-page, not chasing raw clicks.

### Requirements

**AI visibility**
- R1. AI search/citation crawlers (OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) and training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) are explicitly allowed in robots.txt.
- R2. Suburb statistics, listing summaries, and FAQ content are present in server-rendered initial HTML on suburb and buy pages. (session-settled: user-directed — chosen over props-injection into the protected `PropertyPageClient.tsx`: property pages carry their data via R3's server-rendered RealEstateListing JSON-LD instead.)
- R3. Server-rendered JSON-LD covers: RealEstateAgent/LocalBusiness (office + agent pages, with consistent NAP and areaServed), RealEstateListing on property pages, BreadcrumbList sitewide, FAQPage on suburb pages that carry answer-shaped content per R4.
- R4. Each of the top suburb pages carries an answer-shaped content block: direct 40–60-word answers under question-phrased headings, an agency-scoped stats table ("Grant's recent sales in [suburb]: median $X across N sales", days on market) from real VaultRE data with a minimum-sample threshold below which stats are withheld, and a visible freshness date. (session-settled: user-directed — chosen over market-wide medians from an external data feed: agency-scoped framing is honest with VaultRE-only data.)
- R11. Old-site indexed URLs are inventoried and each 301s to a live equivalent on the canonical host. (session-settled: user-approved — legacy link equity identified as a likely decline cause.)
- R12. Server-rendered listings, stats, and sitemaps refresh at least daily regardless of code deploys (ISR revalidation; scheduled sitemap regeneration). (session-settled: user-approved — chosen over build-time-only freshness.)

**Search recovery**
- R5. One canonical production domain is confirmed and used consistently across robots.txt, sitemaps, canonicals, and metadata; the alternate host redirects to it.
- R6. Per-page canonical URLs replace the current hardcoded sitewide canonical.
- R7. Sitemaps regenerate at build time so property/suburb entries stop going stale.
- R8. The site is verified in Bing Webmaster Tools with sitemaps submitted, and IndexNow pings fire on deploy (ChatGPT search reads the Bing index).

**Conversion measurement**
- R9. GA4 is installed sitewide.
- R10. Every lead submission (contact, appraisal, property enquiry, market report) records a GA4 conversion event with lead type and source page.

### Success Criteria

- AI crawlers fetching a suburb or buy page receive listing data and stats in raw HTML; property pages carry RealEstateListing JSON-LD (verifiable with `curl`).
- GA4 shows non-zero `generate_lead` events within a week of a real enquiry.
- Bing indexes the site; Google Search Console and Bing both accept the corrected sitemaps.
- Outcome check (8 weeks after ship, baseline logged now): GSC impressions stop declining month-on-month, and spot-checks of 5 local queries in ChatGPT/Perplexity show at least one citation of the site.

### Scope Boundaries

- Out of scope: paid advertising, the Stepps SEO package, Google Business Profile content automation, SMS alerting.
- Protected — do not modify without `[PROTECTED-APPROVED]`: `src/services/openHomes.ts`, `src/services/openHomesCache.ts`, `src/app/api/open-homes/route.ts`, both open-for-inspection pages, `src/utils/formatInspectionTime.ts`, `src/components/property/PropertyCard.tsx`. `src/app/property/[id]/PropertyPageClient.tsx` design changes need approval; adding an analytics event call is acceptable, JSX/layout changes are not.
- No-mock-data policy: all stats and estimates use real VaultRE data; features degrade gracefully when the API is unavailable.

#### Deferred to Follow-Up Work
- Advice/article content programme expansion (weekly "what's selling in [suburb]" posts) — the `src/app/advice/` pattern supports it once U6 lands.
- Google review automation and GBP posting (Priority 3 in `CLAUDE.md`).
- Replacing `public/ai-context.json` — leave in place; revisit once llms.txt consumption is real.

### Open Questions

- (Blocking for U1 only, resolvable by inspection) Which host is canonical in production: `grantsea.com.au` or `www.grantsestateagents.com.au`? robots.txt says one, everything else says the other. U1 resolves this by checking the live deployment and Vercel domain config before any other change lands.

---

## Planning Contract

### Key Technical Decisions

- KTD1. Server-render via existing wrapper patterns, no page rewrites. Extend the `src/app/property/[id]/page.tsx` pattern (server component fetches data, renders the client shell) and the 6-line `layout.tsx` metadata shims (`src/app/suburbs/berwick/layout.tsx` style) rather than converting `'use client'` pages. Rationale: AI crawlers don't execute JS, and both patterns already exist in-repo.
- KTD2. JSON-LD lives in server layouts/wrappers as `<script type="application/ld+json">`. The dead components `src/components/SEO/SuburbSEO.tsx`, `src/components/SEO/PropertySEO.tsx`, and `src/components/SEOHead.tsx` are deleted, not wired — they're client-oriented and unused.
- KTD3. Lead events fire server-side at the `/api/lead` choke point via GA4 Measurement Protocol, plus a client `gtag('event','generate_lead')` in submit handlers for session attribution. Rationale: one instrumentation site covers all five forms; client event preserves source/session data the Measurement Protocol lacks.
- KTD4. Schema is treated as a trust/entity signal, not a citation lever — Google's 2026 guidance says structured data is not required for AI Overviews. The citation lever is R2 (server-rendered content) and R4 (answer-shaped content). Effort is weighted accordingly.
- KTD5. llms.txt gets 10 minutes, no more. Adoption evidence shows AI engines effectively don't consume it (Google explicitly ignores it). A minimal file ships in U7 as a lottery ticket; no ongoing maintenance.
- KTD6. FAQPage schema ships despite dead rich results. Google removed FAQ rich results (May 2026), but Q&A-shaped content remains what AI engines extract; the schema costs little alongside the content itself.
- KTD7. All AI crawlers are allowed, including training bots. For a lead-gen local business the discovery upside outweighs content-protection concerns; AI-referred traffic converts materially better than organic.

### Assumptions

- The new site (this repo) replaces the site the Stepps report measures; the plan builds this one right rather than patching the old site.
- `grantsea.com.au` is likely the canonical host (used by metadata, sitemaps, canonicals); U1 verifies before acting.
- A GA4 property exists or can be created; the measurement ID arrives via env var.

### Sequencing

U1 (domain) blocks everything that embeds URLs (U3, U4, U7). U2 (GA4) is independent — land first for earliest data. U5 (server rendering) precedes U6 (answer content) on suburb pages.

---

## Implementation Units

### U1. Canonical domain resolution, robots.txt, redirects

**Goal:** One canonical host everywhere; AI crawlers explicitly allowed.
**Requirements:** R1, R5.
**Dependencies:** none — do first.
**Files:** `public/robots.txt`, `next.config.js`, `src/lib/metadata.ts`, `src/app/layout.tsx`, `scripts/generate-sitemap.js`, `src/app/layout 2.tsx` (delete).
**Approach:**
1. Confirm the live production host (Vercel dashboard/DNS, `curl -I` both hosts).
2. Fix the robots.txt Sitemap line (currently points at `www.grantsestateagents.com.au` while everything else uses `grantsea.com.au`).
3. Add explicit `Allow: /` groups for OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, GPTBot, ClaudeBot, Google-Extended per KTD7.
4. Add host redirect (alternate → canonical) in `next.config.js` redirects.
5. Remove the hardcoded `<link rel="canonical">` from the root layout; move canonicals per-page via `src/lib/metadata.ts` helpers (R6 work completes in U4's shims). Delete the stray `src/app/layout 2.tsx` duplicate.
6. Old-URL redirect audit (R11): inventory the old site's indexed URLs (`site:` queries, GSC/Bing when accessible), map each to a live equivalent, and add 301 redirects for any that would otherwise 404. Surface to the user any URLs with no sensible target.
**Test scenarios:**
- `curl` robots.txt: sitemap URL matches canonical host; each named bot has an Allow group.
- Request to alternate host returns 301/308 to canonical.
- View-source of two pages shows exactly one canonical tag each, page-specific.
**Verification:** production build succeeds; no page carries the old sitewide canonical.

### U2. GA4 install and lead conversion events

**Goal:** Conversion measurement exists; every lead is counted.
**Requirements:** R9, R10.
**Dependencies:** none — can land first.
**Files:** `src/app/layout.tsx`, `src/app/api/lead/route.ts`, `src/components/SellerCTA.tsx`, `src/components/MinimalistContactForm.tsx`, `src/app/appraisal/page.tsx`, `src/app/property/[id]/PropertyPageClient.tsx` (event call only — design protected), `src/app/agent/[id]/page.tsx`, `.env.example`, test file `src/app/api/lead/route.test.ts` (or repo's test convention if one emerges).
**Approach:** per KTD3 — gtag snippet via `next/script` in the root layout (already imports Script) gated on `NEXT_PUBLIC_GA_MEASUREMENT_ID`; server-side Measurement Protocol event in the lead route on successful send; client `generate_lead` event with `lead_type` and page path in each submit handler.
**Execution note:** verify with GA4 DebugView against a real submission before calling this done.
**Test scenarios:**
- Lead route: successful send fires one Measurement Protocol call with the lead type; failed send (missing RESEND_API_KEY → 503) fires none.
- Measurement Protocol failure does not fail the lead response (lead delivery wins).
- Missing GA env vars: site renders, no gtag script injected, lead route works unchanged.
- Each of the five forms emits `generate_lead` with correct `lead_type` on success only.
**Verification:** GA4 DebugView shows events from a test submission; `npm run build` and `npm run typecheck` pass.

### U3. Sitemap regeneration at build

**Goal:** Sitemaps stop going stale.
**Requirements:** R7.
**Dependencies:** U1 (canonical host).
**Files:** `package.json`, `scripts/generate-sitemap.js`, `public/sitemap*.xml`.
**Approach:** `package.json` already runs the script as `postbuild`; move it to `prebuild` (removing the `postbuild` entry) so generated files land in the build output exactly once. The script is currently static-routes-only: add VaultRE property-URL fetching (with last-known-good fallback on API failure) so the property sitemap reflects live listings. Per R12, add a daily scheduled regeneration path (Vercel cron triggering a redeploy or sitemap API route) so entries refresh without code deploys.
**Test scenarios:**
- `npm run build` regenerates sitemaps with today's lastmod.
- Generated URLs all use the canonical host.
- Script failure (VaultRE unreachable) fails loudly or keeps last-known-good — not an empty sitemap.
**Verification:** build output contains fresh sitemaps; sitemap index validates.

### U4. Structured data via server shims

**Goal:** Entity-level trust signals for search and AI engines.
**Requirements:** R3, R6.
**Dependencies:** U1; FAQPage emission limited to pages with Q&A content, which U6 produces — ship BreadcrumbList/canonicals/RealEstateAgent/RealEstateListing here, FAQPage alongside or after U6.
**Files:** `src/app/layout.tsx` (existing org schema — review/extend), `src/app/suburbs/*/layout.tsx` (20 shims), `src/app/agents/layout.tsx`, `src/app/agent/[id]/page.tsx`, `src/app/property/[id]/page.tsx`, `src/lib/metadata.ts`; delete `src/components/SEO/SuburbSEO.tsx`, `src/components/SEO/PropertySEO.tsx`, `src/components/SEOHead.tsx`.
**Approach:** per KTD1/KTD2 — a small server-side JSON-LD helper in `src/lib/` (or alongside `metadata.ts`); layout shims add BreadcrumbList + FAQPage (suburbs) and per-page canonicals; the property server wrapper adds RealEstateListing from the already-fetched property; agent pages add RealEstateAgent with NAP/areaServed matching the GBP listing.
**Test scenarios:**
- View-source of a suburb, property, and agent page each contains valid JSON-LD of the expected type (validate with Google Rich Results test / schema validator).
- Property JSON-LD reflects real listing data, not placeholders.
- Deleted SEO components: repo-wide grep confirms no imports break; build passes.
**Verification:** schema validator passes on the three page types; build and typecheck pass.

### U5. Server-render listing and suburb data

**Goal:** Property and suburb content visible to non-JS crawlers.
**Requirements:** R2.
**Dependencies:** none (pattern exists); before U6.
**Files:** `src/app/suburbs/berwick/page.tsx` (pilot, then remaining suburb pages), `src/app/buy/page.tsx`, new server wrapper components mirroring `src/app/property/[id]/page.tsx` + `PropertyPageClient.tsx` split.
**Approach:** per KTD1 — split each target page into a server `page.tsx` that fetches suburb listings/stats server-side and passes them as props to the renamed client component; initial HTML then carries the data. Per R12, set ISR revalidation (`revalidate` of 86400 or less) on converted pages so data refreshes daily without deploys. Pilot on Berwick, verify, then roll out. Buy page: server-fetch the first page of listings for initial HTML; client interactivity (filters, pagination) unchanged.
**Execution note:** the proof is `curl` — listing addresses and prices must appear in the raw HTML response, not just after hydration.
**Test scenarios:**
- `curl` on the Berwick page returns HTML containing current listing addresses and suburb stats.
- Client interactivity (filters, saved properties) still works after the split.
- VaultRE API failure server-side: page still renders with static content, no crash, no mock data.
**Verification:** raw-HTML curl check on each converted page; build passes; no hydration warnings in dev console.

### U6. Answer-shaped suburb content

**Goal:** Content AI engines actually cite for local queries.
**Requirements:** R4.
**Dependencies:** U5 (stats must be server-rendered to be seen).
**Files:** top-5 suburb pages first (`src/app/suburbs/{berwick,narre-warren,cranbourne,pakenham,officer}/page.tsx` and their server wrappers), a shared stats/FAQ section component in `src/components/`.
**Approach:** each page gets an agency-scoped stats table ("Grant's recent sales in [suburb]": median sale price, days on market, sale/listing counts — computed from VaultRE sold/current data server-side, withheld below a minimum sample of 5 sales) with a visible "Data as at <date>" line, and a Q&A block ("What have houses sold for in Berwick recently?" → direct 40–60-word answer with the agency-scoped number, sample size, and date). FAQPage JSON-LD from U4 sources these same Q&As. GEO research: statistics ≈ +31% and citations ≈ +28% share of AI answers — the real-data stats are the differentiator.
**Test scenarios:**
- Stats values match a manual VaultRE query for the same suburb/date.
- Q&A answer text and FAQPage JSON-LD stay in sync (single source).
- No sold-data available for a suburb: section renders reduced (current listings only) — never placeholder numbers.
**Verification:** curl shows stats and Q&A in raw HTML; numbers spot-checked against VaultRE.

### U7. Bing, IndexNow, llms.txt

**Goal:** Indexed where ChatGPT looks; fast recrawl.
**Requirements:** R8; KTD5.
**Dependencies:** U1, U3 (correct sitemaps to submit).
**Files:** `public/llms.txt`, IndexNow key file in `public/`, small deploy ping script or API route.
**Approach:** verify site in Bing Webmaster Tools (user action — surface instructions), submit sitemaps; add IndexNow key + ping on deploy (simple fetch to the IndexNow endpoint with changed URLs, or manual WMT submission if deploy hooks are awkward); minimal llms.txt listing the key pages.
**Test scenarios:**
- IndexNow key file served at its expected URL; ping endpoint returns 200/202.
- llms.txt served and lists canonical-host URLs.
- Test expectation for Bing verification: manual — confirm in WMT dashboard.
**Verification:** Bing WMT shows site verified and sitemaps accepted.

---

## Verification Contract

- `npm run build`, `npm run typecheck`, `npm run lint` pass at every unit.
- Raw-HTML checks: `curl -A "GPTBot" https://<canonical>/suburbs/berwick` (and property page) contains listing/stats content and JSON-LD — the definitive AI-visibility gate.
- Schema: Google Rich Results Test / validator.schema.org on suburb, property, agent pages.
- GA4 DebugView shows `generate_lead` from a test enquiry on each form type.
- Git hook: no commit touches protected files without `[PROTECTED-APPROVED]`.

## Definition of Done

- All units U1–U7 verified per their sections; R1–R10 each traceable to a shipped unit.
- One canonical host across robots.txt, sitemaps, canonicals, redirects.
- Zero mock data anywhere in shipped features.
- Dead code removed (`src/components/SEO/*`, `src/app/layout 2.tsx`); no abandoned experimental code left in the diff.
- Bing verification and GA4 property creation surfaced to the user where they require account access.

---

## Sources & Research

- Stepps analytics report 7–13 Aug 2026 (Swydo share): users 2,922 (Jan) → 653 (Aug partial), zero form conversions, impressions declining from ~80k/mo, mobile-first audience.
- Repo research: rendering audit, `src/app/property/[id]/page.tsx` wrapper pattern, `src/lib/metadata.ts` shims, dead SEO components, absent analytics, robots.txt domain split.
- External (2025–26): AI crawlers don't execute JS (searchoptimo.com, getpassionfruit.com); crawler taxonomy and Google-Extended scope (anagram.ai, amicited.com); llms.txt non-consumption (digitalapplied.com, ariashaw.com); FAQ rich results removed May 2026 but FAQPage schema still extracted (quattr.com); GEO citation-share stats (surmado.com); Bing/ChatGPT + IndexNow (stackmatix.com, oltre.ai); zero-click ~68% (searchengineland.com).
