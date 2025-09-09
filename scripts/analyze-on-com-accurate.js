const { chromium } = require('playwright');

async function analyzeOnComAccurately() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Analyzing on.com for accurate style extraction...\n');
  
  // Navigate to on.com
  await page.goto('https://www.on.com/en-au/', { waitUntil: 'networkidle' });
  
  // Extract exact styles
  const styles = await page.evaluate(() => {
    const getComputedStyles = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const computed = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      
      return {
        // Layout
        position: computed.position,
        display: computed.display,
        width: computed.width,
        height: computed.height,
        padding: computed.padding,
        margin: computed.margin,
        
        // Typography
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
        textTransform: computed.textTransform,
        
        // Colors
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        
        // Visual
        borderRadius: computed.borderRadius,
        boxShadow: computed.boxShadow,
        
        // Measurements
        actualWidth: rect.width + 'px',
        actualHeight: rect.height + 'px',
        
        // Raw HTML structure
        html: element.outerHTML.substring(0, 200) + '...',
        classes: element.className
      };
    };
    
    return {
      // Header analysis
      header: {
        container: getComputedStyles('header'),
        nav: getComputedStyles('header nav'),
        navLinks: Array.from(document.querySelectorAll('header nav a')).slice(0, 3).map(a => ({
          text: a.textContent,
          styles: window.getComputedStyle(a),
          href: a.href
        })),
        logo: getComputedStyles('header a[href="/"]'),
        structure: document.querySelector('header')?.innerHTML.substring(0, 500)
      },
      
      // Hero section
      hero: {
        section: getComputedStyles('main > section:first-child'),
        heading: getComputedStyles('h1'),
        subheading: getComputedStyles('main > section:first-child p'),
        buttons: Array.from(document.querySelectorAll('main > section:first-child a[href*="shop"]')).map(btn => ({
          text: btn.textContent,
          styles: window.getComputedStyle(btn),
          classes: btn.className
        }))
      },
      
      // Category grid
      categories: {
        container: getComputedStyles('main section:nth-child(2)'),
        grid: getComputedStyles('main section:nth-child(2) > div > div'),
        items: Array.from(document.querySelectorAll('main section:nth-child(2) a')).slice(0, 4).map(item => ({
          styles: window.getComputedStyle(item),
          image: item.querySelector('img')?.src,
          text: item.querySelector('span')?.textContent,
          dimensions: item.getBoundingClientRect()
        }))
      },
      
      // Global styles
      global: {
        bodyFont: window.getComputedStyle(document.body).fontFamily,
        primaryColor: getComputedStyles('h1')?.color,
        backgroundColor: window.getComputedStyle(document.body).backgroundColor
      }
    };
  });
  
  // Take screenshots of key sections
  await page.screenshot({ path: 'on-com-full-page.png', fullPage: true });
  
  // Screenshot just the header
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: 'on-com-header-only.png' });
  }
  
  // Screenshot hero section
  const hero = await page.$('main > section:first-child');
  if (hero) {
    await hero.screenshot({ path: 'on-com-hero-only.png' });
  }
  
  // Generate exact CSS to match
  const cssOutput = `
/* ON.COM EXACT STYLES - Extracted ${new Date().toISOString()} */

/* Global Reset to match on.com */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${styles.global.bodyFont};
  background-color: ${styles.global.backgroundColor};
  color: ${styles.global.primaryColor};
}

/* Header - Exact Match */
header {
  position: ${styles.header.container?.position};
  width: ${styles.header.container?.width};
  height: ${styles.header.container?.actualHeight};
  padding: ${styles.header.container?.padding};
  background-color: ${styles.header.container?.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
}

/* Navigation Links - Exact Match */
header nav a {
  font-size: ${styles.header.navLinks[0]?.styles.fontSize};
  font-weight: ${styles.header.navLinks[0]?.styles.fontWeight};
  color: ${styles.header.navLinks[0]?.styles.color};
  text-decoration: none;
  margin: 0 ${styles.header.navLinks[0]?.styles.marginRight || '24px'};
  letter-spacing: ${styles.header.navLinks[0]?.styles.letterSpacing};
}

/* Hero Section - Exact Match */
.hero-section {
  height: ${styles.hero.section?.actualHeight || '100vh'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-section h1 {
  font-size: ${styles.hero.heading?.fontSize};
  font-weight: ${styles.hero.heading?.fontWeight};
  line-height: ${styles.hero.heading?.lineHeight};
  letter-spacing: ${styles.hero.heading?.letterSpacing};
  color: ${styles.hero.heading?.color};
  margin-bottom: 24px;
}

/* Category Grid - Exact Match */
.category-grid {
  display: grid;
  grid-template-columns: repeat(${Math.round(1200 / (styles.categories.items[0]?.dimensions.width || 400))}, 1fr);
  gap: ${styles.categories.items[0]?.styles.marginRight || '4px'};
  padding: ${styles.categories.container?.padding};
}

.category-item {
  width: ${styles.categories.items[0]?.dimensions.width}px;
  height: ${styles.categories.items[0]?.dimensions.height}px;
  position: relative;
  overflow: hidden;
  border-radius: ${styles.categories.items[0]?.styles.borderRadius};
}
`;

  // Save the analysis
  const fs = require('fs');
  fs.writeFileSync('on-com-exact-styles.json', JSON.stringify(styles, null, 2));
  fs.writeFileSync('on-com-exact-styles.css', cssOutput);
  
  // Create implementation guide
  const implementationGuide = `
# ON.COM EXACT IMPLEMENTATION GUIDE

## Key Differences from Current Implementation

### 1. Header Structure
ON.COM:
- Height: ${styles.header.container?.actualHeight}
- Position: ${styles.header.container?.position}
- Background: ${styles.header.container?.backgroundColor}

Your Current:
- Height: 90px (should be ${styles.header.container?.actualHeight})
- Using absolute positioning (should be ${styles.header.container?.position})

### 2. Navigation Typography
ON.COM:
- Font Size: ${styles.header.navLinks[0]?.styles.fontSize}
- Font Weight: ${styles.header.navLinks[0]?.styles.fontWeight}
- Letter Spacing: ${styles.header.navLinks[0]?.styles.letterSpacing}

Your Current:
- Font Size: 16px (too small)
- Font Weight: 500 (too light)

### 3. Hero Section
ON.COM:
- Height: ${styles.hero.section?.actualHeight}
- H1 Size: ${styles.hero.heading?.fontSize}
- H1 Weight: ${styles.hero.heading?.fontWeight}

### 4. Category Grid
ON.COM:
- Item Width: ${styles.categories.items[0]?.dimensions.width}px
- Item Height: ${styles.categories.items[0]?.dimensions.height}px
- Gap: Minimal (${styles.categories.items[0]?.styles.marginRight || '4px'})

## Implementation Steps

1. DO NOT modify Anima components directly
2. Create wrapper components that match these exact dimensions
3. Use the extracted CSS as override styles
4. Test at exact viewport width: 1440px
`;
  
  fs.writeFileSync('on-com-implementation-guide.md', implementationGuide);
  
  console.log('\n✅ Analysis complete! Generated:');
  console.log('- on-com-exact-styles.json');
  console.log('- on-com-exact-styles.css');
  console.log('- on-com-implementation-guide.md');
  console.log('- Screenshots of key sections\n');
  
  await browser.close();
}

// Run the analysis
analyzeOnComAccurately().catch(console.error);