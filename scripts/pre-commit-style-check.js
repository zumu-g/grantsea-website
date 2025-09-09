#!/usr/bin/env node

const { chromium } = require('playwright');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

// ON.COM Design System Reference
const ON_COM_DESIGN_SYSTEM = {
  header: {
    height: 64,
    transparentAtTop: true,
    hiddenOnScroll: true,
    visibleOnlyAtTop: true
  },
  typography: {
    logo: { fontSize: 24, fontWeight: 800 },
    nav: { fontSize: 14, fontWeight: 500 },
    heroHeading: { minSize: 60, maxSize: 72 },
    categoryTitle: { fontSize: 28, fontWeight: 700 },
    propertyPrice: { fontSize: 20, fontWeight: 600 }
  },
  shopByCategory: {
    aspectRatio: 1.48, // 2:3 portrait ratio (148.15% padding)
    columns: 3,
    gap: 32,
    imageFilter: 'none', // on.com doesn't use dark filters
    borderRadius: 4,
    heading: {
      fontSize: 48,
      fontWeight: 700,
      letterSpacing: '-0.48px',
      textTransform: 'none',
      textAlign: 'left'
    }
  },
  colors: {
    primary: '#000',
    background: '#fff',
    backgroundAlt: '#f8f8f8',
    border: '#e5e5e5'
  }
};

