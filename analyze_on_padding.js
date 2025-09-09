const { chromium } = require('playwright');

async function analyzePadding() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Analyzing on.com homepage padding...\n');
  
  // Test different viewport sizes
  const viewports = [
    { name: 'Desktop Large', width: 1440, height: 900 },
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Tablet', width: 1024, height: 768 },
    { name: 'Mobile', width: 768, height: 1024 }
  ];
  
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    try {
      await page.goto('https://www.on.com/', { 
        waitUntil: 'domcontentloaded', 
        timeout: 60000 
      });
      await page.waitForTimeout(3000); // Wait for any animations
    } catch (error) {
      console.log(`Error loading page for ${viewport.name}: ${error.message}`);
      continue;
    }
    
    console.log(`\n=== ${viewport.name} (${viewport.width}x${viewport.height}) ===\n`);
    
    // Analyze major sections
    const sections = await page.evaluate(() => {
      const results = [];
      
      // Helper function to get computed styles
      const getStyles = (element) => {
        const computed = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          paddingLeft: computed.paddingLeft,
          marginLeft: computed.marginLeft,
          left: rect.left,
          width: rect.width,
          maxWidth: computed.maxWidth,
          position: computed.position,
          display: computed.display
        };
      };
      
      // 1. Hero Section
      const heroSelectors = [
        '[data-testid="hero"]',
        '.hero',
        'section:first-of-type',
        'main > div:first-child',
        '[class*="hero"]',
        '[class*="Hero"]'
      ];
      
      let hero = null;
      for (const selector of heroSelectors) {
        hero = document.querySelector(selector);
        if (hero) break;
      }
      
      if (hero) {
        const heroContent = hero.querySelector('[class*="content"], [class*="Content"], .container, div > h1, div > h2');
        results.push({
          section: 'Hero',
          element: hero.className || hero.tagName,
          styles: getStyles(hero),
          contentStyles: heroContent ? getStyles(heroContent) : null
        });
      }
      
      // 2. Navigation/Header
      const header = document.querySelector('header, [role="banner"], nav');
      if (header) {
        const headerContent = header.querySelector('.container, [class*="container"], div > a');
        results.push({
          section: 'Header',
          element: header.className || header.tagName,
          styles: getStyles(header),
          contentStyles: headerContent ? getStyles(headerContent) : null
        });
      }
      
      // 3. Product Grid/Categories
      const categorySelectors = [
        '[data-testid*="category"]',
        '[class*="category"]',
        '[class*="Category"]',
        '[class*="collection"]',
        'section:has(a[href*="/collection"])',
        'section:has(a[href*="/category"])'
      ];
      
      for (const selector of categorySelectors) {
        const categories = document.querySelectorAll(selector);
        categories.forEach((cat, index) => {
          if (cat && !results.find(r => r.element === cat.className)) {
            const content = cat.querySelector('.container, [class*="container"], > div');
            results.push({
              section: `Category Section ${index + 1}`,
              element: cat.className || cat.tagName,
              styles: getStyles(cat),
              contentStyles: content ? getStyles(content) : null
            });
          }
        });
      }
      
      // 4. Product Carousels
      const carouselSelectors = [
        '[class*="carousel"]',
        '[class*="Carousel"]',
        '[class*="slider"]',
        '[class*="Slider"]',
        'section:has([class*="swiper"])'
      ];
      
      for (const selector of carouselSelectors) {
        const carousels = document.querySelectorAll(selector);
        carousels.forEach((carousel, index) => {
          if (carousel && !results.find(r => r.element === carousel.className)) {
            const content = carousel.querySelector('.container, [class*="container"], > div');
            results.push({
              section: `Carousel ${index + 1}`,
              element: carousel.className || carousel.tagName,
              styles: getStyles(carousel),
              contentStyles: content ? getStyles(content) : null
            });
          }
        });
      }
      
      // 5. All main sections
      const mainSections = document.querySelectorAll('main > section, main > div > section, [data-testid*="section"]');
      mainSections.forEach((section, index) => {
        if (!results.find(r => r.element === section.className)) {
          const content = section.querySelector('.container, [class*="container"], > div');
          results.push({
            section: `Main Section ${index + 1}`,
            element: section.className || section.tagName,
            styles: getStyles(section),
            contentStyles: content ? getStyles(content) : null
          });
        }
      });
      
      // 6. Footer
      const footer = document.querySelector('footer, [role="contentinfo"]');
      if (footer) {
        const footerContent = footer.querySelector('.container, [class*="container"], > div');
        results.push({
          section: 'Footer',
          element: footer.className || footer.tagName,
          styles: getStyles(footer),
          contentStyles: footerContent ? getStyles(footerContent) : null
        });
      }
      
      return results;
    });
    
    // Display results
    sections.forEach(section => {
      console.log(`${section.section}:`);
      console.log(`  Element: ${section.element}`);
      console.log(`  Container styles:`);
      console.log(`    - Left position: ${section.styles.left}px`);
      console.log(`    - Padding-left: ${section.styles.paddingLeft}`);
      console.log(`    - Margin-left: ${section.styles.marginLeft}`);
      console.log(`    - Max-width: ${section.styles.maxWidth}`);
      
      if (section.contentStyles) {
        console.log(`  Content styles:`);
        console.log(`    - Left position: ${section.contentStyles.left}px`);
        console.log(`    - Padding-left: ${section.contentStyles.paddingLeft}`);
        console.log(`    - Margin-left: ${section.contentStyles.marginLeft}`);
      }
      console.log('');
    });
    
    // Calculate alignment consistency
    const leftPositions = sections
      .map(s => s.contentStyles?.left || s.styles.left)
      .filter(pos => pos !== undefined);
    
    const uniquePositions = [...new Set(leftPositions)];
    console.log(`Unique left positions found: ${uniquePositions.join(', ')}`);
    
    // Take screenshot for visual reference
    await page.screenshot({ 
      path: `on-homepage-${viewport.name.toLowerCase().replace(' ', '-')}.png`,
      fullPage: true 
    });
  }
  
  // Additional container analysis
  console.log('\n=== Container Structure Analysis ===\n');
  
  await page.setViewportSize({ width: 1440, height: 900 });
  try {
    await page.goto('https://www.on.com/', { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
  } catch (error) {
    console.log(`Error loading page for container analysis: ${error.message}`);
    await browser.close();
    return;
  }
  
  const containerAnalysis = await page.evaluate(() => {
    const containers = document.querySelectorAll('.container, [class*="container"], [class*="Container"]');
    const analysis = [];
    
    containers.forEach((container, index) => {
      const computed = window.getComputedStyle(container);
      const rect = container.getBoundingClientRect();
      const parent = container.parentElement;
      
      analysis.push({
        index: index + 1,
        class: container.className,
        width: rect.width,
        maxWidth: computed.maxWidth,
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
        marginLeft: computed.marginLeft,
        marginRight: computed.marginRight,
        leftOffset: rect.left,
        parent: parent ? parent.tagName + (parent.className ? '.' + parent.className : '') : 'none'
      });
    });
    
    return analysis;
  });
  
  console.log('Container elements found:');
  containerAnalysis.forEach(container => {
    console.log(`Container ${container.index}:`);
    console.log(`  Class: ${container.class}`);
    console.log(`  Width: ${container.width}px`);
    console.log(`  Max-width: ${container.maxWidth}`);
    console.log(`  Padding: ${container.paddingLeft} / ${container.paddingRight}`);
    console.log(`  Margin: ${container.marginLeft} / ${container.marginRight}`);
    console.log(`  Left offset: ${container.leftOffset}px`);
    console.log(`  Parent: ${container.parent}`);
    console.log('');
  });
  
  await browser.close();
}

analyzePadding().catch(console.error);