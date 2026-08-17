// Self-check for src/lib/stats.js — run with: node scripts/check-stats.js
const assert = require('node:assert');
const { medianOf, avgDaysOnMarket, filterByExactSuburb } = require('../src/lib/stats.js');

// medianOf
assert.strictEqual(medianOf([]), null, 'empty -> null');
assert.strictEqual(medianOf([7]), 7, 'single');
assert.strictEqual(medianOf([3, 1, 2]), 2, 'odd, unsorted');
assert.strictEqual(medianOf([4, 1, 3, 2]), Math.round((2 + 3) / 2), 'even -> rounded mean of middles');
assert.strictEqual(medianOf([100, 200]), 150, 'even, two values');
assert.strictEqual(medianOf([1, 2]), 2, 'rounds 1.5 up');
const input = [3, 1, 2];
medianOf(input);
assert.deepStrictEqual(input, [3, 1, 2], 'does not mutate input');

// avgDaysOnMarket
const day = 86400000;
const sale = (days) => ({
  internalMarketingLiveDate: new Date(0).toISOString(),
  unconditional: new Date(days * day).toISOString(),
});
assert.strictEqual(avgDaysOnMarket([], 5), null, 'empty -> null');
assert.strictEqual(avgDaysOnMarket([sale(10), sale(20)], 5), null, 'below minSample -> null');
assert.strictEqual(avgDaysOnMarket([sale(10), sale(20), sale(30)], 3), 20, 'average of valid DOMs');
assert.strictEqual(
  avgDaysOnMarket([sale(10), sale(20), sale(30), sale(0), sale(-5), sale(400), { unconditional: new Date(day).toISOString() }], 3),
  20,
  'excludes d<=0, d>=365, and missing live date'
);
assert.strictEqual(avgDaysOnMarket([sale(1), sale(2)], 2), 2, 'rounds average');

// filterByExactSuburb
const item = (name) => ({ address: { suburb: { name } } });
const items = [item('Berwick'), item(' berwick '), item('Narre Warren'), item('Berwick South'), {}, { address: {} }];
assert.strictEqual(filterByExactSuburb(items, 'Berwick').length, 2, 'exact match only, trimmed/case-insensitive');
assert.strictEqual(filterByExactSuburb(items, 'berwick south').length, 1, 'sibling suburb matched exactly');
assert.strictEqual(filterByExactSuburb(items, 'warren').length, 0, 'no substring leakage');
assert.strictEqual(filterByExactSuburb([], 'berwick').length, 0, 'empty input');

console.log('check-stats: all assertions passed');
