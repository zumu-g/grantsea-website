// Server component: agency-scoped sales stats for a suburb, rendered in
// initial HTML. All numbers come from real VaultRE sold data via
// getSuburbSalesStats; renders nothing when the sample is below 5 sales.
import { SuburbSalesStats } from '@/lib/serverProperties';

const fmtPrice = (n: number) => `$${n.toLocaleString('en-AU')}`;

export default function SuburbStats({ suburb, stats }: { suburb: string; stats: SuburbSalesStats | null }) {
  if (!stats) return null;
  const rows: [string, string][] = [
    ['Median sale price', fmtPrice(stats.medianPrice)],
    ...(stats.daysOnMarket !== null ? ([['Average days on market', `${stats.daysOnMarket} days`]] as [string, string][]) : []),
    ['Properties sold (last 12 months)', String(stats.saleCount)],
    ['Current listings', String(stats.currentListingCount)],
  ];
  return (
    <section style={{ padding: 'max(2rem, 3.33vw)', backgroundColor: '#fff', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
        Grant&rsquo;s recent sales in {suburb}
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        Based on {stats.saleCount} sales by Grant&rsquo;s Estate Agents in {suburb} over the last 12 months.
      </p>
      <dl style={{ margin: 0 }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee', maxWidth: '480px' }}>
            <dt style={{ fontSize: '15px', color: '#333' }}>{label}</dt>
            <dd style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{value}</dd>
          </div>
        ))}
      </dl>
      <p style={{ fontSize: '13px', color: '#999', marginTop: '16px' }}>Data as at {stats.asAt}</p>
    </section>
  );
}
