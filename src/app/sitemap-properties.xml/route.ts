import { NextResponse } from 'next/server';

// Dynamic property sitemap: regenerated at most daily via ISR (R12), so
// listing URLs stay fresh without redeploys or cron plumbing.
export const revalidate = 86400;

const BASE_URL = 'https://grantsea.com.au';
const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

const ENDPOINTS = [
  'properties/residential/sale',
  'properties/residential/lease',
  'properties/land/sale',
  'properties/commercial/sale',
  'properties/commercial/lease',
];

async function fetchAllIds(endpoint: string, headers: Record<string, string>): Promise<Array<{ id: string; lastmod?: string }>> {
  const items: Array<{ id: string; lastmod?: string }> = [];
  // ponytail: 50-page cap (~5000 listings/type) guards against a runaway loop
  for (let page = 1; page <= 50; page++) {
    const res = await fetch(`${API_BASE_URL}/${endpoint}?published=true&limit=100&page=${page}`, { headers });
    if (!res.ok) throw new Error(`VaultRE ${endpoint} page ${page} failed: ${res.status}`);
    const data = await res.json();
    const pageItems = data.items || [];
    for (const p of pageItems) {
      if (p?.id) items.push({ id: String(p.id), lastmod: p.modified || p.inserted });
    }
    if (pageItems.length < 100) break;
  }
  return items;
}

export async function GET() {
  if (!API_KEY || !ACCESS_TOKEN) {
    console.warn('sitemap-properties: VaultRE credentials missing');
    return new NextResponse('Sitemap temporarily unavailable', { status: 503 });
  }

  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'X-Api-Key': API_KEY,
    'Accept': 'application/json',
  };

  try {
    const results = await Promise.all(ENDPOINTS.map(e => fetchAllIds(e, headers)));
    const seen = new Set<string>();
    const urls: string[] = [];
    for (const list of results) {
      for (const { id, lastmod } of list) {
        if (seen.has(id)) continue;
        seen.add(id);
        const date = lastmod ? new Date(lastmod).toISOString() : new Date().toISOString();
        urls.push(`  <url>\n    <loc>${BASE_URL}/property/${id}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`);
      }
    }

    if (urls.length === 0) {
      // Never serve an empty sitemap; a 503 lets ISR keep the last good copy.
      console.warn('sitemap-properties: VaultRE returned no properties');
      return new NextResponse('Sitemap temporarily unavailable', { status: 503 });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.warn('sitemap-properties: generation failed, serving 503 so cached copy persists', error);
    return new NextResponse('Sitemap temporarily unavailable', { status: 503 });
  }
}
