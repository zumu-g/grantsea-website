import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  structuredData?: any;
}

export default function SEOHead({
  title = "Grant's Estate Agents | Your Property Experts in Berwick & Casey",
  description = "Find your perfect property with Grant's Estate Agents. Expert real estate services in Berwick, Casey, and surrounding areas. Buy, sell, or rent with confidence.",
  keywords = "real estate, property, houses for sale, rental properties, Berwick, Casey, Cardinia, estate agents, property management",
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  noindex = false,
  structuredData
}: SEOHeadProps) {
  const siteName = "Grant's Estate Agents";
  const defaultUrl = "https://grantsea.com.au";

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${defaultUrl}${ogImage}`} />
      <meta property="og:url" content={canonicalUrl || defaultUrl} />
      <meta property="og:locale" content="en_AU" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${defaultUrl}${ogImage}`} />

      {/* Canonical URL */}
      {canonicalUrl && (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}

// Structured data generators
export const generateRealEstateSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Grant's Estate Agents",
  "description": "Expert real estate services in Berwick, Casey, and surrounding areas",
  "url": "https://grantsea.com.au",
  "logo": "https://grantsea.com.au/logo.png",
  "telephone": "+61-3-9000-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Berwick",
    "addressRegion": "VIC",
    "postalCode": "3806",
    "addressCountry": "AU"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "areaServed": ["Berwick", "Casey", "Cardinia", "Narre Warren", "Cranbourne", "Pakenham"],
  "priceRange": "$$"
});

export const generatePropertySchema = (property: any) => ({
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": property.address,
  "description": property.description,
  "url": `https://grantsea.com.au/property/${property.id}`,
  "image": property.images?.[0]?.url,
  "offers": {
    "@type": "Offer",
    "price": property.price,
    "priceCurrency": "AUD",
    "availability": property.status === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
  },
  "numberOfRooms": property.bedrooms,
  "numberOfBathroomsTotal": property.bathrooms,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": property.address,
    "addressLocality": property.suburb,
    "addressRegion": property.state,
    "postalCode": property.postcode,
    "addressCountry": "AU"
  },
  "geo": property.coordinates ? {
    "@type": "GeoCoordinates",
    "latitude": property.coordinates.latitude,
    "longitude": property.coordinates.longitude
  } : undefined
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://grantsea.com.au${item.url}`
  }))
});