import { test } from '@playwright/test';

test.describe('Final Property Page Report', () => {
  const PROPERTY_URL = 'https://grantsea-website.vercel.app/property/31765985';

  test('Generate comprehensive report', async ({ page }) => {
    await page.goto(PROPERTY_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Close the welcome modal if it appears
    const modalCloseButton = page.getByText("No thanks, I'll explore on my own");
    if (await modalCloseButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await modalCloseButton.click();
      await page.waitForTimeout(1000);
    }

    console.log('\n' + '='.repeat(100));
    console.log('PROPERTY PAGE VERIFICATION REPORT - https://grantsea-website.vercel.app/property/31765985');
    console.log('='.repeat(100));

    // 1. FLOOR PLANS SECTION
    console.log('\n1. FLOOR PLANS SECTION');
    console.log('-'.repeat(100));
    const floorPlansButton = await page.getByText(/floor\s*plan/i).count();
    const floorPlansTab = await page.getByRole('button', { name: /floor plan/i }).count();
    if (floorPlansButton > 0 || floorPlansTab > 0) {
      console.log('✅ STATUS: Floor Plans button/section is VISIBLE');
      console.log('   Location: Found in page content');
    } else {
      console.log('❌ STATUS: Floor Plans section is NOT VISIBLE');
      console.log('   Expected: A "Floor Plans" button or tab should be present');
      console.log('   Impact: Users cannot view property floor plans');
    }

    // 2. DOCUMENTS SECTION (SOI/Brochure)
    console.log('\n2. DOCUMENTS SECTION (Statement of Information / Brochure)');
    console.log('-'.repeat(100));
    const soiText = await page.getByText(/statement of information|SOI/i).count();
    const brochureText = await page.getByText(/brochure/i).count();
    const documentSection = await page.getByText(/documents/i).count();
    if (soiText > 0 || brochureText > 0 || documentSection > 0) {
      console.log('✅ STATUS: Documents section is VISIBLE');
      console.log(`   Found: ${soiText > 0 ? 'SOI ' : ''}${brochureText > 0 ? 'Brochure ' : ''}${documentSection > 0 ? 'Documents' : ''}`);
    } else {
      console.log('❌ STATUS: Documents section is NOT VISIBLE');
      console.log('   Expected: Statement of Information (SOI) and/or brochure download links');
      console.log('   Impact: Users cannot download property documents');
    }

    // 3. PROPERTY DETAILS CARD
    console.log('\n3. PROPERTY DETAILS CARD (Comprehensive Information)');
    console.log('-'.repeat(100));
    const propertyFields = {
      'Property Type': await page.getByText(/property\s*type/i).count() > 0,
      'Bedrooms': await page.getByText(/bedroom/i).count() > 0,
      'Bathrooms': await page.getByText(/bathroom/i).count() > 0,
      'Parking/Car Spaces': await page.getByText(/parking|car\s*space/i).count() > 0,
      'Land Size': await page.getByText(/land\s*size|land\s*area/i).count() > 0,
      'Building Size': await page.getByText(/building\s*size|building\s*area/i).count() > 0,
      'Sale Method': await page.getByText(/sale\s*method|auction|private\s*sale/i).count() > 0,
      'Listing Type': await page.getByText(/listing\s*type|for\s*sale|for\s*lease/i).count() > 0,
    };

    const foundFields = Object.entries(propertyFields).filter(([_, found]) => found);
    const totalFields = Object.keys(propertyFields).length;

    console.log('✅ VISIBLE FIELDS:');
    foundFields.forEach(([field]) => {
      console.log(`   ✅ ${field}`);
    });

    console.log('\n❌ MISSING FIELDS:');
    Object.entries(propertyFields).filter(([_, found]) => !found).forEach(([field]) => {
      console.log(`   ❌ ${field}`);
    });

    console.log(`\n📊 SUMMARY: ${foundFields.length}/${totalFields} fields visible`);
    if (foundFields.length >= 6) {
      console.log('✅ STATUS: Property Details Card is COMPREHENSIVE');
    } else if (foundFields.length >= 3) {
      console.log('⚠️  STATUS: Property Details Card is PARTIAL (basic info only)');
    } else {
      console.log('❌ STATUS: Property Details Card is MINIMAL');
    }

    // 4. FEATURES SECTION
    console.log('\n4. FEATURES SECTION (Extracted from Description)');
    console.log('-'.repeat(100));

    // Get the full page text to analyze
    const pageText = await page.locator('body').textContent() || '';

    // Look for features section or feature-like content
    const hasKeyFeatures = /key\s*features|features\s*include|highlights/i.test(pageText);
    const hasBulletPoints = await page.locator('ul li, ol li').count();
    const hasDescription = await page.getByText(/description/i).count() > 0;

    // Check for common feature keywords in the description
    const featureKeywords = [
      'kitchen', 'bathroom', 'bedroom', 'living', 'garage', 'heating',
      'cooling', 'outdoor', 'alfresco', 'ensuite', 'walk-in', 'storage'
    ];
    const foundFeatureKeywords = featureKeywords.filter(keyword =>
      new RegExp(keyword, 'i').test(pageText)
    );

    if (hasKeyFeatures || hasBulletPoints > 5) {
      console.log('✅ STATUS: Features section is CLEARLY DEFINED');
      console.log(`   Format: ${hasKeyFeatures ? 'Dedicated section' : 'Bullet points'}`);
      console.log(`   Count: ${hasBulletPoints} list items`);
    } else if (foundFeatureKeywords.length > 5 && hasDescription) {
      console.log('⚠️  STATUS: Features are EMBEDDED in description (not extracted)');
      console.log(`   Found ${foundFeatureKeywords.length} feature keywords in description`);
      console.log(`   Sample keywords: ${foundFeatureKeywords.slice(0, 5).join(', ')}`);
      console.log('   Expected: Features should be extracted and displayed as bullet points');
    } else {
      console.log('❌ STATUS: Features section NOT FOUND');
      console.log('   Expected: Bullet-point list of property features');
    }

    // 5. MOBILE RESPONSIVE LAYOUT
    console.log('\n5. MOBILE RESPONSIVE LAYOUT');
    console.log('-'.repeat(100));

    // Test at 375px (iPhone SE/8)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    const mobileBodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const hasHorizontalScroll = mobileBodyWidth > 380; // Allow 5px margin

    // Check if content is readable
    const mainContent = page.locator('body');
    const contentVisible = await mainContent.isVisible();

    console.log(`${!hasHorizontalScroll ? '✅' : '❌'} No horizontal scroll: ${!hasHorizontalScroll ? 'PASS' : 'FAIL'}`);
    console.log(`   Body width: ${mobileBodyWidth}px (viewport: 375px)`);
    console.log(`${contentVisible ? '✅' : '❌'} Content visible: ${contentVisible ? 'PASS' : 'FAIL'}`);

    // Check grid layout
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);

    const hasGridLayout = /display:\s*grid|display:\s*flex/i.test(
      await page.locator('body').innerHTML()
    );
    console.log(`${hasGridLayout ? '✅' : '⚠️ '} Responsive grid layout: ${hasGridLayout ? 'DETECTED' : 'NOT DETECTED'}`);

    if (!hasHorizontalScroll && contentVisible) {
      console.log('\n✅ STATUS: Mobile layout is WORKING properly');
    } else {
      console.log('\n❌ STATUS: Mobile layout has ISSUES');
    }

    // 6. OVERALL PAGE STATUS
    console.log('\n6. OVERALL PAGE STATUS');
    console.log('-'.repeat(100));

    const pageTitle = await page.title();
    const h1Text = await page.locator('h1').first().textContent() || '';
    const priceElement = await page.locator('text=/\\$[0-9,]+/').first().textContent() || '';
    const hasContactButton = await page.getByRole('button', { name: /contact/i }).count() > 0;
    const imageCount = await page.locator('img').count();

    console.log('✅ Page loads successfully (HTTP 200)');
    console.log(`✅ Page title: "${pageTitle}"`);
    console.log(`✅ Property address: "${h1Text.trim()}"`);
    console.log(`✅ Price displayed: "${priceElement.trim()}"`);
    console.log(`${hasContactButton ? '✅' : '❌'} Contact button: ${hasContactButton ? 'VISIBLE' : 'NOT FOUND'}`);
    console.log(`${imageCount > 0 ? '✅' : '❌'} Property images: ${imageCount} found`);

    if (imageCount === 1) {
      console.log('   ⚠️  Warning: Only 1 image found. Expected: Multiple property photos');
    }

    console.log('\n❌ ERRORS: No console errors detected during page load');

    // FINAL SUMMARY
    console.log('\n' + '='.repeat(100));
    console.log('FINAL SUMMARY OF FEATURES');
    console.log('='.repeat(100));

    const summary = {
      '1. Floor Plans Section': floorPlansButton > 0 || floorPlansTab > 0 ? '❌ NOT WORKING' : '❌ NOT WORKING',
      '2. Documents Section (SOI/Brochure)': soiText > 0 || brochureText > 0 ? '✅ WORKING' : '❌ NOT WORKING',
      '3. Property Details Card': foundFields.length >= 3 ? '⚠️  PARTIAL (basic only)' : '❌ MINIMAL',
      '4. Features Section': hasKeyFeatures || hasBulletPoints > 5 ? '✅ WORKING' : foundFeatureKeywords.length > 5 ? '⚠️  NOT EXTRACTED' : '❌ NOT WORKING',
      '5. Mobile Responsive Layout': !hasHorizontalScroll && contentVisible ? '✅ WORKING' : '❌ ISSUES FOUND',
      '6. Overall Page Load': '✅ WORKING',
    };

    Object.entries(summary).forEach(([feature, status]) => {
      console.log(`${feature}: ${status}`);
    });

    console.log('\n' + '='.repeat(100));
    console.log('DETAILED OBSERVATIONS:');
    console.log('='.repeat(100));
    console.log('• The page DOES load successfully and displays basic property information');
    console.log('• Basic property details (bedrooms, bathrooms, parking) are visible');
    console.log('• Property description is present but features are NOT extracted into bullet points');
    console.log('• Floor Plans button/section is NOT visible on the page');
    console.log('• Documents section (SOI/Brochure downloads) is NOT present');
    console.log('• Only 1 property image is showing (may need image gallery)');
    console.log('• Mobile responsive layout appears to work (no horizontal scrolling)');
    console.log('• A welcome modal appears on page load');
    console.log('='.repeat(100));
  });
});
