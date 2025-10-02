import { test, expect } from '@playwright/test';

test('Verify agent contact box and enquiry form on deployed site', async ({ page }) => {
  console.log('\n=== TESTING DEPLOYED SITE ===\n');

  // Go to deployed property page
  await page.goto('https://grantsea-website.vercel.app/property/27311391', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Wait for page to fully load
  await page.waitForTimeout(3000);

  // Take full page screenshot
  await page.screenshot({
    path: '/tmp/deployed-full-page.png',
    fullPage: true
  });
  console.log('✓ Screenshot saved to /tmp/deployed-full-page.png\n');

  console.log('=== CHECKING FOR AGENT CONTACT ELEMENTS ===\n');

  // Check for "Contact Agent" heading
  const contactHeading = page.locator('h3:has-text("Contact Agent")');
  const hasContactHeading = await contactHeading.count();
  console.log(`Contact Agent heading: ${hasContactHeading > 0 ? '✓ FOUND' : '✗ NOT FOUND'}`);

  // Check for form fields
  const nameInput = page.locator('input[placeholder*="Name"]');
  const emailInput = page.locator('input[placeholder*="Email"]');
  const phoneInput = page.locator('input[placeholder*="Phone"]');
  const messageTextarea = page.locator('textarea[placeholder*="Message"]');
  const submitButton = page.locator('button:has-text("Send Enquiry")');

  console.log(`Name input: ${await nameInput.count() > 0 ? '✓ FOUND' : '✗ NOT FOUND'}`);
  console.log(`Email input: ${await emailInput.count() > 0 ? '✓ FOUND' : '✗ NOT FOUND'}`);
  console.log(`Phone input: ${await phoneInput.count() > 0 ? '✓ FOUND' : '✗ NOT FOUND'}`);
  console.log(`Message textarea: ${await messageTextarea.count() > 0 ? '✓ FOUND' : '✗ NOT FOUND'}`);
  console.log(`Submit button: ${await submitButton.count() > 0 ? '✓ FOUND' : '✗ NOT FOUND'}`);

  // Check for two-column layout
  console.log('\n=== CHECKING LAYOUT STRUCTURE ===\n');

  const gridContainers = page.locator('div[style*="gridTemplateColumns"]');
  const gridCount = await gridContainers.count();
  console.log(`Grid containers found: ${gridCount}`);

  if (gridCount > 0) {
    for (let i = 0; i < gridCount; i++) {
      const style = await gridContainers.nth(i).getAttribute('style');
      console.log(`Grid ${i + 1}: ${style}`);
    }
  }

  // Get page text to see what's rendering
  console.log('\n=== PAGE TEXT CONTENT (first 2000 chars) ===\n');
  const bodyText = await page.locator('body').innerText();
  console.log(bodyText.substring(0, 2000));

  // Check HTML source for comments
  console.log('\n=== CHECKING HTML SOURCE ===\n');
  const htmlContent = await page.content();

  const hasAgentComment = htmlContent.includes('Right Column - Agent Contact');
  const hasAgentPhotoComment = htmlContent.includes('Agent Photo Box');
  const hasContactAgentText = htmlContent.includes('Contact Agent');

  console.log(`Has "Right Column - Agent Contact" comment: ${hasAgentComment}`);
  console.log(`Has "Agent Photo Box" comment: ${hasAgentPhotoComment}`);
  console.log(`Has "Contact Agent" text: ${hasContactAgentText}`);

  // Check if it's a Next.js hydration issue
  console.log('\n=== CHECKING FOR ERRORS ===\n');
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Save HTML to file
  const fs = require('fs');
  fs.writeFileSync('/tmp/deployed-page.html', htmlContent);
  console.log('✓ HTML saved to /tmp/deployed-page.html\n');

  if (errors.length > 0) {
    console.log('JavaScript errors found:');
    errors.forEach(err => console.log(`  - ${err}`));
  } else {
    console.log('No JavaScript errors detected');
  }

  // CRITICAL: Check if the right column div exists at all
  console.log('\n=== CHECKING FOR RIGHT COLUMN DIV ===\n');

  const rightColumnDivs = await page.locator('div').evaluateAll(divs => {
    return divs
      .map((div, index) => ({
        index,
        hasGridParent: div.parentElement?.style.gridTemplateColumns?.includes('2fr 1fr'),
        text: div.textContent?.substring(0, 100) || ''
      }))
      .filter(d => d.hasGridParent);
  });

  console.log('Divs in 2-column grid:', rightColumnDivs.length);
  console.log(JSON.stringify(rightColumnDivs, null, 2));
});
