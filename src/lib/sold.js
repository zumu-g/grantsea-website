// Allow-list mapper for VaultRE sold records (U1). Plain CommonJS + JSDoc so
// scripts/check-sold.js can require() the real implementation without a TS
// runner, mirroring src/lib/stats.js's convention.
//
// toSoldResult NEVER spreads a raw VaultRE record — it builds the client
// shape field by field. A sold record carries commission, VPA, fee,
// internal-remark and contact fields that must never reach the browser;
// listing them here (rather than trying to blocklist everything) is the
// control, not a component-layer patch.

const { avgDaysOnMarketForPair } = require('./stats');

/** Fields a sold record must never expose to the client, even indirectly. */
const SOLD_FORBIDDEN_KEYS = [
  'grossCommissionExcGST',
  'grossCommissionLessDeductionsExcGST',
  'netIncomeIntoOfficeExcGST',
  'netIncomeLessOfficeDeductionsExcGST',
  'vpa',
  'sellingFeePercent',
  'sellingFeeFixed',
  'internalRemarks',
  'email',
  'phone',
  'phoneNumbers',
  'username',
  'permissions',
  'ssoIdentifier',
];

/**
 * True only when the record's unconditional date falls within the last
 * `months` months. A missing/unparseable date is dropped, never treated as
 * "in window" — the sold pool must never invent a date to keep a record.
 * @param {{unconditional?: string}} record
 * @param {number} months
 * @param {Date} [now]
 */
function withinMonths(record, months, now = new Date()) {
  if (!record || !record.unconditional) return false;
  const d = new Date(record.unconditional);
  if (isNaN(d.getTime())) return false;
  const cutoff = new Date(now);
  cutoff.setMonth(cutoff.getMonth() - months);
  return d >= cutoff;
}

/**
 * Maps a raw VaultRE sold record to the allow-listed client shape. Fails
 * closed on price and address: only an explicit `true`/`fullAddress` value
 * publishes. Never spreads the input.
 * @param {any} record
 * @returns {{
 *   id: string, suburb: string, slug: string, address: string,
 *   price: number | null, soldDate: string | null, method: string | null,
 *   daysOnMarket: number | null, agentName: string | null,
 *   heroPhotoUrl: string | null,
 * }}
 */
function toSoldResult(record) {
  const suburbName = (record.address && record.address.suburb && record.address.suburb.name) || '';
  const showSalePrice = ((record.saleDetails && record.saleDetails.showSalePrice) ?? record.showSalePrice) === true;
  const addressVisibility = record.addressVisibility;
  const salePrice = typeof record.salePrice === 'number' ? record.salePrice
    : (record.saleDetails && typeof record.saleDetails.salePrice === 'number' ? record.saleDetails.salePrice : null);
  const displayAddress = typeof record.displayAddress === 'string'
    ? record.displayAddress.replace(/\s+VIC(\s+\d{4})?$/i, '')
    : null;

  const agent = record.contactStaff && record.contactStaff[0];
  const heroPhoto = record.photos && record.photos[0];
  const method = (record.methodOfSale && record.methodOfSale.name) || null;

  return {
    id: String(record.id ?? record.saleLifeId ?? ''),
    suburb: suburbName,
    slug: suburbName.trim().toLowerCase().replace(/\s+/g, '-'),
    address: addressVisibility === 'fullAddress' && displayAddress ? displayAddress : suburbName,
    price: showSalePrice ? salePrice : null,
    soldDate: record.unconditional || null,
    method,
    daysOnMarket: avgDaysOnMarketForPair(record.internalMarketingLiveDate, record.unconditional),
    agentName: agent ? `${agent.firstName || ''} ${agent.lastName || ''}`.trim() || null : null,
    heroPhotoUrl: (heroPhoto && (heroPhoto.url || heroPhoto.original || heroPhoto.large)) || null,
  };
}

module.exports = { toSoldResult, withinMonths, SOLD_FORBIDDEN_KEYS };
