'use client';

import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import SellerCTA from '@/components/SellerCTA';
import TrendLine from '@/components/TrendLine';
import type { SuburbValuesPayload, SuburbValues, ValuesTypeSeries } from '@/lib/valuesGuide';
import type { SuburbStatsPayload, SuburbStats, SuburbTypeStats, StatsReason } from '@/lib/suburbStats';
// valuesMath.js is a plain CJS module (KTD7 self-check runs it via require()); import works via esModuleInterop.
import { formatChange, periodLabel, shortTermLabel, rankByChange } from '@/lib/valuesMath';

type PropertyType = 'houses' | 'units';
type SortColumn = 'change3m' | 'change12m' | 'change5y';

// Domain-correct wording for the stock/rental empty state (R5) -- distinct from
// valuesMath.js's reasonText, which says "not enough sales" for the sale-values
// domain; this is listings/rentals, a different noun for the same UX pattern.
const STATS_REASON_TEXT: Record<StatsReason, string> = {
  'thin-sample': 'not enough listings',
  'no-data': 'no data available',
};
function statsReasonText(reason: StatsReason | null | undefined): string {
  return (reason && STATS_REASON_TEXT[reason]) || 'not enough listings';
}

const DOM_BUCKET_LABELS: Array<[keyof SuburbTypeStats['stock']['buckets'], string]> = [
  ['under30', 'Under 30 days'],
  ['30to60', '30-60 days'],
  ['60to90', '60-90 days'],
  ['90to180', '90-180 days'],
  ['over180', 'Over 180 days'],
];

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function medianText(v: number | null) {
  if (v === null || v === undefined) return '—';
  return v.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
}

function ChangeCell({ label, value, reason }: { label: string; value: number | null; reason?: string | null }) {
  const { text, cue } = formatChange(value, reason);
  const arrow = cue === 'up' ? '↑' : cue === 'down' ? '↓' : '';
  const color = cue === 'up' ? '#1a7a3a' : cue === 'down' ? '#b3261e' : '#666';
  return (
    <span style={{ color: cue ? color : '#999' }}>
      {arrow} {text}
      <span style={{ display: 'none' }}>{label}</span>
    </span>
  );
}

function rentText(v: number | null) {
  if (v === null || v === undefined) return '—';
  return `${v.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })}/wk`;
}

function yieldText(v: number | null) {
  if (v === null || v === undefined) return '—';
  return `${v.toFixed(1)}%`;
}

/**
 * Live stock/asking-price/rental/indicative-yield card for the selected
 * suburb + type. Distinct data domain from the Valuer-General sale-values
 * card above it (R7 -- separate attribution/as-at). When every figure in
 * this domain is thin-sample or no-data, collapses to a single muted line
 * rather than four stacked empty cells, so a data-rich suburb for sale
 * values but data-poor for live listings doesn't visibly degrade the page
 * this card was merged into (KTD1's own condition).
 */
