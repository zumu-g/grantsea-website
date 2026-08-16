// Server-side JSON-LD (schema.org) helpers. Rendered via <JsonLd> in server
// components/layouts only — never in 'use client' files.
import React from 'react';

export const SITE_URL = 'https://grantsea.com.au';

const AREA_SERVED = [
  'Beaconsfield',
  'Beaconsfield Upper',
  'Berwick',
  'Bunyip',
  'Clyde',
  'Clyde North',
  'Cranbourne',
  'Cranbourne North',
  'Endeavour Hills',
  'Garfield',
  'Hallam',
  'Hampton Park',
  'Harkaway',
  'Koo Wee Rup',
  'Narre Warren',
  'Narre Warren East',
  'Narre Warren South',
  'Officer',
  'Pakenham',
  'Tynong',
];

/** Sitewide RealEstateAgent / LocalBusiness org node. NAP must stay
 *  consistent with the root layout and contact page. */
export function realEstateAgent(overrides?: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: "Grant's Estate Agents",
    alternateName: 'Grants Estate Agents',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Leading real estate agency serving Berwick, Narre Warren, Cranbourne, Pakenham, and Officer in Southeast Melbourne. Specialising in residential property sales, rentals, and property management.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berwick',
      addressRegion: 'VIC',
      postalCode: '3806',
      addressCountry: 'AU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: -38.0395, longitude: 145.3464 },
    telephone: '+61-1300-472687',
    email: 'info@grantsea.com.au',
    areaServed: AREA_SERVED.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/grantsestateagents',
      'https://www.instagram.com/grantsestateagents',
      'https://www.linkedin.com/company/grants-estate-agents',
    ],
    ...overrides,
  };
}

/** breadcrumb([['Suburbs', '/suburbs'], ['Berwick', '/suburbs/berwick']]).
 *  Home is prepended automatically. */
export function breadcrumb(items: [name: string, path: string][]) {
  const all: [string, string][] = [['Home', '/'], ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL,
    })),
  };
}

/** RealEstateListing node from a VaultRE-transformed property object. */
export function realEstateListing(property: any, id: string) {
  const url = `${SITE_URL}/property/${id}`;
  const price = property.priceDisplay || property.leasePriceDisplay || undefined;
  const status =
    property.status === 'unconditional'
      ? 'https://schema.org/SoldOut'
      : 'https://schema.org/InStock';
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.address || 'Property listing',
    url,
    mainEntityOfPage: url,
    datePosted: property.dateListed || property.inserted || undefined,
    about: {
      '@type': 'Residence',
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.address || undefined,
        addressLocality: property.suburb || undefined,
        addressRegion: 'VIC',
        postalCode: property.postcode || undefined,
        addressCountry: 'AU',
      },
      numberOfBedrooms: property.bedrooms || undefined,
      numberOfBathroomsTotal: property.bathrooms || undefined,
    },
    image: property.images?.[0]?.url || undefined,
    offers: price
      ? { '@type': 'Offer', price, priceCurrency: 'AUD', availability: status }
      : undefined,
    provider: { '@type': 'RealEstateAgent', name: "Grant's Estate Agents", url: SITE_URL },
  };
  return node;
}

/** FAQPage node from the same Q&A array rendered visibly on the page. */
export function faqPage(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

/** Renders a JSON-LD script tag. `<` escaped to prevent script injection. */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: json },
  });
}
