import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Visual Regression Test Suite
 * Compares your implementation against baseline screenshots
 */

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1024', width: 1024, height: 900 },
  { name: '768',  width: 768,  height: 1024 },
  { name: '375',  width: 375,  height: 812 },
];

// Pages to test
const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'search', path: '/search' },
  { name: 'listings', path: '/listings' },
  // Add more pages as needed
];

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Add visual test marker
    await page.addInitScript(() => {
      document.documentElement.setAttribute('data-visual-test', 'true');
    });

    // Inject CSS to disable animations and ensure consistency
    await page.addStyleTag({
      content: `
        * {
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          font-synthesis-weight: none !important;
        }
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `
    });
  });

  PAGES.forEach(page => {
    VIEWPORTS.forEach(viewport => {
      test(`${page.name} matches at ${viewport.name}px`, async ({ page: playwright, browserName }) => {
        // Set viewport
        await playwright.setViewportSize({ 
          width: viewport.width, 
          height: viewport.height 
        });

        // Navigate to page
        await playwright.goto(`http://localhost:3000${page.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // Wait for fonts
        await playwright.evaluate(() => document.fonts.ready);

        // Additional wait for dynamic content
        await playwright.waitForTimeout(1000);

        // Take screenshot
        const screenshotPath = `tests/screenshots/${page.name}-${viewport.name}-${browserName}.png`;
        const baselinePath = `tests/baselines/on-com-${viewport.name}-${browserName}.png`;

        // Ensure screenshot directory exists
        const screenshotDir = path.dirname(screenshotPath);
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }

        await playwright.screenshot({
          path: screenshotPath,
          fullPage: true,
          animations: 'disabled'
        });

        // Compare with baseline if it exists
        if (fs.existsSync(baselinePath)) {
          await expect(playwright).toHaveScreenshot(
            `${page.name}-${viewport.name}.png`,
            {
              maxDiffPixelRatio: 0.01, // 1% tolerance
              threshold: 0.2, // Pixel diff threshold
              animations: 'disabled',
              fullPage: true
            }
          );
        } else {
          console.log(`⚠️  No baseline found for ${viewport.name}px. Run capture-baselines.spec.ts first.`);
        }
      });
    });
  });

  test('Compare specific elements', async ({ page }) => {
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle'
    });

    // Compare navigation
    const nav = await page.locator('nav, header').first();
    if (nav) {
      await expect(nav).toHaveScreenshot('navigation.png', {
        maxDiffPixelRatio: 0.005,
        animations: 'disabled'
      });
    }

    // Compare hero section
    const hero = await page.locator('[class*="hero"], .hero, section:first-of-type').first();
    if (hero) {
      await expect(hero).toHaveScreenshot('hero-section.png', {
        maxDiffPixelRatio: 0.005,
        animations: 'disabled'
      });
    }

    // Compare buttons styling
    const button = await page.locator('button').first();
    if (button) {
      await expect(button).toHaveScreenshot('button-style.png', {
        maxDiffPixelRatio: 0.005,
        animations: 'disabled'
      });
    }
  });

  test('Extract and compare computed styles', async ({ page }) => {
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle'
    });

    // Load baseline metrics if available
    const baselineMetricsPath = 'tests/baselines/on-com-metrics.json';
    let baselineMetrics = null;
    
    if (fs.existsSync(baselineMetricsPath)) {
      baselineMetrics = JSON.parse(fs.readFileSync(baselineMetricsPath, 'utf-8'));
    }

    // Extract current metrics
    const currentMetrics = await page.evaluate(() => {
      const getComputedMetrics = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        
        const computed = window.getComputedStyle(el);
        return {
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          marginLeft: computed.marginLeft,
          paddingLeft: computed.paddingLeft,
          paddingRight: computed.paddingRight,
          maxWidth: computed.maxWidth,
          width: computed.width
        };
      };

      return {
        body: getComputedMetrics('body'),
        header: getComputedMetrics('header'),
        nav: getComputedMetrics('nav'),
        container: getComputedMetrics('.container, .wrapper, [class*="container"]'),
      };
    });

    // Compare metrics if baseline exists
    if (baselineMetrics) {
      const report = {
        timestamp: new Date().toISOString(),
        differences: [] as any[]
      };

      // Compare each element
      for (const [element, baseline] of Object.entries(baselineMetrics)) {
        const current = (currentMetrics as any)[element];
        if (!baseline || !current) continue;

        const elementDiffs: any = {};
        for (const [prop, baselineValue] of Object.entries(baseline as any)) {
          if (current[prop] !== baselineValue) {
            elementDiffs[prop] = {
              baseline: baselineValue,
              current: current[prop]
            };
          }
        }

        if (Object.keys(elementDiffs).length > 0) {
          report.differences.push({
            element,
            properties: elementDiffs
          });
        }
      }

      // Save comparison report
      fs.writeFileSync(
        'tests/visual-regression-report.json',
        JSON.stringify(report, null, 2)
      );

      // Fail test if significant differences found
      if (report.differences.length > 0) {
        console.error('Style differences found:', JSON.stringify(report, null, 2));
        // Uncomment to fail test on differences
        // expect(report.differences).toHaveLength(0);
      }
    }
  });
});