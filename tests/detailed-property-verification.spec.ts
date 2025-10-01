import { test, expect } from '@playwright/test';

test.describe('Detailed Property Page Verification', () => {
  const PROPERTY_URL = 'https://grantsea-website.vercel.app/property/31765985';

  test('Comprehensive feature inspection', async ({ page }) => {
    console.log('='.repeat(100));
    console.log('DETAILED PROPERTY PAGE FEATURE VERIFICATION');
    console.log('='.repeat(100));

    // Navigate to the property page
    await page.goto(PROPERTY_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Take screenshots at different viewports
    console.log('\n📸 Capturing screenshots...');
    await page.screenshot({ path: 'test-results/property-desktop.png', fullPage: true });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/property-mobile.png', fullPage: true });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(1000);

    // Extract all text content for analysis
    console.log('\n📄 Extracting page content...\n');
    const bodyText = await page.locator('body').textContent();

    // Check for specific features in the text
    console.log('FEATURE DETECTION IN PAGE CONTENT:');
    console.log('-'.repeat(100));

    const features = {
      'Floor Plans': /floor\s*plans?/i.test(bodyText || ''),
      'Statement of Information': /statement\s*of\s*information|SOI/i.test(bodyText || ''),
      'Brochure/Documents': /brochure|documents?|download/i.test(bodyText || ''),
      'Property Type': /property\s*type|house|unit|townhouse/i.test(bodyText || ''),
      'Bedrooms': /bedroom|bed/i.test(bodyText || ''),
      'Bathrooms': /bathroom|bath/i.test(bodyText || ''),
      'Car Spaces': /car\s*space|garage|parking/i.test(bodyText || ''),
      'Land Size': /land\s*size|land\s*area|sqm|m²/i.test(bodyText || ''),
      'Building Size': /building\s*size|building\s*area|internal/i.test(bodyText || ''),
      'Features List': /feature|amenity|include/i.test(bodyText || ''),
      'Virtual Tour': /virtual\s*tour|360|3d\s*tour/i.test(bodyText || ''),
      'Map': /map|location/i.test(bodyText || ''),
      'Price': /\$[\d,]+/i.test(bodyText || ''),
      'Contact Agent': /contact|enquir|inspect/i.test(bodyText || ''),
    };

    for (const [feature, found] of Object.entries(features)) {
      console.log(`${found ? '✅' : '❌'} ${feature.padEnd(30)} ${found ? 'FOUND' : 'NOT FOUND'}`);
    }

    // Check for specific UI elements
    console.log('\n' + '='.repeat(100));
    console.log('UI ELEMENT DETECTION:');
    console.log('-'.repeat(100));

    // Check for buttons
    const buttons = await page.locator('button').count();
    console.log(`Buttons found: ${buttons}`);

    if (buttons > 0) {
      const buttonTexts = await page.locator('button').allTextContents();
      console.log('Button labels:', buttonTexts.slice(0, 10).join(', '));
    }

    // Check for links
    const links = await page.locator('a').count();
    console.log(`Links found: ${links}`);

    // Check for images
    const images = await page.locator('img').count();
    console.log(`Images found: ${images}`);

    // Check for headings
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();
    console.log(`Headings: H1=${h1Count}, H2=${h2Count}, H3=${h3Count}`);

    // Check for specific sections by analyzing structure
    console.log('\n' + '='.repeat(100));
    console.log('PAGE STRUCTURE ANALYSIS:');
    console.log('-'.repeat(100));

    // Check for gallery/carousel
    const galleryElements = await page.locator('[class*="gallery"], [class*="carousel"], [class*="slider"], [class*="swiper"]').count();
    console.log(`${galleryElements > 0 ? '✅' : '❌'} Image Gallery/Carousel: ${galleryElements > 0 ? 'Found' : 'Not found'}`);

    // Check for property info cards/sections
    const cardElements = await page.locator('[class*="card"], [class*="info"], [class*="detail"]').count();
    console.log(`${cardElements > 0 ? '✅' : '⚠️ '} Info Cards/Sections: ${cardElements} found`);

    // Check for description text
    const paragraphs = await page.locator('p').count();
    console.log(`${paragraphs > 0 ? '✅' : '❌'} Description Paragraphs: ${paragraphs} found`);

    // Check for lists (features)
    const lists = await page.locator('ul, ol').count();
    console.log(`${lists > 0 ? '✅' : '❌'} Lists (potential features): ${lists} found`);

    // Mobile responsiveness check
    console.log('\n' + '='.repeat(100));
    console.log('MOBILE RESPONSIVENESS:');
    console.log('-'.repeat(100));

    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const hasHorizontalScroll = bodyWidth > 375;
    console.log(`${!hasHorizontalScroll ? '✅' : '❌'} No horizontal scroll: ${!hasHorizontalScroll ? 'Pass' : `Fail (width: ${bodyWidth}px)`}`);

    // Check if navigation is accessible
    const navVisible = await page.locator('nav, header').isVisible();
    console.log(`${navVisible ? '✅' : '❌'} Navigation visible: ${navVisible ? 'Yes' : 'No'}`);

    // Reset viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // Check page load performance
    console.log('\n' + '='.repeat(100));
    console.log('PERFORMANCE METRICS:');
    console.log('-'.repeat(100));

    const performanceTiming = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as any;
      return {
        loadTime: perfData?.loadEventEnd - perfData?.fetchStart,
        domReady: perfData?.domContentLoadedEventEnd - perfData?.fetchStart,
      };
    });

    console.log(`Page Load Time: ${performanceTiming.loadTime ? Math.round(performanceTiming.loadTime) + 'ms' : 'N/A'}`);
    console.log(`DOM Ready: ${performanceTiming.domReady ? Math.round(performanceTiming.domReady) + 'ms' : 'N/A'}`);

    // Final Summary
    console.log('\n' + '='.repeat(100));
    console.log('FINAL SUMMARY:');
    console.log('='.repeat(100));

    const foundFeatures = Object.values(features).filter(Boolean).length;
    const totalFeatures = Object.keys(features).length;
    const percentage = Math.round((foundFeatures / totalFeatures) * 100);

    console.log(`Features detected: ${foundFeatures}/${totalFeatures} (${percentage}%)`);
    console.log(`Overall status: ${percentage >= 70 ? '✅ GOOD' : percentage >= 50 ? '⚠️  PARTIAL' : '❌ POOR'}`);
    console.log(`Screenshots saved to: test-results/`);
    console.log('='.repeat(100));
  });
});
