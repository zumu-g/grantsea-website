// Server component: crawler-visible listing summary rendered in initial HTML
// so non-JS crawlers (AI bots, search engines) see real listing data.
import Link from 'next/link';
import { Property } from '@/services/api';

export default function CrawlerListings({ heading, listings }: { heading: string; listings: Property[] }) {
  if (!listings.length) return null;
  return (
    <section style={{ padding: 'max(2rem, 3.33vw)', backgroundColor: '#fff' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{heading}</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listings.map((p) => (
          <li key={p.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '15px' }}>
            <Link href={`/property/${p.id}`} style={{ color: '#000', textDecoration: 'none' }}>
              {[p.address, p.suburb].filter(Boolean).join(', ')}
              {' — '}
              {p.priceDisplay || p.leasePriceDisplay || 'Contact agent'}
              {p.bedrooms ? ` · ${p.bedrooms} bed` : ''}
              {p.bathrooms ? ` · ${p.bathrooms} bath` : ''}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
