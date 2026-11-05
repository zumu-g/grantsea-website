// Pure maths/formatting helpers for the /property-values page.
// Plain JS (JSDoc types) so scripts/check-values-math.js can require() the
// real implementation without a TS runner. Mirrors src/lib/stats.js.

/** @typedef {{ value: number|null, priorPeriod?: string|null, reason?: string|null }} ChangeFigure */

const REASON_TEXT = {
  suppressed: 'not published for this suburb',
  unmatched: 'not published for this suburb',
  'no-data': 'no data available',
  'thin-sample': 'not enough sales',
  'low-agreement': 'figure under review',
};

/**
 * Human text for a null/demoted figure's reason. Falls back to a generic
 * message for an unknown reason so the UI never renders "undefined".
 * @param {string|null|undefined} reason
 * @returns {string}
 */
function reasonText(reason) {
  return REASON_TEXT[reason] || 'figure under review';
}

/**
 * Format a percent change with sign and a non-colour direction cue
 * (WCAG use-of-colour: never rely on colour alone). Null renders as its
 * reason text instead of a number.
 * @param {number|null} value
 * @param {string|null} [reason]
 * @returns {{ text: string, cue: 'up'|'down'|'flat'|null }}
 */
function formatChange(value, reason) {
  if (value === null || value === undefined) {
    return { text: reasonText(reason), cue: null };
  }
  const rounded = Math.round(value * 10) / 10;
  const sign = rounded > 0 ? '+' : rounded < 0 ? '' : '+'; // negative already carries '-'
  const cue = rounded > 0 ? 'up' : rounded < 0 ? 'down' : 'flat';
  return { text: `${sign}${rounded.toFixed(1)}%`, cue };
}

/**
 * Label for a period. A Valuer-General quarter reads "Dec 2025 quarter";
 * a computed period reads its day range.
 * @param {{ type: 'quarter'|'year'|'computed', periodStart: string, periodEnd?: string, label?: string }} period
 * @returns {string}
 */
function periodLabel(period) {
  if (!period) return '';
  if (period.label) return period.label;
  if (period.type === 'computed' && period.periodStart && period.periodEnd) {
    const fmt = (d) => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${fmt(period.periodStart)} to ${fmt(period.periodEnd)}`;
  }
  const d = new Date(period.periodStart);
  const month = d.toLocaleDateString('en-AU', { month: 'short' });
  const year = d.getFullYear();
  return period.type === 'year' ? `${year}` : `${month} ${year} quarter`;
}

/**
 * Label for the short-term change column: "vs {prior period}", using the
 * literal "3-month" label only when the two periods are consecutive quarters.
 * @param {{ periodStart: string, type: string }} latest
 * @param {{ periodStart: string, type: string, label?: string }} prior
 * @returns {string}
 */
function shortTermLabel(latest, prior) {
  if (!prior) return 'vs prior period';
  const consecutiveQuarters = latest && prior && latest.type === 'quarter' && prior.type === 'quarter' &&
    (new Date(latest.periodStart).getTime() - new Date(prior.periodStart).getTime()) <= 100 * 86400000 &&
    (new Date(latest.periodStart).getTime() - new Date(prior.periodStart).getTime()) >= 80 * 86400000;
  return consecutiveQuarters ? '3-month' : `vs ${periodLabel(prior)}`;
}

/**
 * Rank suburbs by a change column. Nulls sort last regardless of direction.
 * Stable for ties (Array#sort is stable per spec).
 * @param {Array<Record<string, any>>} rows
 * @param {string} column e.g. 'change3m' | 'change12m' | 'change5y'
 * @param {'asc'|'desc'} [direction]
 * @returns {Array<Record<string, any>>}
 */
function rankByChange(rows, column, direction = 'desc') {
  const withIndex = rows.map((row, index) => ({ row, index }));
  withIndex.sort((a, b) => {
    const av = a.row[column] && typeof a.row[column].value === 'number' ? a.row[column].value : null;
    const bv = b.row[column] && typeof b.row[column].value === 'number' ? b.row[column].value : null;
    if (av === null && bv === null) return a.index - b.index; // stable
    if (av === null) return 1; // nulls last regardless of direction
    if (bv === null) return -1;
    if (av === bv) return a.index - b.index; // stable
    return direction === 'asc' ? av - bv : bv - av;
  });
  return withIndex.map((w) => w.row);
}

module.exports = { reasonText, formatChange, periodLabel, shortTermLabel, rankByChange };
