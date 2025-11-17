import { test, expect } from '@playwright/test';

test('Analyze ON homepage layout and full screen behavior', async ({ page }) => {
  await page.goto('https://www.on.com/en-au/?srsltid=AfmBOopd5_ffmfuHbSFiPEr8nbpw6wQvqKDNg7YmImxPyvRdtNF1aZPF');
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Get viewport size
  const viewportSize = page.viewportSize();
  console.log('Viewport size:', viewportSize);
  
  // Check if the page uses full width
  const bodyWidth = await page.evaluate(() => {
    const body = document.body;
    return {
      scrollWidth: body.scrollWidth,
      clientWidth: body.clientWidth,
      offsetWidth: body.offsetWidth,
      computedStyles: window.getComputedStyle(body)
    };
  });
  
  console.log('Body dimensions:', bodyWidth);
  
  // Check main container elements
  const mainElements = await page.evaluate(() => {
    const elements = ['main', '[role="main"]', '.main', '#main', '.container', '.wrapper'];
    const results: any[] = [];
    
    elements.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        results.push({
          selector,
          width: rect.width,
          height: rect.height,
          maxWidth: computedStyle.maxWidth,
          margin: computedStyle.margin,
          padding: computedStyle.padding
        });
      }
    });
    
    return results;
  });
  
  console.log('Main elements:', mainElements);
  
  // Check for any elements with max-width constraints
  const constrainedElements = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('*'));
    const constrained: any[] = [];
    
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.maxWidth && style.maxWidth !== 'none' && style.maxWidth !== '100%') {
        const rect = el.getBoundingClientRect();
        if (rect.width > 500) { // Only interested in significant containers
          constrained.push({
            tagName: el.tagName,
            className: el.className,
            maxWidth: style.maxWidth,
            actualWidth: rect.width,
            margin: style.margin
          });
        }
      }
    });
    
    return constrained.slice(0, 10); // Limit results
  });
  
  console.log('Constrained elements:', constrainedElements);
  
  // Take a screenshot for reference
  await page.screenshot({ 
    path: 'on-homepage-analysis.png', 
    fullPage: true 
  });
  
  // Check if there are sidebars or unused space
  const layoutAnalysis = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    
    return {
      bodyRect: body.getBoundingClientRect(),
      htmlRect: html.getBoundingClientRect(),
      documentWidth: document.documentElement.scrollWidth,
      windowWidth: window.innerWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  
  console.log('Layout analysis:', layoutAnalysis);
});