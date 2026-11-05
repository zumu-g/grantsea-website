// Inline SVG trend line, no chart library (KTD4). Plots a suburb/type
// median series; the computed ("latest quarter" from live sales, not a
// Valuer-General quarter) point is drawn distinct and labelled so it never
// reads as an official figure.
import type { ValuesPeriod } from '@/lib/valuesGuide';
import { periodLabel } from '@/lib/valuesMath';

const W = 600;
const H = 160;
const PAD = 12;

export default function TrendLine({ series }: { series: ValuesPeriod[] }) {
  const points = series.filter((p) => typeof p.median === 'number');
  if (points.length < 2) return null;

  const medians = points.map((p) => p.median as number);
  const min = Math.min(...medians);
  const max = Math.max(...medians);
  const range = max - min || 1;

  const x = (i: number) => PAD + (i / (points.length - 1)) * (W - PAD * 2);
  const y = (v: number) => H - PAD - ((v - min) / range) * (H - PAD * 2);

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.median as number).toFixed(1)}`).join(' ');
  const lastIndex = points.length - 1;
  const last = points[lastIndex];
  const isComputed = last.type === 'computed';

  return (
    <div style={{ width: '100%', maxWidth: `${W}px` }}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Median price trend" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <path d={path} fill="none" stroke="#D4A853" strokeWidth={2} />
        {points.map((p, i) => {
          const computed = p.type === 'computed';
          return (
            <circle
              key={p.periodStart}
              cx={x(i)}
              cy={y(p.median as number)}
              r={computed ? 5 : 3}
              fill={computed ? '#000' : '#D4A853'}
              stroke={computed ? '#D4A853' : 'none'}
              strokeWidth={computed ? 2 : 0}
            />
          );
        })}
      </svg>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
        {isComputed ? (
          <>
            <strong style={{ color: '#000' }}>&#9679;</strong> {periodLabel(last)} — computed from recent sales, not yet a published Valuer-General quarter.
          </>
        ) : (
          <>Latest: {periodLabel(last)}</>
        )}
      </p>
    </div>
  );
}