async function checkStyles() {
  console.log('🔍 Running ON.COM style validation...\n');
  
  let browser;
  let devServer;
  let passed = true;
  const issues = [];
  
  try {
    // Start dev server
    console.log('Starting development server...');
    devServer = exec('npm run dev', { cwd: process.cwd() });
    
    // Wait longer for server to start
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Try to connect with retries
    let connected = false;
    let attempts = 0;
    while (!connected && attempts < 3) {
      try {
        await page.goto('http://localhost:3000', { 
          waitUntil: 'domcontentloaded',
          timeout: 10000 
        });
        connected = true;
      } catch (error) {
        attempts++;
        console.log(`Connection attempt ${attempts} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    if (!connected) {
      throw new Error('Failed to connect to development server after 3 attempts');
    }
    
    await page.waitForTimeout(2000);
    
    // Check 1: Header behavior
    console.log('Checking header behavior...');
    const headerInitial = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const styles = window.getComputedStyle(header);
      return {
        backgroundColor: styles.backgroundColor,
        height: parseInt(styles.height),
        position: styles.position
      };
    });
    
    if (headerInitial) {
      if (headerInitial.backgroundColor !== 'rgba(0, 0, 0, 0)' && headerInitial.backgroundColor !== 'transparent') {
        issues.push(`❌ Header should be transparent at top of page, found: ${headerInitial.backgroundColor}`);
        passed = false;
      }
      if (headerInitial.height !== ON_COM_DESIGN_SYSTEM.header.height) {
        issues.push(`❌ Header height should be ${ON_COM_DESIGN_SYSTEM.header.height}px, found: ${headerInitial.height}px`);
        passed = false;
      }
    }
    
    // Check icons visibility at top
    const iconsAtTop = await page.evaluate(() => {
      const icons = document.querySelectorAll('header a[href*="saved"], header a[href*="sign"]');
      return icons.length;
    });
    
    if (iconsAtTop > 0) {
      issues.push('❌ Header icons (heart, sign in) should NOT be visible at top of page');
      passed = false;
    }
    
    // Scroll and check header disappears
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);
    
    const headerScrolled = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const styles = window.getComputedStyle(header);
      const transform = styles.transform;
      return {
        transform: transform,
        isHidden: transform.includes('translateY(-100%)') || transform.includes('matrix')
      };
    });
    
    if (headerScrolled && !headerScrolled.isHidden) {
      issues.push(`❌ Header should be hidden when scrolled down (translateY(-100%)), found: ${headerScrolled.transform}`);
      passed = false;
    }
    
    // Check 2: Shop by category aspect ratios
    console.log('Checking shop by category...');
    // Navigate back to home page
    await page.goto('http://localhost:3000', { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
    await page.waitForTimeout(2000);
    
    const categoryData = await page.evaluate(() => {
      const categorySection = Array.from(document.querySelectorAll('section')).find(s => 
        s.textContent.includes('Shop by category')
      );
      if (!categorySection) return null;
      
      const heading = categorySection.querySelector('h2');
      const headingStyles = heading ? window.getComputedStyle(heading) : null;
      
      const categoryLinks = categorySection.querySelectorAll('a');
      const firstCategory = categoryLinks[0];
      if (!firstCategory) return null;
      
      const imageContainer = firstCategory.querySelector('div[style*="padding"]');
      if (!imageContainer) return null;
      
      const paddingBottom = imageContainer.style.paddingBottom;
      const gridContainer = categorySection.querySelector('[style*="grid"]');
      const gridStyle = gridContainer ? window.getComputedStyle(gridContainer) : null;
      
      return {
        aspectRatio: paddingBottom,
        gridColumns: gridStyle ? gridStyle.gridTemplateColumns : null,
        categoryCount: categoryLinks.length,
        heading: headingStyles ? {
          fontSize: parseInt(headingStyles.fontSize),
          fontWeight: parseInt(headingStyles.fontWeight),
          letterSpacing: headingStyles.letterSpacing,
          textTransform: headingStyles.textTransform,
          textAlign: headingStyles.textAlign
        } : null
      };
    });
    
    if (categoryData) {
      if (!categoryData.aspectRatio.includes('148')) {
        issues.push(`❌ Shop category images should have 148.15% padding (2:3 ratio), found: ${categoryData.aspectRatio}`);
        passed = false;
      }
      // Check if it's 3 columns (either repeat(3) or 3 explicit values)
      const columnCount = categoryData.gridColumns ? 
        (categoryData.gridColumns.match(/\d+px/g) || []).length : 0;
      if (!categoryData.gridColumns || 
          (!categoryData.gridColumns.includes('repeat(3') && columnCount !== 3)) {
        issues.push(`❌ Shop categories should be in 3 columns, found: ${categoryData.gridColumns}`);
        passed = false;
      }
      // Check that we have exactly 3 category items
      if (categoryData.categoryCount !== 3) {
        issues.push(`❌ Shop by category should have exactly 3 items, found: ${categoryData.categoryCount}`);
        passed = false;
      }
      // Check heading styles
      if (categoryData.heading) {
        if (categoryData.heading.fontSize !== ON_COM_DESIGN_SYSTEM.shopByCategory.heading.fontSize) {
          issues.push(`❌ Shop by category heading font size should be ${ON_COM_DESIGN_SYSTEM.shopByCategory.heading.fontSize}px, found: ${categoryData.heading.fontSize}px`);
          passed = false;
        }
        if (categoryData.heading.fontWeight !== ON_COM_DESIGN_SYSTEM.shopByCategory.heading.fontWeight) {
          issues.push(`❌ Shop by category heading font weight should be ${ON_COM_DESIGN_SYSTEM.shopByCategory.heading.fontWeight}, found: ${categoryData.heading.fontWeight}`);
          passed = false;
        }
        if (categoryData.heading.textTransform !== ON_COM_DESIGN_SYSTEM.shopByCategory.heading.textTransform) {
          issues.push(`❌ Shop by category heading should not be uppercase, found: ${categoryData.heading.textTransform}`);
          passed = false;
        }
      }
    }
    
    // Check 3: Typography sizes
    console.log('Checking typography...');
    const typography = await page.evaluate(() => {
      const logo = document.querySelector('header a[href="/"]');
      const nav = document.querySelector('header nav a');
      const hero = document.querySelector('h1');
      
      const results = {};
      if (logo) {
        const logoStyles = window.getComputedStyle(logo);
        results.logo = {
          fontSize: parseInt(logoStyles.fontSize),
          fontWeight: parseInt(logoStyles.fontWeight)
        };
      }
      if (nav) {
        const navStyles = window.getComputedStyle(nav);
        results.nav = {
          fontSize: parseInt(navStyles.fontSize),
          fontWeight: parseInt(navStyles.fontWeight)
        };
      }
      if (hero) {
        const heroStyles = window.getComputedStyle(hero);
        results.hero = {
          fontSize: parseInt(heroStyles.fontSize)
        };
      }
      return results;
    });
    
    if (typography.logo) {
      if (typography.logo.fontSize !== ON_COM_DESIGN_SYSTEM.typography.logo.fontSize) {
        issues.push(`❌ Logo font size should be ${ON_COM_DESIGN_SYSTEM.typography.logo.fontSize}px, found: ${typography.logo.fontSize}px`);
        passed = false;
      }
    }
    
    if (typography.nav) {
      if (typography.nav.fontSize !== ON_COM_DESIGN_SYSTEM.typography.nav.fontSize) {
        issues.push(`❌ Nav font size should be ${ON_COM_DESIGN_SYSTEM.typography.nav.fontSize}px, found: ${typography.nav.fontSize}px`);
        passed = false;
      }
    }
    
    // Report results
    if (!passed) {
      console.error('\n⚠️  ON.COM style validation FAILED:\n');
      issues.forEach(issue => console.error(issue));
      console.error('\nPlease fix these issues before committing.\n');
      
      // Save detailed report
      const report = {
        timestamp: new Date().toISOString(),
        passed: false,
        issues,
        checks: {
          header: headerInitial,
          headerScrolled,
          categoryData,
          typography
        }
      };
      
      await fs.mkdir('test-results', { recursive: true });
      await fs.writeFile(
        path.join('test-results', 'style-validation-report.json'),
        JSON.stringify(report, null, 2)
      );
      
      // Take screenshots
      await page.screenshot({ path: 'test-results/validation-fail.png', fullPage: true });
      
      process.exit(1);
    } else {
      console.log('✅ All ON.COM style validations passed!\n');
      await page.screenshot({ path: 'test-results/validation-pass.png', fullPage: true });
    }
    
  } catch (error) {
    console.error('Error during style validation:', error);
    process.exit(1);
  } finally {
    // Ensure dev server is properly killed
    if (devServer) {
      try {
        devServer.kill('SIGTERM');
        // Also kill any orphaned node processes
        exec('pkill -f "next dev"');
      } catch (e) {
        // Ignore errors
      }
    }
    if (browser) await browser.close();
  }
}

// Run the check
checkStyles().catch(console.error);