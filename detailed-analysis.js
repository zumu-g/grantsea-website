const { chromium } = require('playwright');

async function analyzeOnCom() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('=== ANALYZING ON.COM ===');
    await page.goto('https://on.com', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForTimeout(5000);
    
    // Take full page screenshot first
    await page.screenshot({ path: 'on-com-full-page.png', fullPage: true });
    console.log('Full page screenshot saved');
    
    // Find stories section
    const storiesHeading = await page.locator('text="Stories that move"').first();
    if (await storiesHeading.count() === 0) {
      console.log('Stories section not found');
      return null;
    }
    
    // Find the parent container of the stories section
    const storiesContainer = await storiesHeading.locator('..').first();
    
    // Look for the actual grid/cards container
    const gridContainer = await storiesContainer.locator('div').all();
    console.log(`Found ${gridContainer.length} divs in stories container`);
    
    // Try to find cards by looking for common patterns
    const allCards = await page.locator('[class*="card"], [class*="story"], [class*="grid"] > div > div, .grid-cols-3 > div, .grid-cols-2 > div, .grid-cols-4 > div').all();
    console.log(`Found ${allCards.length} potential card elements`);
    
    // Look more specifically in the stories area
    const storiesCards = await storiesContainer.locator('div[class*="grid"] > div, .grid > div').all();
    console.log(`Found ${storiesCards.length} cards in stories container`);
    
    // Get all images in the stories area
    const storiesImages = await storiesContainer.locator('img').all();
    console.log(`Found ${storiesImages.length} images in stories area`);
    
    // Analyze the grid layout
    let gridLayout = null;
    const gridElements = await storiesContainer.locator('[class*="grid"]').all();
    for (let i = 0; i < gridElements.length; i++) {
      try {
        const gridClasses = await gridElements[i].getAttribute('class');
        console.log(`Grid ${i + 1} classes:`, gridClasses);
        
        const gridStyles = await gridElements[i].evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            display: styles.display,
            gridTemplateColumns: styles.gridTemplateColumns,
            gap: styles.gap,
            columnGap: styles.columnGap,
            rowGap: styles.rowGap
          };
        });
        console.log(`Grid ${i + 1} computed styles:`, gridStyles);
        
        if (gridStyles.gridTemplateColumns && gridStyles.gridTemplateColumns !== 'none') {
          gridLayout = gridStyles;
        }
      } catch (e) {
        console.log(`Error analyzing grid ${i + 1}:`, e.message);
      }
    }
    
    // If we found images, analyze the first few cards
    if (storiesImages.length > 0) {
      console.log('\n--- CARD ANALYSIS ---');
      
      for (let i = 0; i < Math.min(3, storiesImages.length); i++) {
        const image = storiesImages[i];
        const cardElement = await image.locator('..').first(); // Parent of image
        
        try {
          console.log(`\nCard ${i + 1}:`);
          
          // Get image details
          const imageData = await image.evaluate(el => {
            const rect = el.getBoundingClientRect();
            return {
              src: el.src,
              width: rect.width,
              height: rect.height,
              aspectRatio: rect.width && rect.height ? (rect.width / rect.height).toFixed(2) : 'unknown',
              naturalWidth: el.naturalWidth,
              naturalHeight: el.naturalHeight,
              naturalAspectRatio: el.naturalWidth && el.naturalHeight ? (el.naturalWidth / el.naturalHeight).toFixed(2) : 'unknown'
            };
          });
          console.log(`  Image:`, imageData);
          
          // Get card styles
          const cardStyles = await cardElement.evaluate(el => {
            const styles = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
              borderRadius: styles.borderRadius,
              boxShadow: styles.boxShadow,
              backgroundColor: styles.backgroundColor,
              padding: styles.padding,
              margin: styles.margin,
              width: rect.width,
              height: rect.height,
              overflow: styles.overflow
            };
          });
          console.log(`  Card styles:`, cardStyles);
          
          // Look for text elements in the card
          const titleElement = await cardElement.locator('h1, h2, h3, h4, h5, h6, p, span').first();
          if (await titleElement.count() > 0) {
            const titleText = await titleElement.textContent();
            const titleStyles = await titleElement.evaluate(el => {
              const styles = window.getComputedStyle(el);
              return {
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight,
                color: styles.color,
                lineHeight: styles.lineHeight,
                fontFamily: styles.fontFamily
              };
            });
            console.log(`  Title: "${titleText?.slice(0, 50)}..."`, titleStyles);
          }
          
        } catch (e) {
          console.log(`  Error analyzing card ${i + 1}:`, e.message);
        }
      }
    }
    
    // Get section-level information
    console.log('\n--- SECTION ANALYSIS ---');
    const sectionData = await storiesContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        margin: styles.margin,
        width: rect.width,
        height: rect.height,
        maxWidth: styles.maxWidth
      };
    });
    console.log('Section styles:', sectionData);
    
    // Take screenshot of just the stories section
    await storiesContainer.screenshot({ path: 'on-com-stories-section.png' });
    console.log('Stories section screenshot saved');
    
    return {
      gridLayout,
      cardCount: storiesImages.length,
      sectionData
    };
    
  } catch (error) {
    console.error('Error analyzing on.com:', error);
    return null;
  } finally {
    await browser.close();
  }
}

