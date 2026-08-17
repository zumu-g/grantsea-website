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
    </>
  );
}
