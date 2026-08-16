import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import { getListingsForSuburb } from '@/lib/serverProperties';

export const revalidate = 86400;

export default async function Page() {
  const listings = await getListingsForSuburb('Narre Warren East');
  return (
    <>
      <PageClient />
      <CrawlerListings heading="Current listings in Narre Warren East" listings={listings} />
    </>
  );
}
