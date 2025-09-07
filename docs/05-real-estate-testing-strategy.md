# Real Estate Testing Strategy

## Overview
This document outlines a comprehensive testing strategy specifically designed for real estate websites, covering functionality, user experience, performance, and compliance requirements unique to the property industry.

## Testing Philosophy

### Quality Assurance Principles
1. **User-Centric Testing**: Focus on real user journeys and property search behaviors
2. **Data Integrity**: Ensure accurate property information across all touchpoints
3. **Performance Under Load**: Handle peak traffic during property launches and market events
4. **Cross-Platform Compatibility**: Consistent experience across devices and browsers
5. **Regulatory Compliance**: Meet real estate industry standards and privacy requirements

### Testing Pyramid Structure
```
                 Manual/Exploratory Testing (10%)
                /                               \
          Integration Testing (20%)      E2E Testing (15%)
         /                                           \
   Unit Testing (40%)                    Visual Testing (15%)
```

## 1. Functional Testing Framework

### 1.1 Property Search and Discovery

#### Search Functionality Tests
```typescript
describe('Property Search', () => {
  test('should filter properties by location', async () => {
    const results = await searchProperties({
      suburb: 'Narre Warren',
      postcode: '3805'
    });
    
    expect(results.every(property => 
      property.address.suburb === 'Narre Warren'
    )).toBe(true);
  });

  test('should filter properties by price range', async () => {
    const results = await searchProperties({
      minPrice: 500000,
      maxPrice: 800000
    });
    
    expect(results.every(property => 
      property.price >= 500000 && property.price <= 800000
    )).toBe(true);
  });

  test('should handle multiple filter combinations', async () => {
    const filters = {
      suburb: 'Berwick',
      propertyType: 'house',
      bedrooms: 3,
      bathrooms: 2,
      minPrice: 600000,
      maxPrice: 900000
    };
    
    const results = await searchProperties(filters);
    
    results.forEach(property => {
      expect(property.address.suburb).toBe('Berwick');
      expect(property.type).toBe('house');
      expect(property.features.bedrooms).toBeGreaterThanOrEqual(3);
      expect(property.features.bathrooms).toBeGreaterThanOrEqual(2);
      expect(property.price).toBeGreaterThanOrEqual(600000);
      expect(property.price).toBeLessThanOrEqual(900000);
    });
  });

  test('should return empty results gracefully', async () => {
    const results = await searchProperties({
      suburb: 'NonexistentSuburb'
    });
    
    expect(results).toEqual([]);
  });
});
```

#### Map Integration Tests
```typescript
describe('Property Map Integration', () => {
  test('should display properties on map within bounds', async () => {
    const bounds = {
      north: -37.9,
      south: -38.1,
      east: 145.4,
      west: 145.2
    };
    
    const mapProperties = await getPropertiesInBounds(bounds);
    
    mapProperties.forEach(property => {
      expect(property.coordinates.latitude).toBeLessThan(bounds.north);
      expect(property.coordinates.latitude).toBeGreaterThan(bounds.south);
      expect(property.coordinates.longitude).toBeLessThan(bounds.east);
      expect(property.coordinates.longitude).toBeGreaterThan(bounds.west);
    });
  });

  test('should cluster properties appropriately', async () => {
    const clusterData = await getPropertyClusters(12); // Zoom level 12
    
    expect(clusterData.clusters.length).toBeGreaterThan(0);
    expect(clusterData.individualProperties.length).toBeGreaterThan(0);
  });
});
```

### 1.2 Property Details and Media

#### Property Display Tests
```typescript
describe('Property Details Page', () => {
  test('should display all required property information', async () => {
    const propertyId = 'test-property-123';
    const property = await getPropertyDetails(propertyId);
    
    // Required fields
    expect(property.title).toBeDefined();
    expect(property.price).toBeDefined();
    expect(property.address).toBeDefined();
    expect(property.features.bedrooms).toBeDefined();
    expect(property.features.bathrooms).toBeDefined();
    expect(property.agent).toBeDefined();
    
    // Media requirements
    expect(property.images.length).toBeGreaterThan(0);
    expect(property.images[0].isPrimary).toBe(true);
  });

  test('should handle missing optional information gracefully', async () => {
    const incompleteProperty = await getPropertyDetails('incomplete-property');
    
    // Should not crash with missing optional fields
    expect(() => renderPropertyDetails(incompleteProperty)).not.toThrow();
  });

  test('should validate image loading and optimization', async () => {
    const property = await getPropertyDetails('image-test-property');
    
    for (const image of property.images) {
      expect(image.url).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i);
      expect(image.altText).toBeDefined();
      
      // Check if optimized versions exist
      expect(image.sizes).toBeDefined();
      expect(image.sizes.thumbnail).toBeDefined();
      expect(image.sizes.medium).toBeDefined();
      expect(image.sizes.large).toBeDefined();
    }
  });
});
```

