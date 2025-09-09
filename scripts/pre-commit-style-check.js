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
    whiteOnScroll: true,
    iconsVisibleOnlyOnScroll: true
  },
  typography: {
    logo: { fontSize: 24, fontWeight: 800 },
    nav: { fontSize: 14, fontWeight: 500 },
    heroHeading: { minSize: 60, maxSize: 72 },
    categoryTitle: { fontSize: 28, fontWeight: 700 },
    propertyPrice: { fontSize: 20, fontWeight: 600 }
  },
  shopByCategory: {
    aspectRatio: 1.33, // 4:3 portrait ratio (133.33% padding)
    columns: 4,
    gap: 16,
    imageFilter: 'none', // on.com doesn't use dark filters
    borderRadius: 4
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
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
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
    
    // Scroll and check header changes
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);
    
    const headerScrolled = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const styles = window.getComputedStyle(header);
      const icons = document.querySelectorAll('header a[href*="saved"], header a[href*="sign"]');
      return {
        backgroundColor: styles.backgroundColor,
        iconsVisible: icons.length > 0
      };
    });
    
    if (headerScrolled) {
      if (headerScrolled.backgroundColor !== 'rgb(255, 255, 255)' && headerScrolled.backgroundColor !== '#fff') {
        issues.push(`❌ Header should be white when scrolled, found: ${headerScrolled.backgroundColor}`);
        passed = false;
      }
      if (!headerScrolled.iconsVisible) {
        issues.push('❌ Header icons should be visible when scrolled');
        passed = false;
      }
    }
    
    // Check 2: Shop by category aspect ratios
    console.log('Checking shop by category...');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    const categoryData = await page.evaluate(() => {
      const categorySection = Array.from(document.querySelectorAll('section')).find(s => 
        s.textContent.includes('Shop by category')
      );
      if (!categorySection) return null;
      
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
        categoryCount: categoryLinks.length
      };
    });
    
    if (categoryData) {
      if (!categoryData.aspectRatio.includes('133')) {
        issues.push(`❌ Shop category images should have 133.33% padding (3:4 ratio), found: ${categoryData.aspectRatio}`);
        passed = false;
      }
      // Check if it's 4 columns (either repeat(4) or 4 explicit values)
      const columnCount = categoryData.gridColumns ? 
        (categoryData.gridColumns.match(/\d+px/g) || []).length : 0;
      if (!categoryData.gridColumns || 
          (!categoryData.gridColumns.includes('repeat(4') && columnCount !== 4)) {
        issues.push(`❌ Shop categories should be in 4 columns, found: ${categoryData.gridColumns}`);
        passed = false;
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
    if (devServer) devServer.kill();
    if (browser) await browser.close();
  }
}

// Run the check
checkStyles().catch(console.error);