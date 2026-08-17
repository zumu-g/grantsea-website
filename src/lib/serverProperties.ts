// Server-side VaultRE listing fetch for ISR pages (suburb guides, buy page).
// Mirrors the env pattern in src/app/api/properties/route.ts — direct VaultRE
// calls, never a self-fetch of our own API routes.
import { transformVaultREProperty, Property } from '@/services/api';
import { medianOf, avgDaysOnMarket, filterByExactSuburb } from '@/lib/stats';

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

/** Agency-scoped sales stats for a suburb, from VaultRE sold data
 *  (/properties/residential/sale/sold — unconditional/settled sales).
 *  Last 12 months only. Returns null when sample < 5 sales or API fails.
 *  `currentListingCount` comes from getSuburbListingsAndCount (may be a
 *  promise so pages can run both fetches in parallel). */
export async function getSuburbSalesStats(suburb: string, currentListingCount: number | Promise<number>): Promise<SuburbSalesStats | null> {
  if (!API_KEY || !ACCESS_TOKEN) return null;
  try {
    // ponytail: 3 pages (300 sold records, newest first) comfortably covers 12
    // months of agency sales; bump pagesToFetch if volume ever exceeds that.
    const pagesToFetch = 3;
    const sold: any[] = [];
    for (let page = 1; page <= pagesToFetch; page++) {
      const qs = new URLSearchParams({ limit: '100', page: String(page), sort: 'unconditional', sortOrder: 'desc' }).toString();
      const res = await fetch(`${API_BASE_URL}/properties/residential/sale/sold?${qs}`, { headers });
      if (!res.ok) throw new Error(`VaultRE sold ${res.status}`);
      const data = await res.json();
      const items = data.items || [];
      sold.push(...items);
      if (page >= (data.totalPages || 1)) break;
    }

    const s = suburb.toLowerCase();
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 1);
    const sales = sold.filter((p: any) =>
      (p.address?.suburb?.name || '').toLowerCase() === s &&
      p.unconditional && new Date(p.unconditional) >= cutoff &&
      typeof p.salePrice === 'number' && p.salePrice > 0
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
