const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  
  // Check our local site
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000); // Wait 3 seconds
  
  // Take screenshot
  await page.screenshot({ path: 'local-site.png', fullPage: true });
  
  // Get the current content
  const content = await page.evaluate(() => {
    return {
      title: document.title,
      bodyText: document.body.innerText.substring(0, 1000),
      hasElementLight: !!document.querySelector('.element-light'),
      allClasses: Array.from(document.querySelectorAll('*')).map(el => el.className).filter(c => c).slice(0, 20)
    };
  });
  
  console.log('Local Site Content:', content);
  
  await browser.close();
})();