// Server component: individual sold results, allow-listed by toSoldResult
// (src/lib/sold.js) before this ever sees them. Never calls formatPrice on a
// null price -- formatPrice(null) reads "Contact Agent", which would blur a
// withheld sale into a live listing. "Price undisclosed" is the explicit,
// deliberate string for that state (R3, KD4).
import Link from 'next/link';
import { SoldResult } from '@/lib/serverProperties';
import { formatPrice } from '@/services/api';

function formatSoldDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function RecentlySold({
  heading,
  results,
  suburbLinkSlug,
}: {
  heading?: string;
  results: SoldResult[];
  /** When set, renders a "See all recent sales" link to /sold/<slug>. */
  suburbLinkSlug?: string;
}) {
  if (!results.length) return null;
  return (
    <section style={{ padding: 'max(2rem, 3.33vw)', backgroundColor: '#fff', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      {heading && <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{heading}</h2>}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {results.map((r) => (
          <li key={r.id} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
            {r.heroPhotoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.heroPhotoUrl}
                alt={r.address}
                width={96}
                height={72}
                style={{ objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
              />
            )}
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>{r.address}</div>
              <div style={{ fontSize: '14px', color: '#333', marginTop: '2px' }}>
                {r.price !== null ? `Sold ${formatPrice(r.price)}` : 'Price undisclosed'}
                {r.soldDate ? ` · ${formatSoldDate(r.soldDate)}` : ''}
                {r.method ? ` · ${r.method}` : ''}
                {r.daysOnMarket !== null ? ` · ${r.daysOnMarket} days on market` : ''}
              </div>
              {r.agentName && (
                <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>Sold by {r.agentName}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {suburbLinkSlug && (
        <p style={{ fontSize: '14px', marginTop: '16px' }}>
          <Link href={`/sold/${suburbLinkSlug}`} style={{ color: '#000', fontWeight: 700 }}>
            See all recent sales →
          </Link>
        </p>
      )}
    </section>
  );
}
