const { chromium } = require('playwright');

async function analyzeResponsiveAlignment() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Analyzing on.com responsive content alignment...\n');
  
  const breakpoints = [
    { name: 'Desktop XL', width: 1920, height: 1080 },
    { name: 'Desktop L', width: 1440, height: 900 },
    { name: 'Desktop M', width: 1280, height: 800 },
    { name: 'Tablet L', width: 1024, height: 768 },
    { name: 'Tablet P', width: 768, height: 1024 },
    { name: 'Mobile L', width: 480, height: 854 },
    { name: 'Mobile S', width: 375, height: 667 }
  ];
  
  for (const bp of breakpoints) {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    
    try {
      await page.goto('https://www.on.com/', { 
        waitUntil: 'domcontentloaded', 
        timeout: 30000 
      });
      await page.waitForTimeout(2000);
    } catch (error) {
      console.log(`Error loading ${bp.name}: ${error.message}`);
      continue;
    }
    
    const alignment = await page.evaluate(() => {
      // Find the main content area
      const heroTitle = document.querySelector('h1');
      const sectionHeadings = Array.from(document.querySelectorAll('h2, h3')).slice(0, 3);
      const contentElements = [];
      
      if (heroTitle) {
        const rect = heroTitle.getBoundingClientRect();
        if (rect.left >= 0) {
          contentElements.push({
            name: 'Hero Title',
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            padding: parseInt(window.getComputedStyle(heroTitle).paddingLeft) || 0
          });
        }
      }
      
      sectionHeadings.forEach((heading, index) => {
        const rect = heading.getBoundingClientRect();
        if (rect.left >= 0 && rect.width > 50) {
          contentElements.push({
            name: `Section H${heading.tagName.slice(-1)} ${index + 1}`,
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            padding: parseInt(window.getComputedStyle(heading).paddingLeft) || 0
          });
        }
      });
      
      // Also check for main container
      const mainContainers = document.querySelectorAll('main, [class*="container"]');
      const container = Array.from(mainContainers).find(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 200 && rect.left >= 0;
      });
      
      if (container) {
        const rect = container.getBoundingClientRect();
        const styles = window.getComputedStyle(container);
        contentElements.push({
          name: 'Main Container',
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          padding: parseInt(styles.paddingLeft) || 0,
          maxWidth: styles.maxWidth
        });
      }
      
      return contentElements;
    });
    
    console.log(`=== ${bp.name} (${bp.width}x${bp.height}) ===`);
    
    if (alignment.length > 0) {
      alignment.forEach(item => {
        console.log(`${item.name}: ${item.left}px left, ${item.width}px wide, ${item.padding}px padding${item.maxWidth ? `, max-width: ${item.maxWidth}` : ''}`);
      });
      
      const leftPositions = alignment.map(a => a.left).filter(left => left > 0);
      const uniquePositions = [...new Set(leftPositions)];
      
      if (uniquePositions.length > 0) {
        console.log(`Primary content alignment: ${Math.min(...uniquePositions)}px`);
      }
    } else {
      console.log('No content elements found');
    }
    
    console.log('');
  }
  
  await browser.close();
}

analyzeResponsiveAlignment().catch(console.error);