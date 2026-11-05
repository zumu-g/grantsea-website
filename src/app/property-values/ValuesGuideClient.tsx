'use client';

import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import SellerCTA from '@/components/SellerCTA';
import TrendLine from '@/components/TrendLine';
import type { SuburbValuesPayload, SuburbValues, ValuesTypeSeries } from '@/lib/valuesGuide';
// valuesMath.js is a plain CJS module (KTD7 self-check runs it via require()); import works via esModuleInterop.
import { formatChange, periodLabel, shortTermLabel, rankByChange } from '@/lib/valuesMath';

type PropertyType = 'houses' | 'units';
type SortColumn = 'change3m' | 'change12m' | 'change5y';

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

export default function ValuesGuideClient({ payload }: { payload: SuburbValuesPayload }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requested = searchParams.get('suburb');

  const bySlug = useMemo(() => {
    const map = new Map<string, SuburbValues>();
    payload.suburbs.forEach((s) => map.set(s.slug, s));
    return map;
  }, [payload.suburbs]);

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
            Data as at {new Date(payload.generatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}.
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
