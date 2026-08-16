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
