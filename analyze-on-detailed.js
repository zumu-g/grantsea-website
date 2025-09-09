const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Navigating to on.com...');
    await page.goto('https://www.on.com/en-au/', { waitUntil: 'domcontentloaded' });
    
    // Wait for navigation to be visible
    await page.waitForTimeout(3000);

    console.log('\n=== ON.COM HEADER ANALYSIS ===\n');

    // Analyze header structure
    const headerInfo = await page.evaluate(() => {
      const header = document.querySelector('header') || document.querySelector('[role="banner"]') || document.querySelector('nav').closest('div');
      if (!header) return null;

      // Get computed styles
      const styles = window.getComputedStyle(header);
      const rect = header.getBoundingClientRect();

      // Find navigation container
      const nav = header.querySelector('nav') || header.querySelector('[role="navigation"]');
      const navStyles = nav ? window.getComputedStyle(nav) : null;

      // Get all links
      const links = header.querySelectorAll('a');
      const linkInfo = [];
      links.forEach((link, index) => {
        if (index < 5) { // First 5 links
          const linkStyles = window.getComputedStyle(link);
          linkInfo.push({
            text: link.textContent.trim(),
            styles: {
              fontSize: linkStyles.fontSize,
              fontWeight: linkStyles.fontWeight,
              color: linkStyles.color,
              textTransform: linkStyles.textTransform,
              letterSpacing: linkStyles.letterSpacing,
              padding: linkStyles.padding
            }
          });
        }
      });

      // Find logo
      const logoLink = header.querySelector('a[href="/"]') || header.querySelector('a');
      const logoImg = logoLink ? logoLink.querySelector('img, svg') : null;
      let logoInfo = null;
      if (logoImg) {
        const logoRect = logoImg.getBoundingClientRect();
        logoInfo = {
          width: logoRect.width,
          height: logoRect.height,
          type: logoImg.tagName.toLowerCase()
        };
      }

      // Find right section (icons/buttons)
      const buttons = header.querySelectorAll('button');
      const buttonInfo = [];
      buttons.forEach((button, index) => {
        if (index < 3) {
          const btnStyles = window.getComputedStyle(button);
          const btnRect = button.getBoundingClientRect();
          buttonInfo.push({
            ariaLabel: button.getAttribute('aria-label'),
            width: btnRect.width,
            height: btnRect.height,
            styles: {
              backgroundColor: btnStyles.backgroundColor,
              borderRadius: btnStyles.borderRadius,
              padding: btnStyles.padding
            }
          });
        }
      });

      return {
        dimensions: {
          height: rect.height,
          width: rect.width
        },
        styles: {
          position: styles.position,
          backgroundColor: styles.backgroundColor,
          backdropFilter: styles.backdropFilter,
          boxShadow: styles.boxShadow,
          padding: styles.padding,
          zIndex: styles.zIndex,
          borderBottom: styles.borderBottom,
          transition: styles.transition
        },
        navStyles: navStyles ? {
          display: navStyles.display,
          alignItems: navStyles.alignItems,
          gap: navStyles.gap,
          padding: navStyles.padding
        } : null,
        links: linkInfo,
        logo: logoInfo,
        buttons: buttonInfo
      };
    });

    if (headerInfo) {
      console.log('Header Dimensions:', headerInfo.dimensions);
      console.log('\nHeader Styles:', headerInfo.styles);
      console.log('\nNavigation Styles:', headerInfo.navStyles);
      console.log('\nLink Examples:', headerInfo.links);
      console.log('\nLogo Info:', headerInfo.logo);
      console.log('\nButton/Icon Info:', headerInfo.buttons);
    }

    // Test scroll behavior
    console.log('\n=== SCROLL BEHAVIOR ===\n');
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);

    const scrolledHeader = await page.evaluate(() => {
      const header = document.querySelector('header') || document.querySelector('[role="banner"]') || document.querySelector('nav').closest('div');
      const styles = window.getComputedStyle(header);
      return {
        backgroundColor: styles.backgroundColor,
        backdropFilter: styles.backdropFilter,
        boxShadow: styles.boxShadow
      };
    });

    console.log('Header after scroll:', scrolledHeader);

    // Mobile responsive check
    console.log('\n=== MOBILE RESPONSIVE ===\n');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    const mobileHeader = await page.evaluate(() => {
      const header = document.querySelector('header') || document.querySelector('[role="banner"]') || document.querySelector('nav').closest('div');
      const rect = header.getBoundingClientRect();
      const styles = window.getComputedStyle(header);
      
      // Find mobile menu button
      const menuButton = header.querySelector('button[aria-label*="menu" i], button[aria-label*="navigation" i]');
      let menuButtonInfo = null;
      if (menuButton) {
        const btnRect = menuButton.getBoundingClientRect();
        const btnStyles = window.getComputedStyle(menuButton);
        menuButtonInfo = {
          width: btnRect.width,
          height: btnRect.height,
          backgroundColor: btnStyles.backgroundColor,
          borderRadius: btnStyles.borderRadius
        };
      }

      return {
        height: rect.height,
        padding: styles.padding,
        menuButton: menuButtonInfo
      };
    });

    console.log('Mobile header height:', mobileHeader.height);
    console.log('Mobile menu button:', mobileHeader.menuButton);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();