#### Virtual Tour and Media Tests
```typescript
describe('Property Media Integration', () => {
  test('should load virtual tours properly', async ({ page }) => {
    await page.goto('/property/virtual-tour-property');
    
    await page.waitForSelector('[data-testid="virtual-tour"]');
    
    const tourFrame = page.locator('iframe[src*="virtualtour"]');
    expect(await tourFrame.isVisible()).toBe(true);
  });

  test('should handle image gallery interactions', async ({ page }) => {
    await page.goto('/property/gallery-property');
    
    const gallery = page.locator('[data-testid="property-gallery"]');
    const firstImage = gallery.locator('img').first();
    
    await firstImage.click();
    
    // Should open lightbox
    const lightbox = page.locator('[data-testid="image-lightbox"]');
    expect(await lightbox.isVisible()).toBe(true);
    
    // Test navigation
    const nextButton = lightbox.locator('[data-testid="next-image"]');
    await nextButton.click();
    
    // Should advance to next image
    const currentImage = lightbox.locator('img[data-current="true"]');
    expect(await currentImage.getAttribute('src')).not.toBe(
      await firstImage.getAttribute('src')
    );
  });
});
```

### 1.3 Contact and Lead Management

#### Contact Form Tests
```typescript
describe('Contact Forms', () => {
  test('should submit property inquiry successfully', async () => {
    const inquiryData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '0400 000 000',
      propertyId: 'test-property-123',
      message: 'Interested in viewing this property',
      contactMethod: 'phone'
    };
    
    const response = await submitPropertyInquiry(inquiryData);
    
    expect(response.success).toBe(true);
    expect(response.inquiryId).toBeDefined();
    
    // Verify lead was created in system
    const lead = await getLead(response.inquiryId);
    expect(lead.contact.email).toBe(inquiryData.email);
    expect(lead.propertyId).toBe(inquiryData.propertyId);
  });

  test('should validate required fields', async () => {
    const incompleteData = {
      name: 'John Doe',
      // Missing email and other required fields
    };
    
    await expect(submitPropertyInquiry(incompleteData))
      .rejects.toThrow('Validation failed');
  });

  test('should handle appraisal requests', async () => {
    const appraisalData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '0400 111 111',
      propertyAddress: '123 Example St, Narre Warren VIC 3805',
      propertyType: 'house',
      bedrooms: '3',
      bathrooms: '2',
      appraisalType: 'sale',
      timeframe: '3-6months'
    };
    
    const response = await submitAppraisalRequest(appraisalData);
    
    expect(response.success).toBe(true);
    expect(response.reference).toBeDefined();
  });
});
```

#### Newsletter and Marketing Tests
```typescript
describe('Marketing Integration', () => {
  test('should subscribe to property alerts', async () => {
    const subscription = {
      email: 'alerts@example.com',
      preferences: {
        suburbs: ['Narre Warren', 'Berwick'],
        propertyTypes: ['house', 'townhouse'],
        priceRange: { min: 500000, max: 800000 }
      }
    };
    
    const response = await subscribeToPropertyAlerts(subscription);
    
    expect(response.success).toBe(true);
    expect(response.subscriptionId).toBeDefined();
  });

  test('should handle unsubscribe requests', async () => {
    const unsubscribeToken = 'test-unsubscribe-token-123';
    
    const response = await unsubscribeFromAlerts(unsubscribeToken);
    
    expect(response.success).toBe(true);
  });
});
```

## 2. User Experience Testing

### 2.1 Cross-Device Testing

