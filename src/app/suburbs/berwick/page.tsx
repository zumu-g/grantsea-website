import PageClient from './BerwickPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import { getListingsForSuburb } from '@/lib/serverProperties';

export const revalidate = 86400;

export default async function Page() {
  const listings = await getListingsForSuburb('Berwick');
  return (
    <>
      <PageClient initialProperties={listings} />
      <CrawlerListings heading="Current listings in Berwick" listings={listings} />
    </>
  );
}
