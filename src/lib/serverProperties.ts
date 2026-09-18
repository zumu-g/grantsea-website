// Server-side VaultRE listing fetch for ISR pages (suburb guides, buy page).
// Mirrors the env pattern in src/app/api/properties/route.ts — direct VaultRE
// calls, never a self-fetch of our own API routes.
import { transformVaultREProperty, Property } from '@/services/api';
import { medianOf, avgDaysOnMarket, filterByExactSuburb } from '@/lib/stats';
// eslint-disable-next-line @typescript-eslint/no-var-requires -- CommonJS module shared with scripts/check-sold.js
const { toSoldResult, withinMonths } = require('./sold');

const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

const headers = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'X-Api-Key': API_KEY,
  'Accept': 'application/json',
};

async function fetchItems(path: string, params: Record<string, string>): Promise<any[]> {
  const qs = new URLSearchParams({ published: 'true', ...params }).toString();
  const res = await fetch(`${API_BASE_URL}${path}?${qs}`, { headers });
  if (!res.ok) throw new Error(`VaultRE ${path} ${res.status}`);
  const data = await res.json();
  return data.items || [];
}

// VaultRE failure → empty array; pages render their static content regardless.
export async function getListings(params: { type: 'sale' | 'lease'; suburb?: string; limit?: number }): Promise<Property[]> {
  if (!API_KEY || !ACCESS_TOKEN) return [];
  try {
    const limit = params.limit ?? 12;
    // VaultRE does not reliably filter by suburb server-side, so for suburb
    // queries fetch a larger pool and filter locally (same fallback as the API route).
    const pool = params.suburb ? 200 : limit;
    const query: Record<string, string> = { limit: String(pool) };
    if (params.suburb) query.suburb = params.suburb;
    let items = await fetchItems(`/properties/residential/${params.type}`, query);
    if (params.suburb) {
      items = filterByExactSuburb(items, params.suburb);
    }
    return items.slice(0, limit).map(transformVaultREProperty);
  } catch (err) {
    console.error('serverProperties fetch failed:', err);
    return [];
  }
}

export async function getListingsForSuburb(suburb: string, limit = 6): Promise<Property[]> {
  // ponytail: sale listings only for the crawler summary; add lease if needed
  return getListings({ type: 'sale', suburb, limit });
}

export interface SuburbSalesStats {
  medianPrice: number;
  daysOnMarket: number | null;
  saleCount: number;
  currentListingCount: number;
  asAt: string; // e.g. "17 August 2026"
}

const MIN_SAMPLE = 5;

export const asAtToday = () =>
  new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

/** One VaultRE call for both the crawler listings slice and the exact-suburb
 *  current-listing count (for suburb queries getListings always fetches a
 *  200-item pool, so slicing and counting share the same request). */
export async function getSuburbListingsAndCount(suburb: string, limit = 6): Promise<{ listings: Property[]; currentListingCount: number }> {
  const pool = await getListings({ type: 'sale', suburb, limit: 200 });
  // getListings already exact-matches on suburb, so the pool IS the suburb set.
  return {
    listings: pool.slice(0, limit),
    currentListingCount: pool.length,
  };
}

export interface SoldResult {
  id: string;
  suburb: string;
  slug: string;
  address: string;
  price: number | null;
  soldDate: string | null;
  method: string | null;
  daysOnMarket: number | null;
  agentName: string | null;
  heroPhotoUrl: string | null;
}

const SOLD_MONTHS = 12;
const SOLD_PAGE_CAP = 10; // ~500 records (VaultRE returns 50/page regardless of `limit`)

let soldPoolCache: { promise: Promise<any[]>; fetchedAt: number } | null = null;

/** One shared 12-month VaultRE sold pool (published listings only), reused by
 *  both getSuburbSalesStats and getSoldResults so a page render makes one
 *  sold call, not two. Cached per server-process render pass only — never a
 *  module-level long-lived cache that could leak stale data across ISR
 *  revalidations; each call within ~30s of the first reuses the in-flight
 *  promise, and a later call starts a fresh fetch. Sorted unconditional desc;
 *  stops at the first record older than the 12-month cutoff or at
 *  SOLD_PAGE_CAP pages, whichever comes first. A record with no
 *  `unconditional` date is skipped, never treated as the stop signal.
 *  Throws on fetch failure so /sold's ISR data cache can keep serving the
 *  last good response (R8) — this function never swallows errors. */
