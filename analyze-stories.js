const { chromium } = require('playwright');

async function analyzeStoriesSection() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to on.com...');
    await page.goto('https://on.com', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Wait for the page to fully load
    await page.waitForTimeout(3000);
    
    // Look for "Stories that move" section
    console.log('Looking for "Stories that move" section...');
    
    // Try different selectors to find the stories section
    const storiesSelectors = [
      'text="Stories that move"',
      '[data-testid*="stories"]',
      '.stories',
      '#stories',
      'section:has-text("Stories")',
      'div:has-text("Stories that move")'
    ];
    
    let storiesSection = null;
    for (const selector of storiesSelectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.count() > 0) {
          storiesSection = element;
          console.log(`Found stories section with selector: ${selector}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (!storiesSection) {
      // Take a screenshot to see the page structure
      await page.screenshot({ path: 'on-com-page.png', fullPage: true });
      console.log('Screenshot saved as on-com-page.png');
      
      // Get all headings to understand page structure
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      console.log('\nPage headings found:');
      for (const heading of headings) {
        try {
          const text = await heading.textContent();
          const tagName = await heading.evaluate(el => el.tagName);
          console.log(`${tagName}: ${text}`);
        } catch (e) {
          continue;
        }
      }
      
      // Look for any section that might contain stories or cards
      console.log('\nLooking for card-like elements...');
      const cardElements = await page.locator('[class*="card"], [class*="story"], [class*="article"], .grid > div, [class*="item"]').all();
      console.log(`Found ${cardElements.length} potential card elements`);
      
      return;
    }
    
    // Analyze the stories section
    console.log('\nAnalyzing Stories section...');
    
    // Get section background and styling
    const sectionStyles = await storiesSection.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        margin: styles.margin,
        width: styles.width,
        display: styles.display
      };
    });
    console.log('Section styles:', sectionStyles);
    
    // Find story cards within the section
    const cardSelectors = [
      '.card',
      '[class*="card"]',
      '[class*="story"]',
      '.grid > div',
      '[class*="item"]'
    ];
    
    let cards = [];
    for (const selector of cardSelectors) {
      try {
        const cardElements = await storiesSection.locator(selector).all();
        if (cardElements.length > 0) {
          cards = cardElements;
          console.log(`Found ${cards.length} cards with selector: ${selector}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (cards.length === 0) {
      console.log('No cards found in stories section');
      return;
    }
    
    // Analyze first few cards
    console.log('\nAnalyzing card details...');
    for (let i = 0; i < Math.min(3, cards.length); i++) {
      const card = cards[i];
      
      try {
        const cardStyles = await card.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadow,
            backgroundColor: styles.backgroundColor,
            padding: styles.padding,
            margin: styles.margin,
            width: styles.width,
            height: styles.height
          };
        });
        
        console.log(`Card ${i + 1} styles:`, cardStyles);
        
        // Look for image in card
        const image = card.locator('img').first();
        if (await image.count() > 0) {
          const imageStyles = await image.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              width: styles.width,
              height: styles.height,
              borderRadius: styles.borderRadius,
              aspectRatio: el.naturalWidth && el.naturalHeight ? 
                `${el.naturalWidth}:${el.naturalHeight}` : 'unknown'
            };
          });
          console.log(`Card ${i + 1} image:`, imageStyles);
        }
        
        // Look for text elements
        const title = card.locator('h1, h2, h3, h4, h5, h6').first();
        if (await title.count() > 0) {
          const titleText = await title.textContent();
          const titleStyles = await title.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              color: styles.color,
              lineHeight: styles.lineHeight
            };
          });
          console.log(`Card ${i + 1} title: "${titleText}"`, titleStyles);
        }
        
      } catch (e) {
        console.log(`Error analyzing card ${i + 1}:`, e.message);
      }
    }
    
    // Take a screenshot of the stories section
    await storiesSection.screenshot({ path: 'stories-section.png' });
    console.log('Stories section screenshot saved as stories-section.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

// Also analyze Grant's current implementation
async function analyzeGrantsImplementation() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('\n\nAnalyzing Grant\'s implementation...');
    
    // Start local dev server first if needed
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Look for stories section
    const storiesSection = await page.locator('text="Stories that move"').first();
    if (await storiesSection.count() > 0) {
      console.log('Found Grant\'s stories section');
      
      // Take screenshot
      await storiesSection.screenshot({ path: 'grants-stories-section.png' });
      
      // Analyze the implementation
      // ... similar analysis code
    } else {
      console.log('Grant\'s stories section not found - is the dev server running?');
    }
    
  } catch (error) {
    console.error('Error analyzing Grant\'s implementation:', error.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  await analyzeStoriesSection();
  await analyzeGrantsImplementation();
}

main().catch(console.error);