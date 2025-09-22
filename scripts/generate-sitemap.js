const fs = require('fs');
const path = require('path');

// Static pages
const staticPages = [
  '',
  '/buy',
  '/rent',
  '/sold',
  '/sell',
  '/appraisal',
  '/about',
  '/agents',
  '/contact',
  '/calculators',
  '/calculators/buy-sell',
  '/calculators/borrowing',
  '/calculators/stamp-duty',
  '/schools-guide',
  '/stories',
  '/stories/first-time-buyer',
  '/stories/strategic-upgrade',
  '/stories/investment-property',
  '/stories/downsizing',
  '/stories/market-timing',
  '/saved',
  '/profile',
  '/map',
  '/search',
  '/reviews',
];

// Suburb pages
const suburbs = [
  'berwick',
  'narre-warren',
  'narre-warren-south',
  'cranbourne',
  'cranbourne-north',
  'pakenham',
  'officer',
  'clyde',
  'clyde-north',
  'beaconsfield',
  'beaconsfield-upper',
  'hallam',
  'hampton-park',
  'endeavour-hills',
  'garfield',
  'harkaway',
  'koo-wee-rup',
  'narre-warren-east',
  'tynong',
  'bunyip',
];

// Agent pages (example IDs - replace with actual agent IDs)
const agents = [
  'stuart-grant',
  'emily-chen',
  'michael-davidson',
  'sarah-thompson',
];

function generateSitemap() {
  const baseUrl = 'https://grantsea.com.au';
  const currentDate = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // Add static pages
  staticPages.forEach(page => {
    const priority = page === '' ? '1.0' : page.includes('/calculators') ? '0.7' : '0.8';
    xml += `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  // Add suburb pages
  suburbs.forEach(suburb => {
    xml += `  <url>
    <loc>${baseUrl}/suburbs/${suburb}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  });

  // Add agent pages
  agents.forEach(agent => {
    xml += `  <url>
    <loc>${baseUrl}/agent/${agent}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  xml += '</urlset>';

  // Write main sitemap
  fs.writeFileSync(
    path.join(__dirname, '..', 'public', 'sitemap.xml'),
    xml
  );

  console.log('✅ Sitemap generated successfully at public/sitemap.xml');

  // Generate sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-properties.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-suburbs.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(
    path.join(__dirname, '..', 'public', 'sitemap-index.xml'),
    sitemapIndex
  );

  console.log('✅ Sitemap index generated at public/sitemap-index.xml');

  // Generate separate suburbs sitemap
  let suburbsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  suburbs.forEach(suburb => {
    suburbsSitemap += `  <url>
    <loc>${baseUrl}/suburbs/${suburb}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  });

  suburbsSitemap += '</urlset>';

  fs.writeFileSync(
    path.join(__dirname, '..', 'public', 'sitemap-suburbs.xml'),
    suburbsSitemap
  );

  console.log('✅ Suburbs sitemap generated at public/sitemap-suburbs.xml');
}

// Run the generator
generateSitemap();