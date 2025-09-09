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
  
  console.log('\n=== DETAILED ANALYSIS OF ON.COM CATEGORY SECTION ===\n');
  
  // Find the category section using the successful selector
  const categoryItems = await page.locator('h2:has-text("Shop by category") ~ div a:has(img)').all();
  
  console.log(`Total category items found: ${categoryItems.length}\n`);
  
  if (categoryItems.length > 0) {
    // Get the parent container that holds all categories
    const parentContainer = await categoryItems[0].evaluateHandle(el => {
      // Find the common parent that contains all category items
      let parent = el.parentElement;
      while (parent && parent.querySelectorAll('a:has(img)').length < 2) {
        parent = parent.parentElement;
      }
      return parent;
    });
    
    // Analyze the parent container's grid/flex properties
    const containerStyles = await parentContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      return {
        dimensions: {
          width: rect.width,
          height: rect.height
        },
        display: computed.display,
        gridProperties: {
          gridTemplateColumns: computed.gridTemplateColumns,
          gridTemplateRows: computed.gridTemplateRows,
          gridGap: computed.gridGap,
          gap: computed.gap,
          columnGap: computed.columnGap,
          rowGap: computed.rowGap,
          gridAutoFlow: computed.gridAutoFlow,
          gridAutoColumns: computed.gridAutoColumns,
          gridAutoRows: computed.gridAutoRows
        },
        flexProperties: {
          flexDirection: computed.flexDirection,
          flexWrap: computed.flexWrap,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,
          flexGap: computed.gap
        },
        spacing: {
          padding: computed.padding,
          margin: computed.margin
        }
      };
    });
    
    console.log('PARENT CONTAINER ANALYSIS:');
    console.log(JSON.stringify(containerStyles, null, 2));
    
    // Analyze individual category items
    console.log('\n\nINDIVIDUAL CATEGORY ITEM ANALYSIS:');
    
    for (let i = 0; i < Math.min(3, categoryItems.length); i++) {
      const item = categoryItems[i];
      const analysis = await item.evaluate((el, index) => {
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        const img = el.querySelector('img');
        const imgComputed = img ? window.getComputedStyle(img) : null;
        const imgRect = img ? img.getBoundingClientRect() : null;
        
        // Check for aspect ratio maintenance techniques
        const aspectRatioInfo = {};
        
        // Check CSS aspect-ratio property
        aspectRatioInfo.cssAspectRatio = computed.aspectRatio;
        
        // Check for padding-bottom trick
        const wrapper = el.querySelector('div[style*="padding-bottom"], div[style*="padding-top"]');
        if (wrapper) {
          const wrapperStyle = window.getComputedStyle(wrapper);
          aspectRatioInfo.paddingTrick = {
            paddingBottom: wrapperStyle.paddingBottom,
            paddingTop: wrapperStyle.paddingTop,
            position: wrapperStyle.position
          };
        }
        
        // Check for intrinsic sizing
        if (img) {
          aspectRatioInfo.imageProperties = {
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            displayWidth: imgRect.width,
            displayHeight: imgRect.height,
            objectFit: imgComputed.objectFit,
            objectPosition: imgComputed.objectPosition
          };
        }
        
        return {
          itemIndex: index,
          dimensions: {
            width: rect.width,
            height: rect.height,
            aspectRatio: (rect.width / rect.height).toFixed(3)
          },
          position: {
            x: rect.x,
            y: rect.y
          },
          styles: {
            display: computed.display,
            position: computed.position,
            overflow: computed.overflow,
            borderRadius: computed.borderRadius
          },
          aspectRatioInfo
        };
      }, i);
      
      console.log(`\nCategory Item ${i + 1}:`);
      console.log(JSON.stringify(analysis, null, 2));
    }
    
    // Calculate grid metrics
    console.log('\n\nGRID METRICS CALCULATION:');
    
    const allPositions = await Promise.all(
      categoryItems.map(async (item) => {
        const box = await item.boundingBox();
        if (!box) return null;
        return { x: box.x, y: box.y, width: box.width, height: box.height };
      })
    );
    
    const validPositions = allPositions.filter(pos => pos !== null);
    
    // Group by Y position with tolerance
    const rows = {};
    validPositions.forEach(pos => {
      const roundedY = Math.round(pos.y / 10) * 10; // Round to nearest 10px
      if (!rows[roundedY]) {
        rows[roundedY] = [];
      }
      rows[roundedY].push(pos);
    });
    
    const sortedRows = Object.entries(rows).sort(([a], [b]) => Number(a) - Number(b));
    
    console.log(`\nNumber of rows: ${sortedRows.length}`);
    sortedRows.forEach(([y, items], index) => {
      console.log(`Row ${index + 1}: ${items.length} items at Y position ~${y}px`);
    });
    
    // Calculate gaps
    if (sortedRows.length > 0) {
      const firstRow = sortedRows[0][1];
      if (firstRow.length > 1) {
        const gaps = [];
        for (let i = 0; i < firstRow.length - 1; i++) {
          const gap = firstRow[i + 1].x - (firstRow[i].x + firstRow[i].width);
          gaps.push(gap);
        }
        console.log(`\nHorizontal gaps: ${gaps.map(g => g.toFixed(1) + 'px').join(', ')}`);
        console.log(`Average horizontal gap: ${(gaps.reduce((a, b) => a + b, 0) / gaps.length).toFixed(1)}px`);
      }
      
      if (sortedRows.length > 1) {
        const verticalGaps = [];
        for (let i = 0; i < sortedRows.length - 1; i++) {
          const currentRow = sortedRows[i][1][0];
          const nextRow = sortedRows[i + 1][1][0];
          const gap = nextRow.y - (currentRow.y + currentRow.height);
          verticalGaps.push(gap);
        }
        console.log(`\nVertical gaps: ${verticalGaps.map(g => g.toFixed(1) + 'px').join(', ')}`);
        console.log(`Average vertical gap: ${(verticalGaps.reduce((a, b) => a + b, 0) / verticalGaps.length).toFixed(1)}px`);
      }
    }
  }
  
  await browser.close();
})();