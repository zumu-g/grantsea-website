import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import SuburbStats from '@/components/SuburbStats';
import SuburbFAQ from '@/components/SuburbFAQ';
import { getListingsForSuburb, getSuburbSalesStats, getCurrentSaleListingCount, asAtToday } from '@/lib/serverProperties';

export const revalidate = 86400;

export default async function Page() {
  const suburb = 'Cranbourne';
  const [listings, stats] = await Promise.all([getListingsForSuburb(suburb), getSuburbSalesStats(suburb)]);
  const currentCount = stats?.currentListingCount ?? (await getCurrentSaleListingCount(suburb));
  return (
    <>
      <PageClient />
      <SuburbStats suburb={suburb} stats={stats} />
      <SuburbFAQ suburb={suburb} stats={stats} currentListingCount={currentCount} asAt={stats?.asAt ?? asAtToday()} />
      <CrawlerListings heading="Current listings in Cranbourne" listings={listings} />
    </>
  );
}