#### Responsive Design Tests
```typescript
describe('Responsive Design', () => {
  const devices = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  devices.forEach(device => {
    test(`should display correctly on ${device.name}`, async ({ page }) => {
      await page.setViewportSize({ 
        width: device.width, 
        height: device.height 
      });
      
      await page.goto('/');
      
      // Check navigation is accessible
      const nav = page.locator('[data-testid="main-navigation"]');
      expect(await nav.isVisible()).toBe(true);
      
      // Check property cards are properly sized
      const propertyCards = page.locator('[data-testid="property-card"]');
      const cardCount = await propertyCards.count();
      
      if (cardCount > 0) {
        const firstCard = propertyCards.first();
        const cardBounds = await firstCard.boundingBox();
        
        expect(cardBounds.width).toBeLessThanOrEqual(device.width);
        expect(cardBounds.width).toBeGreaterThan(200); // Minimum readable width
      }
    });
  });
});
```

#### Touch Interface Tests
```typescript
describe('Mobile Touch Interface', () => {
  test('should handle property card swipe gestures', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/properties');
    
    const propertyCard = page.locator('[data-testid="property-card"]').first();
    
    // Test swipe gesture for image gallery
    await propertyCard.hover();
    await page.mouse.down();
    await page.mouse.move(200, 0); // Swipe right
    await page.mouse.up();
    
    // Should advance to next image
    const imageCounter = page.locator('[data-testid="image-counter"]');
    expect(await imageCounter.textContent()).toContain('2');
  });

  test('should handle map interactions on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/property-map');
    
    const mapContainer = page.locator('[data-testid="property-map"]');
    
    // Test pinch zoom simulation
    await mapContainer.tap();
    
    // Test property marker tap
    const propertyMarker = page.locator('[data-testid="property-marker"]').first();
    await propertyMarker.tap();
    
    // Should show property popup
    const popup = page.locator('[data-testid="property-popup"]');
    expect(await popup.isVisible()).toBe(true);
  });
});
```

### 2.2 User Journey Testing

#### Property Search Journey
```typescript
describe('Property Search User Journey', () => {
  test('complete property search and inquiry flow', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    
    // Use search functionality
    await page.fill('[data-testid="search-location"]', 'Narre Warren');
    await page.selectOption('[data-testid="property-type"]', 'house');
    await page.fill('[data-testid="min-price"]', '500000');
    await page.fill('[data-testid="max-price"]', '800000');
    
    await page.click('[data-testid="search-button"]');
    
    // Should navigate to results page
    expect(page.url()).toContain('/properties');
    
    // Select a property
    await page.click('[data-testid="property-card"]');
    
    // Should be on property details page
    expect(page.url()).toContain('/property/');
    
    // Make an inquiry
    await page.click('[data-testid="contact-agent-button"]');
    
    await page.fill('[data-testid="inquiry-name"]', 'Test User');
    await page.fill('[data-testid="inquiry-email"]', 'test@example.com');
    await page.fill('[data-testid="inquiry-phone"]', '0400 000 000');
    await page.fill('[data-testid="inquiry-message"]', 'Interested in this property');
    
    await page.click('[data-testid="submit-inquiry"]');
    
    // Should show success message
    const successMessage = page.locator('[data-testid="success-message"]');
    expect(await successMessage.isVisible()).toBe(true);
  });

  test('property appraisal request flow', async ({ page }) => {
    await page.goto('/services/property-appraisal');
    
    // Fill appraisal form
    await page.fill('[data-testid="appraisal-name"]', 'Property Owner');
    await page.fill('[data-testid="appraisal-email"]', 'owner@example.com');
    await page.fill('[data-testid="appraisal-phone"]', '0400 111 111');
    await page.fill('[data-testid="property-address"]', '123 Test St, Berwick VIC 3806');
    await page.selectOption('[data-testid="property-type"]', 'house');
    await page.selectOption('[data-testid="bedrooms"]', '3');
    await page.selectOption('[data-testid="bathrooms"]', '2');
    await page.selectOption('[data-testid="timeframe"]', '3-6months');
    
    await page.click('[data-testid="submit-appraisal"]');
    
    // Should redirect to thank you page
    expect(page.url()).toContain('/thank-you');
    
    const confirmationMessage = page.locator('[data-testid="confirmation"]');
    expect(await confirmationMessage.textContent()).toContain('appraisal request');
  });
});
```

