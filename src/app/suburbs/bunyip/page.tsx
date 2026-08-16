import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import { getListingsForSuburb } from '@/lib/serverProperties';

export const revalidate = 86400;

export default async function Page() {
  const listings = await getListingsForSuburb('Bunyip');
  return (
    <>
      <PageClient />
      <CrawlerListings heading="Current listings in Bunyip" listings={listings} />
    </>
  );
}
