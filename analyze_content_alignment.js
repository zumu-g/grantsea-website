const { chromium } = require('playwright');

async function analyzeContentAlignment() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Analyzing on.com content alignment patterns...\n');
  
  // Desktop analysis
  await page.setViewportSize({ width: 1440, height: 900 });
  
  try {
    await page.goto('https://www.on.com/', { 
      waitUntil: 'domcontentloaded', 
      timeout: 45000 
    });
    await page.waitForTimeout(4000);
  } catch (error) {
    console.log(`Error loading page: ${error.message}`);
    await browser.close();
    return;
  }
  
  // Focus on content elements and their left alignment
  const contentAlignment = await page.evaluate(() => {
    const results = [];
    
    // Helper to get content alignment info
    const analyzeElement = (element, name) => {
      const rect = element.getBoundingClientRect();
      const computed = window.getComputedStyle(element);
      
      return {
        name,
        className: element.className,
        tagName: element.tagName,
        leftPosition: Math.round(rect.left),
        width: Math.round(rect.width),
        paddingLeft: parseInt(computed.paddingLeft) || 0,
        marginLeft: parseInt(computed.marginLeft) || 0,
        maxWidth: computed.maxWidth,
        textAlign: computed.textAlign
      };
    };
    
    // 1. Hero section content
    const heroSelectors = [
      'h1', 'h2',
      '[class*="hero"] h1, [class*="hero"] h2',
      '[data-testid*="hero"] h1, [data-testid*="hero"] h2'
    ];
    
    for (const selector of heroSelectors) {
      const heroTitle = document.querySelector(selector);
      if (heroTitle && heroTitle.getBoundingClientRect().left > 0) {
        results.push(analyzeElement(heroTitle, `Hero Title (${selector})`));
        break;
      }
    }
    
    // 2. Section headings
    const headings = document.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      if (index < 8) { // First 8 headings
        const rect = heading.getBoundingClientRect();
        if (rect.left > 0 && rect.width > 50) {
          results.push(analyzeElement(heading, `Section Heading ${index + 1}`));
        }
      }
    });
    
    // 3. Product grid containers
    const productContainers = document.querySelectorAll(
      '[class*="product"], [class*="grid"], [class*="collection"], [data-testid*="product"]'
    );
    
    productContainers.forEach((container, index) => {
      if (index < 5) {
        const rect = container.getBoundingClientRect();
        if (rect.left >= 0 && rect.width > 100) {
          results.push(analyzeElement(container, `Product Container ${index + 1}`));
        }
      }
    });
    
    // 4. Navigation links (in header)
    const navLinks = document.querySelectorAll('nav a, header a');
    if (navLinks.length > 0) {
      const firstNavLink = navLinks[0];
      if (firstNavLink.getBoundingClientRect().left > 0) {
        results.push(analyzeElement(firstNavLink, 'First Navigation Link'));
      }
    }
    
    // 5. Content paragraphs/text blocks
    const textBlocks = document.querySelectorAll('p, [class*="text"], [class*="description"]');
    textBlocks.forEach((text, index) => {
      if (index < 5) {
        const rect = text.getBoundingClientRect();
        if (rect.left > 0 && rect.width > 200) {
          results.push(analyzeElement(text, `Text Block ${index + 1}`));
        }
      }
    });
    
    return results.filter(r => r.leftPosition > 0);
  });
  
  console.log('=== Desktop Content Alignment Analysis ===\n');
  
  contentAlignment.forEach(item => {
    console.log(`${item.name}:`);
    console.log(`  Element: ${item.tagName}.${item.className}`);
    console.log(`  Left position: ${item.leftPosition}px`);
    console.log(`  Width: ${item.width}px`);
    console.log(`  Padding-left: ${item.paddingLeft}px`);
    console.log(`  Max-width: ${item.maxWidth}`);
    console.log(`  Text-align: ${item.textAlign}`);
    console.log('');
  });
  
  // Group by left position to find alignment patterns
  const alignmentGroups = {};
  contentAlignment.forEach(item => {
    const leftPos = item.leftPosition;
    if (!alignmentGroups[leftPos]) {
      alignmentGroups[leftPos] = [];
    }
    alignmentGroups[leftPos].push(item.name);
  });
  
  console.log('=== Alignment Groups ===\n');
  Object.keys(alignmentGroups)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(position => {
      console.log(`${position}px alignment:`);
      alignmentGroups[position].forEach(name => {
        console.log(`  - ${name}`);
      });
      console.log('');
    });
  
  // Calculate the main content left margin
  const contentPositions = contentAlignment
    .filter(item => !item.name.includes('Navigation'))
    .map(item => item.leftPosition);
  
  const mostCommonPosition = contentPositions
    .sort((a,b) => contentPositions.filter(v => v===a).length - contentPositions.filter(v => v===b).length)
    .pop();
  
  console.log(`Most common content left position: ${mostCommonPosition}px`);
  console.log(`All content left positions: ${[...new Set(contentPositions)].sort((a,b) => a-b).join('px, ')}px`);
  
  // Take a screenshot with overlay showing alignment
  await page.addStyleTag({
    content: `
      body::before {
        content: '';
        position: fixed;
        left: ${mostCommonPosition}px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: red;
        z-index: 9999;
        opacity: 0.7;
      }
    `
  });
  
  await page.screenshot({ 
    path: 'on-content-alignment-desktop.png',
    fullPage: false 
  });
  
  await browser.close();
}

analyzeContentAlignment().catch(console.error);