---
title: "feat: Fix live-site failures and build the seller/buyer growth stage"
date: 2026-07-14
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
execution: code
product_contract_source: ce-plan-bootstrap
depth: deep
---

# feat: Fix live-site failures and build the seller/buyer growth stage

## Summary

A full production audit (14 Jul 2026, grantsea-website.vercel.app) found the core site healthy — zero broken links, all flows functional, fast edge responses — but with one critical failure (lead forms silently dropping every enquiry), two trust-critical issues (mock estimate data and fake agents live in production), and a set of SEO/performance gaps that undermine the local-SEO strategy. Phase A fixes those. Phase B builds the next stage: real VaultRE market data on all 20 suburb pages, reusable seller CTAs across the site, property-page lead capture, and a seller content hub (decluttering, styling, interior-design-trend articles) designed to convert home owners into appraisals.

---

## Audit Findings (evidence base)

### Critical
1. **`POST /api/lead` returns 503 in production** — `RESEND_API_KEY` / `LEAD_EMAIL_TO` not set in Vercel. The appraisal and contact forms (the site's only lead capture) fail for every user. Config fix, no code.
2. **Mock estimate API live** — `POST /api/properties/estimate` returns fabricated comparables ("82 Example Street, Unknown"); the Berwick page still shows its CTA. Violates the no-mock-data policy.
3. **Fake agents on /agents** — five placeholder people ("Sarah Thompson, Michael Chen…") with all photos 404.

### High
4. **Sitemap/robots domain chaos** — `/sitemap.xml` lists 27 URLs on `grantsea.com.au` (mostly 404 there); `robots.txt` declares the sitemap on `www.grantsestateagents.com.au`; the site lives on the Vercel domain. Google is fed a sitemap of dead URLs.
5. **Every page shares one `<title>`** — no per-page metadata on /buy, /rent, /property/[id], suburb pages. Property pages ship as empty client shells (no address/price in HTML) → invisible to crawlers and social-share previews.
6. **`/api/properties` cold TTFB is 14.2s** with only `max-age=90`, no SWR — every ~90s a visitor stares at an empty listing grid. `/api/open-homes` already shows the right pattern (`s-maxage=300, stale-while-revalidate=600`).

### Medium
7. **Data-transform bugs**: sale listings carry `leasePriceDisplay: "$800,000 per week"` (sale price mirrored into lease fields); lease listings show generic `priceDisplay: "Contact Agent"` while holding a real weekly rent.
8. **Property pages have no enquiry form** — `mailto:` only; no lead capture or attribution from the highest-intent pages.
9. **Suburb pages have no live market data** — Berwick's "Median $1.1M" is hardcoded; the other 19 have none.
10. **`/property/[id]` uncached** (edge MISS every hit); homepage LCP images request 4K Unsplash variants; ~19KB inline styles per page (secondary).
11. **Open homes returns 0 upcoming** — endpoint healthy (0.07s, cached). May genuinely be empty inventory; verify in CRM. Protected system — no code change proposed.
12. Minor: "Press Center" US spelling; childcare guide hotlinks third-party images; seller CTAs absent from calculators, guides, and contact pages.

---

## Problem Frame

The site is feature-complete but leaking at the two points that matter commercially: leads are lost at capture (503) and at intent (no property-page form, weak seller CTAs), and the local-SEO strategy (CLAUDE.md Priority 1–3) is blocked by broken sitemaps, duplicate titles, and client-only rendering. Home owners get no reason to return: no live market data, no seller-focused content.

## Requirements

- **R1** Every lead form on the site delivers reliably and is verifiable.
- **R2** No mock or fabricated data reachable in production (existing policy).
- **R3** Agents page shows real GEA agents with working photos.
- **R4** Search engines receive a correct sitemap on the canonical domain, unique per-page titles/descriptions, and server-rendered content for listing/detail pages.
- **R5** Listing pages never show an empty grid due to API cold-start; API caching uses SWR.
- **R6** Price fields are correct per listing type (no sale-price-as-rent, no "Contact Agent" masking real rents).
- **R7** All 20 suburb pages show live VaultRE market data: median sale price, recent sold sales, listing count, days on market where derivable.
- **R8** Reusable seller CTAs (free appraisal + suburb market report) appear on suburb pages, calculators, guides, property pages, and contact.
- **R9** Property pages capture enquiries through `/api/lead` with property/source attribution.
- **R10** A seller content hub exists with at least 6 launch articles (decluttering before sale, presale styling, interior design trends 2026, when to sell, cost of selling, preparing for photography), each ending in an appraisal CTA.
- **R11** Protected open-homes files and property-details protected design elements remain untouched (changes elsewhere near them need `[PROTECTED-APPROVED]` awareness).

## Scope Boundaries

**In scope:** the fixes and features above, using VaultRE data only.
**Deferred to follow-up work:** rebuilt property estimate tool on real comparables (needs U7's sold-data route proven first); SMS/Twilio lead alerts (CLAUDE.md Priority 2); Google review automation; CMS migration (articles ship as markdown files, not a CMS); migrating 20 static suburb pages onto the dynamic `[suburb]` route.
**Out of scope:** any edit to protected open-homes files; mock data of any kind; new paid services beyond the existing Resend account.

## Key Technical Decisions

- **KTD1 — Market data via a new `/api/market-data/[suburb]` route** copying the *fetch pattern* from `src/app/api/properties/estimate/route.ts` (proven call: `GET {API_BASE}/properties/residential/sold?suburb=X&per_page=50&sold_in_days=180`) and the *caching/env pattern* from `src/app/api/auctions/route.ts` — never the estimate route's mock fallback. Long CDN cache (`s-maxage=21600, stale-while-revalidate=86400`): sold data moves slowly.
- **KTD2 — One shared `<SuburbMarketData>` client component** dropped into all 20 static suburb pages (in the existing "Housing & Market" section slot, e.g. `src/app/suburbs/berwick/page.tsx` section-4). Templating the 20 pages is deferred; a shared component is the shortest correct path.
- **KTD3 — Articles as local markdown** rendered by a single `src/app/advice/[slug]/page.tsx` route (gray-matter + simple renderer or MDX-lite) — no CMS, no per-article TSX pages. Content lives in `content/advice/*.md` so Stuart can add articles without code.
- **KTD4 — Seller CTA as one reusable component** (`src/components/SellerCTA.tsx`) with variants (appraisal / market report), replacing copy-pasted JSX going forward; existing inline CTAs left alone unless touched anyway.
- **KTD5 — SEO via Next.js metadata + ISR**: `generateMetadata` on property/suburb/listing pages; `revalidate` on `/property/[id]`; server-fetch initial listing data where cheap. Property-details *visual design* stays untouched (protected style guide) — metadata and data-fetch layer only.
- **KTD6 — Canonical domain decision required from Stuart** (grantsea.com.au vs grantsestateagents.com.au vs Vercel URL) before U4 ships; the code change is trivial once decided.

## Open Questions

- **Q1 (blocks U4):** Which domain is canonical for sitemap/robots/metadata? (KTD6)
- **Q2 (verify, no code):** Is the CRM genuinely showing zero upcoming open homes right now? Check VaultRE directly.
- **Q3:** Should article authorship/photos come from real agents (ties into U3 data)?

---

## Implementation Units

### Phase A — Restore trust and stop the leaks

### U1. Restore lead delivery (config)
**Goal:** `/api/lead` returns 200 and delivers email. **Requirements:** R1. **Files:** none (Vercel env: `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`). **Approach:** set env vars, redeploy, submit one clearly-marked test appraisal + one contact enquiry in production; confirm receipt in inbox. **Test scenarios:** valid appraisal POST → 200 + email received; missing email field → 400; env unset locally → 503 (existing behaviour retained). **Verification:** two real test emails received; no 503 in Vercel logs after deploy.

### U2. Kill the mock estimate surface
**Goal:** no fabricated data reachable. **Requirements:** R2. **Dependencies:** none. **Files:** `src/app/api/properties/estimate/route.ts` (delete or hard-410 like `market-search`), `src/app/suburbs/berwick/page.tsx` (remove estimate CTA + `PropertyEstimateCalculator` usage), `src/components/PropertyEstimateCalculator.tsx` (delete if now unused). **Test scenarios:** POST /api/properties/estimate → 410/404; Berwick page renders with no estimate CTA and no console errors. **Verification:** production probe returns 410; grep shows no remaining imports.

### U3. Real agents on /agents
**Goal:** replace placeholder people. **Requirements:** R3. **Files:** `src/app/agents/page-oncom-style.tsx` (or the active agents page), agent photo assets or VaultRE `agentAPI` (`src/services/api.ts`) photo URLs; test file `src/app/agents/__tests__/agents.test.tsx` if test infra exists, else smoke check. **Approach:** prefer `agentAPI` live data; if VaultRE lacks photos, use supplied real photos in `public/agents/`. **Test scenarios:** page lists only real agents; every photo URL returns 200; agent detail links resolve. **Verification:** production page shows real team, zero 404 images.

### U4. Fix sitemap, robots, and canonical domain
**Goal:** Google gets one correct domain. **Requirements:** R4. **Dependencies:** Q1 answered. **Files:** `public/sitemap.xml`, `public/sitemap-index.xml`, `public/sitemap-suburbs.xml`, `public/sitemap-pages.xml`, `public/sitemap-properties.xml`, `public/sitemap-agents.xml`, `public/robots.txt`, `src/app/api/sitemap/route.ts` (hardcoded `SITE_URL` fallback / `NEXT_PUBLIC_SITE_URL` env), `src/app/layout.tsx` (metadataBase). **Test scenarios:** every sitemap file referenced by `sitemap-index.xml` is covered and every URL returns 200 on the canonical domain; robots sitemap line matches sitemap domain; no references to the non-canonical domains remain. **Verification:** scripted curl over all sitemap URLs → all 200.

### U5. Correct price transformation
**Goal:** lease/sale fields correct per listing type. **Requirements:** R6. **Files:** `src/services/api.ts` (`transformVaultREProperty`), plus the API route transform if duplicated; test `src/services/__tests__/transform.test.ts`. **Approach:** root-cause in the shared transformer (all consumers route through it), not per-page patches. **Test scenarios:** sale listing → lease fields null; lease listing with weekly rent → priceDisplay shows "$620 per week" not "Contact Agent"; lease listing with genuinely no price → "Contact Agent"; dual-type ('both') listing keeps both. **Verification:** `/api/properties` spot-check in production shows no sale-price-as-rent.

### U6. API caching + SSR/metadata for listing and property pages
**Goal:** no empty grids, crawlable pages, unique titles. **Requirements:** R4, R5. **Files:** `src/app/api/properties/route.ts` (SWR cache headers matching the auctions pattern), `src/app/property/[id]/page.tsx` (add `generateMetadata` + ISR `revalidate`; server-fetch initial property; **do not alter protected visual design**), `src/app/buy/page.tsx`, `src/app/rent/page.tsx`, suburb pages' metadata exports, homepage hero image sizing (`sizes`/width props so 4K variants aren't default). **Execution note:** verify with curl before/after — HTML must contain address/price for a property page and page-specific `<title>`s. **Test scenarios:** `/api/properties` MISS then HIT with `stale-while-revalidate` header; `/property/[id]` HTML contains address + unique title; /buy title ≠ /rent title; share preview (og tags) shows property address. **Verification:** curl evidence for each; Lighthouse-style LCP image no longer 3840w.

### Phase B — Market data, CTAs, and seller content

### U7. Real market-data API route
**Goal:** `/api/market-data/[suburb]` returning median sale price, recent solds (address, price, date), count, and days-on-market where derivable — real VaultRE only, no fallback. **Requirements:** R2, R7. **Files:** `src/app/api/market-data/[suburb]/route.ts` (new), `src/services/marketData.ts` (new; copy cache class shape from `src/services/auctionsCache.ts`); test `src/services/__tests__/marketData.test.ts`. **Approach:** KTD1. Errors return an honest error payload — the UI hides the section rather than faking numbers. **Test scenarios:** known suburb → stats computed correctly from a fixture of real-shaped sold data (median odd/even counts, empty array → 404/empty payload, malformed VaultRE response → 502 not fake data); cache headers present. **Verification:** production call for Berwick returns plausible real solds cross-checked against VaultRE.

### U8. SuburbMarketData component on all 20 suburb pages
**Goal:** live market section everywhere. **Requirements:** R7. **Dependencies:** U7. **Files:** `src/components/SuburbMarketData.tsx` (new), all 20 `src/app/suburbs/*/page.tsx` (insert into Housing & Market section; replace Berwick's hardcoded figures), `src/app/suburbs/[suburb]/page.tsx`. **Test scenarios:** renders stats + recent-sales list for populated suburb; hides itself cleanly (no skeleton stuck) when API errors or suburb has no solds; matches on.com styling/AU currency formatting. **Verification:** spot-check 5 suburbs in production showing live data.

### U9. Reusable SellerCTA component, placed site-wide
**Goal:** home owners see appraisal/market-report prompts wherever they land. **Requirements:** R8. **Dependencies:** U1 (leads must deliver first). **Files:** `src/components/SellerCTA.tsx` (new), insertions in: 20 suburb pages (pairs with U8's section), `src/app/calculators/*` (stamp-duty and buy-sell pages), `src/app/schools-guide/page.tsx`, `src/app/childcare-guide/page.tsx`, `src/app/contact/page.tsx`, article template (U11). **Approach:** KTD4 — two variants: "What's your home worth? Book a free appraisal" → /appraisal, and "Get the [Suburb] market report" → prefilled appraisal form with `type: 'market-report'` lead (extend `src/app/api/lead/route.ts` whitelist). **Test scenarios:** both variants render and link correctly; market-report submission → 200 + email tagged with suburb + source page; lead route rejects unknown type. **Verification:** test lead arrives with attribution fields.

### U10. Property-page enquiry form
**Goal:** capture high-intent buyer/renter enquiries with attribution. **Requirements:** R9. **Dependencies:** U1, U6 (both touch `src/app/property/[id]/page.tsx`). **Files:** `src/app/property/[id]/page.tsx` (replace mailto with form — layout consistent with protected style guide; this touches protected-adjacent design, so match existing visual patterns exactly and flag in PR for approval), `src/app/api/lead/route.ts` (add `'property-enquiry'` type carrying property id/address/agent). **Test scenarios:** valid enquiry → 200 + email containing property address and page URL; validation errors surface inline; form works for sale and lease listings. **Verification:** test enquiry email received with correct attribution.

### U11. Seller advice hub with launch articles
**Goal:** `/advice` hub + 6 markdown articles that attract and convert home owners. **Requirements:** R10. **Dependencies:** U9 (CTA component embedded in template). **Files:** `src/app/advice/page.tsx` (index), `src/app/advice/[slug]/page.tsx` (renderer + `generateMetadata`), `content/advice/*.md` (6 launch articles: declutter-before-selling, styling-your-home-for-sale, interior-design-trends-2026, best-time-to-sell-south-east-melbourne, cost-of-selling-in-victoria, preparing-for-photography), nav/footer links, sitemap additions. **Approach:** KTD3; AU English; each article ends with SellerCTA; local angle (Casey/Cardinia) per CLAUDE.md content strategy — no generic filler. **Test scenarios:** index lists all articles; each slug renders with unique title/description; unknown slug → 404; markdown with images/headings/lists renders correctly; articles appear in sitemap. **Verification:** all 6 live with working CTAs; curl shows unique metadata per article.

### U12. Small fixes sweep
**Goal:** clear the minor audit items. **Requirements:** R4 (partial). **Files:** press page ("Press Centre" AU spelling), `src/app/childcare-guide/page.tsx` (copy hotlinked third-party images into `public/` or Next image with allowlist). **Test scenarios:** none — copy/asset changes; visual check. **Verification:** spelling corrected; childcare images served first-party.

---

## Verification Contract

- Production probes (curl) for: /api/lead 200 path, estimate route gone, sitemap URLs all 200, /api/properties SWR headers, property-page HTML containing address/title, market-data route returning real solds.
- `npm run build`, `npm run lint`, `npm run typecheck` green.
- One real test lead per new lead type received by email with attribution.
- Protected-file check: `git diff --name-only` contains none of the protected paths (R11); any protected-adjacent change carries `[PROTECTED-APPROVED]` only with Stuart's explicit approval.

## Definition of Done

R1–R10 verified in production per the contract above; R11 clean; deferred items logged, not smuggled in. Phase A is independently shippable and should land before Phase B.

## Sources & Research

- Live production audit, 4 parallel agents, 14 Jul 2026 (functionality, forms/content, performance, repo research) — findings embedded above.
- Repo: `src/app/api/properties/estimate/route.ts` (VaultRE sold-endpoint call pattern), `src/app/api/auctions/route.ts` (route/cache pattern), `src/services/auctionsCache.ts`, `src/app/api/lead/route.ts`, `src/app/suburbs/berwick/page.tsx`.
- CLAUDE.md strategic plan (Priorities 1–4) and no-mock-data policy; `OPEN_HOMES_PROTECTION_PROTOCOL.md`; `PROPERTY_DETAILS_STYLE_GUIDE.md`.