async function analyzeGrantsImplementation() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('\n\n=== ANALYZING GRANT\'S IMPLEMENTATION ===');
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Take full page screenshot
    await page.screenshot({ path: 'grants-full-page.png', fullPage: true });
    console.log('Grant\'s full page screenshot saved');
    
    // Find stories section
    const storiesSection = await page.locator('text="Stories that move"').first();
    if (await storiesSection.count() === 0) {
      console.log('Stories section not found on Grant\'s site');
      return null;
    }
    
    const storiesContainer = await storiesSection.locator('..').first();
    
    // Find cards
    const cards = await storiesContainer.locator('div[class*="grid"] > div, .grid > div, [class*="card"]').all();
    console.log(`Found ${cards.length} cards in Grant's stories section`);
    
    // Analyze grid layout
    const gridElement = await storiesContainer.locator('[class*="grid"]').first();
    if (await gridElement.count() > 0) {
      const gridData = await gridElement.evaluate(el => {
        const styles = window.getComputedStyle(el);
        const classes = el.className;
        return {
          classes: classes,
          display: styles.display,
          gridTemplateColumns: styles.gridTemplateColumns,
          gap: styles.gap,
          columnGap: styles.columnGap,
          rowGap: styles.rowGap
        };
      });
      console.log('Grant\'s grid layout:', gridData);
    }
    
    // Analyze cards
    console.log('\n--- GRANT\'S CARD ANALYSIS ---');
    for (let i = 0; i < Math.min(3, cards.length); i++) {
      const card = cards[i];
      
      try {
        console.log(`\nCard ${i + 1}:`);
        
        // Get card styles
        const cardStyles = await card.evaluate(el => {
          const styles = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadow,
            backgroundColor: styles.backgroundColor,
            padding: styles.padding,
            margin: styles.margin,
            width: rect.width,
            height: rect.height,
            classes: el.className
          };
        });
        console.log(`  Card styles:`, cardStyles);
        
        // Find image in card
        const image = await card.locator('img').first();
        if (await image.count() > 0) {
          const imageData = await image.evaluate(el => {
            const rect = el.getBoundingClientRect();
            return {
              src: el.src,
              width: rect.width,
              height: rect.height,
              aspectRatio: rect.width && rect.height ? (rect.width / rect.height).toFixed(2) : 'unknown'
            };
          });
          console.log(`  Image:`, imageData);
        }
        
        // Find title
        const title = await card.locator('h1, h2, h3, h4, h5, h6').first();
        if (await title.count() > 0) {
          const titleData = await title.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              text: el.textContent,
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              color: styles.color,
              fontFamily: styles.fontFamily
            };
          });
          console.log(`  Title:`, titleData);
        }
        
      } catch (e) {
        console.log(`  Error analyzing Grant's card ${i + 1}:`, e.message);
      }
    }
    
    // Get section data
    const sectionData = await storiesContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        margin: styles.margin,
        width: rect.width,
        height: rect.height,
        classes: el.className
      };
    });
    console.log('Grant\'s section styles:', sectionData);
    
    // Take screenshot of stories section
    await storiesContainer.screenshot({ path: 'grants-stories-section.png' });
    console.log('Grant\'s stories section screenshot saved');
    
    return { cardCount: cards.length, sectionData };
    
  } catch (error) {
    console.error('Error analyzing Grant\'s implementation:', error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function main() {
  const onComData = await analyzeOnCom();
  const grantsData = await analyzeGrantsImplementation();
  
  console.log('\n\n=== COMPARISON SUMMARY ===');
  if (onComData && grantsData) {
    console.log(`On.com cards: ${onComData.cardCount}`);
    console.log(`Grant's cards: ${grantsData.cardCount}`);
  } else {
    console.log('Could not complete full comparison');
  }
}

main().catch(console.error);