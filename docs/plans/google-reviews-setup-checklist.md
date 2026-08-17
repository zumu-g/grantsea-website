# Google Reviews Setup Checklist

One-time setup to turn on the Google reviews section. Both env vars unset = section absent, nothing breaks.

## 1. Enumerate your Google Business listings FIRST

Open [Google Business Profile Manager](https://business.google.com/) and count the listings you manage.

> **STOP GATE:** If you manage MORE THAN ONE listing, stop here and tell Claude before setting production env vars. Multiple offices mean reviews need per-office labelling, and the org-wide aggregateRating stays off until that's designed.

## 2. Google Cloud project + Places API (New)

1. Create or choose a project at [console.cloud.google.com](https://console.cloud.google.com/).
2. Enable **"Places API (New)"** (not the legacy "Places API").
3. Attach billing. Free tier covers 1,000 Enterprise-SKU calls/month; our usage is ~120/month, so expected cost is $0.
4. **Create a budget alert at $1/month** (Billing → Budgets & alerts) as a tripwire.

## 3. Create a restricted API key

1. APIs & Services → Credentials → Create credentials → API key.
2. Restrict it: **API restriction → Places API (New) only**.
3. Skip IP restriction — Vercel egress IPs aren't fixed.

## 4. Find the Place ID

Use the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id) and search for the office. It's also visible in Business Profile settings.

## 5. Preview what will render

On Google Maps, check your listing's current top-5 "most relevant" reviews — Places API returns exactly those five, and the site shows them as-is (accepted decision). If the current top 5 aren't ones you'd want on the homepage, know that before flipping it on.

## 6. Set env vars in Vercel and redeploy

In Vercel → Project → Settings → Environment Variables (server-side, Production):

```
GOOGLE_PLACES_API_KEY=<the restricted key>
GOOGLE_PLACE_ID=<the Place ID>
```

Redeploy. Reviews refresh via ISR (≤6h).
