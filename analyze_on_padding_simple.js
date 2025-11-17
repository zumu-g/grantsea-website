const { chromium } = require('playwright');

async function analyzePadding() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Analyzing on.com homepage padding...\n');
  
  // Test different viewport sizes
  const viewports = [
    { name: 'Desktop', width: 1440, height: 900 },
    { name: 'Tablet', width: 1024, height: 768 },
    { name: 'Mobile', width: 768, height: 1024 }
  ];
  
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    
    try {
      await page.goto('https://www.on.com/', { 
        waitUntil: 'domcontentloaded', 
        timeout: 45000 
      });
      await page.waitForTimeout(3000);
    } catch (error) {
      console.log(`Error loading page for ${viewport.name}: ${error.message}`);
      continue;
    }
    
    console.log(`\n=== ${viewport.name} (${viewport.width}x${viewport.height}) ===\n`);
    
    // Analyze major sections with simpler selectors
    const results = await page.evaluate(() => {
      const sections = [];
      
      // Helper function to get computed styles
      const getStyles = (element) => {
        const computed = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          paddingLeft: parseInt(computed.paddingLeft) || 0,
          marginLeft: parseInt(computed.marginLeft) || 0,
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          maxWidth: computed.maxWidth
        };
      };
      
      // 1. Header
      const header = document.querySelector('header');
      if (header) {
        sections.push({
          name: 'Header',
          element: header,
          styles: getStyles(header)
        });
      }
      
      // 2. Main sections
      const mainSections = document.querySelectorAll('main section, main > div');
      mainSections.forEach((section, index) => {
        sections.push({
          name: `Main Section ${index + 1}`,
          element: section,
          styles: getStyles(section)
        });
      });
      
      // 3. All sections
      const allSections = document.querySelectorAll('section');
      allSections.forEach((section, index) => {
        if (index < 10) { // Limit to first 10 sections
          sections.push({
            name: `Section ${index + 1}`,
            element: section,
            styles: getStyles(section)
          });
        }
      });
      
      // 4. Container elements
      const containers = document.querySelectorAll('[class*="container"]');
      containers.forEach((container, index) => {
        if (index < 5) { // Limit to first 5 containers
          sections.push({
            name: `Container ${index + 1}`,
            element: container,
            styles: getStyles(container)
          });
        }
      });
      
      // Remove duplicates and return unique sections
      const uniqueSections = [];
      const seen = new Set();
      
      sections.forEach(section => {
        const key = `${section.name}-${section.styles.left}-${section.styles.width}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueSections.push(section);
        }
      });
      
      return uniqueSections;
    });
    
    // Display results
    results.forEach(section => {
      console.log(`${section.name}:`);
      console.log(`  Left position: ${section.styles.left}px`);
      console.log(`  Padding-left: ${section.styles.paddingLeft}px`);
      console.log(`  Margin-left: ${section.styles.marginLeft}px`);
      console.log(`  Width: ${section.styles.width}px`);
      console.log(`  Max-width: ${section.styles.maxWidth}`);
      console.log('');
    });
    
    // Calculate alignment consistency
    const leftPositions = results.map(r => r.styles.left).filter(pos => pos > 0);
    const uniquePositions = [...new Set(leftPositions)].sort((a, b) => a - b);
    
    console.log(`Left positions found: ${uniquePositions.join('px, ')}px`);
    console.log(`Most common left position: ${getMostCommon(leftPositions)}px`);
    
    // Take screenshot
    await page.screenshot({ 
      path: `on-homepage-${viewport.name.toLowerCase()}.png`,
      fullPage: false 
    });
  }
  
  // Function to find most common value
  function getMostCommon(arr) {
    const counts = {};
    arr.forEach(val => counts[val] = (counts[val] || 0) + 1);
    return Object.keys(counts).reduce((max, key) => 
      counts[key] > counts[max] ? key : max
    );
  }
  
  await browser.close();
}

analyzePadding().catch(console.error);