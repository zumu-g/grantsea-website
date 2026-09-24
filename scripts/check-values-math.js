// Self-check for src/lib/valuesMath.js — run with: node scripts/check-values-math.js
const assert = require('node:assert');
const { reasonText, formatChange, periodLabel, shortTermLabel, rankByChange } = require('../src/lib/valuesMath.js');

// formatChange
assert.deepStrictEqual(formatChange(5.14), { text: '+5.1%', cue: 'up' }, 'rounds 5.14 to +5.1% with up cue');
assert.deepStrictEqual(formatChange(-4.1), { text: '-4.1%', cue: 'down' }, 'renders -4.1% with down cue');
assert.deepStrictEqual(formatChange(0), { text: '+0.0%', cue: 'flat' }, 'zero is flat');
assert.deepStrictEqual(formatChange(null, 'thin-sample'), { text: 'not enough sales', cue: null }, 'null -> thin-sample text');
assert.deepStrictEqual(formatChange(null, 'suppressed'), { text: 'not published for this suburb', cue: null }, 'null -> suppressed text');
assert.deepStrictEqual(formatChange(null, 'no-data'), { text: 'no data available', cue: null }, 'null -> no-data text');
assert.deepStrictEqual(formatChange(null, 'low-agreement'), { text: 'figure under review', cue: null }, 'null -> low-agreement text');
assert.strictEqual(reasonText('unknown-reason'), 'figure under review', 'unknown reason falls back, never undefined');

// periodLabel
assert.strictEqual(periodLabel({ type: 'quarter', periodStart: '2025-12-01' }), 'Dec 2025 quarter', 'quarter label');
assert.strictEqual(periodLabel({ type: 'year', periodStart: '2021-01-01' }), '2021', 'year label');
assert.strictEqual(
  periodLabel({ type: 'computed', periodStart: '2026-06-01', periodEnd: '2026-08-30' }),
  '1 June 2026 to 30 Aug 2026',
  'computed period reads day range'
);

// shortTermLabel
const quarterA = { type: 'quarter', periodStart: '2025-12-01' };
const quarterB = { type: 'quarter', periodStart: '2025-09-01' }; // 91 days earlier, consecutive
const quarterFar = { type: 'quarter', periodStart: '2024-12-01' }; // not consecutive
assert.strictEqual(shortTermLabel(quarterA, quarterB), '3-month', 'consecutive quarters -> literal 3-month label');
assert.strictEqual(shortTermLabel(quarterA, quarterFar), 'vs Dec 2024 quarter', 'non-consecutive -> vs {prior period}');
assert.strictEqual(shortTermLabel(quarterA, null), 'vs prior period', 'no prior period -> generic fallback');

// rankByChange: nulls last regardless of direction
const rows = [
  { name: 'A', change12m: { value: 3 } },
  { name: 'B', change12m: { value: null, reason: 'thin-sample' } },
  { name: 'C', change12m: { value: -1 } },
  { name: 'D', change12m: { value: null, reason: 'no-data' } },
  { name: 'E', change12m: { value: 5 } },
];
const desc = rankByChange(rows, 'change12m', 'desc').map((r) => r.name);
assert.deepStrictEqual(desc, ['E', 'A', 'C', 'B', 'D'], 'desc: highest first, nulls last, ties stable');
const asc = rankByChange(rows, 'change12m', 'asc').map((r) => r.name);
assert.deepStrictEqual(asc, ['C', 'A', 'E', 'B', 'D'], 'asc: lowest first, nulls STILL last');

// Sort by 3-month then 5-year is stable for ties
const tieRows = [
  { name: 'X', change3m: { value: 2 }, change5y: { value: 10 } },
  { name: 'Y', change3m: { value: 2 }, change5y: { value: 20 } },
  { name: 'Z', change3m: { value: 2 }, change5y: { value: 5 } },
];
const by3m = rankByChange(tieRows, 'change3m', 'desc').map((r) => r.name);
assert.deepStrictEqual(by3m, ['X', 'Y', 'Z'], '3-month ties keep original order (stable)');
const by5y = rankByChange(tieRows, 'change5y', 'desc').map((r) => r.name);
assert.deepStrictEqual(by5y, ['Y', 'X', 'Z'], '5-year sort re-orders correctly');

console.log('check-values-math: all assertions passed');

// --- valuesGuide.ts fetch behaviour (env-gated / throw-on-failure) ---
// This module is TypeScript compiled at build time; the fetch-shape contract
// is verified structurally here without invoking the network, and fully by
// npm run typecheck plus the real integration check in U4 against the live
// endpoint.
const fs = require('node:fs');
const src = fs.readFileSync(require('path').join(__dirname, '../src/lib/valuesGuide.ts'), 'utf8');
assert.ok(src.includes('if (!API_URL || !API_TOKEN) return null;'), 'missing env returns null before any network call');
assert.ok(src.includes("throw new Error(`suburb-values ${res.status}`)"), 'non-OK response throws');
assert.ok(src.includes('unexpected schemaVersion'), 'unexpected schemaVersion throws');
console.log('check-values-math: valuesGuide.ts fetch-contract checks passed');
