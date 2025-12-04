import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://grantsea.com.au';

// VaultRE API configuration
const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET() {
  try {
    // Check if API credentials are available
    if (!API_KEY || !ACCESS_TOKEN) {
      console.warn('VaultRE API credentials not available for sitemap generation');
      throw new Error('API credentials not configured');
    }

    const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'X-Api-Key': API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Fetch properties from VaultRE API (limited sample for sitemap)
    const propertiesResponse = await fetch(
      `${API_BASE_URL}/properties/residential/sale?published=true&limit=50`,
      { 
        headers,
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );
    
    if (!propertiesResponse.ok) {
      throw new Error(`VaultRE API responded with status: ${propertiesResponse.status}`);
    }
    
    const propertiesData = await propertiesResponse.json();
    const properties = propertiesData.items || [];
    
    // Generate sitemap XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${properties.map((property: any) => `  <url>
    <loc>${SITE_URL}/property/${property.id}</loc>
    <lastmod>${new Date(property.updatedAt || property.createdAt || Date.now()).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating property sitemap:', error);
    
    // Return empty sitemap on error (better than failing)
    const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    
    return new NextResponse(emptyXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}