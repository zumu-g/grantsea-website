import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.grantsestateagents.com.au';
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://uat-gea.mcgrathre.com/wp-json/wp/v2';

export async function GET() {
  try {
    // Fetch all properties from WordPress API
    const propertiesResponse = await fetch(`${WORDPRESS_API_URL}/properties?per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!propertiesResponse.ok) {
      throw new Error('Failed to fetch properties');
    }
    
    const properties = await propertiesResponse.json();
    
    // Generate sitemap XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${properties.map((property: any) => `  <url>
    <loc>${SITE_URL}/property/${property.slug || property.id}</loc>
    <lastmod>${new Date(property.modified || property.date).toISOString()}</lastmod>
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
    
    // Return empty sitemap on error
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