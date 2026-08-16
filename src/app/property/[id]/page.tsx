import { Metadata } from 'next';
import PropertyPageClient from './PropertyPageClient';
import { JsonLd, breadcrumb, realEstateListing } from '@/lib/jsonLd';

// Server component wrapper: the visual page (PropertyPageClient.tsx) is a
// 'use client' component and protected by PROPERTY_DETAILS_STYLE_GUIDE.md, so
// its JSX is untouched. This file only adds real per-property metadata —
// Next.js requires generateMetadata to live in a server component, and every
// property page previously inherited the same site-wide <title> because no
// page-level metadata was ever set.

async function fetchProperty(id: string) {
  try {
    // Internal fetch to our own API route; falls back silently to generic
    // metadata if VaultRE is unavailable rather than blocking the page.
    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const res = await fetch(`${base}/api/properties/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json.property || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await fetchProperty(params.id);

  if (!property) {
    return {
      title: "Property | Grant's Estate Agents",
      description: "View this property listing with Grant's Estate Agents.",
    };
  }

  const address = property.address || 'Property';
  const price = property.priceDisplay || property.leasePriceDisplay || '';
  const beds = property.bedrooms ? `${property.bedrooms} bed` : '';
  const baths = property.bathrooms ? `${property.bathrooms} bath` : '';
  const description = property.description
    ? property.description.substring(0, 155).trim() + '...'
    : `${[beds, baths].filter(Boolean).join(', ')} in ${property.suburb || 'South East Melbourne'}. ${price}`.trim();
  const image = property.images?.[0]?.url;

  const title = `${address}${price ? ` - ${price}` : ''} | Grant's Estate Agents`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  // ponytail: second fetch alongside generateMetadata; Next 13.5 won't dedupe
  // no-store fetches — acceptable, both hit our own cached API route.
  const property = await fetchProperty(params.id);
  return (
    <>
      {property && (
        <JsonLd
          data={[
            realEstateListing(property, params.id),
            breadcrumb([
              ['Buy', '/buy'],
              [property.address || 'Property', `/property/${params.id}`],
            ]),
          ]}
        />
      )}
      <PropertyPageClient />
    </>
  );
}