## 3. Performance Testing

### 3.1 Core Web Vitals

#### Page Speed Tests
```typescript
describe('Performance Metrics', () => {
  test('homepage should meet Core Web Vitals', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const metrics = {};
          
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.value;
            }
            if (entry.name === 'largest-contentful-paint') {
              metrics.lcp = entry.value;
            }
          });
          
          resolve(metrics);
        }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
      });
    });
    
    expect(metrics.fcp).toBeLessThan(1800); // 1.8s for good FCP
    expect(metrics.lcp).toBeLessThan(2500); // 2.5s for good LCP
  });

  test('property listing page should load efficiently', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/properties', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
    
    // Check that property cards are rendered
    const propertyCards = page.locator('[data-testid="property-card"]');
    const cardCount = await propertyCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
```

#### Image Optimization Tests
```typescript
describe('Image Performance', () => {
  test('should load optimized images', async ({ page }) => {
    await page.goto('/property/image-heavy-property');
    
    const images = page.locator('img[data-testid*="property-image"]');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const src = await image.getAttribute('src');
      
      // Should use WebP or optimized format
      expect(src).toMatch(/\.(webp|jpg|jpeg)(\?.*)?$/i);
      
      // Should have proper loading attribute
      const loading = await image.getAttribute('loading');
      if (i > 2) { // Images below fold should lazy load
        expect(loading).toBe('lazy');
      }
    }
  });

  test('should implement responsive images', async ({ page }) => {
    await page.goto('/property/responsive-images');
    
    const heroImage = page.locator('[data-testid="hero-image"]');
    const srcset = await heroImage.getAttribute('srcset');
    
    expect(srcset).toContain('400w');
    expect(srcset).toContain('800w');
    expect(srcset).toContain('1200w');
  });
});
```

### 3.2 Load Testing

#### High Traffic Scenarios
```typescript
describe('Load Testing', () => {
  test('should handle property launch traffic spike', async () => {
    const concurrentUsers = 50;
    const testDuration = 60000; // 1 minute
    
    const promises = Array.from({ length: concurrentUsers }, async (_, i) => {
      const response = await fetch('/api/properties/new-listing-123');
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.property).toBeDefined();
    });
    
    const results = await Promise.allSettled(promises);
    const failures = results.filter(result => result.status === 'rejected');
    
    // Should handle at least 90% of requests successfully
    expect(failures.length).toBeLessThan(concurrentUsers * 0.1);
  });

  test('should maintain database performance under load', async () => {
    const searchQueries = 100;
    const startTime = Date.now();
    
    const promises = Array.from({ length: searchQueries }, async () => {
      return searchProperties({
        suburb: 'Narre Warren',
        minPrice: 500000,
        maxPrice: 800000
      });
    });
    
    const results = await Promise.all(promises);
    const endTime = Date.now();
    
    const averageResponseTime = (endTime - startTime) / searchQueries;
    expect(averageResponseTime).toBeLessThan(500); // Average under 500ms
    
    // All queries should return results
    results.forEach(result => {
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
```

## 4. Security and Compliance Testing

### 4.1 Data Privacy Tests

#### GDPR/Privacy Act Compliance
```typescript
describe('Privacy Compliance', () => {
  test('should handle data access requests', async () => {
    const clientId = 'test-client-123';
    
    const personalData = await getPersonalData(clientId);
    
    expect(personalData).toHaveProperty('contact');
    expect(personalData).toHaveProperty('preferences');
    expect(personalData).toHaveProperty('inquiries');
    expect(personalData).toHaveProperty('subscriptions');
    
    // Should not include sensitive system data
    expect(personalData).not.toHaveProperty('password');
    expect(personalData).not.toHaveProperty('internalNotes');
  });

  test('should handle data deletion requests', async () => {
    const clientId = 'test-deletion-client';
    
    // Create test data
    await createTestClient(clientId);
    
    // Request deletion
    const deletion = await requestDataDeletion(clientId);
    expect(deletion.success).toBe(true);
    
    // Verify data is anonymized/deleted
    const client = await getClient(clientId);
    expect(client).toBeNull();
    
    // Transaction records should be anonymized, not deleted
    const transactions = await getTransactionHistory(clientId);
    transactions.forEach(transaction => {
      expect(transaction.clientEmail).toBe('[DELETED]');
      expect(transaction.clientName).toBe('[DELETED]');
    });
  });

  test('should validate consent management', async () => {
    const clientId = 'consent-test-client';
    
    // Test consent recording
    await recordConsent(clientId, ['marketing', 'analytics']);
    
    const consent = await getConsentStatus(clientId);
    expect(consent.marketing).toBe(true);
    expect(consent.analytics).toBe(true);
    expect(consent.thirdParty).toBe(false);
    
    // Test consent withdrawal
    await withdrawConsent(clientId, ['marketing']);
    
    const updatedConsent = await getConsentStatus(clientId);
    expect(updatedConsent.marketing).toBe(false);
    expect(updatedConsent.analytics).toBe(true);
  });
});
```

