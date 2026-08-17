import BuyPageClient from './BuyPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import { getListings } from '@/lib/serverProperties';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata.buy();
export const revalidate = 86400;

export default async function Page() {
  const listings = await getListings({ type: 'sale', limit: 12 });
  return (
    <>
      <BuyPageClient initialProperties={listings} />
      <CrawlerListings heading="Properties for sale" listings={listings} />
    </>
  );
}
