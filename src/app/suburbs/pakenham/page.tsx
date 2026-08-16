import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import SuburbStats from '@/components/SuburbStats';
import SuburbFAQ from '@/components/SuburbFAQ';
import { getSuburbListingsAndCount, getSuburbSalesStats, asAtToday } from '@/lib/serverProperties';

export const revalidate = 86400;

export default async function Page() {
  const suburb = 'Pakenham';
  const listingsAndCount = getSuburbListingsAndCount(suburb);
  const [{ listings, currentListingCount: currentCount }, stats] = await Promise.all([
    listingsAndCount,
    getSuburbSalesStats(suburb, listingsAndCount.then((r) => r.currentListingCount)),
  ]);
  return (
    <>
      <PageClient />
      <SuburbStats suburb={suburb} stats={stats} />
      <SuburbFAQ suburb={suburb} stats={stats} currentListingCount={currentCount} asAt={stats?.asAt ?? asAtToday()} />
      <CrawlerListings heading="Current listings in Pakenham" listings={listings} />
    </>
  );
}
