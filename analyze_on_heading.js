const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false, // Set to false to see the browser
    slowMo: 50 // Slow down operations by 50ms
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to the page
    console.log('Navigating to https://www.on.com/en-au...');
    await page.goto('https://www.on.com/en-au', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Wait for the page to be more interactive
    await page.waitForTimeout(5000);
    
    // Scroll down a bit to ensure content is loaded
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(2000);
    
    // Try multiple selectors to find the "Shop by category" heading
    const selectors = [
      'text="Shop by category"',
      'text="SHOP BY CATEGORY"',
      'h1:has-text("Shop by category")',
      'h2:has-text("Shop by category")',
      'h3:has-text("Shop by category")',
      'h4:has-text("Shop by category")',
      'h5:has-text("Shop by category")',
      'h6:has-text("Shop by category")',
      '*:has-text("Shop by category"):not(:has(*:has-text("Shop by category")))',
      '*:has-text("SHOP BY CATEGORY"):not(:has(*:has-text("SHOP BY CATEGORY")))'
    ];
    
    let element = null;
    let usedSelector = null;
    
    for (const selector of selectors) {
      try {
        element = await page.locator(selector).first();
        if (await element.count() > 0) {
          usedSelector = selector;
          console.log(`Found element using selector: ${selector}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (!element || await element.count() === 0) {
      console.log('Could not find "Shop by category" heading. Looking for any text containing "category"...');
      
      // Search for any text containing "category"
      const categoryTexts = await page.locator('*:has-text("category")').allTextContents();
      console.log('Found texts containing "category":', categoryTexts.slice(0, 10));
      
      // Also look for headings
      console.log('\nLooking for all headings on the page...');
      const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
        elements.map(el => ({
          tag: el.tagName,
          text: el.textContent.trim(),
          className: el.className
        }))
      );
      console.log('Found headings:', headings.slice(0, 20));
      
      // Look for any text that might be styled as a heading
      console.log('\nLooking for large text elements...');
      const largeTexts = await page.$$eval('*', elements => 
        elements
          .filter(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseInt(style.fontSize);
            return fontSize >= 20 && el.textContent.trim().length > 0 && el.children.length === 0;
          })
          .map(el => ({
            tag: el.tagName,
            text: el.textContent.trim().slice(0, 50),
            fontSize: window.getComputedStyle(el).fontSize,
            className: el.className
          }))
      );
      console.log('Found large text elements:', largeTexts.slice(0, 20));
      
      throw new Error('Could not locate the "Shop by category" heading');
    }
    
    // Get the exact text content
    const textContent = await element.textContent();
    console.log('\n=== HEADING ANALYSIS ===\n');
    console.log('6. Exact text content:', textContent.trim());
    
    // Get computed styles
    const styles = await element.evaluate(el => {
      const computedStyle = window.getComputedStyle(el);
      return {
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        letterSpacing: computedStyle.letterSpacing,
        textTransform: computedStyle.textTransform,
        marginTop: computedStyle.marginTop,
        marginBottom: computedStyle.marginBottom,
        paddingTop: computedStyle.paddingTop,
        paddingBottom: computedStyle.paddingBottom,
        textAlign: computedStyle.textAlign,
        color: computedStyle.color,
        // Additional useful properties
        fontFamily: computedStyle.fontFamily,
        lineHeight: computedStyle.lineHeight,
        display: computedStyle.display
      };
    });
    
    // Display the results
    console.log('1. Font size:', styles.fontSize);
    console.log('2. Font weight:', styles.fontWeight);
    console.log('3. Letter spacing:', styles.letterSpacing);
    console.log('4. Text transform:', styles.textTransform);
    console.log('5. Margin/Padding:');
    console.log('   - Margin top:', styles.marginTop);
    console.log('   - Margin bottom:', styles.marginBottom);
    console.log('   - Padding top:', styles.paddingTop);
    console.log('   - Padding bottom:', styles.paddingBottom);
    console.log('7. Text alignment:', styles.textAlign);
    console.log('8. Color:', styles.color);
    console.log('\nAdditional properties:');
    console.log('   - Font family:', styles.fontFamily);
    console.log('   - Line height:', styles.lineHeight);
    console.log('   - Display:', styles.display);
    
    // Take a screenshot of the element
    await element.screenshot({ path: 'shop-by-category-heading.png' });
    console.log('\nScreenshot saved as: shop-by-category-heading.png');
    
  } catch (error) {
    console.error('Error:', error.message);
    
    // Take a full page screenshot for debugging
    await page.screenshot({ path: 'full-page-debug.png', fullPage: true });
    console.log('Full page screenshot saved as: full-page-debug.png');
  } finally {
    await browser.close();
  }
})();