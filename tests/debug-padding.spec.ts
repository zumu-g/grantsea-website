import { test, expect } from '@playwright/test';

/**
 * Debug left padding issues by comparing with on.com
 */

test.describe('Debug Padding Issues', () => {
  test('Compare left padding across viewports', async ({ page }) => {
    const viewports = [1440, 1280, 1024, 768, 375];
    const results: any = {};

    // First, analyze on.com
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('https://on.com', { waitUntil: 'networkidle' });
      
      const onMetrics = await page.evaluate(() => {
        const getMetrics = (selector: string) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          
          const rect = el.getBoundingClientRect();
          const computed = window.getComputedStyle(el);
          
          return {
            // Position
            left: rect.left,
            width: rect.width,
            
            // Computed styles
            paddingLeft: computed.paddingLeft,
            paddingRight: computed.paddingRight,
            marginLeft: computed.marginLeft,
            marginRight: computed.marginRight,
            maxWidth: computed.maxWidth,
            
            // Box model
            offsetLeft: (el as HTMLElement).offsetLeft,
            clientWidth: (el as HTMLElement).clientWidth,
          };
        };

        return {
          body: getMetrics('body'),
          header: getMetrics('header'),
          nav: getMetrics('nav'),
          mainContent: getMetrics('main, [role="main"]'),
          container: getMetrics('.container, [class*="container"]'),
          firstSection: getMetrics('section:first-of-type'),
          wrapper: getMetrics('[class*="wrapper"]'),
        };
      });

      results[`on-${width}`] = onMetrics;
    }

    // Then analyze your site
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      
      const yourMetrics = await page.evaluate(() => {
        const getMetrics = (selector: string) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          
          const rect = el.getBoundingClientRect();
          const computed = window.getComputedStyle(el);
          
          return {
            // Position
            left: rect.left,
            width: rect.width,
            
            // Computed styles
            paddingLeft: computed.paddingLeft,
            paddingRight: computed.paddingRight,
            marginLeft: computed.marginLeft,
            marginRight: computed.marginRight,
            maxWidth: computed.maxWidth,
            
            // Box model
            offsetLeft: (el as HTMLElement).offsetLeft,
            clientWidth: (el as HTMLElement).clientWidth,
          };
        };

        return {
          body: getMetrics('body'),
          header: getMetrics('header'),
          nav: getMetrics('nav'),
          mainContent: getMetrics('main, [role="main"]'),
          container: getMetrics('.container, [class*="container"]'),
          firstSection: getMetrics('section:first-of-type'),
          wrapper: getMetrics('[class*="wrapper"]'),
          // Also check Anima-specific classes
          elementLight: getMetrics('.element-light'),
          divWrapper: getMetrics('.div-wrapper-3'),
        };
      });

      results[`yours-${width}`] = yourMetrics;
    }

    // Generate comparison report
    const report = {
      timestamp: new Date().toISOString(),
      viewports: {},
    };

    for (const width of viewports) {
      const onData = results[`on-${width}`];
      const yourData = results[`yours-${width}`];
      
      report.viewports[width] = {
        differences: {},
      };

      // Compare each element
      for (const element of Object.keys(onData)) {
        if (!onData[element] || !yourData[element]) continue;
        
        const diff: any = {};
        
        // Check left padding specifically
        if (onData[element].paddingLeft !== yourData[element].paddingLeft) {
          diff.paddingLeft = {
            on: onData[element].paddingLeft,
            yours: yourData[element].paddingLeft,
          };
        }
        
        // Check left position
        if (Math.abs(onData[element].left - yourData[element].left) > 1) {
          diff.leftPosition = {
            on: onData[element].left,
            yours: yourData[element].left,
            difference: yourData[element].left - onData[element].left,
          };
        }
        
        if (Object.keys(diff).length > 0) {
          report.viewports[width].differences[element] = diff;
        }
      }
    }

    // Save detailed report
    await page.context().addInitScript(() => {
      console.log('Padding comparison report:', report);
    });

    const fs = require('fs').promises;
    await fs.writeFile(
      'tests/padding-debug-report.json',
      JSON.stringify(report, null, 2)
    );

    console.log('Padding debug report saved to tests/padding-debug-report.json');
  });

  test('Visual highlight padding differences', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Inject visual debugging CSS
    await page.addStyleTag({
      content: `
        /* Highlight all padded elements */
        *[class] {
          position: relative;
        }
        
        *[class]::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--padding-left, 0);
          background: rgba(255, 0, 0, 0.3);
          pointer-events: none;
          z-index: 9999;
        }
        
        /* Show padding values */
        *[class]::after {
          content: attr(data-padding-info);
          position: absolute;
          top: 0;
          left: 0;
          background: red;
          color: white;
          font-size: 10px;
          padding: 2px 4px;
          pointer-events: none;
          z-index: 10000;
        }
      `
    });

    // Add padding info to elements
    await page.evaluate(() => {
      document.querySelectorAll('*[class]').forEach((el) => {
        const computed = window.getComputedStyle(el);
        const paddingLeft = computed.paddingLeft;
        
        if (paddingLeft && paddingLeft !== '0px') {
          (el as HTMLElement).style.setProperty('--padding-left', paddingLeft);
          el.setAttribute('data-padding-info', `PL: ${paddingLeft}`);
        }
      });
    });

    // Take screenshot with padding highlighted
    await page.screenshot({
      path: 'tests/padding-debug-visual.png',
      fullPage: true,
    });

    console.log('Visual padding debug saved to tests/padding-debug-visual.png');
  });
});