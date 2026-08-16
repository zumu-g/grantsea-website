import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import { getListingsForSuburb } from '@/lib/serverProperties';

export const revalidate = 86400;

export default async function Page() {
  const listings = await getListingsForSuburb('Hampton Park');
  return (
    <>
      <PageClient />
      <CrawlerListings heading="Current listings in Hampton Park" listings={listings} />
    </>
  );
}
