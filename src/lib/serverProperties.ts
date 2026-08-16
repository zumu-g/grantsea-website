// Server-side VaultRE listing fetch for ISR pages (suburb guides, buy page).
// Mirrors the env pattern in src/app/api/properties/route.ts — direct VaultRE
// calls, never a self-fetch of our own API routes.
import { transformVaultREProperty, Property } from '@/services/api';

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
      const s = params.suburb.toLowerCase();
      items = items.filter((p: any) =>
        (p.address?.suburb?.name || '').toLowerCase().includes(s) ||
        (p.displayAddress || '').toLowerCase().includes(s)
      );
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

/** Exact-suburb count of current sale listings (independent of sold stats,
 *  so listing-count Q&As still work when stats are withheld). */
export async function getCurrentSaleListingCount(suburb: string): Promise<number> {
  const s = suburb.toLowerCase();
  return (await getListings({ type: 'sale', suburb, limit: 200 }))
    .filter((p: any) => (p.suburb || '').toLowerCase() === s).length;
}

/** Agency-scoped sales stats for a suburb, from VaultRE sold data
 *  (/properties/residential/sale/sold — unconditional/settled sales).
 *  Last 12 months only. Returns null when sample < 5 sales or API fails. */
export async function getSuburbSalesStats(suburb: string): Promise<SuburbSalesStats | null> {
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

    const prices = sales.map((p: any) => p.salePrice).sort((a: number, b: number) => a - b);
    const mid = Math.floor(prices.length / 2);
    const medianPrice = prices.length % 2 ? prices[mid] : Math.round((prices[mid - 1] + prices[mid]) / 2);

    const doms = sales
      .map((p: any) => p.internalMarketingLiveDate
        ? (new Date(p.unconditional).getTime() - new Date(p.internalMarketingLiveDate).getTime()) / 86400000
        : null)
      .filter((d): d is number => d !== null && d > 0 && d < 365);
    const daysOnMarket = doms.length >= MIN_SAMPLE
      ? Math.round(doms.reduce((a, b) => a + b, 0) / doms.length)
      : null;

    return {
      medianPrice,
      daysOnMarket,
      saleCount: sales.length,
      currentListingCount: await getCurrentSaleListingCount(suburb),
      asAt: asAtToday(),
    };
  } catch (err) {
    console.error('getSuburbSalesStats failed:', err);
    return null;
  }
}
