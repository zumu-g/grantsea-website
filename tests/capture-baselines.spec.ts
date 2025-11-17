import { test, expect } from '@playwright/test';

/**
 * Capture baseline screenshots for visual regression testing
 * This captures full-page screenshots at canonical viewport sizes
 */

const BASELINE_URL = 'https://on.com'; // The live site to capture
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900, deviceScaleFactor: 2 },
  { name: '1280', width: 1280, height: 800, deviceScaleFactor: 2 },
  { name: '1024', width: 1024, height: 900, deviceScaleFactor: 2 },
  { name: '768',  width: 768,  height: 1024, deviceScaleFactor: 2 },
  { name: '375',  width: 375,  height: 812, deviceScaleFactor: 2 },
];

test.describe('Capture baseline screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure consistent rendering
    await page.addStyleTag({
      content: `
        * {
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `
    });
  });

  for (const viewport of VIEWPORTS) {
    test(`Capture baseline at ${viewport.name}px`, async ({ page, browserName }) => {
      // Set viewport with consistent DPR
      await page.setViewportSize({ 
        width: viewport.width, 
        height: viewport.height 
      });

      // Navigate to the baseline site
      await page.goto(BASELINE_URL, {
        waitUntil: 'networkidle',
        timeout: 60000
      });

      // Wait for fonts to load
      await page.evaluate(() => {
        return document.fonts.ready;
      });

      // Additional wait for any lazy-loaded content
      await page.waitForTimeout(2000);

      // Capture full page screenshot
      await page.screenshot({
        path: `tests/baselines/on-com-${viewport.name}-${browserName}.png`,
        fullPage: true,
        animations: 'disabled'
      });

      console.log(`✓ Captured baseline for ${viewport.name}px in ${browserName}`);
    });
  }

  test('Extract computed styles from key elements', async ({ page }) => {
    await page.goto(BASELINE_URL, {
      waitUntil: 'networkidle'
    });

    // Extract key metrics from the live site
    const metrics = await page.evaluate(() => {
      const getComputedMetrics = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        
        const computed = window.getComputedStyle(el);
        return {
          // Typography
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          
          // Spacing
          marginTop: computed.marginTop,
          marginRight: computed.marginRight,
          marginBottom: computed.marginBottom,
          marginLeft: computed.marginLeft,
          paddingTop: computed.paddingTop,
          paddingRight: computed.paddingRight,
          paddingBottom: computed.paddingBottom,
          paddingLeft: computed.paddingLeft,
          
          // Layout
          display: computed.display,
          position: computed.position,
          width: computed.width,
          height: computed.height,
          maxWidth: computed.maxWidth,
          
          // Colors
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          
          // Borders
          borderRadius: computed.borderRadius,
          borderWidth: computed.borderWidth,
          borderColor: computed.borderColor,
          
          // Shadows
          boxShadow: computed.boxShadow,
          textShadow: computed.textShadow
        };
      };

      // Capture metrics for key elements
      return {
        body: getComputedMetrics('body'),
        header: getComputedMetrics('header'),
        nav: getComputedMetrics('nav'),
        h1: getComputedMetrics('h1'),
        h2: getComputedMetrics('h2'),
        button: getComputedMetrics('button'),
        link: getComputedMetrics('a'),
        container: getComputedMetrics('.container, .wrapper, [class*="container"]'),
        hero: getComputedMetrics('[class*="hero"], .hero, section:first-of-type')
      };
    });

    // Save metrics to file
    await page.context().addInitScript(() => {
      console.log('Computed metrics:', metrics);
    });

    const fs = require('fs').promises;
    await fs.writeFile(
      'tests/baselines/on-com-metrics.json',
      JSON.stringify(metrics, null, 2)
    );
  });
});