import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

test.describe('Compare with on.com design', () => {
  test('analyze on.com structure and styling', async ({ page }) => {
    // First, analyze on.com
    await page.goto('https://www.on.com/en-au/');
    await page.waitForLoadState('networkidle');
    
    // Capture on.com structure
    const onComData = await page.evaluate(() => {
      const getStyles = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          padding: styles.padding,
          margin: styles.margin,
          display: styles.display,
          position: styles.position,
          height: styles.height,
          width: styles.width
        };
      };
      
      // Get header structure
      const header = document.querySelector('header');
      const nav = header?.querySelector('nav');
      const navLinks = nav ? Array.from(nav.querySelectorAll('a')).map(a => ({
        text: a.textContent?.trim(),
        href: a.getAttribute('href')
      })) : [];
      
      // Get first section/hero
      const heroSection = document.querySelector('main > section:first-child') || 
                        document.querySelector('[class*="hero"]') ||
                        document.querySelector('section');
      
      return {
        header: {
          exists: !!header,
          styles: getStyles('header'),
          height: header?.offsetHeight,
          navLinks
        },
        body: {
          styles: getStyles('body'),
          classes: document.body.className
        },
        hero: {
          exists: !!heroSection,
          styles: getStyles('main > section:first-child'),
          content: heroSection?.textContent?.substring(0, 200)
        },
        fonts: window.getComputedStyle(document.body).fontFamily,
        mainStructure: document.querySelector('main')?.children.length || 0
      };
    });
    
    // Save on.com data for reference
    await fs.writeFile('on-com-analysis.json', JSON.stringify(onComData, null, 2));
    console.log('ON.COM Analysis:', onComData);
    
    // Now check our implementation
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    const ourData = await page.evaluate(() => {
      return {
        title: document.title,
        hasElementLight: !!document.querySelector('.element-light'),
        bodyClasses: document.body.className,
        allContent: document.body.innerText.substring(0, 500),
        styles: window.getComputedStyle(document.body)
      };
    });
    
    console.log('\nOUR SITE:', ourData);
    
    // Take screenshots for comparison
    await page.screenshot({ path: 'our-implementation.png', fullPage: true });
    
    // Generate report
    const report = {
      fontMatch: onComData.fonts === ourData.styles.fontFamily,
      differences: [],
      recommendations: []
    };
    
    if (!ourData.hasElementLight) {
      report.differences.push('ElementLight component not rendering');
      report.recommendations.push('Check if Anima components are properly imported');
    }
    
    if (!report.fontMatch) {
      report.differences.push(`Font mismatch - ON.com: ${onComData.fonts}, Ours: ${ourData.styles.fontFamily}`);
      report.recommendations.push('Ensure On font family is loaded');
    }
    
    console.log('\nCOMPARISON REPORT:', report);
    await fs.writeFile('comparison-report.json', JSON.stringify(report, null, 2));
  });
  
  test('check specific on.com elements', async ({ page }) => {
    await page.goto('https://www.on.com/en-au/');
    
    // Check navigation structure
    const navStructure = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      const primaryNav = nav?.querySelector('[class*="primary"]') || nav;
      
      return {
        navItems: primaryNav ? Array.from(primaryNav.querySelectorAll('a')).map(a => a.textContent?.trim()) : [],
        logo: !!document.querySelector('[class*="logo"]'),
        searchIcon: !!document.querySelector('[class*="search"]'),
        cartIcon: !!document.querySelector('[class*="cart"]')
      };
    });
    
    console.log('ON.COM Navigation:', navStructure);
    
    // Generate CSS fixes needed
    const cssNeeded = `
/* Based on on.com analysis */
.element-light {
  width: 100%;
  min-height: 100vh;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: white;
}

/* Add more specific styles based on analysis */
    `;
    
    await fs.writeFile('needed-styles.css', cssNeeded);
  });
});