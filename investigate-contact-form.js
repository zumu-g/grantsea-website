const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Array to store all console messages
  const consoleMessages = [];

  // Listen to all console messages
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleMessages.push({ type, text });
  });

  console.log('Navigating to property page...');

  try {
    await page.goto('https://grantsea-website.vercel.app/property/31765985', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✓ Page loaded\n');

    // Wait for content to render
    await page.waitForTimeout(2000);

    // Scroll down to find the Contact Agent section
    console.log('=== SCROLLING TO CONTACT AGENT SECTION ===');

    // Try to locate Contact Agent heading
    const contactAgentHeading = await page.locator('text=/Contact Agent/i').first();

    if (await contactAgentHeading.isVisible()) {
      // Scroll it into view
      await contactAgentHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Get position
      const box = await contactAgentHeading.boundingBox();
      console.log(`Contact Agent heading found at: ${JSON.stringify(box)}`);

      // Take a screenshot of the contact section
      await page.screenshot({
        path: '/tmp/contact-agent-section.png',
        fullPage: false
      });
      console.log('✓ Screenshot of Contact Agent section saved\n');
    }

    // Get detailed info about form fields
    console.log('=== DETAILED FORM FIELD INSPECTION ===');

    // Check for Name field
    const nameFields = await page.locator('input[type="text"]').all();
    console.log(`Found ${nameFields.length} text input fields`);

    for (let i = 0; i < nameFields.length; i++) {
      const placeholder = await nameFields[i].getAttribute('placeholder').catch(() => null);
      const name = await nameFields[i].getAttribute('name').catch(() => null);
      const id = await nameFields[i].getAttribute('id').catch(() => null);
      const isVisible = await nameFields[i].isVisible().catch(() => false);

      console.log(`  Field ${i + 1}:`, {
        name,
        id,
        placeholder,
        visible: isVisible
      });
    }

    // Check for Email field
    const emailFields = await page.locator('input[type="email"]').all();
    console.log(`\nFound ${emailFields.length} email input fields`);

    for (let i = 0; i < emailFields.length; i++) {
      const placeholder = await emailFields[i].getAttribute('placeholder').catch(() => null);
      const name = await emailFields[i].getAttribute('name').catch(() => null);
      const isVisible = await emailFields[i].isVisible().catch(() => false);

      console.log(`  Email ${i + 1}:`, {
        name,
        placeholder,
        visible: isVisible
      });
    }

    // Check for Phone field
    const phoneFields = await page.locator('input[type="tel"]').all();
    console.log(`\nFound ${phoneFields.length} phone input fields`);

    for (let i = 0; i < phoneFields.length; i++) {
      const placeholder = await phoneFields[i].getAttribute('placeholder').catch(() => null);
      const name = await phoneFields[i].getAttribute('name').catch(() => null);
      const isVisible = await phoneFields[i].isVisible().catch(() => false);

      console.log(`  Phone ${i + 1}:`, {
        name,
        placeholder,
        visible: isVisible
      });
    }

    // Check for Message/textarea
    const textareas = await page.locator('textarea').all();
    console.log(`\nFound ${textareas.length} textarea fields`);

    for (let i = 0; i < textareas.length; i++) {
      const placeholder = await textareas[i].getAttribute('placeholder').catch(() => null);
      const name = await textareas[i].getAttribute('name').catch(() => null);
      const isVisible = await textareas[i].isVisible().catch(() => false);

      console.log(`  Textarea ${i + 1}:`, {
        name,
        placeholder,
        visible: isVisible
      });
    }

    // Check for submit button
    console.log('\n=== CHECKING FOR SUBMIT BUTTON ===');
    const submitButton = await page.locator('button[type="submit"]').all();
    console.log(`Found ${submitButton.length} submit buttons`);

    for (let i = 0; i < submitButton.length; i++) {
      const text = await submitButton[i].textContent().catch(() => null);
      const isVisible = await submitButton[i].isVisible().catch(() => false);

      console.log(`  Button ${i + 1}:`, {
        text: text?.trim(),
        visible: isVisible
      });
    }

    // Get HTML snippet of the contact section
    console.log('\n=== HTML SNIPPET OF CONTACT AGENT SECTION ===');
    const contactSection = await page.locator('text=/Contact Agent/i').first();
    if (await contactSection.isVisible()) {
      const parent = await contactSection.locator('..').first();
      const html = await parent.innerHTML().catch(() => 'Could not get HTML');
      console.log('Contact Agent section HTML (first 500 chars):');
      console.log(html.substring(0, 500));
    }

    // Final full page screenshot scrolled to bottom
    console.log('\n=== TAKING SCREENSHOT AT BOTTOM OF PAGE ===');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/tmp/property-bottom.png',
      fullPage: false
    });
    console.log('✓ Screenshot at bottom saved to /tmp/property-bottom.png\n');

    // Print all PropertyPage console logs
    console.log('=== PROPERTY PAGE CONSOLE LOGS ===');
    const propertyPageLogs = consoleMessages.filter(msg =>
      msg.text.includes('[PropertyPage]')
    );

    propertyPageLogs.forEach(msg => {
      console.log(`  [${msg.type}] ${msg.text}`);
    });

  } catch (error) {
    console.error(`\n[ERROR] ${error.message}`);
  } finally {
    await browser.close();
  }
})();
