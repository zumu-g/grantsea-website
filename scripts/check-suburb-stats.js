// Self-check for the suburb stock/rent/yield feature (docs/plans/2026-09-09-
// 1253-feat-suburb-stock-rent-yield-guide-plan.html, U4-U6). Run with:
// node scripts/check-suburb-stats.js
//
// Mirrors scripts/check-values-math.js's convention: this repo has no
// vitest/jest component-test runner, so pure logic is checked directly and a
// TS/TSX file's structural contract is checked by source-text assertion,
// fully verified in combination with `npm run typecheck` and `npm run build`.
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// --- suburbStats.ts fetch behaviour (env-gated / throw-on-failure, U4) ---
const suburbStatsSrc = fs.readFileSync(path.join(__dirname, '../src/lib/suburbStats.ts'), 'utf8');
assert.ok(suburbStatsSrc.includes('if (!API_URL || !API_TOKEN) return null;'), 'missing env returns null before any network call');
assert.ok(suburbStatsSrc.includes("throw new Error(`suburb-stats ${res.status}`)"), 'non-OK response throws');
assert.ok(suburbStatsSrc.includes('unexpected schemaVersion'), 'unexpected schemaVersion throws');
console.log('check-suburb-stats: suburbStats.ts fetch-contract checks passed');

// --- StockRentYieldCard empty-state / collapse logic (U5, U6) ---
const clientSrc = fs.readFileSync(path.join(__dirname, '../src/app/property-values/ValuesGuideClient.tsx'), 'utf8');

// R5: domain-correct "not enough listings" wording, distinct from the
// sale-values page's "not enough sales" (both must exist as separate strings,
// or a future edit could accidentally re-merge the two domains' empty text).
assert.ok(clientSrc.includes("'thin-sample': 'not enough listings'"), 'stock/rental thin-sample text is domain-correct ("listings", not "sales")');
assert.ok(clientSrc.includes("'thin-sample': 'not enough sales'") === false, 'ValuesGuideClient.tsx does not itself define the sale-values wording (imported from valuesMath.js instead)');

// KTD1's own condition: a card with no usable data in either domain collapses
// to one muted line rather than four stacked empty cells.
assert.ok(clientSrc.includes('stats.stock.reason != null && stats.rental.reason != null'), 'card collapses only when BOTH stock and rental are empty, not just one');
assert.ok(clientSrc.includes('Live stock and rental figures:'), 'the collapsed single-line state text is present');

console.log('check-suburb-stats: ValuesGuideClient.tsx stock/rent/yield card checks passed');