### 4.2 Real Estate Compliance Tests

#### Industry-Specific Requirements
```typescript
describe('Real Estate Compliance', () => {
  test('should display required property disclosures', async ({ page }) => {
    await page.goto('/property/disclosure-required-property');
    
    // Check for mandatory disclosures
    const disclosure = page.locator('[data-testid="property-disclosures"]');
    expect(await disclosure.isVisible()).toBe(true);
    
    // Should include agent license information
    const agentLicense = page.locator('[data-testid="agent-license"]');
    expect(await agentLicense.textContent()).toMatch(/License.*\d+/);
    
    // Should include price disclaimer if applicable
    const priceDisclaimer = page.locator('[data-testid="price-disclaimer"]');
    if (await priceDisclaimer.count() > 0) {
      expect(await priceDisclaimer.textContent()).toContain('estimate');
    }
  });

  test('should handle auction properties correctly', async ({ page }) => {
    await page.goto('/property/auction-property');
    
    const auctionBadge = page.locator('[data-testid="auction-badge"]');
    expect(await auctionBadge.isVisible()).toBe(true);
    
    const auctionDate = page.locator('[data-testid="auction-date"]');
    expect(await auctionDate.textContent()).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    
    // Should not show fixed price
    const price = page.locator('[data-testid="property-price"]');
    expect(await price.textContent()).not.toMatch(/\$\d+/);
  });

  test('should validate property data accuracy', async () => {
    const property = await getProperty('accuracy-test-property');
    
    // Required fields should be present and valid
    expect(property.address.postcode).toMatch(/^\d{4}$/);
    expect(property.features.bedrooms).toBeGreaterThanOrEqual(0);
    expect(property.features.bathrooms).toBeGreaterThanOrEqual(0);
    expect(property.features.carSpaces).toBeGreaterThanOrEqual(0);
    
    // Price should be reasonable
    if (property.price) {
      expect(property.price).toBeGreaterThan(50000);
      expect(property.price).toBeLessThan(50000000);
    }
    
    // Coordinates should be in Australia
    if (property.coordinates) {
      expect(property.coordinates.latitude).toBeLessThan(-10);
      expect(property.coordinates.latitude).toBeGreaterThan(-45);
      expect(property.coordinates.longitude).toBeGreaterThan(110);
      expect(property.coordinates.longitude).toBeLessThan(155);
    }
  });
});
```

## 5. Accessibility Testing

### 5.1 WCAG Compliance Tests

#### Keyboard Navigation
```typescript
describe('Accessibility - Keyboard Navigation', () => {
  test('should navigate property search with keyboard only', async ({ page }) => {
    await page.goto('/properties');
    
    // Tab through search filters
    await page.keyboard.press('Tab'); // Location input
    await page.keyboard.type('Narre Warren');
    
    await page.keyboard.press('Tab'); // Property type dropdown
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    await page.keyboard.press('Tab'); // Search button
    await page.keyboard.press('Enter');
    
    // Should perform search
    await page.waitForSelector('[data-testid="search-results"]');
    
    // Tab through results
    await page.keyboard.press('Tab'); // First property card
    const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(focusedElement).toContain('property-card');
  });

  test('should provide keyboard access to image galleries', async ({ page }) => {
    await page.goto('/property/gallery-property');
    
    const gallery = page.locator('[data-testid="property-gallery"]');
    await gallery.focus();
    
    // Arrow keys should navigate images
    await page.keyboard.press('ArrowRight');
    
    const activeImage = page.locator('[data-testid="active-gallery-image"]');
    expect(await activeImage.getAttribute('aria-current')).toBe('true');
    
    // Space/Enter should open lightbox
    await page.keyboard.press('Enter');
    
    const lightbox = page.locator('[data-testid="image-lightbox"]');
    expect(await lightbox.isVisible()).toBe(true);
    
    // Escape should close lightbox
    await page.keyboard.press('Escape');
    expect(await lightbox.isVisible()).toBe(false);
  });
});
```

