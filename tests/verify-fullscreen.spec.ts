import { test, expect } from '@playwright/test';

test('Verify homepage is full screen', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Get viewport width
  const viewportSize = page.viewportSize();
  console.log('Viewport size:', viewportSize);
  
  // Check if header uses full width
  const headerWidth = await page.locator('.header').evaluate(el => {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      left: rect.left,
      right: rect.right
    };
  });
  
  console.log('Header dimensions:', headerWidth);
  
  // Check if main content sections use full width
  const mainSectionWidth = await page.locator('.section-main').evaluate(el => {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      left: rect.left,
      right: rect.right
    };
  });
  
  console.log('Main section dimensions:', mainSectionWidth);
  
  // Check if content areas are using full width (accounting for padding)
  const heroImageWidth = await page.locator('.picture-fw').evaluate(el => {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      left: rect.left,
      right: rect.right
    };
  });
  
  console.log('Hero image dimensions:', heroImageWidth);
  
  // Take screenshot for verification
  await page.screenshot({ 
    path: 'fullscreen-verification.png', 
    fullPage: true 
  });
  
  // Verify header starts from left edge (allowing for small margins)
  expect(headerWidth.left).toBeLessThanOrEqual(50);
  
  // Verify main content uses most of the viewport width
  expect(mainSectionWidth.width).toBeGreaterThan((viewportSize?.width || 1200) * 0.9);
  
  // Verify hero image uses full width
  expect(heroImageWidth.width).toBeGreaterThan((viewportSize?.width || 1200) * 0.9);
});