function StockRentYieldCard({ stats }: { stats: SuburbTypeStats }) {
  const allEmpty = stats.stock.reason != null && stats.rental.reason != null;
  if (allEmpty) {
    return (
      <p style={{ fontSize: '13px', color: '#999', marginTop: '16px' }}>
        Live stock and rental figures: {statsReasonText(stats.stock.reason)} for this suburb yet.
      </p>
    );
  }

  const bucketTotal = Object.values(stats.stock.buckets).reduce((a, b) => a + b, 0);

  return (
    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#999' }}>On the market today</div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>
            {stats.stock.count} {stats.stock.count === 1 ? 'listing' : 'listings'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#999' }}>Median asking price</div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>
            {stats.stock.medianAskingPrice != null ? medianText(stats.stock.medianAskingPrice) : statsReasonText(stats.stock.reason)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#999' }}>Median asking rent</div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>
            {stats.rental.medianAskingRent != null ? rentText(stats.rental.medianAskingRent) : statsReasonText(stats.rental.reason)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#999' }}>Indicative gross yield</div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>
            {stats.yield.grossYieldPercent != null ? yieldText(stats.yield.grossYieldPercent) : statsReasonText(stats.yield.reason)}
          </div>
        </div>
      </div>

      {bucketTotal > 0 && (
        <>
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Days on market (today&apos;s snapshot)</div>
          <div style={{ display: 'flex', height: '10px', width: '100%', maxWidth: '480px', overflow: 'hidden' }}>
            {DOM_BUCKET_LABELS.map(([key, label], i) => {
              const count = stats.stock.buckets[key];
              const pct = (count / bucketTotal) * 100;
              const shades = ['#1a1a1a', '#4d4d4d', '#808080', '#b3b3b3', '#d9d9d9'];
              return count > 0 ? (
                <div key={key} title={`${label}: ${count}`} style={{ width: `${pct}%`, background: shades[i], minWidth: pct > 0 ? '2px' : 0 }} />
              ) : null;
            })}
          </div>
          {/* Visually-hidden equivalent of the bar's per-segment title tooltips --
              a tooltip alone is unavailable to screen readers and touch devices. */}
          <span
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            Days on market: {DOM_BUCKET_LABELS.map(([key, label]) => `${label}: ${stats.stock.buckets[key]}`).join(', ')}
          </span>
        </>
      )}
    </div>
  );
}

export default function ValuesGuideClient({
  payload,
  statsPayload,
}: {
  payload: SuburbValuesPayload;
  statsPayload: SuburbStatsPayload | null;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requested = searchParams.get('suburb');

  const bySlug = useMemo(() => {
    const map = new Map<string, SuburbValues>();
    payload.suburbs.forEach((s) => map.set(s.slug, s));
    return map;
  }, [payload.suburbs]);

  const statsBySlug = useMemo(() => {
    const map = new Map<string, SuburbStats>();
    statsPayload?.suburbs.forEach((s) => map.set(s.slug, s));
    return map;
  }, [statsPayload]);

  // R6: unknown/malformed ?suburb= falls back to the default (no-selection) state.
  const initialSelected = requested && bySlug.has(requested) ? requested : null;
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSelected);
  const [propertyType, setPropertyType] = useState<PropertyType>('houses');
  const [sortColumn, setSortColumn] = useState<SortColumn>('change12m');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [pickerText, setPickerText] = useState('');

  const selected = selectedSlug ? bySlug.get(selectedSlug) ?? null : null;

  const rows = useMemo(() => {
    const mapped = payload.suburbs.map((s) => ({
      ...s,
      change3m: s[propertyType].change3m,
      change12m: s[propertyType].change12m,
      change5y: s[propertyType].change5y,
    }));
    return rankByChange(mapped, sortColumn, sortDirection);
  }, [payload.suburbs, propertyType, sortColumn, sortDirection]);

  function selectSuburb(slug: string) {
    setSelectedSlug(slug);
    const params = new URLSearchParams(searchParams.toString());
    params.set('suburb', slug);
    router.replace(`/property-values?${params.toString()}`, { scroll: false });
  }

  function toggleSort(column: SortColumn) {
    if (sortColumn === column) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  }

  const typeSeries: ValuesTypeSeries | null = selected ? selected[propertyType] : null;
  const selectedStatsSuburb: SuburbStats | null = selected ? statsBySlug.get(selected.slug) ?? null : null;
  const selectedTypeStats: SuburbTypeStats | null = selectedStatsSuburb ? selectedStatsSuburb[propertyType] : null;
  const pad = 'max(2rem, 3.33vw)';
  const fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';

  return (
    <>
      <OncomHeader />
      <main style={{ fontFamily, paddingTop: '120px' }}>
        <section style={{ padding: `${pad}` }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '8px' }}>
            Casey &amp; Cardinia property values
          </h1>
          <p style={{ fontSize: '16px', color: '#555', maxWidth: '640px', marginBottom: '32px' }}>
            Real median house and unit values across every suburb in the City of Casey and Shire of Cardinia,
            sourced from Valuer-General Victoria data and recent sales.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
            <input
              type="text"
              list="suburb-list"
              placeholder="Search a suburb…"
              value={pickerText}
              onChange={(e) => {
                const text = e.target.value;
                setPickerText(text);
                const match = payload.suburbs.find((s) => s.name.toLowerCase() === text.toLowerCase());
                if (match) selectSuburb(match.slug);
              }}
              style={{
                fontFamily,
                fontSize: '16px',
                padding: '12px 16px',
                minHeight: '44px',
                border: '1px solid #ccc',
                borderRadius: '24px',
                minWidth: '260px',
              }}
            />
            <datalist id="suburb-list">
              {payload.suburbs.map((s) => (
                <option key={s.slug} value={s.name} />
              ))}
            </datalist>

            <div style={{ display: 'flex', gap: '4px', border: '1px solid #000', borderRadius: '24px', padding: '4px' }}>
              {(['houses', 'units'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setPropertyType(t)}
                  style={{
                    fontFamily,
                    fontSize: '14px',
                    minHeight: '44px',
                    padding: '0 20px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    background: propertyType === t ? '#000' : 'transparent',
                    color: propertyType === t ? '#fff' : '#000',
                  }}
                >
                  {t === 'houses' ? 'Houses' : 'Units'}
                </button>
              ))}
            </div>
          </div>

          {selected && typeSeries && (
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{selected.name}</h2>
              {typeSeries.latest?.median != null ? (
                <>
                  <p style={{ fontSize: '36px', fontWeight: 700, margin: '8px 0' }}>
                    {medianText(typeSeries.latest.median)}
                  </p>
                  <p style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>
                    {periodLabel(typeSeries.latest)} · {typeSeries.latest.sales ?? '—'} sales
                  </p>
                  <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {typeSeries.series.length > 1 ? shortTermLabel(typeSeries.latest, typeSeries.series[typeSeries.series.length - 2]) : '3-month'}
                      </div>
                      <ChangeCell label="3 month change" value={typeSeries.change3m.value} reason={typeSeries.change3m.reason} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#999' }}>12-month</div>
                      <ChangeCell label="12 month change" value={typeSeries.change12m.value} reason={typeSeries.change12m.reason} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#999' }}>5-year</div>
                      <ChangeCell label="5 year change" value={typeSeries.change5y.value} reason={typeSeries.change5y.reason} />
                    </div>
                  </div>
                  <TrendLine series={typeSeries.series} />
                </>
              ) : (
                <p style={{ fontSize: '16px', color: '#999' }}>
                  {formatChange(null, typeSeries.reason).text}
                </p>
              )}
              {selectedTypeStats && <StockRentYieldCard stats={selectedTypeStats} />}
            </div>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '640px', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #000' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>Suburb</th>
                  <th style={{ textAlign: 'right', padding: '12px 8px' }}>Median</th>
                  {(['change3m', 'change12m', 'change5y'] as const).map((col) => (
                    <th key={col} style={{ textAlign: 'right', padding: '12px 8px' }}>
                      <button
                        onClick={() => toggleSort(col)}
                        style={{ fontFamily, fontSize: '14px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', minHeight: '44px' }}
                      >
                        {col === 'change3m' ? 'Short-term' : col === 'change12m' ? '12-month' : '5-year'}
                        {sortColumn === col ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const ts = row[propertyType];
                  const isSelected = row.slug === selectedSlug;
                  return (
                    <tr
                      key={row.slug}
                      onClick={() => selectSuburb(row.slug)}
                      style={{
                        borderBottom: '1px solid #eee',
                        cursor: 'pointer',
                        background: isSelected ? '#faf6ee' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 8px' }}>{row.name}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}>{medianText(ts.latest?.median ?? null)}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}><ChangeCell label="short-term" value={row.change3m.value} reason={row.change3m.reason} /></td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}><ChangeCell label="12-month" value={row.change12m.value} reason={row.change12m.reason} /></td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}><ChangeCell label="5-year" value={row.change5y.value} reason={row.change5y.reason} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '13px', color: '#999', marginTop: '24px' }}>
            {payload.attribution.valuerGeneral} · {payload.attribution.everyProperty}
            <br />
            Sale values as at {new Date(payload.generatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}.
            {statsPayload && (
              <>
                <br />
                {statsPayload.attribution.everyProperty}. Live stock/rent/yield as at{' '}
                {new Date(statsPayload.generatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}.
              </>
            )}
          </p>

          <p style={{ fontSize: '13px', marginTop: '8px' }}>
            Looking for a suburb guide? <Link href="/suburbs/berwick" style={{ color: '#000' }}>Browse all suburbs</Link>.
          </p>
        </section>

        <SellerCTA headline="Curious what your home is worth?" subtext="Get a free, no-obligation appraisal from a local Grant's agent." />
      </main>
    </>
  );
}
