const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Collect console messages and errors
  const consoleMessages = [];
  const errors = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push({ type: msg.type(), text });
    if (text.includes('[PropertyPage]')) {
      console.log(`[CONSOLE ${msg.type().toUpperCase()}]:`, text);
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
    console.log('[PAGE ERROR]:', error.message);
  });

  try {
    console.log('Navigating to property page...');
    await page.goto('https://grantsea-website.vercel.app/property/27311391', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    console.log('Page loaded, waiting a bit more for any dynamic content...');
    await page.waitForTimeout(2000);

    // Check for and close any modal popups
    const closeModalButton = await page.locator('button:has-text("No thanks"), button:has-text("Let\'s start"), [aria-label="Close"], .modal-close, button.close').first();
    const hasModal = await closeModalButton.isVisible().catch(() => false);
    if (hasModal) {
      console.log('Closing modal popup...');
      await closeModalButton.click();
      await page.waitForTimeout(1000);
    }

    // Close modal by clicking "Skip tour" or pressing Escape
    const skipTourButton = await page.locator('a:has-text("Skip tour")').first();
    const hasSkipTour = await skipTourButton.isVisible().catch(() => false);
    if (hasSkipTour) {
      console.log('Clicking "Skip tour" button...');
      await skipTourButton.click();
      await page.waitForTimeout(1000);
    } else {
      // Try pressing Escape key to close modal
      console.log('Trying to close modal with Escape key...');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Get HTML content to analyze structure
    const pageContent = await page.content();
    const hasContactAgentInHTML = pageContent.includes('Contact Agent');
    const hasEnquiryFormInHTML = pageContent.includes('Send Enquiry') || pageContent.includes('Your Name');
    console.log('HTML contains "Contact Agent":', hasContactAgentInHTML);
    console.log('HTML contains enquiry form elements:', hasEnquiryFormInHTML);

    // Check for loading spinner
    const loadingSpinner = await page.locator('[data-testid*="loading"], .loading, .spinner, [class*="loading"], [class*="spinner"]').first();
    const isLoadingVisible = await loadingSpinner.isVisible().catch(() => false);
    console.log('\n=== LOADING STATE ===');
    console.log('Loading spinner visible:', isLoadingVisible);

    // Search for "Contact Agent" text
    const contactAgentText = await page.getByText('Contact Agent', { exact: false }).first();
    const hasContactAgentText = await contactAgentText.isVisible().catch(() => false);
    console.log('\n=== AGENT CONTACT BOX ===');
    console.log('"Contact Agent" text visible:', hasContactAgentText);

    // Scroll down to ensure agent contact box is in view
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    // Check for agent contact box elements with multiple selectors
    const agentBoxSelectors = [
      '[class*="agent-contact"]',
      '[class*="contact-agent"]',
      'div:has-text("Contact Agent")',
      '.agent-card',
      '[data-testid="agent-contact"]'
    ];

    let agentBoxVisible = false;
    for (const selector of agentBoxSelectors) {
      const element = await page.locator(selector).first();
      const isVisible = await element.isVisible().catch(() => false);
      if (isVisible) {
        agentBoxVisible = true;
        console.log(`Agent box found with selector: ${selector}`);
        break;
      }
    }

    // Check for agent name/info
    const agentNameSelectors = [
      'h3:near(:text("Contact Agent"))',
      'p:near(:text("Contact Agent"))',
      '[class*="agent"] h3',
      '[class*="agent"] p:has-text("Grant")',
      'strong:has-text("Grant")',
      '.agent-name'
    ];

    let hasAgentName = false;
    for (const selector of agentNameSelectors) {
      const element = await page.locator(selector).first();
      const isVisible = await element.isVisible().catch(() => false);
      if (isVisible) {
        hasAgentName = true;
        const text = await element.textContent();
        console.log(`Agent name found: ${text?.trim()}`);
        break;
      }
    }

    // Check for agent photo/avatar
    const agentPhoto = await page.locator('[data-testid="agent-photo"], [data-testid="agent-avatar"], img[alt*="agent" i], img[alt*="avatar" i], img[src*="agent"]').first();
    const hasAgentPhoto = await agentPhoto.isVisible().catch(() => false);

    console.log('Agent box visible:', agentBoxVisible);
    console.log('Agent name/info visible:', hasAgentName);
    console.log('Agent photo/avatar visible:', hasAgentPhoto);

    // Check for enquiry form fields
    console.log('\n=== ENQUIRY FORM ===');

    // Name field
    const nameInput = await page.locator('input[placeholder*="Name" i], input[name*="name" i], input[id*="name" i]').first();
    const hasNameInput = await nameInput.isVisible().catch(() => false);
    console.log('Name input field visible:', hasNameInput);
    if (hasNameInput) {
      const namePlaceholder = await nameInput.getAttribute('placeholder');
      console.log('  - Placeholder:', namePlaceholder);
    }

    // Email field
    const emailInput = await page.locator('input[placeholder*="Email" i], input[type="email"], input[name*="email" i], input[id*="email" i]').first();
    const hasEmailInput = await emailInput.isVisible().catch(() => false);
    console.log('Email input field visible:', hasEmailInput);
    if (hasEmailInput) {
      const emailPlaceholder = await emailInput.getAttribute('placeholder');
      console.log('  - Placeholder:', emailPlaceholder);
    }

    // Phone field
    const phoneInput = await page.locator('input[placeholder*="Phone" i], input[type="tel"], input[name*="phone" i], input[id*="phone" i]').first();
    const hasPhoneInput = await phoneInput.isVisible().catch(() => false);
    console.log('Phone input field visible:', hasPhoneInput);
    if (hasPhoneInput) {
      const phonePlaceholder = await phoneInput.getAttribute('placeholder');
      console.log('  - Placeholder:', phonePlaceholder);
    }

    // Message textarea
    const messageTextarea = await page.locator('textarea[placeholder*="Message" i], textarea[name*="message" i], textarea[id*="message" i]').first();
    const hasMessageTextarea = await messageTextarea.isVisible().catch(() => false);
    console.log('Message textarea visible:', hasMessageTextarea);
    if (hasMessageTextarea) {
      const messagePlaceholder = await messageTextarea.getAttribute('placeholder');
      console.log('  - Placeholder:', messagePlaceholder);
    }

    // Submit button
    const submitButton = await page.getByRole('button', { name: /send enquiry/i }).first();
    const hasSubmitButton = await submitButton.isVisible().catch(() => false);
    console.log('Submit button ("Send Enquiry") visible:', hasSubmitButton);
    if (hasSubmitButton) {
      const buttonText = await submitButton.textContent();
      console.log('  - Button text:', buttonText?.trim());
    }

    // Alternative button search
    if (!hasSubmitButton) {
      const altSubmitButton = await page.locator('button:has-text("Send Enquiry"), input[type="submit"][value*="Send" i]').first();
      const hasAltSubmitButton = await altSubmitButton.isVisible().catch(() => false);
      console.log('Submit button (alternative search) visible:', hasAltSubmitButton);
      if (hasAltSubmitButton) {
        const buttonText = await altSubmitButton.textContent();
        console.log('  - Button text:', buttonText?.trim());
      }
    }

    // Console errors check
    console.log('\n=== CONSOLE ERRORS ===');
    const propertyPageErrors = consoleMessages.filter(msg =>
      msg.text.includes('[PropertyPage]') && (msg.type === 'error' || msg.type === 'warning')
    );

    if (propertyPageErrors.length > 0) {
      console.log('Found PropertyPage console messages:');
      propertyPageErrors.forEach(msg => {
        console.log(`  [${msg.type.toUpperCase()}]:`, msg.text);
      });
    } else {
      console.log('No PropertyPage-specific console errors found');
    }

    if (errors.length > 0) {
      console.log('Page errors found:');
      errors.forEach(err => console.log('  -', err));
    } else {
      console.log('No page errors found');
    }

    // Take full page screenshot
    console.log('\n=== SCREENSHOT ===');

    // Scroll to top first for full page screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: '/tmp/deployed-property-verification.png',
      fullPage: true
    });
    console.log('Screenshot saved to /tmp/deployed-property-verification.png');

    // Scroll down more to find agent section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.75));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/tmp/deployed-property-agent-section.png',
      fullPage: false
    });
    console.log('Agent section screenshot saved to /tmp/deployed-property-agent-section.png');

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/tmp/deployed-property-bottom.png',
      fullPage: false
    });
    console.log('Bottom section screenshot saved to /tmp/deployed-property-bottom.png');

    // Get page title for reference
    const title = await page.title();
    console.log('\n=== PAGE INFO ===');
    console.log('Page title:', title);
    console.log('Page URL:', page.url());

    // Summary
    console.log('\n=== VERIFICATION SUMMARY ===');
    console.log('✓ Page loaded:', !isLoadingVisible);
    console.log('✓ Agent contact section:', hasContactAgentText || hasAgentName);
    console.log('✓ Enquiry form complete:', hasNameInput && hasEmailInput && hasPhoneInput && hasMessageTextarea && hasSubmitButton);
    console.log('  - Name field:', hasNameInput ? '✓' : '✗');
    console.log('  - Email field:', hasEmailInput ? '✓' : '✗');
    console.log('  - Phone field:', hasPhoneInput ? '✓' : '✗');
    console.log('  - Message field:', hasMessageTextarea ? '✓' : '✗');
    console.log('  - Submit button:', hasSubmitButton ? '✓' : '✗');

  } catch (error) {
    console.error('Error during page verification:', error.message);
    await page.screenshot({
      path: '/tmp/deployed-property-verification.png',
      fullPage: true
    });
    console.log('Screenshot saved (error state)');
  } finally {
    await browser.close();
  }
})();
