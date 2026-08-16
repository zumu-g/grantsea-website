/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vaultre.com.au',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vaultre.com.au',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.realestateview.com.au',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    // Optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      // Canonical host: redirect www.grantsea.com.au -> grantsea.com.au
      // Inert until DNS cutover points www at this deployment.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.grantsea.com.au' }],
        destination: 'https://grantsea.com.au/:path*',
        permanent: true,
      },

      // --- Old PHP/WordPress site URL redirects (see docs/plans/old-url-redirect-map.md) ---
      // Path-based so they work after DNS cutover of grantsea.com.au to this app.

      // Suburb profiles: /suburb/:slug -> /suburbs/:slug (dynamic [suburb] route covers all)
      { source: '/suburb/:slug*', destination: '/suburbs/:slug*', permanent: true },

      // Old listing URLs (address slugs ending in -vic-XXXX cannot map to VaultRE IDs)
      // Regex avoids clashing with the new /property/[id] route.
      { source: '/property/:slug(.+-vic-\\d{4})', destination: '/buy', permanent: true },
      { source: '/rental/:path*', destination: '/rent', permanent: true },
      { source: '/land/:path*', destination: '/buy', permanent: true },
      { source: '/rural/:path*', destination: '/buy', permanent: true },
      { source: '/feature/:path*', destination: '/buy', permanent: true },
      { source: '/upcoming-inspection', destination: '/buy/open-for-inspection', permanent: true },

      // Core pages
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/meet-the-team', destination: '/agents', permanent: true },
      { source: '/why-grants', destination: '/about', permanent: true },
      { source: '/property-appraisal', destination: '/appraisal', permanent: true },
      { source: '/free-rental-appraisal', destination: '/appraisal', permanent: true },
      { source: '/property-alerts', destination: '/alerts', permanent: true },
      { source: '/rental-property-alerts', destination: '/alerts', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/sell-in-30-days/:path*', destination: '/sell', permanent: true },
      { source: '/property-management-services', destination: '/landlord-insights', permanent: true },
      { source: '/grants-berwick', destination: '/offices', permanent: true },
      { source: '/grants-narre-warren', destination: '/offices', permanent: true },
      { source: '/grants-pakenham', destination: '/offices', permanent: true },
      { source: '/grants-property-management', destination: '/offices', permanent: true },
      { source: '/articles', destination: '/advice', permanent: true },

      // Blog / news taxonomy and posts -> advice hub
      { source: '/berwick-real-estate-news/:path*', destination: '/advice', permanent: true },
      { source: '/cardinia-real-estate-news/:path*', destination: '/advice', permanent: true },
      { source: '/casey-real-estate-news/:path*', destination: '/advice', permanent: true },
      { source: '/pakenham-real-estate-news/:path*', destination: '/advice', permanent: true },
      { source: '/narre-warren-real-estate-news/:path*', destination: '/advice', permanent: true },
      { source: '/seller-tips/:path*', destination: '/advice', permanent: true },
      { source: '/buyer-tips/:path*', destination: '/advice', permanent: true },
      { source: '/investor-tips/:path*', destination: '/advice', permanent: true },
      { source: '/property-news/:path*', destination: '/advice', permanent: true },
      { source: '/market-news/:path*', destination: '/advice', permanent: true },
      { source: '/ask-grants/:path*', destination: '/advice', permanent: true },
      { source: '/property-profiles/:path*', destination: '/advice', permanent: true },
      { source: '/property-trends/:path*', destination: '/advice', permanent: true },
      { source: '/company-news/:path*', destination: '/advice', permanent: true },
      { source: '/infrastructure-planning/:path*', destination: '/advice', permanent: true },
      { source: '/development/:path*', destination: '/advice', permanent: true },
      { source: '/uncategorized/:path*', destination: '/advice', permanent: true },
      { source: '/category/:path*', destination: '/advice', permanent: true },
      { source: '/tag/:path*', destination: '/advice', permanent: true },
      { source: '/auction-results/:path*', destination: '/market-report', permanent: true },
    ];
  },
};

module.exports = nextConfig;