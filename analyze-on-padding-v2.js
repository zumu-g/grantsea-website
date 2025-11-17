const { chromium } = require('playwright');

async function analyzePadding() {
  const browser = await chromium.launch({ 
    headless: false,
    timeout: 60000 
  });
  
  const context = await browser.newContext({
    // Add a user agent to avoid detection
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 812 }
  ];

  const results = {};

  try {
    for (const viewport of viewports) {
      console.log(`\n=== Analyzing ${viewport.name} (${viewport.width}px) ===`);
      results[viewport.name] = {};

      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // First, let's just analyze the homepage
      console.log('\nNavigating to Homepage...');
      try {
        await page.goto('https://www.on.com', { 
          waitUntil: 'domcontentloaded',
          timeout: 60000 
        });
        
        // Wait for the page to stabilize
        await page.waitForTimeout(5000);

        // Take a screenshot for reference
        await page.screenshot({ 
          path: `on-${viewport.name.toLowerCase()}.png`,
          fullPage: false 
        });

        // Analyze padding using a more targeted approach
        const paddingData = await page.evaluate(() => {
          const results = {
            mainContainers: {},
            sections: {},
            headers: {},
            commonPatterns: {}
          };

          // Helper function to get computed styles
          function getElementPadding(element) {
            const computed = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            
            return {
              paddingLeft: computed.paddingLeft,
              paddingRight: computed.paddingRight,
              paddingTop: computed.paddingTop,
              paddingBottom: computed.paddingBottom,
              marginLeft: computed.marginLeft,
              marginRight: computed.marginRight,
              width: rect.width,
              maxWidth: computed.maxWidth,
              className: element.className || 'no-class',
              tagName: element.tagName.toLowerCase(),
              id: element.id || 'no-id'
            };
          }

          // Find main header
          const headers = document.querySelectorAll('header, [role="banner"], .header, #header');
          headers.forEach((header, i) => {
            results.headers[`header-${i}`] = getElementPadding(header);
          });

          // Find main containers
          const containers = document.querySelectorAll(
            '.container, [class*="container"], .wrapper, [class*="wrapper"], main, .content'
          );
          
          containers.forEach((container, i) => {
            const padding = getElementPadding(container);
            if (padding.paddingLeft !== '0px' || padding.paddingRight !== '0px') {
              results.mainContainers[`container-${i}`] = padding;
            }
          });

          // Find sections
          const sections = document.querySelectorAll('section, [class*="section"]');
          sections.forEach((section, i) => {
            const padding = getElementPadding(section);
            if (padding.paddingLeft !== '0px' || padding.paddingRight !== '0px') {
              results.sections[`section-${i}`] = padding;
            }
          });

          // Look for common padding patterns
          const allElements = document.querySelectorAll('*');
          const paddingFrequency = {};
          
          allElements.forEach(el => {
            const computed = window.getComputedStyle(el);
            const leftPadding = computed.paddingLeft;
            const rightPadding = computed.paddingRight;
            
            if (leftPadding === rightPadding && leftPadding !== '0px') {
              if (!paddingFrequency[leftPadding]) {
                paddingFrequency[leftPadding] = 0;
              }
              paddingFrequency[leftPadding]++;
            }
          });

          // Get top 5 most common padding values
          const sortedPaddings = Object.entries(paddingFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

          results.commonPatterns = Object.fromEntries(sortedPaddings);

          return results;
        });

        results[viewport.name] = paddingData;

      } catch (error) {
        console.error(`Error analyzing ${viewport.name}:`, error.message);
      }
    }

    // Print results
    console.log('\n\n=== PADDING ANALYSIS RESULTS ===\n');

    for (const [viewportName, data] of Object.entries(results)) {
      console.log(`\n${viewportName.toUpperCase()} (${viewportName === 'Desktop' ? '1440px' : viewportName === 'Tablet' ? '768px' : '375px'})`);
      console.log('='.repeat(60));
      
      if (data.commonPatterns) {
        console.log('\nMost Common Horizontal Padding Values:');
        for (const [padding, count] of Object.entries(data.commonPatterns)) {
          console.log(`  ${padding}: Used ${count} times`);
        }
      }

      if (data.headers && Object.keys(data.headers).length > 0) {
        console.log('\nHeader Padding:');
        for (const [key, styles] of Object.entries(data.headers)) {
          console.log(`  ${styles.tagName}.${styles.className}:`);
          console.log(`    Left/Right Padding: ${styles.paddingLeft} / ${styles.paddingRight}`);
          console.log(`    Width: ${styles.width}px, Max-width: ${styles.maxWidth}`);
        }
      }

      if (data.mainContainers && Object.keys(data.mainContainers).length > 0) {
        console.log('\nMain Container Padding:');
        const uniquePaddings = new Set();
        for (const [key, styles] of Object.entries(data.mainContainers)) {
          const paddingKey = `${styles.paddingLeft}/${styles.paddingRight}`;
          if (!uniquePaddings.has(paddingKey)) {
            uniquePaddings.add(paddingKey);
            console.log(`  ${styles.tagName}.${styles.className.split(' ')[0]}:`);
            console.log(`    Left/Right Padding: ${paddingKey}`);
          }
        }
      }
    }

  } finally {
    await browser.close();
  }
}

analyzePadding().catch(console.error);