const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // Navigate to on.com
    await page.goto('https://www.on.com/en-au/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait for header to be visible
    await page.waitForSelector('header', { timeout: 5000 });

    // Take screenshots
    await page.screenshot({ path: 'on-header-desktop.png', fullPage: false });
    
    // Get header styles and measurements
    const headerAnalysis = await page.evaluate(() => {
      const header = document.querySelector('header');
      const nav = header.querySelector('nav');
      const styles = window.getComputedStyle(header);
      const navStyles = nav ? window.getComputedStyle(nav) : null;

      // Get logo information
      const logo = header.querySelector('a[aria-label*="On"] svg, a[aria-label*="On"] img, a svg');
      const logoContainer = logo ? logo.closest('a') : null;
      let logoInfo = {};
      if (logo) {
        const logoRect = logo.getBoundingClientRect();
        const logoStyles = window.getComputedStyle(logo);
        logoInfo = {
          width: logoRect.width,
          height: logoRect.height,
          containerWidth: logoContainer ? logoContainer.getBoundingClientRect().width : null,
          containerHeight: logoContainer ? logoContainer.getBoundingClientRect().height : null
        };
      }

      // Get navigation links
      const navLinks = header.querySelectorAll('nav a, nav button');
      const linkStyles = [];
      navLinks.forEach(link => {
        const linkStyle = window.getComputedStyle(link);
        linkStyles.push({
          fontSize: linkStyle.fontSize,
          fontWeight: linkStyle.fontWeight,
          color: linkStyle.color,
          padding: linkStyle.padding,
          margin: linkStyle.margin,
          textTransform: linkStyle.textTransform,
          letterSpacing: linkStyle.letterSpacing
        });
      });

      // Get right side icons/buttons
      const rightSection = header.querySelector('[class*="right"], [class*="actions"], [class*="icons"]');
      let rightSectionInfo = {};
      if (rightSection) {
        const rightStyles = window.getComputedStyle(rightSection);
        rightSectionInfo = {
          display: rightStyles.display,
          gap: rightStyles.gap,
          alignItems: rightStyles.alignItems
        };
      }

      return {
        header: {
          height: styles.height,
          padding: styles.padding,
          backgroundColor: styles.backgroundColor,
          position: styles.position,
          zIndex: styles.zIndex,
          boxShadow: styles.boxShadow,
          borderBottom: styles.borderBottom
        },
        nav: navStyles ? {
          display: navStyles.display,
          gap: navStyles.gap,
          alignItems: navStyles.alignItems,
          justifyContent: navStyles.justifyContent
        } : null,
        logo: logoInfo,
        linkStyles: linkStyles.slice(0, 3), // Get first 3 link styles as examples
        rightSection: rightSectionInfo
      };
    });

    console.log('Header Analysis:', JSON.stringify(headerAnalysis, null, 2));

    // Test scroll behavior
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);
    
    const scrolledHeaderAnalysis = await page.evaluate(() => {
      const header = document.querySelector('header');
      const styles = window.getComputedStyle(header);
      return {
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow,
        backdropFilter: styles.backdropFilter
      };
    });

    console.log('\nHeader After Scroll:', JSON.stringify(scrolledHeaderAnalysis, null, 2));

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'on-header-mobile.png', fullPage: false });

    // Get mobile menu button
    const mobileMenuAnalysis = await page.evaluate(() => {
      const menuButton = document.querySelector('button[aria-label*="menu"], button[class*="menu"], button[class*="burger"]');
      if (menuButton) {
        const styles = window.getComputedStyle(menuButton);
        return {
          width: menuButton.getBoundingClientRect().width,
          height: menuButton.getBoundingClientRect().height,
          backgroundColor: styles.backgroundColor,
          border: styles.border
        };
      }
      return null;
    });

    console.log('\nMobile Menu Button:', JSON.stringify(mobileMenuAnalysis, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();