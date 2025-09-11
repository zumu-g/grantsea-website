const { chromium } = require('playwright');

async function analyzePadding() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 812 }
  ];

  const pages = [
    { name: 'Homepage', url: 'https://www.on.com' },
    { name: 'Product Listing', url: 'https://www.on.com/en-us/shop/mens' },
    { name: 'Product Detail', url: 'https://www.on.com/en-us/shop/cloudmonster-1999135.html' }
  ];

  const results = {};

  for (const viewport of viewports) {
    console.log(`\n=== Analyzing ${viewport.name} (${viewport.width}px) ===`);
    results[viewport.name] = {};

    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const pageInfo of pages) {
      console.log(`\nNavigating to ${pageInfo.name}: ${pageInfo.url}`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Wait for any animations

      results[viewport.name][pageInfo.name] = {};

      // Analyze main container/wrapper elements
      const selectors = [
        // Common container selectors
        '.container',
        '.wrapper',
        '.page-wrapper',
        'main',
        'header',
        '.header-container',
        '.content',
        '.main-content',
        '[class*="container"]',
        '[class*="wrapper"]',
        '.product-grid',
        '.product-detail',
        '.hero',
        'section'
      ];

      const measuredElements = new Set();

      for (const selector of selectors) {
        try {
          const elements = await page.$$(selector);
          
          for (const element of elements) {
            const className = await element.getAttribute('class') || 'no-class';
            const tagName = await element.evaluate(el => el.tagName.toLowerCase());
            const identifier = `${tagName}.${className}`;

            if (!measuredElements.has(identifier)) {
              const styles = await element.evaluate(el => {
                const computed = window.getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                return {
                  paddingLeft: computed.paddingLeft,
                  paddingRight: computed.paddingRight,
                  paddingTop: computed.paddingTop,
                  paddingBottom: computed.paddingBottom,
                  marginLeft: computed.marginLeft,
                  marginRight: computed.marginRight,
                  marginTop: computed.marginTop,
                  marginBottom: computed.marginBottom,
                  width: rect.width,
                  maxWidth: computed.maxWidth,
                  display: computed.display,
                  position: computed.position
                };
              });

              // Only log elements with significant padding/margin
              if (styles.paddingLeft !== '0px' || styles.paddingRight !== '0px' || 
                  styles.marginLeft !== '0px' || styles.marginRight !== '0px') {
                if (!results[viewport.name][pageInfo.name][identifier]) {
                  results[viewport.name][pageInfo.name][identifier] = [];
                }
                results[viewport.name][pageInfo.name][identifier].push(styles);
                measuredElements.add(identifier);
              }
            }
          }
        } catch (error) {
          // Selector not found, continue
        }
      }
    }
  }

  // Print formatted results
  console.log('\n\n=== PADDING ANALYSIS RESULTS ===\n');

  for (const [viewportName, pages] of Object.entries(results)) {
    console.log(`\n${viewportName.toUpperCase()}`);
    console.log('='.repeat(50));
    
    for (const [pageName, elements] of Object.entries(pages)) {
      console.log(`\n${pageName}:`);
      
      // Find the most common padding values
      const paddingValues = {};
      
      for (const [element, stylesList] of Object.entries(elements)) {
        for (const styles of stylesList) {
          const leftPadding = styles.paddingLeft;
          const rightPadding = styles.paddingRight;
          
          if (leftPadding === rightPadding && leftPadding !== '0px') {
            const key = leftPadding;
            if (!paddingValues[key]) {
              paddingValues[key] = [];
            }
            paddingValues[key].push(element);
          }
        }
      }
      
      // Sort by frequency
      const sortedPaddings = Object.entries(paddingValues)
        .sort((a, b) => b[1].length - a[1].length);
      
      console.log('  Common horizontal padding values:');
      sortedPaddings.slice(0, 5).forEach(([padding, elements]) => {
        console.log(`    ${padding}: Used by ${elements.length} elements`);
        console.log(`      Examples: ${elements.slice(0, 3).join(', ')}`);
      });
    }
  }

  await browser.close();
}

analyzePadding().catch(console.error);