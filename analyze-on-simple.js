const { chromium } = require('playwright');

async function analyzeOnWebsite() {
  console.log('Starting analysis of On Running website...');
  const browser = await chromium.launch({ 
    headless: true,
    slowMo: 50 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();

  try {
    // Homepage Analysis
    console.log('\n=== HOMEPAGE ANALYSIS ===');
    await page.goto('https://www.on.com/en-au/', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    await page.waitForTimeout(3000);

    const homepageAnalysis = await page.evaluate(() => {
      const analysis = {
        structure: {},
        navigation: {},
        hero: {},
        typography: {},
        colors: {},
        buttons: {},
        grid: {}
      };

      // Navigation Analysis
      const nav = document.querySelector('nav, header');
      if (nav) {
        const navStyles = window.getComputedStyle(nav);
        analysis.navigation = {
          height: nav.offsetHeight + 'px',
          position: navStyles.position,
          background: navStyles.backgroundColor,
          isSticky: navStyles.position === 'fixed' || navStyles.position === 'sticky',
          zIndex: navStyles.zIndex
        };
      }

      // Hero Section
      const hero = document.querySelector('section:first-of-type, [class*="hero"], .hero');
      if (hero) {
        const heroStyles = window.getComputedStyle(hero);
        analysis.hero = {
          height: hero.offsetHeight + 'px',
          background: heroStyles.background,
          padding: heroStyles.padding
        };
      }

      // Typography
      ['h1', 'h2', 'h3', 'p'].forEach(tag => {
        const element = document.querySelector(tag);
        if (element) {
          const styles = window.getComputedStyle(element);
          analysis.typography[tag] = {
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            lineHeight: styles.lineHeight,
            color: styles.color
          };
        }
      });

      // Primary Button
      const button = document.querySelector('button, .button, [class*="btn"]');
      if (button) {
        const btnStyles = window.getComputedStyle(button);
        analysis.buttons = {
          padding: btnStyles.padding,
          borderRadius: btnStyles.borderRadius,
          background: btnStyles.backgroundColor,
          color: btnStyles.color,
          fontSize: btnStyles.fontSize,
          fontWeight: btnStyles.fontWeight,
          textTransform: btnStyles.textTransform
        };
      }

      // Grid/Container
      const container = document.querySelector('.container, [class*="container"], main');
      if (container) {
        const containerStyles = window.getComputedStyle(container);
        analysis.grid = {
          maxWidth: containerStyles.maxWidth,
          padding: containerStyles.padding,
          margin: containerStyles.margin
        };
      }

      return analysis;
    });

    console.log('Homepage:', JSON.stringify(homepageAnalysis, null, 2));

    // Product Listing Page
    console.log('\n=== PRODUCT LISTING PAGE ===');
    await page.goto('https://www.on.com/en-au/shop/womens', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    await page.waitForTimeout(3000);

    const shopAnalysis = await page.evaluate(() => {
      const analysis = {
        grid: {},
        productCard: {},
        filters: {},
        sorting: {}
      };

      // Product Grid
      const grid = document.querySelector('[class*="grid"], .products-grid, [class*="product-grid"]');
      if (grid) {
        const gridStyles = window.getComputedStyle(grid);
        analysis.grid = {
          display: gridStyles.display,
          gridTemplateColumns: gridStyles.gridTemplateColumns,
          gap: gridStyles.gap || gridStyles.gridGap,
          padding: gridStyles.padding
        };
      }

      // Product Card
      const card = document.querySelector('[class*="product-card"], .product-card, [class*="product-item"]');
      if (card) {
        const cardStyles = window.getComputedStyle(card);
        const img = card.querySelector('img');
        analysis.productCard = {
          width: card.offsetWidth + 'px',
          padding: cardStyles.padding,
          borderRadius: cardStyles.borderRadius,
          boxShadow: cardStyles.boxShadow,
          background: cardStyles.backgroundColor,
          imageAspectRatio: img ? `${img.naturalWidth}:${img.naturalHeight}` : 'unknown'
        };
      }

      // Filters
      const filterSection = document.querySelector('[class*="filter"], .filters');
      analysis.filters = {
        hasFilters: !!filterSection,
        position: filterSection ? 'Found filters section' : 'No filters found'
      };

      return analysis;
    });

    console.log('Shop Page:', JSON.stringify(shopAnalysis, null, 2));

    // Product Detail Page
    console.log('\n=== PRODUCT DETAIL PAGE ===');
    await page.goto('https://www.on.com/en-au/products/cloud-5-0-3MD10420553', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    await page.waitForTimeout(3000);

    const productAnalysis = await page.evaluate(() => {
      const analysis = {
        layout: {},
        gallery: {},
        productInfo: {},
        actions: {},
        details: {}
      };

      // Overall Layout
      const productContainer = document.querySelector('[class*="product-detail"], .product-page, main');
      if (productContainer) {
        analysis.layout = {
          structure: 'Product detail container found',
          width: productContainer.offsetWidth + 'px'
        };
      }

      // Image Gallery
      const gallery = document.querySelector('[class*="gallery"], [class*="images"], .product-images');
      if (gallery) {
        const images = gallery.querySelectorAll('img');
        analysis.gallery = {
          imageCount: images.length,
          type: gallery.className.includes('swiper') ? 'swiper' : 'standard',
          firstImageSrc: images[0]?.src || 'No images'
        };
      }

      // Product Info
      const title = document.querySelector('h1, [class*="product-title"]');
      const price = document.querySelector('[class*="price"]');
      analysis.productInfo = {
        hasTitle: !!title,
        titleSize: title ? window.getComputedStyle(title).fontSize : null,
        hasPrice: !!price,
        priceSize: price ? window.getComputedStyle(price).fontSize : null
      };

      // Add to Cart
      const addToCart = document.querySelector('[class*="add-to-cart"], button[type="submit"]');
      if (addToCart) {
        const btnStyles = window.getComputedStyle(addToCart);
        analysis.actions = {
          buttonWidth: addToCart.offsetWidth + 'px',
          buttonHeight: btnStyles.height,
          buttonBackground: btnStyles.backgroundColor
        };
      }

      return analysis;
    });

    console.log('Product Detail:', JSON.stringify(productAnalysis, null, 2));

    // Take screenshots
    console.log('\n=== CAPTURING SCREENSHOTS ===');
    await page.goto('https://www.on.com/en-au/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'on-homepage.png', fullPage: false });
    
    await page.goto('https://www.on.com/en-au/shop/womens', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'on-shop.png', fullPage: false });
    
    await page.goto('https://www.on.com/en-au/products/cloud-5-0-3MD10420553', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'on-product.png', fullPage: false });

    console.log('\nScreenshots saved!');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeOnWebsite().catch(console.error);