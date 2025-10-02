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
    console.log(`[CONSOLE ${type.toUpperCase()}] ${text}`);
  });

  // Listen to page errors
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
    consoleMessages.push({ type: 'error', text: error.message });
  });

  console.log('\n=== NAVIGATING TO PROPERTY PAGE ===');
  console.log('URL: https://grantsea-website.vercel.app/property/31765985\n');

  try {
    // Navigate to the page
    await page.goto('https://grantsea-website.vercel.app/property/31765985', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✓ Page loaded (networkidle state reached)\n');

    // Wait a bit for any client-side rendering
    await page.waitForTimeout(2000);

    // TASK 2: Take full-page screenshot
    console.log('=== TAKING FULL-PAGE SCREENSHOT ===');
    await page.screenshot({
      path: '/tmp/property-31765985-full.png',
      fullPage: true
    });
    console.log('✓ Screenshot saved to /tmp/property-31765985-full.png\n');

    // TASK 3: Check for loading spinner
    console.log('=== CHECKING FOR LOADING SPINNER ===');
    const spinner = await page.locator('.loading-spinner, [role="status"], .spinner, .loader').first();
    const spinnerVisible = await spinner.isVisible().catch(() => false);
    console.log(`Loading Spinner Visible: ${spinnerVisible}\n`);

    // TASK 4: Search for "Contact Agent" text
    console.log('=== SEARCHING FOR "CONTACT AGENT" TEXT ===');
    const contactAgentText = await page.getByText('Contact Agent', { exact: false }).first();
    const contactAgentExists = await contactAgentText.isVisible().catch(() => false);
    console.log(`"Contact Agent" text found: ${contactAgentExists}`);

    if (contactAgentExists) {
      const boundingBox = await contactAgentText.boundingBox();
      console.log(`  Position: ${JSON.stringify(boundingBox)}`);
    }
    console.log('');

    // TASK 5: Search for enquiry form fields
    console.log('=== SEARCHING FOR ENQUIRY FORM FIELDS ===');

    // Search for Name field
    const nameField = await page.locator('input[name="name"], input[placeholder*="name" i], input[id*="name"]').first();
    const nameFieldExists = await nameField.isVisible().catch(() => false);
    console.log(`Name field found: ${nameFieldExists}`);

    // Search for Email field
    const emailField = await page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
    const emailFieldExists = await emailField.isVisible().catch(() => false);
    console.log(`Email field found: ${emailFieldExists}`);

    // Search for Phone field
    const phoneField = await page.locator('input[type="tel"], input[name="phone"], input[placeholder*="phone" i]').first();
    const phoneFieldExists = await phoneField.isVisible().catch(() => false);
    console.log(`Phone field found: ${phoneFieldExists}`);

    // Search for Message field
    const messageField = await page.locator('textarea[name="message"], textarea[placeholder*="message" i]').first();
    const messageFieldExists = await messageField.isVisible().catch(() => false);
    console.log(`Message field found: ${messageFieldExists}\n`);

    // TASK 6: Already collecting console logs above
    console.log('=== ALL CONSOLE MESSAGES ===');
    console.log(`Total console messages captured: ${consoleMessages.length}`);

    // Filter PropertyPage messages
    const propertyPageLogs = consoleMessages.filter(msg =>
      msg.text.includes('[PropertyPage]')
    );

    console.log(`\nPropertyPage-specific logs (${propertyPageLogs.length}):`);
    propertyPageLogs.forEach(msg => {
      console.log(`  [${msg.type}] ${msg.text}`);
    });

    console.log('\nAll console messages:');
    consoleMessages.forEach(msg => {
      console.log(`  [${msg.type}] ${msg.text}`);
    });
    console.log('');

    // TASK 7: Scroll down to check for elements below the fold
    console.log('=== SCROLLING DOWN THE PAGE ===');

    // Get initial viewport height
    const viewportHeight = page.viewportSize().height;
    console.log(`Viewport height: ${viewportHeight}px`);

    // Get page height
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`Total page height: ${pageHeight}px`);

    // Scroll down in increments
    let scrollPosition = 0;
    const scrollIncrement = 500;

    while (scrollPosition < pageHeight) {
      scrollPosition += scrollIncrement;
      await page.evaluate((y) => window.scrollTo(0, y), scrollPosition);
      await page.waitForTimeout(500);

      // Check if form elements become visible after scrolling
      const nameVisible = await page.locator('input[name="name"], input[placeholder*="name" i]').first().isVisible().catch(() => false);
      const contactVisible = await page.getByText('Contact Agent', { exact: false }).first().isVisible().catch(() => false);

      if (nameVisible || contactVisible) {
        console.log(`✓ Elements found visible at scroll position: ${scrollPosition}px`);
        if (!nameFieldExists || !contactAgentExists) {
          console.log('  (These were not visible initially - they were below the fold)');
        }
        break;
      }
    }
    console.log('');

    // TASK 8: Check HTML for agent contact elements
    console.log('=== CHECKING PAGE HTML FOR AGENT CONTACT ELEMENTS ===');

    const html = await page.content();

    // Check for various patterns
    const patterns = {
      'Contact Agent': html.includes('Contact Agent'),
      'contact-agent (class/id)': /contact-agent/i.test(html),
      'enquiry form': /enquiry.*form|form.*enquiry/i.test(html),
      'agent.*box': /agent.*box|box.*agent/i.test(html),
      'input name="name"': html.includes('name="name"'),
      'input type="email"': html.includes('type="email"'),
      'textarea': html.includes('<textarea'),
    };

    console.log('HTML content analysis:');
    Object.entries(patterns).forEach(([pattern, found]) => {
      console.log(`  ${pattern}: ${found}`);
    });
    console.log('');

    // Additional checks
    console.log('=== ADDITIONAL PAGE ANALYSIS ===');

    // Check page title
    const title = await page.title();
    console.log(`Page title: ${title}`);

    // Check for error messages
    const errorText = await page.locator('text=/error|not found|something went wrong/i').first().textContent().catch(() => null);
    if (errorText) {
      console.log(`Error message found: ${errorText}`);
    } else {
      console.log('No error messages found on page');
    }

    // Check if main content is visible
    const mainContent = await page.locator('main, [role="main"], .main-content').first().isVisible().catch(() => false);
    console.log(`Main content visible: ${mainContent}`);

    // Look for property-specific content
    const propertyTitle = await page.locator('h1, .property-title').first().textContent().catch(() => null);
    if (propertyTitle) {
      console.log(`Property title/heading: ${propertyTitle.trim()}`);
    }

    // Check for property ID in the page
    const hasPropertyId = html.includes('31765985');
    console.log(`Property ID (31765985) found in HTML: ${hasPropertyId}`);

    console.log('\n=== INVESTIGATION COMPLETE ===');

  } catch (error) {
    console.error(`\n[ERROR] ${error.message}`);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
