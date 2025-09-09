const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport to ensure consistent measurements
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('Navigating to ON website...');
  await page.goto('https://www.on.com/en-au', { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  
  // Wait for the page to fully load
  await page.waitForTimeout(5000);
  
  // Scroll down to ensure category section is loaded
  await page.evaluate(() => window.scrollBy(0, 500));
  
  console.log('\nAnalyzing "Shop by category" section...\n');
  
  // Try multiple selectors for finding category items
  let categoryItems = [];
  
  // Common patterns for category sections
  const selectors = [
    // Look for shop by category heading and then find items
    'h2:has-text("Shop by category") ~ div a:has(img)',
    'h3:has-text("Shop by category") ~ div a:has(img)',
    // Look for category-related classes
    '[class*="category-grid"] a:has(img)',
    '[class*="category-tiles"] a:has(img)',
    '[class*="category-list"] a:has(img)',
    '[class*="categories"] a:has(img)',
    // Look for grid layouts with images
    '[class*="grid"] > a:has(img)',
    '[class*="Grid"] > a:has(img)',
    // Generic approach - look for a container with multiple image links
    'div:has(> a > img):has(> a:nth-child(3))',
    // Data attributes
    '[data-testid*="category"] a',
    '[data-component*="category"] a'
  ];
  
  for (const selector of selectors) {
    try {
      const items = await page.locator(selector).all();
      if (items.length > 2) {
        console.log(`Found ${items.length} items using selector: ${selector}`);
        categoryItems = items;
        break;
      }
    } catch (e) {
      // Continue to next selector
    }
  }
  
  // If still no items found, look for any grid of linked images
  if (categoryItems.length === 0) {
    const allImageLinks = await page.locator('a:has(img)').all();
    console.log(`Total image links on page: ${allImageLinks.length}`);
    
    // Filter for groups of similar items
    if (allImageLinks.length > 0) {
      // Get the first 10 to analyze
      categoryItems = allImageLinks.slice(0, 10);
    }
  }
  
  if (categoryItems.length === 0) {
    console.log('No category items found. Trying broader search...');
    const links = await page.locator('a:has(img)').all();
    console.log(`Found ${links.length} links with images`);
  }
  
  console.log(`Found ${categoryItems.length} category items\n`);
  
  if (categoryItems.length > 0) {
    // Analyze the first category item in detail
    const firstItem = categoryItems[0];
    const boundingBox = await firstItem.boundingBox();
    
    console.log('First Category Item Dimensions:');
    console.log(`- Width: ${boundingBox.width}px`);
    console.log(`- Height: ${boundingBox.height}px`);
    console.log(`- Aspect Ratio: ${(boundingBox.width / boundingBox.height).toFixed(2)}:1`);
    
    // Get computed styles
    const styles = await firstItem.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const img = el.querySelector('img');
      const imgComputed = img ? window.getComputedStyle(img) : null;
      
      return {
        container: {
          display: computed.display,
          position: computed.position,
          padding: computed.padding,
          margin: computed.margin,
          width: computed.width,
          height: computed.height,
          overflow: computed.overflow
        },
        image: imgComputed ? {
          width: imgComputed.width,
          height: imgComputed.height,
          objectFit: imgComputed.objectFit,
          padding: imgComputed.padding,
          paddingBottom: imgComputed.paddingBottom,
          position: imgComputed.position
        } : null
      };
    });
    
    console.log('\nContainer CSS Properties:');
    console.log(JSON.stringify(styles.container, null, 2));
    
    if (styles.image) {
      console.log('\nImage CSS Properties:');
      console.log(JSON.stringify(styles.image, null, 2));
    }
    
    // Check for padding-bottom trick for aspect ratio
    const paddingTrick = await firstItem.evaluate(el => {
      const wrapper = el.querySelector('[style*="padding-bottom"], [style*="padding-top"]');
      if (wrapper) {
        const style = wrapper.getAttribute('style');
        const computed = window.getComputedStyle(wrapper);
        return {
          inlineStyle: style,
          paddingBottom: computed.paddingBottom,
          paddingTop: computed.paddingTop,
          position: computed.position
        };
      }
      
      // Check for ::before or ::after pseudo elements
      const before = window.getComputedStyle(el, '::before');
      const after = window.getComputedStyle(el, '::after');
      
      if (before.paddingBottom !== '0px' || after.paddingBottom !== '0px') {
        return {
          pseudoElement: true,
          beforePaddingBottom: before.paddingBottom,
          afterPaddingBottom: after.paddingBottom
        };
      }
      
      return null;
    });
    
    if (paddingTrick) {
      console.log('\nAspect Ratio Maintenance Technique:');
      console.log(JSON.stringify(paddingTrick, null, 2));
    }
    
    // Analyze grid/column layout
    const parentContainer = await firstItem.evaluateHandle(el => el.parentElement);
    const gridInfo = await parentContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        gridTemplateColumns: computed.gridTemplateColumns,
        gridGap: computed.gridGap,
        gap: computed.gap,
        columnGap: computed.columnGap,
        rowGap: computed.rowGap,
        flexDirection: computed.flexDirection,
        flexWrap: computed.flexWrap,
        justifyContent: computed.justifyContent
      };
    });
    
    console.log('\nParent Container Layout Properties:');
    console.log(JSON.stringify(gridInfo, null, 2));
    
    // Calculate columns
    if (categoryItems.length > 1) {
      const positions = await Promise.all(
        categoryItems.slice(0, Math.min(10, categoryItems.length)).map(async (item) => {
          const box = await item.boundingBox();
          if (!box) return null;
          return { x: box.x, y: box.y, width: box.width, height: box.height };
        })
      );
      
      // Filter out null values
      const validPositions = positions.filter(pos => pos !== null);
      
      // Group by Y position to determine rows
      const rows = {};
      validPositions.forEach(pos => {
        const roundedY = Math.round(pos.y);
        if (!rows[roundedY]) {
          rows[roundedY] = [];
        }
        rows[roundedY].push(pos);
      });
      
      const firstRow = Object.values(rows)[0];
      console.log(`\nNumber of columns: ${firstRow.length}`);
      
      // Calculate gaps
      if (firstRow.length > 1) {
        const gap = firstRow[1].x - (firstRow[0].x + firstRow[0].width);
        console.log(`Horizontal gap between items: ${gap}px`);
      }
      
      // Calculate vertical gap if multiple rows
      const rowKeys = Object.keys(rows).map(Number).sort((a, b) => a - b);
      if (rowKeys.length > 1) {
        const firstRowY = rowKeys[0];
        const secondRowY = rowKeys[1];
        const firstRowItem = rows[firstRowY][0];
        const verticalGap = secondRowY - (firstRowY + firstRowItem.height);
        console.log(`Vertical gap between rows: ${verticalGap}px`);
      }
    }
  }
  
  // Take a screenshot for reference
  await page.screenshot({ path: 'on-website-categories.png', fullPage: false });
  console.log('\nScreenshot saved as on-website-categories.png');
  
  await browser.close();
})();