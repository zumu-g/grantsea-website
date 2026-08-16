# Old URL Redirect Map (R11)

Source: `https://www.grantsea.com.au/sitemap.xml` (old WordPress site, fetched 2026-08-17).
Total URLs enumerated across sub-sitemaps: **5,409**. Grouped by path prefix rather than
per-URL — the vast bulk are expired listing and blog-post URLs.

All redirects are path-based in `next.config.js` so they work after the DNS cutover of
`grantsea.com.au` to this app.

## 1. Direct equivalents (no redirect needed — same path)

| Old path | Notes |
|---|---|
| `/` | Homepage |
| `/careers/` | Exists as `/careers` |

## 2. 301 redirects (implemented in next.config.js)

| Old pattern | Count (approx) | New target |
|---|---|---|
| `/suburb/:slug` | 125 | `/suburbs/:slug` (dynamic `[suburb]` route) |
| `/property/<address>-vic-XXXX` | 2,881 | `/buy` (old address slugs cannot map to VaultRE IDs; regex avoids new `/property/[id]`) |
| `/rental/*` | 1,078 | `/rent` |
| `/land/*` | 273 | `/buy` |
| `/rural/*` | 3 | `/buy` |
| `/feature/*` (listing taxonomy) | 236 | `/buy` |
| `/upcoming-inspection` | 1 | `/buy/open-for-inspection` |
| `/contact-us` | 1 | `/contact` |
| `/meet-the-team` | 1 | `/agents` |
| `/why-grants` | 1 | `/about` |
| `/property-appraisal`, `/free-rental-appraisal` | 2 | `/appraisal` |
| `/property-alerts`, `/rental-property-alerts` | 2 | `/alerts` |
| `/privacy-policy` | 1 | `/privacy` |
| `/sell-in-30-days/*` | 2 | `/sell` |
| `/property-management-services` | 1 | `/landlord-insights` |
| `/grants-berwick`, `/grants-narre-warren`, `/grants-pakenham`, `/grants-property-management` | 4 | `/offices` |
| `/articles` | 1 | `/advice` |
| News/blog categories: `/berwick-real-estate-news/*`, `/cardinia-real-estate-news/*`, `/casey-real-estate-news/*`, `/pakenham-real-estate-news/*`, `/narre-warren-real-estate-news/*`, `/seller-tips/*`, `/buyer-tips/*`, `/investor-tips/*`, `/property-news/*`, `/market-news/*`, `/ask-grants/*`, `/property-profiles/*`, `/property-trends/*`, `/company-news/*`, `/infrastructure-planning/*`, `/development/*`, `/uncategorized/*`, `/category/*`, `/tag/*` | ~600 | `/advice` (posts have no per-post equivalents; hub is the best landing) |
| `/auction-results/*` | 113 | `/market-report` |

## 3. No sensible target (left to 404 — decide if any matter)

- Form confirmation pages: `/blog-subscription-confirmation/`, `/question-box-confirmation/`, `/contact-us-confirmation/`, `/free-market-appraisal-confirmation/`, `/property-alerts-confirmation/`, `/rental-property-alerts-confirmation/`, `/free-rental-market-appraisal-confirmation/`, `/careers-enquiry-confirmation/`, `/maintenance-request-confirmation/`, `/property-appraisal-confirmation/`, `/property-appraisal-confirm-details/`, `/sell-in-30-days/confirmation/` (covered by `/sell-in-30-days/*` wildcard), `/careers-enquiry/`
- Individual agent vanity pages: `/kylie-chetty/`, `/shannan-van-schellen-2/` (new site uses `/agent/[id]` with VaultRE IDs — could 301 to `/agents` if desired)
- Utility/legal one-offs: `/landlords-book-frequently-asked-questions/`, `/request-maintenance/`, `/south-east-melbourne-real-estate-report/`, `/top-10-mistakes-home-sellers-make/`, `/reviews-category/*`, `/testimonial_category/*`, author archive pages
- Junk: `/test/`, `/temp/`

Note: `/suburb/*` includes ~100 suburbs with no static guide page; the dynamic
`/suburbs/[suburb]` route handles them.
