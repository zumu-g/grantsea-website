const { chromium } = require('playwright');

async function analyzeOnWebsite() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100 
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const analysis = {
    homepage: {},
    shopPage: {},
    productDetail: {},
    aboutPage: {},
    commonPatterns: {}
  };

  try {
    console.log('Navigating to On Running homepage...');
    await page.goto('https://www.on.com/en-au/', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });

    // Analyze Homepage
    console.log('Analyzing homepage...');
    analysis.homepage = await analyzePage(page, 'Homepage');
    
    // Navigate to Shop page
    console.log('Navigating to Shop page...');
    await page.click('nav >> text=Shop', { timeout: 10000 }).catch(async () => {
      // Try alternative selectors
      await page.click('a[href*="/shop"]').catch(async () => {
        await page.click('text=Shop All');
      });
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    analysis.shopPage = await analyzePage(page, 'Shop Page');

    // Navigate to a product detail page
    console.log('Navigating to product detail page...');
    const productLink = await page.locator('a[href*="/products/"]').first();
    await productLink.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    analysis.productDetail = await analyzePage(page, 'Product Detail');

    // Navigate to About/Story page
    console.log('Looking for About/Story page...');
    await page.goto('https://www.on.com/en-au/');
    await page.waitForLoadState('networkidle');
    
    try {
      await page.click('nav >> text=About', { timeout: 5000 }).catch(async () => {
        await page.click('text=Our Story').catch(async () => {
          await page.click('a[href*="/about"]');
        });
      });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      analysis.aboutPage = await analyzePage(page, 'About Page');
    } catch (e) {
      console.log('About page not found, checking footer...');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      
      try {
        await page.click('footer >> text=About On').click();
        await page.waitForLoadState('networkidle');
        analysis.aboutPage = await analyzePage(page, 'About Page');
      } catch (e) {
        console.log('Could not find About page');
      }
    }

    // Analyze common patterns across all pages
    analysis.commonPatterns = {
      navigation: await analyzeNavigation(page),
      buttons: await analyzeButtons(page),
      forms: await analyzeForms(page),
      animations: await analyzeAnimations(page)
    };

    console.log('\n=== ANALYSIS COMPLETE ===\n');
    console.log(JSON.stringify(analysis, null, 2));

  } catch (error) {
    console.error('Error during analysis:', error);
  } finally {
    await browser.close();
  }
}

async function analyzePage(page, pageName) {
  console.log(`\nAnalyzing ${pageName}...`);
  
  const analysis = {
    structure: {},
    typography: {},
    colors: {},
    spacing: {},
    components: {},
    images: {},
    layout: {}
  };

  // Page Structure
  analysis.structure = await page.evaluate(() => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    return {
      hasHeader: !!header,
      headerHeight: header ? header.offsetHeight : null,
      headerPosition: header ? window.getComputedStyle(header).position : null,
      hasNav: !!nav,
      navType: nav ? (nav.closest('header') ? 'in-header' : 'standalone') : null,
      mainContentWidth: main ? window.getComputedStyle(main).maxWidth : null,
      hasFooter: !!footer,
      sectionCount: document.querySelectorAll('section').length
    };
  });

  // Typography
  analysis.typography = await page.evaluate(() => {
    const headings = {};
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      const element = document.querySelector(tag);
      if (element) {
        const styles = window.getComputedStyle(element);
        headings[tag] = {
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          fontFamily: styles.fontFamily,
          letterSpacing: styles.letterSpacing,
          textTransform: styles.textTransform
        };
      }
    });

    const bodyText = document.querySelector('p');
    const bodyStyles = bodyText ? window.getComputedStyle(bodyText) : null;

    return {
      headings,
      bodyText: bodyStyles ? {
        fontSize: bodyStyles.fontSize,
        lineHeight: bodyStyles.lineHeight,
        fontFamily: bodyStyles.fontFamily
      } : null
    };
  });

  // Colors
  analysis.colors = await page.evaluate(() => {
    const colors = new Set();
    const backgrounds = new Set();
    
    document.querySelectorAll('*').forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.color) colors.add(styles.color);
      if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        backgrounds.add(styles.backgroundColor);
      }
    });

    return {
      textColors: Array.from(colors).slice(0, 10),
      backgroundColors: Array.from(backgrounds).slice(0, 10),
      primaryButton: (() => {
        const btn = document.querySelector('button, .button, [class*="btn"]');
        if (btn) {
          const styles = window.getComputedStyle(btn);
          return {
            background: styles.backgroundColor,
            color: styles.color,
            border: styles.border
          };
        }
        return null;
      })()
    };
  });

  // Spacing and Grid
  analysis.spacing = await page.evaluate(() => {
    const container = document.querySelector('.container, [class*="container"], main > div');
    const grid = document.querySelector('[class*="grid"], .grid');
    
    return {
      containerPadding: container ? window.getComputedStyle(container).padding : null,
      containerMaxWidth: container ? window.getComputedStyle(container).maxWidth : null,
      gridGap: grid ? window.getComputedStyle(grid).gap || window.getComputedStyle(grid).gridGap : null,
      sectionSpacing: (() => {
        const sections = document.querySelectorAll('section');
        if (sections.length > 1) {
          const styles = window.getComputedStyle(sections[0]);
          return {
            marginTop: styles.marginTop,
            marginBottom: styles.marginBottom,
            paddingTop: styles.paddingTop,
            paddingBottom: styles.paddingBottom
          };
        }
        return null;
      })()
    };
  });

  // Component Patterns
  analysis.components = await page.evaluate(() => {
    const cards = document.querySelectorAll('[class*="card"], .card');
    const buttons = document.querySelectorAll('button, [class*="btn"], .button');
    const forms = document.querySelectorAll('form');
    
    return {
      cardCount: cards.length,
      cardStyle: cards.length > 0 ? (() => {
        const card = cards[0];
        const styles = window.getComputedStyle(card);
        return {
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadow,
          padding: styles.padding,
          background: styles.backgroundColor
        };
      })() : null,
      buttonVariants: Array.from(new Set(Array.from(buttons).map(btn => btn.className))).slice(0, 5),
      hasForm: forms.length > 0,
      formInputStyle: forms.length > 0 ? (() => {
        const input = document.querySelector('input[type="text"], input[type="email"]');
        if (input) {
          const styles = window.getComputedStyle(input);
          return {
            borderRadius: styles.borderRadius,
            border: styles.border,
            padding: styles.padding,
            height: styles.height
          };
        }
        return null;
      })() : null
    };
  });

  // Images
  analysis.images = await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    const heroImage = document.querySelector('section:first-of-type img, [class*="hero"] img');
    
    return {
      totalImages: images.length,
      heroImageRatio: heroImage ? `${heroImage.naturalWidth}:${heroImage.naturalHeight}` : null,
      imageTreatment: images.length > 0 ? (() => {
        const img = images[0];
        const styles = window.getComputedStyle(img);
        return {
          borderRadius: styles.borderRadius,
          objectFit: styles.objectFit,
          filter: styles.filter
        };
      })() : null
    };
  });

  return analysis;
}

