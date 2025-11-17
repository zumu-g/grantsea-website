const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://on.com', { waitUntil: 'networkidle' });
    
    // Wait for content to load
    await page.waitForTimeout(3000);
    
    // Analyze shop by category section in detail
    const shopCategoryAnalysis = await page.evaluate(() => {
      // Find the "Shop by category" heading
      const shopHeading = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find(el => 
        el.textContent.toLowerCase().includes('shop') && el.textContent.toLowerCase().includes('category')
      );
      
      if (!shopHeading) return { error: 'Shop by category section not found' };
      
      // Find the container/section that holds the shop by category content
      let container = shopHeading.parentElement;
      while (container && !container.querySelector('img, picture, [src]')) {
        container = container.parentElement;
        if (container === document.body) break;
      }
      
      const result = {
        heading: null,
        container: null,
        categoryItems: [],
        grid: null,
        spacing: null
      };
      
      // Analyze heading
      const headingRect = shopHeading.getBoundingClientRect();
      const headingStyles = window.getComputedStyle(shopHeading);
      result.heading = {
        text: shopHeading.textContent.trim(),
        positioning: {
          textAlign: headingStyles.textAlign,
          left: headingRect.left,
          top: headingRect.top,
          width: headingRect.width,
          marginLeft: headingStyles.marginLeft,
          marginRight: headingStyles.marginRight,
          paddingLeft: headingStyles.paddingLeft,
          paddingRight: headingStyles.paddingRight
        },
        typography: {
          fontSize: headingStyles.fontSize,
          fontWeight: headingStyles.fontWeight,
          lineHeight: headingStyles.lineHeight,
          letterSpacing: headingStyles.letterSpacing,
          textTransform: headingStyles.textTransform
        },
        spacing: {
          marginTop: headingStyles.marginTop,
          marginBottom: headingStyles.marginBottom,
          paddingTop: headingStyles.paddingTop,
          paddingBottom: headingStyles.paddingBottom
        }
      };
      
      // Analyze container
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const containerStyles = window.getComputedStyle(container);
        result.container = {
          positioning: {
            maxWidth: containerStyles.maxWidth,
            width: containerRect.width,
            left: containerRect.left,
            padding: containerStyles.padding,
            paddingLeft: containerStyles.paddingLeft,
            paddingRight: containerStyles.paddingRight,
            margin: containerStyles.margin,
            marginLeft: containerStyles.marginLeft,
            marginRight: containerStyles.marginRight
          },
          layout: {
            display: containerStyles.display,
            justifyContent: containerStyles.justifyContent,
            alignItems: containerStyles.alignItems
          }
        };
        
        // Find grid of category items (images/cards)
        const categoryElements = container.querySelectorAll('img, picture, [role="img"], [style*="background-image"]');
        const firstFewCategories = Array.from(categoryElements).slice(0, 6); // Get first 6 category items
        
        result.categoryItems = firstFewCategories.map((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemStyles = window.getComputedStyle(item);
          const parent = item.parentElement;
          const parentStyles = window.getComputedStyle(parent);
          
          return {
            index: index,
            element: item.tagName,
            size: {
              width: itemRect.width,
              height: itemRect.height,
              aspectRatio: (itemRect.height / itemRect.width).toFixed(3)
            },
            positioning: {
              left: itemRect.left,
              top: itemRect.top
            },
            spacing: {
              marginLeft: itemStyles.marginLeft,
              marginRight: itemStyles.marginRight,
              marginTop: itemStyles.marginTop,
              marginBottom: itemStyles.marginBottom,
              paddingLeft: itemStyles.paddingLeft,
              paddingRight: itemStyles.paddingRight,
              paddingTop: itemStyles.paddingTop,
              paddingBottom: itemStyles.paddingBottom
            },
            parent: {
              borderRadius: parentStyles.borderRadius,
              border: parentStyles.border,
              boxShadow: parentStyles.boxShadow,
              backgroundColor: parentStyles.backgroundColor,
              overflow: parentStyles.overflow
            }
          };
        });
        
        // Analyze grid layout if present
        const gridContainer = container.querySelector('[style*="grid"], [class*="grid"]') || 
                             Array.from(container.children).find(child => {
                               const styles = window.getComputedStyle(child);
                               return styles.display.includes('grid') || styles.gridTemplateColumns !== 'none';
                             });
        
        if (gridContainer) {
          const gridStyles = window.getComputedStyle(gridContainer);
          result.grid = {
            display: gridStyles.display,
            gridTemplateColumns: gridStyles.gridTemplateColumns,
            gridTemplateRows: gridStyles.gridTemplateRows,
            gap: gridStyles.gap,
            rowGap: gridStyles.rowGap,
            columnGap: gridStyles.columnGap,
            justifyContent: gridStyles.justifyContent,
            alignItems: gridStyles.alignItems
          };
        }
      }
      
      // Calculate spacing between items
      if (result.categoryItems.length >= 2) {
        const item1 = result.categoryItems[0];
        const item2 = result.categoryItems[1];
        result.spacing = {
          horizontalGap: item2.positioning.left - (item1.positioning.left + item1.size.width),
          verticalGap: 'tbd' // Would need items in different rows
        };
      }
      
      return result;
    });
    
    console.log('=== ON.COM SHOP BY CATEGORY DETAILED ANALYSIS ===');
    console.log('\n1. HEADING ANALYSIS:');
    console.log(JSON.stringify(shopCategoryAnalysis.heading, null, 2));
    
    console.log('\n2. CONTAINER ANALYSIS:');
    console.log(JSON.stringify(shopCategoryAnalysis.container, null, 2));
    
    console.log('\n3. CATEGORY ITEMS (First 6):');
    shopCategoryAnalysis.categoryItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, JSON.stringify(item, null, 2));
    });
    
    console.log('\n4. GRID LAYOUT:');
    console.log(JSON.stringify(shopCategoryAnalysis.grid, null, 2));
    
    console.log('\n5. SPACING ANALYSIS:');
    console.log(JSON.stringify(shopCategoryAnalysis.spacing, null, 2));
    
    // Save detailed analysis
    const fs = require('fs');
    fs.writeFileSync('on-com-shop-category-analysis.json', JSON.stringify(shopCategoryAnalysis, null, 2));
    
    // Take a focused screenshot of the shop category section
    if (shopCategoryAnalysis.heading) {
      await page.evaluate(() => {
        const shopHeading = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find(el => 
          el.textContent.toLowerCase().includes('shop') && el.textContent.toLowerCase().includes('category')
        );
        if (shopHeading) {
          shopHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'on-com-shop-category-section.png', fullPage: false });
    }
    
    await browser.close();
    
    // Generate recommendations
    console.log('\n=== RECOMMENDATIONS FOR GRANT\'S WEBSITE ===');
    
    if (shopCategoryAnalysis.heading) {
      console.log('\nHEADING FIXES NEEDED:');
      const heading = shopCategoryAnalysis.heading;
      console.log(`- Text alignment: Change to "${heading.positioning.textAlign}" (currently "left" in code)`);
      console.log(`- Font size: Should be ${heading.typography.fontSize} (currently "48px" in code)`);
      console.log(`- Font weight: Should be ${heading.typography.fontWeight} (currently "700" in code)`);
      console.log(`- Letter spacing: Should be ${heading.typography.letterSpacing} (currently "-0.48px" in code)`);
      console.log(`- Line height: Should be ${heading.typography.lineHeight} (currently "1.1" in code)`);
      console.log(`- Margin bottom: Should be ${heading.spacing.marginBottom} (currently "32px" in code)`);
      console.log(`- Text transform: Should be ${heading.typography.textTransform} (currently "none" in code)`);
    }
    
    if (shopCategoryAnalysis.container) {
      console.log('\nCONTAINER FIXES NEEDED:');
      const container = shopCategoryAnalysis.container;
      console.log(`- Max width: Should be ${container.positioning.maxWidth} (currently "1400px" in code)`);
      console.log(`- Padding: Should be ${container.positioning.padding} (currently "0 20px" in code)`);
      console.log(`- Margin: Should be ${container.positioning.margin} (currently "0 auto" in code)`);
    }
    
    if (shopCategoryAnalysis.grid) {
      console.log('\nGRID LAYOUT FIXES NEEDED:');
      const grid = shopCategoryAnalysis.grid;
      console.log(`- Display: Should be ${grid.display} (currently "grid" in code)`);
      console.log(`- Grid template columns: Should be ${grid.gridTemplateColumns} (currently "repeat(3, 1fr)" in code)`);
      console.log(`- Gap: Should be ${grid.gap} (currently "32px" in code)`);
    }
    
    if (shopCategoryAnalysis.categoryItems.length > 0) {
      console.log('\nCATEGORY ITEM FIXES NEEDED:');
      const firstItem = shopCategoryAnalysis.categoryItems[0];
      console.log(`- Aspect ratio: Items should be ${firstItem.size.aspectRatio} ratio (currently 148.15% padding-bottom = 1.48 ratio)`);
      console.log(`- Border radius: Should be ${firstItem.parent.borderRadius} (currently "4px" in code)`);
      console.log(`- Border: Should be ${firstItem.parent.border} (currently none in code)`);
      console.log(`- Box shadow: Should be ${firstItem.parent.boxShadow} (currently none in code)`);
    }
    
    if (shopCategoryAnalysis.spacing) {
      console.log('\nSPACING FIXES NEEDED:');
      const spacing = shopCategoryAnalysis.spacing;
      console.log(`- Horizontal gap between items: Should be ${spacing.horizontalGap}px (currently "32px" in code)`);
    }
    
    console.log('\nAnalysis complete! Check on-com-shop-category-analysis.json and on-com-shop-category-section.png');
    
  } catch (error) {
    console.error('Error analyzing shop category section:', error.message);
  }
})();