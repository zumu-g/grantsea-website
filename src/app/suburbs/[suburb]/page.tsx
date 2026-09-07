import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import { getListingsForSuburb } from '@/lib/serverProperties';
import { suburbData } from '@/data/suburbData';

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(suburbData).map((suburb) => ({ suburb }));
}

export default async function Page({ params }: { params: { suburb: string } }) {
  if (!suburbData[params.suburb]) notFound();
  const name = suburbData[params.suburb].name;
  const listings = await getListingsForSuburb(name);
  return (
    <>
      <PageClient />
      <CrawlerListings heading={`Current listings in ${name}`} listings={listings} />
      <p style={{ padding: '0 max(2rem, 3.33vw) 2rem', fontSize: '14px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <Link href={`/property-values?suburb=${encodeURIComponent(params.suburb)}`} style={{ color: '#000', fontWeight: 700 }}>
          See how {name} compares →
        </Link>
      </p>
    </>
  );
}