async function analyzeNavigation(page) {
  return await page.evaluate(() => {
    const nav = document.querySelector('nav, header');
    if (!nav) return null;
    
    const styles = window.getComputedStyle(nav);
    const links = nav.querySelectorAll('a');
    
    return {
      position: styles.position,
      backgroundColor: styles.backgroundColor,
      height: nav.offsetHeight,
      isSticky: styles.position === 'sticky' || styles.position === 'fixed',
      linkCount: links.length,
      hasDropdowns: nav.querySelector('[class*="dropdown"], [class*="menu"]') !== null,
      mobileMenuType: nav.querySelector('[class*="burger"], [class*="mobile-menu"], [class*="hamburger"]') ? 'hamburger' : 'unknown'
    };
  });
}

async function analyzeButtons(page) {
  return await page.evaluate(() => {
    const buttons = document.querySelectorAll('button, [class*="btn"], .button');
    const variants = {};
    
    buttons.forEach(btn => {
      const styles = window.getComputedStyle(btn);
      const variant = btn.className.includes('primary') ? 'primary' : 
                     btn.className.includes('secondary') ? 'secondary' : 
                     'default';
      
      if (!variants[variant]) {
        variants[variant] = {
          padding: styles.padding,
          borderRadius: styles.borderRadius,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          textTransform: styles.textTransform,
          transition: styles.transition,
          cursor: styles.cursor
        };
      }
    });
    
    return variants;
  });
}

async function analyzeForms(page) {
  return await page.evaluate(() => {
    const forms = document.querySelectorAll('form');
    if (forms.length === 0) return null;
    
    const form = forms[0];
    const input = form.querySelector('input[type="text"], input[type="email"]');
    const button = form.querySelector('button, [type="submit"]');
    
    return {
      formCount: forms.length,
      inputStyle: input ? (() => {
        const styles = window.getComputedStyle(input);
        return {
          border: styles.border,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          fontSize: styles.fontSize,
          height: styles.height,
          background: styles.backgroundColor
        };
      })() : null,
      submitButtonStyle: button ? (() => {
        const styles = window.getComputedStyle(button);
        return {
          background: styles.backgroundColor,
          color: styles.color,
          padding: styles.padding,
          borderRadius: styles.borderRadius
        };
      })() : null
    };
  });
}

async function analyzeAnimations(page) {
  return await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const animations = new Set();
    const transitions = new Set();
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.animation && styles.animation !== 'none') {
        animations.add(styles.animation);
      }
      if (styles.transition && styles.transition !== 'none' && styles.transition !== 'all 0s ease 0s') {
        transitions.add(styles.transition);
      }
    });
    
    return {
      animationCount: animations.size,
      animations: Array.from(animations).slice(0, 5),
      transitionCount: transitions.size,
      commonTransitions: Array.from(transitions).slice(0, 5)
    };
  });
}

// Run the analysis
analyzeOnWebsite().catch(console.error);