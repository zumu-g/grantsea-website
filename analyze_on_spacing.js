const { chromium } = require('playwright');
const fs = require('fs');

async function analyzeOnSpacing() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const viewports = [
        { width: 1440, name: 'desktop-1440' },
        { width: 1024, name: 'tablet-1024' },
        { width: 768, name: 'mobile-768' }
    ];
    
    const results = {};
    
    for (const viewport of viewports) {
        console.log(`\n=== Analyzing at ${viewport.width}px ===`);
        await page.setViewportSize({ width: viewport.width, height: 900 });
        try {
            await page.goto('https://www.on.com', { 
                waitUntil: 'domcontentloaded',
                timeout: 60000 
            });
            // Wait for main content to load
            await page.waitForSelector('main, [class*="hero"], section', { timeout: 30000 });
            await page.waitForTimeout(5000); // Let page fully render
        } catch (e) {
            console.log(`Error loading page at ${viewport.width}px:`, e.message);
            continue;
        }
        
        results[viewport.name] = {
            viewport: viewport.width,
            sections: {}
        };
        
        // Analyze major sections
        const sections = [
            // Hero/Banner area
            { name: 'hero', selectors: [
                'section[data-testid="hero"]',
                '[class*="hero"]',
                'section:first-of-type',
                'div[class*="banner"]',
                'header + section',
                'main > section:first-child'
            ]},
            
            // Main content/product grid
            { name: 'main-content', selectors: [
                'main',
                '[class*="product-grid"]',
                '[class*="collection"]',
                'section[class*="shop"]',
                'div[class*="container"]:has([class*="product"])'
            ]},
            
            // Category/Shop sections
            { name: 'shop-section', selectors: [
                '[class*="shop-by"]',
                '[class*="category"]',
                'section:has(a[href*="/shop"])',
                'section:has([class*="product-card"])'
            ]},
            
            // Editorial/Content sections
            { name: 'editorial', selectors: [
                '[class*="editorial"]',
                '[class*="content-block"]',
                '[class*="story"]',
                'section:has(p)',
                'section:has(h2):not(:has([class*="product"]))'
            ]},
            
            // Footer
            { name: 'footer', selectors: [
                'footer',
                '[class*="footer"]',
                'body > div:last-child'
            ]}
        ];
        
        for (const section of sections) {
            console.log(`\nAnalyzing ${section.name}...`);
            let element = null;
            
            // Try each selector until we find the element
            for (const selector of section.selectors) {
                try {
                    const el = await page.$(selector);
                    if (el) {
                        element = el;
                        console.log(`Found with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    // Continue to next selector
                }
            }
            
            if (!element) {
                console.log(`Could not find ${section.name}`);
                continue;
            }
            
            // Get detailed spacing information
            const spacing = await element.evaluate((el) => {
                const computed = window.getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                
                // Find the actual content container within this section
                let contentContainer = el;
                const possibleContainers = el.querySelectorAll('[class*="container"], [class*="wrapper"], [class*="inner"], div');
                
                if (possibleContainers.length > 0) {
                    // Find the widest container that's not full width
                    let maxWidth = 0;
                    for (const container of possibleContainers) {
                        const containerRect = container.getBoundingClientRect();
                        if (containerRect.width < window.innerWidth && containerRect.width > maxWidth) {
                            maxWidth = containerRect.width;
                            contentContainer = container;
                        }
                    }
                }
                
                const contentComputed = window.getComputedStyle(contentContainer);
                const contentRect = contentContainer.getBoundingClientRect();
                
                // Calculate actual spacing from viewport edges
                const leftSpaceToViewport = rect.left;
                const rightSpaceToViewport = window.innerWidth - rect.right;
                const contentLeftSpace = contentRect.left;
                const contentRightSpace = window.innerWidth - contentRect.right;
                
                // Get all nested containers for analysis
                const nestedContainers = [];
                let current = contentContainer;
                while (current && current !== el) {
                    const parent = current.parentElement;
                    if (parent) {
                        const parentStyle = window.getComputedStyle(parent);
                        nestedContainers.push({
                            tagName: parent.tagName,
                            className: parent.className,
                            padding: {
                                left: parentStyle.paddingLeft,
                                right: parentStyle.paddingRight
                            },
                            margin: {
                                left: parentStyle.marginLeft,
                                right: parentStyle.marginRight
                            },
                            maxWidth: parentStyle.maxWidth,
                            width: parentStyle.width
                        });
                    }
                    current = parent;
                }
                
                return {
                    element: {
                        tagName: el.tagName,
                        className: el.className,
                        id: el.id,
                        selector: el.tagName + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className.split(' ').join('.')}` : '')
                    },
                    mainElement: {
                        padding: {
                            left: computed.paddingLeft,
                            right: computed.paddingRight,
                            top: computed.paddingTop,
                            bottom: computed.paddingBottom
                        },
                        margin: {
                            left: computed.marginLeft,
                            right: computed.marginRight,
                            auto: computed.margin
                        },
                        maxWidth: computed.maxWidth,
                        width: computed.width,
                        boxSizing: computed.boxSizing,
                        position: computed.position,
                        display: computed.display
                    },
                    contentContainer: contentContainer !== el ? {
                        tagName: contentContainer.tagName,
                        className: contentContainer.className,
                        padding: {
                            left: contentComputed.paddingLeft,
                            right: contentComputed.paddingRight
                        },
                        margin: {
                            left: contentComputed.marginLeft,
                            right: contentComputed.marginRight,
                            auto: contentComputed.margin
                        },
                        maxWidth: contentComputed.maxWidth,
                        width: contentComputed.width,
                        boxSizing: contentComputed.boxSizing
                    } : null,
                    measurements: {
                        elementWidth: rect.width,
                        contentWidth: contentRect.width,
                        viewportWidth: window.innerWidth,
                        leftSpaceToViewport: leftSpaceToViewport,
                        rightSpaceToViewport: rightSpaceToViewport,
                        contentLeftSpace: contentLeftSpace,
                        contentRightSpace: contentRightSpace,
                        isFullWidth: rect.width >= window.innerWidth,
                        isCentered: Math.abs(leftSpaceToViewport - rightSpaceToViewport) < 2
                    },
                    nestedContainers: nestedContainers
                };
            });
            
            results[viewport.name].sections[section.name] = spacing;
            
            // Take screenshot of the section
            await element.screenshot({ 
                path: `on-${viewport.name}-${section.name}.png`,
                fullPage: false 
            });
        }
        
        // Also analyze the overall page structure
        const pageStructure = await page.evaluate(() => {
            const body = document.body;
            const main = document.querySelector('main');
            const bodyStyle = window.getComputedStyle(body);
            const mainStyle = main ? window.getComputedStyle(main) : null;
            
            // Find all top-level containers
            const topContainers = document.querySelectorAll('body > div, body > section, body > header, body > footer, body > main');
            const containerInfo = [];
            
            for (const container of topContainers) {
                const style = window.getComputedStyle(container);
                const rect = container.getBoundingClientRect();
                containerInfo.push({
                    tagName: container.tagName,
                    className: container.className,
                    width: rect.width,
                    maxWidth: style.maxWidth,
                    margin: style.margin,
                    padding: {
                        left: style.paddingLeft,
                        right: style.paddingRight
                    },
                    isFullWidth: rect.width >= window.innerWidth
                });
            }
            
            return {
                body: {
                    margin: bodyStyle.margin,
                    padding: {
                        left: bodyStyle.paddingLeft,
                        right: bodyStyle.paddingRight
                    }
                },
                main: mainStyle ? {
                    margin: mainStyle.margin,
                    padding: {
                        left: mainStyle.paddingLeft,
                        right: mainStyle.paddingRight
                    },
                    maxWidth: mainStyle.maxWidth,
                    width: mainStyle.width
                } : null,
                topLevelContainers: containerInfo
            };
        });
        
        results[viewport.name].pageStructure = pageStructure;
        
        // Take full page screenshot
        await page.screenshot({ 
            path: `on-${viewport.name}-full.png`, 
            fullPage: true 
        });
    }
    
    // Save results to JSON
    fs.writeFileSync('on-spacing-analysis.json', JSON.stringify(results, null, 2));
    
    // Generate detailed report
    let report = '# On.com Spacing Analysis Report\n\n';
    
    for (const [viewportName, data] of Object.entries(results)) {
        report += `## ${viewportName} (${data.viewport}px)\n\n`;
        
        report += `### Page Structure\n`;
        report += `- Body margin: ${data.pageStructure.body.margin}\n`;
        report += `- Body padding: L=${data.pageStructure.body.padding.left}, R=${data.pageStructure.body.padding.right}\n`;
        if (data.pageStructure.main) {
            report += `- Main margin: ${data.pageStructure.main.margin}\n`;
            report += `- Main padding: L=${data.pageStructure.main.padding.left}, R=${data.pageStructure.main.padding.right}\n`;
            report += `- Main max-width: ${data.pageStructure.main.maxWidth}\n`;
        }
        report += '\n';
        
        for (const [sectionName, section] of Object.entries(data.sections)) {
            report += `### ${sectionName}\n\n`;
            report += `**Element:** ${section.element.selector}\n\n`;
            
            report += `**Main Element Styles:**\n`;
            report += `- Padding: L=${section.mainElement.padding.left}, R=${section.mainElement.padding.right}\n`;
            report += `- Margin: ${section.mainElement.margin.auto}\n`;
            report += `- Max-width: ${section.mainElement.maxWidth}\n`;
            report += `- Width: ${section.mainElement.width}\n`;
            report += `- Box-sizing: ${section.mainElement.boxSizing}\n`;
            report += '\n';
            
            if (section.contentContainer) {
                report += `**Content Container:**\n`;
                report += `- Element: ${section.contentContainer.tagName}.${section.contentContainer.className}\n`;
                report += `- Padding: L=${section.contentContainer.padding.left}, R=${section.contentContainer.padding.right}\n`;
                report += `- Margin: ${section.contentContainer.margin.auto}\n`;
                report += `- Max-width: ${section.contentContainer.maxWidth}\n`;
                report += `- Width: ${section.contentContainer.width}\n`;
                report += '\n';
            }
            
            report += `**Measurements:**\n`;
            report += `- Element width: ${section.measurements.elementWidth}px\n`;
            report += `- Content width: ${section.measurements.contentWidth}px\n`;
            report += `- Left space to viewport: ${section.measurements.contentLeftSpace}px\n`;
            report += `- Right space to viewport: ${section.measurements.contentRightSpace}px\n`;
            report += `- Is full width: ${section.measurements.isFullWidth}\n`;
            report += `- Is centered: ${section.measurements.isCentered}\n`;
            report += '\n';
            
            if (section.nestedContainers.length > 0) {
                report += `**Nested Containers:**\n`;
                for (const nested of section.nestedContainers) {
                    report += `- ${nested.tagName}: padding-left=${nested.padding.left}, padding-right=${nested.padding.right}, max-width=${nested.maxWidth}\n`;
                }
                report += '\n';
            }
            
            report += '---\n\n';
        }
    }
    
    fs.writeFileSync('on-spacing-report.md', report);
    
    await browser.close();
    console.log('\n\nAnalysis complete! Check on-spacing-analysis.json and on-spacing-report.md for results.');
}

analyzeOnSpacing().catch(console.error);