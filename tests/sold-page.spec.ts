import { test, expect } from '@playwright/test';

// Smoke coverage for U2/U3: the /sold surface exists, is filterable, is
// linked from navigation, and never shows a withheld price. Live-data
// assertions are skipped (not failed) when the CRM env isn't configured for
// this run, matching the repo's existing live-data test convention.
const hasCrmEnv = !!(process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY);

test.describe('/sold', () => {
  test('renders the recent sales page', async ({ page }) => {
    const response = await page.goto('/sold');
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator('h1')).toContainText('Recent Sales');
  });

  test.skip(!hasCrmEnv, 'requires CRM env — live data assertion');
  test('shows only Berwick addresses on /sold/berwick', async ({ page }) => {
    await page.goto('/sold/berwick');
    const addresses = await page.locator('main li').allTextContents();
    for (const text of addresses) {
      expect(text.toLowerCase()).not.toMatch(/narre warren|cranbourne|pakenham|officer/);
    }
  });

  test('an unknown suburb slug redirects to /sold', async ({ page }) => {
    await page.goto('/sold/not-a-suburb');
    await expect(page).toHaveURL(/\/sold$/);
  });

  test.skip(!hasCrmEnv, 'requires CRM env — live data assertion');
  test('the sampled withheld-price sale shows no price', async ({ page }) => {
    await page.goto('/sold/berwick');
    const body = await page.locator('main').innerText();
    if (body.includes('Mitre Crescent')) {
      const line = body.split('\n').find((l) => l.includes('Mitre Crescent'));
      expect(line).not.toMatch(/\$\d{3},\d{3}/);
    }
  });

  test('page has a breadcrumb JSON-LD block', async ({ page }) => {
    await page.goto('/sold');
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached();
  });
});

test.describe('/sold navigation', () => {
  test('Sell dropdown links to Recent Sales', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sell', exact: true }).first().hover();
    const recentSales = page.getByRole('link', { name: 'Recent Sales' }).first();
    await expect(recentSales).toBeVisible();
    await recentSales.click();
    await expect(page).toHaveURL(/\/sold$/);
  });

  test('no link on the homepage points at /search?type=sold', async ({ page }) => {
    await page.goto('/');
    const staleLinks = await page.locator('a[href*="/search?type=sold"]').count();
    expect(staleLinks).toBe(0);
  });
});
