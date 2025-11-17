import { Metadata } from 'next';

interface Property {
  id: string;
  headline?: string;
  description?: string;
  priceDisplay?: string;
  price?: number;
  leasePrice?: number;
  listingType?: string;
  propertyType?: string;
  address?: {
    streetNumber?: string;
    street?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  landSize?: number;
  buildingSize?: number;
  images?: Array<{ url: string; caption?: string }>;
  agent?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export function generatePropertyMetadata(property: Property): Metadata {
  const address = property.address
    ? `${property.address.streetNumber || ''} ${property.address.street || ''}, ${property.address.suburb || ''} ${property.address.state || ''} ${property.address.postcode || ''}`.trim()
    : '';

  const title = property.headline || `${property.propertyType || 'Property'} for ${property.listingType === 'lease' ? 'Rent' : 'Sale'} in ${property.address?.suburb || 'Melbourne'}`;

  const description = property.description ||
    `${property.bedrooms || ''} bedroom ${property.propertyType || 'property'} ${property.listingType === 'lease' ? 'for rent' : 'for sale'} in ${property.address?.suburb || 'Melbourne'}. ${property.priceDisplay || 'Contact for price'}. View photos, floorplans and more on Grant's Estate Agents.`;

  const imageUrl = property.images?.[0]?.url || 'https://grantsea.com.au/property-default.jpg';

  return {
    title: `${title} | Grant's Estate Agents`,
    description: description.substring(0, 160),
    keywords: `${property.address?.suburb} real estate, ${property.propertyType}, ${property.listingType === 'lease' ? 'rental' : 'for sale'}, ${property.bedrooms} bedroom, Grant's Estate Agents`,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://grantsea.com.au/property/${property.id}`,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title
      }],
      siteName: "Grant's Estate Agents",
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://grantsea.com.au/property/${property.id}`,
    },
  };
}

export function generatePropertyStructuredData(property: Property) {
  const address = property.address;
  const price = property.listingType === 'lease'
    ? property.leasePrice
    : property.price;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': property.listingType === 'lease' ? 'RentAction' : 'SellAction',
    'object': {
      '@type': 'Residence',
      'name': property.headline,
      'description': property.description,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': `${address?.streetNumber || ''} ${address?.street || ''}`.trim(),
        'addressLocality': address?.suburb,
        'addressRegion': address?.state || 'VIC',
        'postalCode': address?.postcode,
        'addressCountry': 'AU'
      },
      'numberOfRooms': property.bedrooms,
      'numberOfBathroomsTotal': property.bathrooms,
      'floorSize': property.buildingSize ? {
        '@type': 'QuantitativeValue',
        'value': property.buildingSize,
        'unitCode': 'SQM'
      } : undefined,
      'photo': property.images?.map(img => ({
        '@type': 'ImageObject',
        'url': img.url,
        'caption': img.caption || property.headline
      }))
    },
    'priceSpecification': price ? {
      '@type': 'PriceSpecification',
      'price': price,
      'priceCurrency': 'AUD',
      'unitText': property.listingType === 'lease' ? 'WEEK' : undefined
    } : undefined,
    'seller': {
      '@type': 'RealEstateAgent',
      'name': "Grant's Estate Agents",
      'url': 'https://grantsea.com.au',
      'telephone': '+61-1300-472687',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Berwick',
        'addressRegion': 'VIC',
        'addressCountry': 'AU'
      }
    },
    'agent': property.agent ? {
      '@type': 'Person',
      'name': property.agent.name,
      'email': property.agent.email,
      'telephone': property.agent.phone
    } : undefined
  };

  return structuredData;
}