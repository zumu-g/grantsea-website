import Link from 'next/link';
import { getSoldResults } from '@/lib/serverProperties';
import { SUBURBS } from '@/lib/jsonLd';
import RecentlySold from '@/components/RecentlySold';

// KTD3: static ISR, no searchParams on this segment (that would make the
// route dynamic and void the fetch-data-cache last-good-page guarantee, R8).
// Suburb filtering lives at /sold/[suburb] instead.
export const revalidate = 86400;

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default async function SoldPage() {
  // Fetch failure throws through (R8) -- Next's fetch data cache (next.revalidate
  // pinned in fetchSoldPool) keeps serving the last good page on a VaultRE outage.
  const results = await getSoldResults();

  return (
    <main style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <div style={{ padding: 'max(2rem, 3.33vw) max(2rem, 3.33vw) 0' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Recent Sales</h1>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px' }}>
          {results.length} properties sold by Grant&rsquo;s Estate Agents in the last 12 months.
        </p>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 700 }}>All</span>
          {SUBURBS.map((s) => (
            <Link key={s} href={`/sold/${slugify(s)}`} style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }}>
              {s}
            </Link>
          ))}
        </nav>
      </div>
      {results.length === 0 ? (
        <p style={{ padding: '0 max(2rem, 3.33vw) 2rem', fontSize: '15px', color: '#666' }}>
          No sales recorded in the last 12 months.
        </p>
      ) : (
        <RecentlySold results={results} />
      )}
    </main>
  );
}
