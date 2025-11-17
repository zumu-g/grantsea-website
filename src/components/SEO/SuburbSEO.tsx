import { Metadata } from 'next';

interface SuburbData {
  name: string;
  description?: string;
  population?: number;
  medianHousePrice?: number;
  medianRentPrice?: number;
  postcode?: string;
  schools?: number;
  parks?: number;
  distanceFromCBD?: number;
}

export function generateSuburbMetadata(suburb: SuburbData): Metadata {
  const title = `${suburb.name} Real Estate & Property | Grant's Estate Agents`;

  const description = suburb.description ||
    `Find properties for sale and rent in ${suburb.name}, VIC ${suburb.postcode || ''}. View market trends, median prices, schools, and local amenities. Your trusted ${suburb.name} real estate experts.`;

  return {
    title,
    description: description.substring(0, 160),
    keywords: `${suburb.name} real estate, ${suburb.name} properties, ${suburb.name} houses for sale, ${suburb.name} rentals, ${suburb.name} VIC ${suburb.postcode || ''}, Grant's Estate Agents`,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://grantsea.com.au/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`,
      images: [{
        url: `https://grantsea.com.au/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        width: 1200,
        height: 630,
        alt: `${suburb.name} Real Estate`
      }],
      siteName: "Grant's Estate Agents",
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://grantsea.com.au/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}.jpg`],
    },
    alternates: {
      canonical: `https://grantsea.com.au/suburbs/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`,
    },
  };
}

export function generateSuburbStructuredData(suburb: SuburbData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    'name': suburb.name,
    'description': suburb.description,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': suburb.name,
      'addressRegion': 'VIC',
      'postalCode': suburb.postcode,
      'addressCountry': 'AU'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '', // Add actual coordinates
      'longitude': ''
    },
    'hasMap': `https://www.google.com/maps/search/${suburb.name}+VIC+${suburb.postcode}`,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.5',
      'reviewCount': '125'
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `https://grantsea.com.au/search?suburb=${suburb.name}`,
      'query-input': 'required'
    }
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}