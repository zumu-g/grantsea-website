# Bing Webmaster Tools setup checklist

One-time manual steps (Bing's index feeds ChatGPT search). Do the vercel.app steps now; repeat the site-add for grantsea.com.au once DNS cuts over.

## 1. Verify the site in Bing Webmaster Tools

1. Sign in at https://www.bing.com/webmasters (Microsoft account).
2. Add site `https://grantsea-website.vercel.app` now, and `https://grantsea.com.au` when DNS is live.
3. Verify by either:
   - **DNS (preferred for grantsea.com.au)**: add the CNAME record Bing provides at your DNS host, or
   - **Meta tag**: Bing gives a `<meta name="msvalidate.01" ...>` tag — ask Claude to add it to the root layout, redeploy, then click Verify.
4. Optional shortcut: use **Import from Google Search Console** on the Bing dashboard — verifies and imports sitemaps in one step if GSC is already set up.

## 2. Submit sitemaps

In Bing WMT > Sitemaps, submit:

- `https://grantsea.com.au/sitemap-index.xml`
- `https://grantsea.com.au/sitemap.xml`

(Use the vercel.app equivalents for the interim vercel.app property.)

## 3. Confirm IndexNow key serves

- Open `https://grantsea.com.au/f016139c24ecc21175d71e4831953380.txt` — it must return the key `f016139c24ecc21175d71e4831953380` as plain text.
- Set the `CRON_SECRET` env var in Vercel, then trigger a submission after deploys: `https://grantsea.com.au/api/indexnow?secret=<CRON_SECRET>`.

## 4. Log the GSC baseline (do this now)

For the 8-week outcome check in the AI-visibility plan:

1. Open Google Search Console > Performance > last 28 days.
2. Record today's date, total impressions, total clicks, and average position.
3. Note them in `docs/plans/` (or wherever the plan tracks success criteria) so the week-8 comparison has a starting point.