#### Screen Reader Compatibility
```typescript
describe('Accessibility - Screen Reader', () => {
  test('should provide descriptive labels for property information', async ({ page }) => {
    await page.goto('/property/screen-reader-test');
    
    // Property price should have proper label
    const price = page.locator('[data-testid="property-price"]');
    expect(await price.getAttribute('aria-label')).toContain('Price');
    
    // Property features should be announced properly
    const bedrooms = page.locator('[data-testid="bedrooms"]');
    expect(await bedrooms.getAttribute('aria-label')).toMatch(/\d+ bedroom/);
    
    const bathrooms = page.locator('[data-testid="bathrooms"]');
    expect(await bathrooms.getAttribute('aria-label')).toMatch(/\d+ bathroom/);
    
    // Images should have meaningful alt text
    const propertyImages = page.locator('[data-testid="property-image"]');
    const imageCount = await propertyImages.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = propertyImages.nth(i);
      const altText = await image.getAttribute('alt');
      
      expect(altText).toBeDefined();
      expect(altText.length).toBeGreaterThan(5);
      expect(altText).not.toBe('image'); // Generic alt text not allowed
    }
  });

  test('should announce form validation errors', async ({ page }) => {
    await page.goto('/contact');
    
    // Submit form with missing required fields
    await page.click('[data-testid="submit-contact-form"]');
    
    // Error messages should be associated with fields
    const nameField = page.locator('[data-testid="contact-name"]');
    const nameError = page.locator('[data-testid="name-error"]');
    
    expect(await nameField.getAttribute('aria-invalid')).toBe('true');
    expect(await nameField.getAttribute('aria-describedby')).toContain(
      await nameError.getAttribute('id')
    );
    
    // Error region should be announced
    const errorRegion = page.locator('[data-testid="form-errors"]');
    expect(await errorRegion.getAttribute('role')).toBe('alert');
  });
});
```

### 5.2 Color and Contrast Testing

#### Visual Accessibility
```typescript
describe('Visual Accessibility', () => {
  test('should meet color contrast requirements', async ({ page }) => {
    await page.goto('/');
    
    // Test text contrast using axe-core
    const violations = await page.evaluate(() => {
      return new Promise((resolve) => {
        axe.run({ tags: ['wcag2aa'] }, (err, results) => {
          resolve(results.violations.filter(v => v.id === 'color-contrast'));
        });
      });
    });
    
    expect(violations).toHaveLength(0);
  });

  test('should work without color alone for information', async ({ page }) => {
    await page.goto('/properties');
    
    // Property status should not rely on color alone
    const statusBadges = page.locator('[data-testid="property-status"]');
    const badgeCount = await statusBadges.count();
    
    for (let i = 0; i < badgeCount; i++) {
      const badge = statusBadges.nth(i);
      const text = await badge.textContent();
      
      // Should have text content, not just color
      expect(text.trim()).not.toBe('');
    }
    
    // Price changes should include text indicators
    const priceChanges = page.locator('[data-testid="price-change"]');
    if (await priceChanges.count() > 0) {
      const firstChange = priceChanges.first();
      const changeText = await firstChange.textContent();
      
      expect(changeText).toMatch(/(increase|decrease|up|down|\+|-)/i);
    }
  });
});
```

## 6. Integration Testing

### 6.1 Third-Party Service Tests

