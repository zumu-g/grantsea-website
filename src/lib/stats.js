// Pure stats helpers shared by serverProperties.ts and scripts/check-stats.js.
// Plain JS (JSDoc types) so the self-check can require() the real implementation
// without a TS runner.

/**
 * Median of a numeric array. Returns null for an empty array.
 * Even-length arrays return the rounded mean of the two middle values.
 * @param {number[]} numbers
 * @returns {number | null}
 */
function medianOf(numbers) {
  if (!numbers.length) return null;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

/**
 * Average days-on-market for sold records, rounded. Excludes records without
 * internalMarketingLiveDate and any DOM outside (0, 365). Returns null when
 * fewer than minSample valid records remain.
 * @param {Array<{unconditional?: string, internalMarketingLiveDate?: string}>} sales
 * @param {number} minSample
 * @returns {number | null}
 */
function avgDaysOnMarket(sales, minSample) {
  const doms = sales
    .map((p) => p.internalMarketingLiveDate
      ? (new Date(p.unconditional).getTime() - new Date(p.internalMarketingLiveDate).getTime()) / 86400000
      : null)
    .filter((d) => d !== null && d > 0 && d < 365);
  return doms.length >= minSample
    ? Math.round(doms.reduce((a, b) => a + b, 0) / doms.length)
    : null;
}

/**
 * Exact-match filter on the normalised VaultRE suburb name.
 * @param {Array<{address?: {suburb?: {name?: string}}}>} items
 * @param {string} suburb
 */
function filterByExactSuburb(items, suburb) {
  const s = suburb.trim().toLowerCase();
  return items.filter((p) => ((p.address && p.address.suburb && p.address.suburb.name) || '').trim().toLowerCase() === s);
}

module.exports = { medianOf, avgDaysOnMarket, filterByExactSuburb };
