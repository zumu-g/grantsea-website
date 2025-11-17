const { chromium } = require('playwright');

async function analyzePadding() {
  const browser = await chromium.launch({ 
    headless: false,
    timeout: 60000 
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 812 }
  ];

  // Try different pages
  const pagesToAnalyze = [
    { name: 'Homepage', url: 'https://www.on.com' },
    { name: 'Shop Page', url: 'https://www.on.com/en-us/shop.html' },
    { name: 'Product Page', url: 'https://www.on.com/en-us/shop/cloudmonster-1999287M.html' }
  ];

  const allResults = {};

  try {
    for (const pageInfo of pagesToAnalyze) {
      console.log(`\n\n=== ANALYZING ${pageInfo.name.toUpperCase()} ===`);
      allResults[pageInfo.name] = {};

      for (const viewport of viewports) {
        console.log(`\nSetting viewport to ${viewport.name} (${viewport.width}px)`);
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        try {
          console.log(`Navigating to ${pageInfo.url}...`);
          await page.goto(pageInfo.url, { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
          });
          
          // Wait for content to load
          await page.waitForTimeout(3000);

          // Close any popups or overlays
          try {
            await page.click('button[aria-label*="close"]', { timeout: 2000 });
          } catch (e) {
            // No popup to close
          }

          // Analyze padding with extensive selector coverage
          const paddingData = await page.evaluate(() => {
            const results = {
              summary: {},
              details: []
            };

            // Key selectors to analyze
            const keySelectors = [
              // Headers
              { selector: 'header', type: 'header' },
              { selector: '[role="banner"]', type: 'header' },
              { selector: '.header', type: 'header' },
              { selector: '#header', type: 'header' },
              
              // Navigation
              { selector: 'nav', type: 'navigation' },
              { selector: '.nav', type: 'navigation' },
              { selector: '.navbar', type: 'navigation' },
              
              // Main content containers
              { selector: 'main', type: 'main' },
              { selector: '[role="main"]', type: 'main' },
              { selector: '.main', type: 'main' },
              { selector: '#main', type: 'main' },
              
              // Generic containers
              { selector: '.container', type: 'container' },
              { selector: '.wrapper', type: 'wrapper' },
              { selector: '.content', type: 'content' },
              { selector: '.page-content', type: 'content' },
              { selector: '.inner', type: 'inner' },
              
              // Sections
              { selector: 'section', type: 'section' },
              { selector: '.section', type: 'section' },
              { selector: '[class*="section"]', type: 'section' },
              
              // Product specific
              { selector: '.product-grid', type: 'product' },
              { selector: '.product-list', type: 'product' },
              { selector: '.product-detail', type: 'product' },
              { selector: '.product-info', type: 'product' },
              
              // Footer
              { selector: 'footer', type: 'footer' },
              { selector: '.footer', type: 'footer' },
              { selector: '#footer', type: 'footer' }
            ];

            const analyzedElements = new Map();

            keySelectors.forEach(({ selector, type }) => {
              try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                  // Create unique key for element
                  const rect = el.getBoundingClientRect();
                  const key = `${el.tagName}-${rect.top}-${rect.left}`;
                  
                  if (!analyzedElements.has(key) && rect.width > 0) {
                    const computed = window.getComputedStyle(el);
                    const paddingLeft = computed.paddingLeft;
                    const paddingRight = computed.paddingRight;
                    const marginLeft = computed.marginLeft;
                    const marginRight = computed.marginRight;
                    
                    // Only include elements with horizontal padding
                    if (paddingLeft !== '0px' || paddingRight !== '0px' || 
                        (marginLeft !== '0px' && marginLeft !== 'auto') || 
                        (marginRight !== '0px' && marginRight !== 'auto')) {
                      
                      const elementInfo = {
                        type: type,
                        selector: selector,
                        tagName: el.tagName.toLowerCase(),
                        className: el.className || '',
                        id: el.id || '',
                        paddingLeft: paddingLeft,
                        paddingRight: paddingRight,
                        marginLeft: marginLeft,
                        marginRight: marginRight,
                        width: Math.round(rect.width),
                        maxWidth: computed.maxWidth,
                        position: computed.position,
                        display: computed.display
                      };
                      
                      results.details.push(elementInfo);
                      analyzedElements.set(key, true);
                    }
                  }
                });
              } catch (e) {
                // Selector error, skip
              }
            });

            // Create summary of most common padding values
            const paddingCounts = {};
            results.details.forEach(el => {
              if (el.paddingLeft === el.paddingRight && el.paddingLeft !== '0px') {
                const value = el.paddingLeft;
                if (!paddingCounts[value]) {
                  paddingCounts[value] = { count: 0, types: new Set() };
                }
                paddingCounts[value].count++;
                paddingCounts[value].types.add(el.type);
              }
            });

            // Convert to array and sort by count
            results.summary = Object.entries(paddingCounts)
              .map(([value, data]) => ({
                value,
                count: data.count,
                types: Array.from(data.types)
              }))
              .sort((a, b) => b.count - a.count);

            return results;
          });

          allResults[pageInfo.name][viewport.name] = paddingData;

        } catch (error) {
          console.error(`Error analyzing ${pageInfo.name} on ${viewport.name}:`, error.message);
          allResults[pageInfo.name][viewport.name] = { error: error.message };
        }
      }
    }

    // Print comprehensive results
    console.log('\n\n=== COMPREHENSIVE PADDING ANALYSIS RESULTS ===\n');

    // Summary across all pages
    console.log('PADDING SYSTEM SUMMARY');
    console.log('='.repeat(60));
    
    const globalPaddingPatterns = {
      Desktop: {},
      Tablet: {},
      Mobile: {}
    };

    // Collect all padding values across pages
    for (const [pageName, viewports] of Object.entries(allResults)) {
      for (const [viewportName, data] of Object.entries(viewports)) {
        if (data.summary) {
          data.summary.forEach(item => {
            if (!globalPaddingPatterns[viewportName][item.value]) {
              globalPaddingPatterns[viewportName][item.value] = 0;
            }
            globalPaddingPatterns[viewportName][item.value] += item.count;
          });
        }
      }
    }

    // Display global patterns
    for (const [viewportName, patterns] of Object.entries(globalPaddingPatterns)) {
      console.log(`\n${viewportName.toUpperCase()} - Most Common Padding Values:`);
      const sorted = Object.entries(patterns)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      sorted.forEach(([value, count]) => {
        console.log(`  ${value}: Used ${count} times across all pages`);
      });
    }

    // Detailed results per page
    console.log('\n\nDETAILED RESULTS BY PAGE');
    console.log('='.repeat(60));

    for (const [pageName, viewports] of Object.entries(allResults)) {
      console.log(`\n${pageName.toUpperCase()}`);
      
      for (const [viewportName, data] of Object.entries(viewports)) {
        console.log(`\n  ${viewportName} (${viewportName === 'Desktop' ? '1440px' : viewportName === 'Tablet' ? '768px' : '375px'}):`);
        
        if (data.error) {
          console.log(`    Error: ${data.error}`);
          continue;
        }

        if (data.summary && data.summary.length > 0) {
          console.log('    Top Padding Values:');
          data.summary.slice(0, 3).forEach(item => {
            console.log(`      ${item.value}: ${item.count} elements (${item.types.join(', ')})`);
          });

          // Find key container elements
          const keyElements = data.details.filter(el => 
            el.type === 'container' || el.type === 'wrapper' || el.type === 'main'
          );

          if (keyElements.length > 0) {
            console.log('    Key Container Padding:');
            keyElements.slice(0, 3).forEach(el => {
              console.log(`      ${el.tagName}${el.className ? '.' + el.className.split(' ')[0] : ''}: ${el.paddingLeft} / ${el.paddingRight}`);
            });
          }
        }
      }
    }

    // Export results to JSON for further analysis
    const fs = require('fs');
    fs.writeFileSync('on-padding-analysis.json', JSON.stringify(allResults, null, 2));
    console.log('\n\nDetailed results saved to on-padding-analysis.json');

  } finally {
    await browser.close();
  }
}

analyzePadding().catch(console.error);