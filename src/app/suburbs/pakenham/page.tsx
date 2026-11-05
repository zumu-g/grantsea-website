import PageClient from './SuburbPageClient';
import CrawlerListings from '@/components/CrawlerListings';
import SuburbStats from '@/components/SuburbStats';
import SuburbFAQ from '@/components/SuburbFAQ';
import RecentlySold from '@/components/RecentlySold';
import { getSuburbListingsAndCount, getSuburbSalesStats, getSoldResults, asAtToday } from '@/lib/serverProperties';

export const revalidate = 86400;

export default async function Page() {
  const suburb = 'Pakenham';
  const listingsAndCount = getSuburbListingsAndCount(suburb);
  const [{ listings, currentListingCount: currentCount }, stats, soldResults] = await Promise.all([
    listingsAndCount,
    getSuburbSalesStats(suburb, listingsAndCount.then((r) => r.currentListingCount)),
    getSoldResults({ suburb, limit: 6 }).catch(() => []),
  ]);
  const slug = suburb.toLowerCase().replace(/\s+/g, '-');
  return (
    <>
      <PageClient />
      <SuburbStats suburb={suburb} stats={stats} />
      <SuburbFAQ suburb={suburb} stats={stats} currentListingCount={currentCount} asAt={stats?.asAt ?? asAtToday()} />
      <RecentlySold heading={`Recently sold in ${suburb}`} results={soldResults} suburbLinkSlug={slug} />
      <CrawlerListings heading="Current listings in Pakenham" listings={listings} />
    </>
  );
}
