const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing localhost:3000...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const viewportSize = page.viewportSize();
    console.log('📏 Viewport size:', viewportSize);
    
    // Check header width
    const headerInfo = await page.evaluate(() => {
      const header = document.querySelector('.header');
      if (header) {
        const rect = header.getBoundingClientRect();
        const computed = window.getComputedStyle(header);
        return {
          width: rect.width,
          maxWidth: computed.maxWidth,
          padding: computed.padding,
          left: rect.left,
          right: rect.right
        };
      }
      return null;
    });
    
    console.log('🏠 Header info:', headerInfo);
    
    // Check main content
    const mainInfo = await page.evaluate(() => {
      const main = document.querySelector('.section-main');
      if (main) {
        const rect = main.getBoundingClientRect();
        return {
          width: rect.width,
          left: rect.left,
          right: rect.right
        };
      }
      return null;
    });
    
    console.log('📄 Main content info:', mainInfo);
    
    // Check if using full width
    if (headerInfo && viewportSize) {
      const headerUsagePercent = (headerInfo.width / viewportSize.width) * 100;
      console.log(`📊 Header uses ${headerUsagePercent.toFixed(1)}% of viewport width`);
      
      if (headerUsagePercent > 90) {
        console.log('✅ Homepage appears to be using full screen!');
      } else {
        console.log('❌ Homepage is not using full screen');
      }
    }
    
    await page.screenshot({ path: 'test-result.png', fullPage: false });
    console.log('📸 Screenshot saved as test-result.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();