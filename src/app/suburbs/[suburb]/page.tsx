import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import { getListingsForSuburb } from '@/lib/serverProperties';
import { suburbData } from '@/data/suburbData';

export const revalidate = 86400;

export default async function Page({ params }: { params: { suburb: string } }) {
  const name = suburbData[params.suburb]?.name || suburbData['berwick'].name;
  const listings = await getListingsForSuburb(name);
  return (
    <>
      <PageClient />
      <CrawlerListings heading={`Current listings in ${name}`} listings={listings} />
    </>
  );
}
