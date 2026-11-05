import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSoldResults, getSuburbSalesStats, getSuburbListingsAndCount } from '@/lib/serverProperties';
import { SUBURBS } from '@/lib/jsonLd';
import RecentlySold from '@/components/RecentlySold';
import SuburbStats from '@/components/SuburbStats';

export const revalidate = 86400;

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export function generateStaticParams() {
  return SUBURBS.map((name) => ({ suburb: slugify(name) }));
}

// dynamicParams stays true (Next's own default) rather than KTD3's original
// dynamicParams:false, so an unknown slug can redirect to /sold instead of a
// bare 404 -- a lookup-then-redirect never fetches VaultRE, so it costs
// nothing on the cache-eligibility this segment exists to protect. Every
// generated slug from SUBURBS still serves from the static ISR cache.

export default async function SoldSuburbPage({ params }: { params: { suburb: string } }) {
  const suburbName = SUBURBS.find((s) => slugify(s) === params.suburb);
  if (!suburbName) redirect('/sold');

  const listingsAndCount = getSuburbListingsAndCount(suburbName, 0);
  const [results, stats] = await Promise.all([
    getSoldResults({ suburb: suburbName }),
    getSuburbSalesStats(suburbName, listingsAndCount.then((r) => r.currentListingCount)),
  ]);

  return (
    <main style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <div style={{ padding: 'max(2rem, 3.33vw) max(2rem, 3.33vw) 0' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Recent Sales in {suburbName}</h1>
        <p style={{ fontSize: '14px', marginBottom: '16px' }}>
          <Link href="/sold" style={{ color: '#000', fontWeight: 700 }}>← All suburbs</Link>
        </p>
      </div>
      {stats && <SuburbStats suburb={suburbName} stats={stats} />}
      {results.length === 0 ? (
        <p style={{ padding: '0 max(2rem, 3.33vw) 2rem', fontSize: '15px', color: '#666' }}>
          No sales recorded in {suburbName} in the last 12 months.
        </p>
      ) : (
        <RecentlySold results={results} />
      )}
    </main>
  );
}
