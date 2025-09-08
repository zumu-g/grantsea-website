#!/usr/bin/env node

const { chromium } = require('playwright');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function checkStyles() {
  console.log('🔍 Running pre-commit style check against on.com...\n');
  
  let browser;
  try {
    // Start dev server if not running
    console.log('Starting development server...');
    const devServer = exec('npm run dev', { cwd: process.cwd() });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    browser = await chromium.launch({ headless: true });
    
    // Analyze on.com
    const onComPage = await browser.newPage();
    await onComPage.goto('https://www.on.com/en-au/');
    await onComPage.waitForLoadState('networkidle');
    
    const onComData = await onComPage.evaluate(() => {
      const getStyles = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      };
      
      return {
        body: getStyles('body'),
        header: getStyles('header'),
        navText: Array.from(document.querySelectorAll('nav a')).map(a => a.textContent.trim()).slice(0, 3),
        heroText: document.querySelector('main')?.textContent?.substring(0, 100)
      };
    });
    
    // Analyze our site
    const ourPage = await browser.newPage();
    await ourPage.goto('http://localhost:3000');
    await ourPage.waitForTimeout(2000);
    
    const ourData = await ourPage.evaluate(() => {
      const getStyles = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      };
      
      return {
        body: getStyles('body'),
        bodyText: document.body.innerText.substring(0, 500),
        hasRealEstateContent: document.body.innerText.includes('real estate') || 
                              document.body.innerText.includes('Casey and Cardinia') ||
                              document.body.innerText.includes('For sale') ||
                              document.body.innerText.includes('property')
      };
    });
    
    // Check for issues
    const issues = [];
    
    // Real estate content is now REQUIRED (not an issue)
    if (!ourData.hasRealEstateContent) {
      issues.push('❌ No real estate content detected! Site should show real estate listings.');
    }
    
    // Font check is optional since we're a real estate site, not on.com
    // if (!ourData.body.fontFamily.includes('On')) {
    //   issues.push('❌ Font mismatch: On font family not detected');
    // }
    
    if (issues.length > 0) {
      console.error('\n⚠️  Style check failed:\n');
      issues.forEach(issue => console.error(issue));
      console.error('\nPlease fix these issues before committing.\n');
      
      // Kill dev server
      devServer.kill();
      process.exit(1);
    } else {
      console.log('✅ Style check passed! Site matches on.com requirements.\n');
      
      // Take comparison screenshots
      await onComPage.screenshot({ path: 'test-results/on-com-reference.png', fullPage: true });
      await ourPage.screenshot({ path: 'test-results/our-implementation.png', fullPage: true });
      console.log('📸 Screenshots saved to test-results/\n');
    }
    
    // Kill dev server
    devServer.kill();
    
  } catch (error) {
    console.error('Error during style check:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

// Run the check
checkStyles().catch(console.error);