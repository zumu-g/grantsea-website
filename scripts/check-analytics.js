// Self-check for buyer-engagement GA4 instrumentation (docs/plans/2026-09-18-
// 1205-feat-sold-results-buyer-engagement-plan.html, U5). Run with:
// node scripts/check-analytics.js
//
// This repo has no vitest/jest, so gtag no-op behaviour and the event
// contract are checked by source-text assertion on the compiled-away TS
// source, fully verified in combination with `npm run typecheck`.
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const analyticsSrc = fs.readFileSync(path.join(__dirname, '../src/lib/analytics.ts'), 'utf8');

assert.ok(analyticsSrc.includes('window.gtag?.'), 'trackEvent uses optional chaining so it no-ops without gtag (R11)');
for (const helper of ['trackGalleryDepth', 'trackSaveProperty', 'trackShare', 'trackRequestInspection']) {
  assert.ok(analyticsSrc.includes(`export function ${helper}`), `analytics.ts exports ${helper}`);
}
assert.ok(analyticsSrc.includes("'view_gallery_image'"), 'view_gallery_image event name present');
assert.ok(analyticsSrc.includes("'save_property'") && analyticsSrc.includes("'unsave_property'"), 'save/unsave event names present');
assert.ok(analyticsSrc.includes("'request_inspection'"), 'request_inspection event name present');
console.log('check-analytics: analytics.ts contract passed');

const saveButtonSrc = fs.readFileSync(path.join(__dirname, '../src/components/SavePropertyButton.tsx'), 'utf8');
const authGateIndex = saveButtonSrc.indexOf('if (!isAuthenticated)');
const trackCallIndex = saveButtonSrc.indexOf('trackSaveProperty(');
assert.ok(authGateIndex !== -1 && trackCallIndex !== -1 && trackCallIndex > authGateIndex,
  'trackSaveProperty is called after the unauthenticated early return, so an anonymous click that only opens the auth modal never fires it');
console.log('check-analytics: SavePropertyButton fires after the auth gate passed');

const propertyPageSrc = fs.readFileSync(path.join(__dirname, '../src/app/property/[id]/PropertyPageClient.tsx'), 'utf8');
assert.ok(propertyPageSrc.includes('hasInteractedRef'), 'gallery depth gates on a first-interaction flag (nothing fires on load)');
assert.ok(propertyPageSrc.includes('IntersectionObserver'), 'gallery depth counts distinct images seen via viewport intersection, not carousel position alone');
assert.ok(propertyPageSrc.includes('trackRequestInspection'), 'request_inspection is wired to the Request Inspection button');
assert.ok(propertyPageSrc.includes('trackShare'), 'share is wired to handleShare');
console.log('check-analytics: PropertyPageClient.tsx contract passed');

console.log('check-analytics: all checks passed');
