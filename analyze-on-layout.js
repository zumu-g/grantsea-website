const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://on.com', { waitUntil: 'networkidle' });
    
    // Wait a bit for dynamic content
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ path: 'on-com-homepage-analysis.png', fullPage: false });
    
    // Analyze hero section
    const heroAnalysis = await page.evaluate(() => {
      // Find hero section - could be various selectors
      const heroSection = document.querySelector('[data-testid*="hero"]') || 
                         document.querySelector('section:first-of-type') || 
                         document.querySelector('div[style*="100vh"]') ||
                         document.querySelector('div[style*="height: 100"]');
      
      // Find main heading - various possibilities
      const mainHeading = document.querySelector('h1') || 
                         document.querySelector('[data-testid*="heading"]') ||
                         document.querySelector('[data-testid*="title"]') ||
                         document.querySelector('section h2') ||
                         document.querySelector('div h1, div h2, div h3');
      
      // Find shop by category section
      const shopSection = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find(el => 
        el.textContent.toLowerCase().includes('shop') && el.textContent.toLowerCase().includes('category')
      );
      
      const result = {
        hero: null,
        shopByCategory: null,
        allHeadings: []
      };
      
      // Collect all headings for analysis
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        result.allHeadings.push({
          tagName: h.tagName,
          text: h.textContent.trim(),
          styles: {
            textAlign: window.getComputedStyle(h).textAlign,
            fontSize: window.getComputedStyle(h).fontSize,
            fontWeight: window.getComputedStyle(h).fontWeight,
            display: window.getComputedStyle(h).display
          }
        });
      });
      
      if (mainHeading) {
        const rect = mainHeading.getBoundingClientRect();
        const styles = window.getComputedStyle(mainHeading);
        const parentStyles = window.getComputedStyle(mainHeading.parentElement);
        
        result.hero = {
          text: mainHeading.textContent.trim(),
          positioning: {
            textAlign: styles.textAlign,
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            centerX: rect.left + rect.width / 2,
            viewportWidth: window.innerWidth
          },
          styles: {
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            lineHeight: styles.lineHeight,
            letterSpacing: styles.letterSpacing,
            color: styles.color
          },
          parentContainer: {
            display: parentStyles.display,
            justifyContent: parentStyles.justifyContent,
            alignItems: parentStyles.alignItems,
            textAlign: parentStyles.textAlign,
            width: mainHeading.parentElement.getBoundingClientRect().width,
            maxWidth: parentStyles.maxWidth
          }
        };
      }
      
      if (shopSection) {
        const rect = shopSection.getBoundingClientRect();
        const styles = window.getComputedStyle(shopSection);
        const parentStyles = window.getComputedStyle(shopSection.parentElement);
        
        result.shopByCategory = {
          text: shopSection.textContent.trim(),
          positioning: {
            textAlign: styles.textAlign,
            left: rect.left,
            top: rect.top,
            width: rect.width
          },
          styles: {
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            lineHeight: styles.lineHeight,
            marginBottom: styles.marginBottom,
            paddingBottom: styles.paddingBottom
          },
          parentContainer: {
            display: parentStyles.display,
            justifyContent: parentStyles.justifyContent,
            alignItems: parentStyles.alignItems,
            textAlign: parentStyles.textAlign,
            maxWidth: parentStyles.maxWidth,
            padding: parentStyles.padding,
            margin: parentStyles.margin
          }
        };
      }
      
      return result;
    });
    
    console.log('=== ON.COM LAYOUT ANALYSIS ===');
    console.log('Hero Section Analysis:', JSON.stringify(heroAnalysis.hero, null, 2));
    console.log('\nShop by Category Analysis:', JSON.stringify(heroAnalysis.shopByCategory, null, 2));
    console.log('\nAll Headings Found:', JSON.stringify(heroAnalysis.allHeadings.slice(0, 10), null, 2));
    
    // Save results to file
    const fs = require('fs');
    fs.writeFileSync('on-com-layout-analysis.json', JSON.stringify(heroAnalysis, null, 2));
    
    await browser.close();
    console.log('\nAnalysis complete. Screenshot saved as on-com-homepage-analysis.png');
    console.log('Analysis data saved as on-com-layout-analysis.json');
    
  } catch (error) {
    console.error('Error analyzing on.com:', error.message);
  }
})();