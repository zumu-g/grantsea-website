// Self-check for the sold-results feature (docs/plans/2026-09-18-1205-feat-
// sold-results-buyer-engagement-plan.html, U1). Run with: node scripts/check-sold.js
//
// Mirrors scripts/check-suburb-stats.js's convention: no vitest/jest in this
// repo, so pure logic is checked directly and structural contracts on
// TS/TSX files are checked by source-text assertion, fully verified in
// combination with `npm run typecheck` and `npm run build`.
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { toSoldResult, withinMonths, SOLD_FORBIDDEN_KEYS } = require('../src/lib/sold');

// --- toSoldResult: fail-closed price and address (R3, KTD2) ---

const baseRecord = {
  id: 5029206,
  saleLifeId: 5831866,
  address: { suburb: { name: 'BERWICK' } },
  displayAddress: '36 Mitre Crescent, Berwick VIC',
  addressVisibility: 'fullAddress',
  salePrice: 690000,
  showSalePrice: false,
  unconditional: '2026-07-10',
  internalMarketingLiveDate: '2026-05-25',
  methodOfSale: { id: 2, name: 'Auction' },
  contactStaff: [{ firstName: 'Stuart', lastName: 'Grant', email: 'stuart@grantsea.com.au' }],
  photos: [{ url: 'https://example.com/photo.jpg' }],
  saleDetails: {
    grossCommissionExcGST: 11626.5,
    vpa: 4000,
    internalRemarks: 'secret',
  },
};

{
  const result = toSoldResult(baseRecord);
  assert.strictEqual(result.price, null, 'showSalePrice:false must map price to null');
  assert.strictEqual(result.soldDate, '2026-07-10', 'soldDate still present when price is withheld');
  assert.strictEqual(result.method, 'Auction', 'method still present when price is withheld');
  assert.strictEqual(result.address, '36 Mitre Crescent, Berwick', 'fullAddress visibility keeps street, drops VIC suffix');
  console.log('check-sold: AE1 (withheld price) passed');
}

{
  const result = toSoldResult({ ...baseRecord, addressVisibility: 'suburbOnly' });
  assert.strictEqual(result.address, 'BERWICK', 'non-fullAddress visibility shows suburb only');
  console.log('check-sold: AE2 (suburb-only address) passed');
}

{
  // eslint-disable-next-line no-unused-vars
  const { showSalePrice, ...noFlag } = baseRecord;
  const result = toSoldResult(noFlag);
  assert.strictEqual(result.price, null, 'missing showSalePrice key fails closed (never defaults to shown)');
  console.log('check-sold: fail-closed on missing showSalePrice passed');
}

{
  const shown = toSoldResult({ ...baseRecord, showSalePrice: true });
  assert.strictEqual(shown.price, 690000, 'showSalePrice:true publishes the price');
  console.log('check-sold: showSalePrice:true publishes price passed');
}

{
  const result = toSoldResult(baseRecord);
  const keys = Object.keys(result);
  for (const forbidden of SOLD_FORBIDDEN_KEYS) {
    assert.ok(!keys.includes(forbidden), `mapped result must never expose ${forbidden}`);
  }
  assert.ok(!JSON.stringify(result).includes('11626.5'), 'commission figure must never appear in the mapped result');
  assert.ok(!JSON.stringify(result).includes('secret'), 'internalRemarks must never appear in the mapped result');
  console.log('check-sold: allow-list mapper excludes forbidden fields passed');
}

{
  const noDates = toSoldResult({ ...baseRecord, internalMarketingLiveDate: undefined });
  assert.strictEqual(noDates.daysOnMarket, null, 'missing internalMarketingLiveDate yields null DOM');
  const staleDom = toSoldResult({ ...baseRecord, internalMarketingLiveDate: '2025-01-01' }); // >365 days before unconditional
  assert.strictEqual(staleDom.daysOnMarket, null, 'DOM outside (0,365) yields null');
  console.log('check-sold: days-on-market bounds passed');
}

// --- withinMonths: skip on missing date, never treat as "in window" ---
{
  assert.strictEqual(withinMonths({ unconditional: undefined }, 12), false, 'no unconditional date is out of window');
  const now = new Date('2026-09-18');
  assert.strictEqual(withinMonths({ unconditional: '2025-10-20' }, 12, now), true, '11 months ago is in window');
  assert.strictEqual(withinMonths({ unconditional: '2025-08-18' }, 12, now), false, '13 months ago is out of window');
  console.log('check-sold: withinMonths bounds passed');
}

// --- serverProperties.ts source contract (KTD1) ---
const serverPropsSrc = fs.readFileSync(path.join(__dirname, '../src/lib/serverProperties.ts'), 'utf8');
const soldFetchMatches = serverPropsSrc.match(/\/properties\/residential\/sale\/sold/g) || [];
assert.strictEqual(soldFetchMatches.length, 1, 'exactly one /properties/residential/sale/sold fetch string (shared pool, KTD1)');
assert.ok(serverPropsSrc.includes("published: 'true'") || serverPropsSrc.includes('published=true'), 'sold fetch carries published=true (excludes never-published sales)');
assert.ok(serverPropsSrc.includes('next: { revalidate: 86400 }'), 'sold fetch pins next.revalidate so the fetch data cache serves last-good on failure (R8)');
assert.ok(!/getSoldResults[\s\S]{0,400}catch[\s\S]{0,80}return \[\]/.test(serverPropsSrc), 'getSoldResults must not swallow errors into an empty array (R8 — throw-through is the contract)');
console.log('check-sold: serverProperties.ts source contract passed');

// --- U4: all 20 suburb pages carry SuburbStats + RecentlySold + revalidate ---
const SUBURB_SLUGS = [
  'beaconsfield', 'beaconsfield-upper', 'berwick', 'bunyip', 'clyde', 'clyde-north',
  'cranbourne', 'cranbourne-north', 'endeavour-hills', 'garfield', 'hallam',
  'hampton-park', 'harkaway', 'koo-wee-rup', 'narre-warren', 'narre-warren-east',
  'narre-warren-south', 'officer', 'pakenham', 'tynong',
];
assert.strictEqual(SUBURB_SLUGS.length, 20, 'test fixture itself must list all 20 suburbs');
for (const slug of SUBURB_SLUGS) {
  const pagePath = path.join(__dirname, `../src/app/suburbs/${slug}/page.tsx`);
  const src = fs.readFileSync(pagePath, 'utf8');
  assert.ok(src.includes("from '@/components/SuburbStats'"), `${slug}/page.tsx imports SuburbStats`);
  assert.ok(src.includes("from '@/components/RecentlySold'"), `${slug}/page.tsx imports RecentlySold`);
  assert.ok(src.includes('export const revalidate'), `${slug}/page.tsx exports revalidate`);
  assert.ok(src.includes('.catch(() => [])'), `${slug}/page.tsx swallows a sold-fetch failure so an outage drops the section, not the guide (R8)`);
}
console.log(`check-sold: all 20 suburb pages carry the U4 structural contract`);

console.log('check-sold: all checks passed');