#### Email Service Integration
```typescript
describe('Email Service Integration', () => {
  test('should send property inquiry emails', async () => {
    const inquiryData = {
      propertyId: 'test-property-123',
      clientName: 'Test Client',
      clientEmail: 'client@example.com',
      clientPhone: '0400 000 000',
      message: 'Test inquiry message'
    };
    
    const emailService = new EmailService();
    const result = await emailService.sendPropertyInquiry(inquiryData);
    
    expect(result.success).toBe(true);
    expect(result.messageId).toBeDefined();
    
    // Verify email was queued/sent
    const emailLog = await getEmailLog(result.messageId);
    expect(emailLog.status).toBe('sent');
    expect(emailLog.recipient).toBe('agent@grantsea.com.au');
  });

  test('should handle email delivery failures gracefully', async () => {
    const invalidEmailData = {
      propertyId: 'test-property-123',
      clientEmail: 'invalid-email-address',
      // ... other data
    };
    
    const emailService = new EmailService();
    
    await expect(emailService.sendPropertyInquiry(invalidEmailData))
      .rejects.toThrow('Invalid email address');
  });
});
```

#### CRM Integration Tests
```typescript
describe('CRM Integration', () => {
  test('should sync leads to CRM system', async () => {
    const leadData = {
      name: 'CRM Test Lead',
      email: 'crm.test@example.com',
      phone: '0400 111 111',
      source: 'website',
      propertyInterest: 'test-property-123'
    };
    
    const crmSync = new CRMIntegration();
    const result = await crmSync.createLead(leadData);
    
    expect(result.success).toBe(true);
    expect(result.crmLeadId).toBeDefined();
    
    // Verify lead exists in CRM
    const crmLead = await crmSync.getLead(result.crmLeadId);
    expect(crmLead.email).toBe(leadData.email);
    expect(crmLead.source).toBe('website');
  });

  test('should handle CRM API failures', async () => {
    const crmSync = new CRMIntegration();
    
    // Simulate CRM service down
    jest.spyOn(crmSync, 'makeAPICall').mockRejectedValue(new Error('Service unavailable'));
    
    const leadData = { /* test data */ };
    
    // Should not crash the application
    const result = await crmSync.createLead(leadData);
    expect(result.success).toBe(false);
    expect(result.error).toContain('Service unavailable');
    
    // Should still create local lead record
    const localLead = await getLocalLead(leadData.email);
    expect(localLead).toBeDefined();
  });
});
```

## 7. Testing Infrastructure and Tools

### 7.1 Test Environment Setup

#### Database Testing
```typescript
// Test database setup
beforeEach(async () => {
  // Reset test database
  await truncateTestTables();
  
  // Seed with test data
  await seedTestProperties();
  await seedTestAgents();
  await seedTestClients();
});

afterEach(async () => {
  // Cleanup after tests
  await cleanupTestData();
});
```

#### Mock Services
```typescript
// Mock external API services during testing
jest.mock('../services/EmailService', () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true, messageId: 'test-123' }),
  sendPropertyInquiry: jest.fn().mockResolvedValue({ success: true })
}));

jest.mock('../services/PropertyDataFeed', () => ({
  syncProperties: jest.fn().mockResolvedValue({ updated: 10, created: 5 }),
  getExternalProperty: jest.fn().mockResolvedValue(mockPropertyData)
}));
```

### 7.2 Continuous Integration Pipeline

#### Test Automation Workflow
```yaml
name: Test Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm run test:unit
      - name: Upload coverage
        uses: codecov/codecov-action@v2

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: gea_test
    steps:
      - uses: actions/checkout@v2
      - name: Setup test database
        run: npm run db:test:setup
      - name: Run integration tests
        run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Playwright
        run: npx playwright install
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Upload test results
        uses: actions/upload-artifact@v2
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  performance-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: npm run lighthouse:ci
      - name: Run load tests
        run: npm run test:load
```

### 7.3 Test Reporting and Metrics

#### Coverage Requirements
```typescript
// Jest configuration for coverage
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    './src/components/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
```

#### Quality Gates
```typescript
// Quality gates for deployment
const qualityGates = {
  unitTestCoverage: 85,
  integrationTestSuccess: 100,
  e2eTestSuccess: 95,
  performanceScore: 85,
  accessibilityScore: 95,
  securityScanPassed: true,
};
```

---

*This comprehensive testing strategy ensures the Grants Estate Agents website meets the highest standards for functionality, performance, accessibility, and user experience while maintaining compliance with real estate industry requirements and data privacy regulations.*