async function fetchSoldPool(): Promise<any[]> {
  if (soldPoolCache && Date.now() - soldPoolCache.fetchedAt < 30_000) {
    return soldPoolCache.promise;
  }
  const fetchedAt = Date.now();
  const promise = (async () => {
    const sold: any[] = [];
    let cappedOut = true;
    for (let page = 1; page <= SOLD_PAGE_CAP; page++) {
      const qs = new URLSearchParams({
        limit: '100',
        page: String(page),
        sort: 'unconditional',
        sortOrder: 'desc',
        published: 'true',
      }).toString();
      const res = await fetch(`${API_BASE_URL}/properties/residential/sale/sold?${qs}`, {
        headers,
        next: { revalidate: 86400 },
      });
      if (!res.ok) throw new Error(`VaultRE sold ${res.status}`);
      const data = await res.json();
      const items: any[] = data.items || [];
      sold.push(...items);
      const oldestOnPage = items[items.length - 1];
      const oldestHasDate = oldestOnPage && oldestOnPage.unconditional;
      if (oldestHasDate && !withinMonths(oldestOnPage, SOLD_MONTHS)) {
        cappedOut = false;
        break;
      }
      if (page >= (data.totalPages || 1)) {
        cappedOut = false;
        break;
      }
    }
    if (cappedOut) {
      console.warn(`fetchSoldPool: hit the ${SOLD_PAGE_CAP}-page cap before reaching the ${SOLD_MONTHS}-month cutoff`);
    }
    return sold;
  })();
  soldPoolCache = { promise, fetchedAt };
  return promise;
}

/** Agency-scoped sales stats for a suburb, from the shared sold pool.
 *  Last 12 months only. Returns null when sample < 5 disclosed-or-not sales
 *  or API fails — never throws, so a suburb guide keeps rendering on an
 *  outage. `currentListingCount` comes from getSuburbListingsAndCount (may be
 *  a promise so pages can run both fetches in parallel). */
export async function getSuburbSalesStats(suburb: string, currentListingCount: number | Promise<number>): Promise<SuburbSalesStats | null> {
  if (!API_KEY || !ACCESS_TOKEN) return null;
  try {
    const sold = await fetchSoldPool();
    const sales = (filterByExactSuburb(sold, suburb) as any[]).filter((p: any) =>
      withinMonths(p, SOLD_MONTHS) && typeof p.salePrice === 'number' && p.salePrice > 0
    );
    if (sales.length < MIN_SAMPLE) return null;

    const medianPrice = medianOf(sales.map((p: any) => p.salePrice))!;
    const daysOnMarket = avgDaysOnMarket(sales, MIN_SAMPLE);

    return {
      medianPrice,
      daysOnMarket,
      saleCount: sales.length,
      currentListingCount: await currentListingCount,
      asAt: asAtToday(),
    };
  } catch (err) {
    console.error('getSuburbSalesStats failed:', err);
    return null;
  }
}

/** Individual sold results for /sold and /sold/[suburb] (U2, U4), mapped
 *  through the allow-list mapper so no raw VaultRE field ever reaches the
 *  client. Throws on fetch failure (R8) — callers that must never blank out
 *  (suburb guide sections) wrap this in .catch(() => []) themselves. */
export async function getSoldResults(params: { suburb?: string; limit?: number } = {}): Promise<SoldResult[]> {
  const sold = await fetchSoldPool();
  let items = sold.filter((p: any) => withinMonths(p, SOLD_MONTHS));
  if (params.suburb) items = filterByExactSuburb(items, params.suburb);
  const mapped = items.map(toSoldResult) as SoldResult[];
  return typeof params.limit === 'number' ? mapped.slice(0, params.limit) : mapped;
}
