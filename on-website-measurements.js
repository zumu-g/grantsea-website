// On.com Website Measurement Script
// Run this in the browser console at https://www.on.com/en-au/
// Make sure viewport is at 1440px width for desktop measurements

function getOnWebsiteMeasurements() {
    const measurements = {};
    
    // Helper function to get computed styles
    const getStyles = (selector, properties) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        
        const computed = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const result = {
            selector: selector,
            dimensions: {
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left
            }
        };
        
        properties.forEach(prop => {
            result[prop] = computed[prop];
        });
        
        return result;
    };
    
    // Helper to get all elements matching selector
    const getAllStyles = (selector, properties) => {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return null;
        
        return Array.from(elements).map((element, index) => {
            const computed = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            const result = {
                index: index,
                dimensions: {
                    width: rect.width,
                    height: rect.height,
                    aspectRatio: rect.width / rect.height
                }
            };
            
            properties.forEach(prop => {
                result[prop] = computed[prop];
            });
            
            return result;
        });
    };
    
    // 1. Hero Section Text
    console.log('=== HERO SECTION ===');
    measurements.heroSection = {};
    
    // Try multiple possible selectors for hero heading
    const heroHeadingSelectors = [
        'h1',
        '.hero h1',
        '[class*="hero"] h1',
        '[class*="Hero"] h1',
        'section:first-of-type h1'
    ];
    
    for (const selector of heroHeadingSelectors) {
        const heading = getStyles(selector, ['fontSize', 'fontWeight', 'lineHeight', 'fontFamily']);
        if (heading) {
            measurements.heroSection.heading = heading;
            console.log('Hero Heading:', heading);
            break;
        }
    }
    
    // Try to find subtitle
    const subtitleSelectors = [
        '.hero p',
        '[class*="hero"] p',
        '[class*="Hero"] p',
        'h1 + p',
        'h1 ~ p'
    ];
    
    for (const selector of subtitleSelectors) {
        const subtitle = getStyles(selector, ['fontSize', 'fontWeight', 'lineHeight', 'fontFamily']);
        if (subtitle) {
            measurements.heroSection.subtitle = subtitle;
            console.log('Hero Subtitle:', subtitle);
            break;
        }
    }
    
    // 2. Shop by Category Section
    console.log('\n=== SHOP BY CATEGORY ===');
    measurements.shopByCategory = {};
    
    const categorySelectors = [
        '[class*="category"] img',
        '[class*="Category"] img',
        '[class*="categories"] img',
        '[class*="Categories"] img'
    ];
    
    for (const selector of categorySelectors) {
        const categories = getAllStyles(selector, ['width', 'height', 'objectFit']);
        if (categories && categories.length > 0) {
            measurements.shopByCategory.images = categories;
            
            // Get gap between boxes
            const parent = document.querySelector(selector)?.parentElement?.parentElement;
            if (parent) {
                const parentStyles = window.getComputedStyle(parent);
                measurements.shopByCategory.gap = parentStyles.gap || parentStyles.gridGap;
                measurements.shopByCategory.display = parentStyles.display;
            }
            
            console.log('Category Images:', categories);
            console.log('Gap between boxes:', measurements.shopByCategory.gap);
            break;
        }
    }
    
    // 3. Activities/Product Showcase Section
    console.log('\n=== ACTIVITIES/PRODUCT SECTION ===');
    measurements.activities = {};
    
    const activitySelectors = [
        '[class*="activity"]',
        '[class*="Activity"]',
        '[class*="product-showcase"]',
        '[class*="ProductShowcase"]'
    ];
    
    for (const selector of activitySelectors) {
        const section = document.querySelector(selector);
        if (section) {
            const sectionStyles = window.getComputedStyle(section);
            measurements.activities.padding = {
                left: sectionStyles.paddingLeft,
                right: sectionStyles.paddingRight,
                top: sectionStyles.paddingTop,
                bottom: sectionStyles.paddingBottom
            };
            
            // Get image containers within
            const images = section.querySelectorAll('img');
            if (images.length > 0) {
                measurements.activities.images = Array.from(images).map(img => {
                    const rect = img.getBoundingClientRect();
                    return {
                        width: rect.width,
                        height: rect.height,
                        aspectRatio: rect.width / rect.height
                    };
                });
            }
            
            console.log('Activities Section:', measurements.activities);
            break;
        }
    }
    
    // 4. Carousel/Featured Section
    console.log('\n=== CAROUSEL/FEATURED ===');
    measurements.carousel = {};
    
    const carouselSelectors = [
        '[class*="carousel"]',
        '[class*="Carousel"]',
        '[class*="slider"]',
        '[class*="Slider"]',
        '[class*="featured"]',
        '[class*="Featured"]'
    ];
    
    for (const selector of carouselSelectors) {
        const carousel = document.querySelector(selector);
        if (carousel) {
            const items = carousel.querySelectorAll('img');
            if (items.length > 0) {
                measurements.carousel.itemCount = items.length;
                measurements.carousel.visibleItems = 0;
                measurements.carousel.items = [];
                
                items.forEach((img, index) => {
                    const rect = img.getBoundingClientRect();
                    const isVisible = rect.left >= 0 && rect.right <= window.innerWidth;
                    if (isVisible) measurements.carousel.visibleItems++;
                    
                    measurements.carousel.items.push({
                        index: index,
                        width: rect.width,
                        height: rect.height,
                        visible: isVisible
                    });
                });
                
                // Get gap
                const carouselStyles = window.getComputedStyle(carousel);
                measurements.carousel.gap = carouselStyles.gap || carouselStyles.gridGap;
                
                console.log('Carousel:', measurements.carousel);
                break;
            }
        }
    }
    
    // 5. "You may be interested in" Section
    console.log('\n=== YOU MAY BE INTERESTED IN ===');
    measurements.interested = {};
    
    // Find by text content
    const headings = document.querySelectorAll('h2, h3, h4');
    let interestedSection = null;
    
    headings.forEach(heading => {
        if (heading.textContent.toLowerCase().includes('interested') || 
            heading.textContent.toLowerCase().includes('you may like')) {
            interestedSection = heading;
            measurements.interested.headingFontSize = window.getComputedStyle(heading).fontSize;
            console.log('Found "Interested" heading:', heading.textContent, 'Font size:', measurements.interested.headingFontSize);
        }
    });
    
    if (interestedSection) {
        const parent = interestedSection.closest('section') || interestedSection.parentElement;
        const items = parent.querySelectorAll('img');
        measurements.interested.itemCount = items.length;
        measurements.interested.items = Array.from(items).map(img => {
            const rect = img.getBoundingClientRect();
            return {
                width: rect.width,
                height: rect.height,
                aspectRatio: rect.width / rect.height
            };
        });
        console.log('Interested section items:', measurements.interested);
    }
    
    // 6. Stories/Blog Section
    console.log('\n=== STORIES/BLOG SECTION ===');
    measurements.stories = {};
    
    const storySelectors = [
        '[class*="story"]',
        '[class*="Story"]',
        '[class*="blog"]',
        '[class*="Blog"]',
        '[class*="article"]',
        '[class*="Article"]'
    ];
    
    for (const selector of storySelectors) {
        const stories = document.querySelectorAll(selector + ' img');
        if (stories.length > 0) {
            measurements.stories.items = Array.from(stories).map(img => {
                const rect = img.getBoundingClientRect();
                const parent = img.parentElement;
                const parentStyles = window.getComputedStyle(parent);
                
                return {
                    width: rect.width,
                    height: rect.height,
                    aspectRatio: rect.width / rect.height,
                    parentPadding: parentStyles.padding,
                    parentMargin: parentStyles.margin
                };
            });
            
            // Get gap between items
            const container = document.querySelector(selector)?.parentElement;
            if (container) {
                const containerStyles = window.getComputedStyle(container);
                measurements.stories.gap = containerStyles.gap || containerStyles.gridGap;
            }
            
            console.log('Stories:', measurements.stories);
            break;
        }
    }
    
    // Return all measurements
    console.log('\n=== COMPLETE MEASUREMENTS ===');
    console.log(JSON.stringify(measurements, null, 2));
    return measurements;
}

// Run the measurement function
getOnWebsiteMeasurements();