const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  console.log('Navigating to the website...');
  
  // Monitor navigation to check for redirects
  page.on('response', response => {
    if (response.status() >= 300 && response.status() < 400) {
      console.log(`Redirect detected: ${response.url()} -> ${response.headers()['location']}`);
    }
  });
  
  const response = await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle'
  });
  
  console.log(`Final URL: ${page.url()}`);
  console.log(`Response status: ${response.status()}`);
  
  // Check if we're on a login page
  const pageTitle = await page.title();
  console.log(`Page title: ${pageTitle}`);
  
  // Wait for the page to fully load
  await page.waitForTimeout(3000);
  
  // Take a full page screenshot
  await page.screenshot({ 
    path: 'full-page-screenshot.png', 
    fullPage: true 
  });
  console.log('Full page screenshot saved as full-page-screenshot.png');
  
  // Take a viewport screenshot
  await page.screenshot({ 
    path: 'viewport-screenshot.png' 
  });
  console.log('Viewport screenshot saved as viewport-screenshot.png');
  
  // Check viewport dimensions
  const viewportSize = page.viewportSize();
  console.log('\nViewport dimensions:', viewportSize);
  
  // Check if there's horizontal scrolling
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const hasHorizontalScroll = scrollWidth > clientWidth;
  
  console.log('\nHorizontal scroll analysis:');
  console.log(`Document scroll width: ${scrollWidth}px`);
  console.log(`Document client width: ${clientWidth}px`);
  console.log(`Has horizontal scroll: ${hasHorizontalScroll}`);
  
  // Find elements that might be causing width issues
  console.log('\nAnalyzing elements that might be causing width constraints...');
  
  const widthIssues = await page.evaluate(() => {
    const results = [];
    const viewportWidth = window.innerWidth;
    
    // Check all elements
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const styles = window.getComputedStyle(element);
      
      // Check if element extends beyond viewport
      if (rect.right > viewportWidth) {
        results.push({
          tag: element.tagName,
          class: element.className,
          id: element.id,
          width: rect.width,
          right: rect.right,
          overflowBy: rect.right - viewportWidth,
          computedWidth: styles.width,
          display: styles.display,
          position: styles.position
        });
      }
    });
    
    return results.sort((a, b) => b.overflowBy - a.overflowBy);
  });
  
  if (widthIssues.length > 0) {
    console.log('\nElements causing overflow:');
    widthIssues.slice(0, 10).forEach(issue => {
      console.log(`\n- ${issue.tag}${issue.id ? '#' + issue.id : ''}${issue.class ? '.' + issue.class.split(' ').join('.') : ''}`);
      console.log(`  Width: ${issue.width}px, Extends by: ${issue.overflowBy}px`);
      console.log(`  Computed width: ${issue.computedWidth}`);
      console.log(`  Display: ${issue.display}, Position: ${issue.position}`);
    });
  }
  
  // Check body and html styles
  const bodyStyles = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    const bodyStyle = window.getComputedStyle(body);
    const htmlStyle = window.getComputedStyle(html);
    
    return {
      body: {
        width: bodyStyle.width,
        maxWidth: bodyStyle.maxWidth,
        margin: bodyStyle.margin,
        padding: bodyStyle.padding,
        overflow: bodyStyle.overflow,
        overflowX: bodyStyle.overflowX
      },
      html: {
        width: htmlStyle.width,
        maxWidth: htmlStyle.maxWidth,
        margin: htmlStyle.margin,
        padding: htmlStyle.padding,
        overflow: htmlStyle.overflow,
        overflowX: htmlStyle.overflowX
      }
    };
  });
  
  console.log('\nBody styles:', bodyStyles.body);
  console.log('\nHTML styles:', bodyStyles.html);
  
  // Check for any fixed width containers
  const fixedWidthElements = await page.evaluate(() => {
    const elements = [];
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const width = styles.width;
      
      // Check for fixed pixel widths
      if (width && width.includes('px') && !width.includes('max') && parseFloat(width) > 1200) {
        elements.push({
          tag: element.tagName,
          class: element.className,
          id: element.id,
          width: width,
          maxWidth: styles.maxWidth
        });
      }
    });
    
    return elements;
  });
  
  if (fixedWidthElements.length > 0) {
    console.log('\nElements with large fixed widths:');
    fixedWidthElements.forEach(el => {
      console.log(`- ${el.tag}${el.id ? '#' + el.id : ''}${el.class ? '.' + el.class.split(' ').join('.') : ''}: ${el.width}`);
    });
  }
  
  // Check for CSS that might be constraining width
  const constrainingCSS = await page.evaluate(() => {
    const results = [];
    
    // Check for max-width on common container elements
    const containers = document.querySelectorAll('main, .container, .wrapper, [class*="container"], [class*="wrapper"]');
    containers.forEach(container => {
      const styles = window.getComputedStyle(container);
      if (styles.maxWidth && styles.maxWidth !== 'none') {
        results.push({
          selector: container.tagName + (container.className ? '.' + container.className.split(' ').join('.') : ''),
          maxWidth: styles.maxWidth,
          width: styles.width,
          margin: styles.margin,
          padding: styles.padding
        });
      }
    });
    
    return results;
  });
  
  if (constrainingCSS.length > 0) {
    console.log('\nContainers with max-width constraints:');
    constrainingCSS.forEach(css => {
      console.log(`\n- ${css.selector}`);
      console.log(`  max-width: ${css.maxWidth}`);
      console.log(`  width: ${css.width}`);
      console.log(`  margin: ${css.margin}`);
      console.log(`  padding: ${css.padding}`);
    });
  }
  
  // Highlight problematic elements
  await page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.right > viewportWidth) {
        element.style.outline = '3px solid red';
        element.style.outlineOffset = '-3px';
      }
    });
  });
  
  // Take a screenshot with highlighted elements
  await page.screenshot({ 
    path: 'highlighted-issues.png', 
    fullPage: true 
  });
  console.log('\nScreenshot with highlighted overflow elements saved as highlighted-issues.png');
  
  // Keep browser open for 30 seconds to allow manual inspection
  console.log('\nBrowser will remain open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();