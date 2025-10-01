import { test, expect } from '@playwright/test';

test.describe('Property Page Feature Verification', () => {
  const PROPERTY_URL = 'https://grantsea-website.vercel.app/property/31765985';

  test('Full property page feature check', async ({ page }) => {
    console.log('='.repeat(80));
    console.log('PROPERTY PAGE FEATURE VERIFICATION REPORT');
    console.log('URL:', PROPERTY_URL);
    console.log('='.repeat(80));

    // Navigate to the property page
    const response = await page.goto(PROPERTY_URL, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Check overall page status
    console.log('\n1. OVERALL PAGE STATUS');
    console.log('-'.repeat(80));
    if (response && response.ok()) {
      console.log('✅ Page loaded successfully (Status: ' + response.status() + ')');
    } else {
      console.log('❌ Page failed to load (Status: ' + (response?.status() || 'unknown') + ')');
    }

    // Wait for page to fully render
    await page.waitForTimeout(2000);

    // Check for any console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Check for React errors or error boundaries
    const errorMessages = await page.locator('text=/error|failed|not found/i').count();
    if (errorMessages > 0) {
      console.log('⚠️  Found error messages on page');
    }

    // 2. Floor Plans Section
    console.log('\n2. FLOOR PLANS SECTION');
    console.log('-'.repeat(80));
    const floorPlansButton = page.locator('button:has-text("Floor Plans"), button:has-text("View Floor Plans"), a:has-text("Floor Plans")');
    const floorPlansText = page.getByText(/floor plans/i).first();

    const floorPlansCount = await floorPlansButton.count() + await floorPlansText.count();
    if (floorPlansCount > 0) {
      console.log('✅ Floor Plans section/button found');
      try {
        const floorPlanText = await floorPlansButton.first().textContent({ timeout: 2000 });
        console.log('   Text:', floorPlanText?.trim());
      } catch (e) {
        console.log('   (Could not extract text)');
      }
    } else {
      console.log('❌ Floor Plans section NOT found');
    }

    // 3. Documents Section
    console.log('\n3. DOCUMENTS SECTION');
    console.log('-'.repeat(80));
    const documentsText = page.getByText(/statement of information|brochure|documents/i).first();
    const downloadLinks = page.locator('a[download], a:has-text("Download"), button:has-text("Download")');

    const docsCount = await documentsText.count() + await downloadLinks.count();
    if (docsCount > 0) {
      console.log('✅ Documents section found');
      const downloadCount = await downloadLinks.count();
      console.log('   Download links found:', downloadCount);
    } else {
      console.log('❌ Documents section NOT found');
    }

    // 4. Property Details Card
    console.log('\n4. PROPERTY DETAILS CARD');
    console.log('-'.repeat(80));

    // Look for common property detail fields
    const detailFields = [
      'Property Type',
      'Bedrooms',
      'Bathrooms',
      'Car Spaces',
      'Land Size',
      'Building Size',
      'Sale Method',
      'Listing Type'
    ];

    let foundFields = 0;
    for (const field of detailFields) {
      const fieldExists = await page.locator(`text=${field}`).count() > 0;
      if (fieldExists) {
        foundFields++;
        console.log(`✅ ${field}: Found`);
      } else {
        console.log(`❌ ${field}: NOT found`);
      }
    }

    if (foundFields >= 5) {
      console.log(`\n✅ Property Details Card is comprehensive (${foundFields}/${detailFields.length} fields found)`);
    } else {
      console.log(`\n⚠️  Property Details Card may be incomplete (${foundFields}/${detailFields.length} fields found)`);
    }

    // 5. Features Section
    console.log('\n5. FEATURES SECTION');
    console.log('-'.repeat(80));
    const featuresHeading = page.getByText(/features|highlights|amenities/i).first();
    const featuresList = page.locator('ul li').filter({ hasText: /bedroom|bathroom|kitchen|living|garage|heating|cooling|outdoor/i });

    const featuresCount = await featuresHeading.count();
    const featureItems = await featuresList.count();

    if (featuresCount > 0 || featureItems > 3) {
      console.log('✅ Features section found');
      console.log('   Feature items:', featureItems);

      // Try to extract some feature text
      try {
        const firstFeature = await featuresList.first().textContent({ timeout: 2000 });
        if (firstFeature) {
          console.log('   Sample feature:', firstFeature.trim().substring(0, 50) + '...');
        }
      } catch (e) {
        console.log('   (Could not extract feature text)');
      }
    } else {
      console.log('❌ Features section NOT found');
    }

    // 6. Mobile Responsive Layout
    console.log('\n6. MOBILE RESPONSIVE LAYOUT');
    console.log('-'.repeat(80));

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    // Check if content is still visible and not overflowing
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;

    if (bodyWidth <= viewportWidth + 20) { // Allow small margin for scrollbars
      console.log('✅ Mobile layout: Content fits viewport (no horizontal scroll)');
      console.log('   Body width:', bodyWidth + 'px');
    } else {
      console.log('⚠️  Mobile layout: Content may overflow viewport');
      console.log('   Body width:', bodyWidth + 'px, Viewport:', viewportWidth + 'px');
    }

    // Check for responsive grid by looking for common layout patterns
    const bodyHtml = await page.locator('body').innerHTML();
    const hasGrid = bodyHtml.includes('grid') || bodyHtml.includes('flex');
    console.log('   Responsive layout detected:', hasGrid ? 'Yes' : 'No');

    // Reset to desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // 7. Additional Checks
    console.log('\n7. ADDITIONAL CHECKS');
    console.log('-'.repeat(80));

    // Check for images
    const images = page.locator('img');
    const imageCount = await images.count();
    console.log('Images found:', imageCount);

    // Check for property title/address
    const headings = page.locator('h1, h2');
    const headingCount = await headings.count();
    if (headingCount > 0) {
      const firstHeading = await headings.first().textContent();
      console.log('✅ Property title found:', firstHeading?.trim().substring(0, 50));
    } else {
      console.log('⚠️  No headings found');
    }

    // Check for price
    const priceText = await page.locator('text=/\\$[0-9,]+|contact agent|price guide/i').first().textContent().catch(() => null);
    if (priceText) {
      console.log('✅ Price information found:', priceText.trim());
    } else {
      console.log('⚠️  Price information not clearly visible');
    }

    // 8. Console Errors Summary
    console.log('\n8. CONSOLE ERRORS');
    console.log('-'.repeat(80));
    if (errors.length === 0) {
      console.log('✅ No console errors detected');
    } else {
      console.log('⚠️  Console errors found:', errors.length);
      errors.slice(0, 3).forEach(err => {
        console.log('   -', err.substring(0, 100));
      });
    }

    // Final Summary
    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));

    const totalChecks = 6;
    let passedChecks = 0;

    if (response?.ok()) passedChecks++;
    if (floorPlansCount > 0) passedChecks++;
    if (docsCount > 0) passedChecks++;
    if (foundFields >= 5) passedChecks++;
    if (featuresCount > 0 || featureItems > 3) passedChecks++;
    if (bodyWidth <= viewportWidth + 20) passedChecks++;

    console.log(`Passed: ${passedChecks}/${totalChecks} checks`);
    console.log('='.repeat(80));
  });
});
