const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  
  // Capture on.com
  const onComPage = await browser.newPage();
  await onComPage.goto('https://www.on.com/en-au/');
  await onComPage.waitForLoadState('networkidle');
  await onComPage.screenshot({ path: 'on-com-screenshot.png', fullPage: true });
  
  // Get the structure and content
  const onComStructure = await onComPage.evaluate(() => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    const heroSection = document.querySelector('section') || document.querySelector('[class*="hero"]');
    
    return {
      hasHeader: !!header,
      headerClasses: header?.className || '',
      navItems: nav ? Array.from(nav.querySelectorAll('a')).map(a => a.textContent.trim()) : [],
      mainContent: main ? main.children.length : 0,
      heroText: heroSection ? heroSection.textContent.trim().substring(0, 200) : '',
      bodyClasses: document.body.className,
      fonts: window.getComputedStyle(document.body).fontFamily
    };
  });
  
  console.log('ON.COM Structure:', onComStructure);
  
  // Capture our site
  const ourPage = await browser.newPage();
  await ourPage.goto('http://localhost:3000');
  await ourPage.waitForLoadState('networkidle');
  await ourPage.screenshot({ path: 'our-site-screenshot.png', fullPage: true });
  
  // Get our structure
  const ourStructure = await ourPage.evaluate(() => {
    const allText = document.body.textContent;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    return {
      hasHeader: !!header,
      navItems: nav ? Array.from(nav.querySelectorAll('a')).map(a => a.textContent.trim()) : [],
      bodyText: allText.substring(0, 500),
      bodyClasses: document.body.className,
      fonts: window.getComputedStyle(document.body).fontFamily
    };
  });
  
  console.log('\nOUR SITE Structure:', ourStructure);
  
  await browser.close();
})();