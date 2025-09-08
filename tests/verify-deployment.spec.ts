import { test, expect } from '@playwright/test';

test.describe('Vercel Deployment Verification', () => {
  // Common Vercel deployment URLs to check
  const possibleUrls = [
    'https://grantsea-website.vercel.app',
    'https://grantsea.vercel.app',
    'https://gea-website.vercel.app',
    'https://grants-estate-agents.vercel.app'
  ];

  test('should find and verify the live deployment', async ({ page }) => {
    let deployedUrl = '';
    
    // Try to find the working deployment
    for (const url of possibleUrls) {
      try {
        const response = await page.goto(url, { 
          waitUntil: 'domcontentloaded',
          timeout: 10000 
        });
        
        if (response && response.ok()) {
          deployedUrl = url;
          console.log(`✅ Found live deployment at: ${url}`);
          break;
        }
      } catch (error) {
        console.log(`❌ ${url} not accessible`);
      }
    }

    // If no URL worked, check the main grantsea-website URL
    if (!deployedUrl) {
      deployedUrl = 'https://grantsea-website.vercel.app';
      await page.goto(deployedUrl, { waitUntil: 'networkidle' });
    }

    // Take a screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/vercel-deployment.png',
      fullPage: true 
    });

    // Verify key elements from the latest deployment (2025-09-06)
    
    // 1. Check for Grant's Estate Agents in title
    await expect(page).toHaveTitle(/Grant's Estate Agents|Grants Estate Agents/i);
    
    // 2. Check for video header element
    const videoHeader = page.locator('video, .video-header, [class*="video"]').first();
    await expect(videoHeader).toBeVisible({ timeout: 10000 });
    
    // 3. Check for Grant's AI chat assistant (bottom-right corner)
    const chatAssistant = page.locator('[class*="chat"], [class*="assistant"], #grants-ai-chat').first();
    await expect(chatAssistant).toBeVisible();
    
    // 4. Check for real estate categories
    await expect(page.getByText('Buy', { exact: false })).toBeVisible();
    await expect(page.getByText('Lease', { exact: false })).toBeVisible();
    await expect(page.getByText('Appraisal', { exact: false })).toBeVisible();
    
    // 5. Check for Melbourne suburbs
    const suburbsToCheck = ['Berwick', 'Narre Warren', 'Pakenham'];
    for (const suburb of suburbsToCheck) {
      const suburbElement = page.getByText(suburb, { exact: false }).first();
      await expect(suburbElement).toBeVisible();
    }
    
    // 6. Check for hero section with proper content
    const heroSection = page.locator('[class*="hero"], header, section').first();
    await expect(heroSection).toContainText(/Grant's Estate Agents|Your Property Journey/i);
    
    // Log deployment details
    console.log(`
    ✅ DEPLOYMENT VERIFICATION COMPLETE
    URL: ${deployedUrl}
    Title: ${await page.title()}
    Video Header: ${await videoHeader.isVisible()}
    Chat Assistant: ${await chatAssistant.isVisible()}
    Categories Found: Buy, Lease, Appraisal
    Suburbs Found: ${suburbsToCheck.join(', ')}
    `);
  });

  test('should verify responsive design', async ({ page }) => {
    const deployedUrl = 'https://grantsea-website.vercel.app';
    await page.goto(deployedUrl);

    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ 
      path: 'test-results/desktop-view.png',
      fullPage: false 
    });

    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ 
      path: 'test-results/tablet-view.png',
      fullPage: false 
    });

    // Mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ 
      path: 'test-results/mobile-view.png',
      fullPage: false 
    });

    // Check that chat assistant is still visible on mobile
    const chatAssistant = page.locator('[class*="chat"], [class*="assistant"]').first();
    await expect(chatAssistant).toBeVisible();
  });

  test('should check page performance metrics', async ({ page }) => {
    const deployedUrl = 'https://grantsea-website.vercel.app';
    
    const startTime = Date.now();
    await page.goto(deployedUrl, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    console.log(`Page load time: ${loadTime}ms`);
    
    // Check that page loads within reasonable time
    expect(loadTime).toBeLessThan(5000); // 5 seconds max

    // Check for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000); // Wait for any async errors

    if (errors.length > 0) {
      console.log('Console errors found:', errors);
    }
    
    expect(errors.length).toBe(0);
  });
});