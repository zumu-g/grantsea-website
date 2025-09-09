const { chromium } = require('playwright');
const fs = require('fs');

async function extractOnSpacing() {
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
                timeout: 30000 
            });
            await page.waitForTimeout(3000);
        } catch (e) {
            console.log(`Error loading page: ${e.message}`);
            continue;
        }
        
        // Extract key spacing measurements
        const spacingData = await page.evaluate(() => {
            const measurements = {};
            
            // Find main container patterns
            const possibleMains = [
                document.querySelector('main'),
                document.querySelector('[class*="container"]'),
                document.querySelector('[class*="wrapper"]'),
                document.querySelector('body > div:first-child'),
                document.querySelector('section')
            ].filter(el => el);
            
            const main = possibleMains[0];
            if (main) {
                const mainStyle = window.getComputedStyle(main);
                const mainRect = main.getBoundingClientRect();
                
                measurements.mainContainer = {
                    element: main.tagName + (main.className ? '.' + main.className.split(' ')[0] : ''),
                    paddingLeft: mainStyle.paddingLeft,
                    paddingRight: mainStyle.paddingRight,
                    marginLeft: mainStyle.marginLeft,
                    marginRight: mainStyle.marginRight,
                    maxWidth: mainStyle.maxWidth,
                    width: mainStyle.width,
                    actualWidth: mainRect.width,
                    leftOffset: mainRect.left,
                    rightOffset: window.innerWidth - mainRect.right,
                    viewportWidth: window.innerWidth
                };
            }
            
            // Check sections for consistent patterns
            const sections = document.querySelectorAll('section, [class*="section"]');
            measurements.sections = [];
            
            for (let i = 0; i < Math.min(3, sections.length); i++) {
                const section = sections[i];
                const sectionStyle = window.getComputedStyle(section);
                const sectionRect = section.getBoundingClientRect();
                
                // Look for inner containers
                const innerContainer = section.querySelector('[class*="container"], [class*="wrapper"], [class*="inner"]') || section;
                const innerStyle = window.getComputedStyle(innerContainer);
                const innerRect = innerContainer.getBoundingClientRect();
                
                measurements.sections.push({
                    index: i,
                    outerElement: section.tagName + (section.className ? '.' + section.className.split(' ')[0] : ''),
                    outer: {
                        paddingLeft: sectionStyle.paddingLeft,
                        paddingRight: sectionStyle.paddingRight,
                        marginLeft: sectionStyle.marginLeft,
                        marginRight: sectionStyle.marginRight,
                        maxWidth: sectionStyle.maxWidth,
                        leftOffset: sectionRect.left,
                        rightOffset: window.innerWidth - sectionRect.right
                    },
                    innerElement: innerContainer !== section ? innerContainer.tagName + (innerContainer.className ? '.' + innerContainer.className.split(' ')[0] : '') : 'same',
                    inner: {
                        paddingLeft: innerStyle.paddingLeft,
                        paddingRight: innerStyle.paddingRight,
                        marginLeft: innerStyle.marginLeft,
                        marginRight: innerStyle.marginRight,
                        maxWidth: innerStyle.maxWidth,
                        leftOffset: innerRect.left,
                        rightOffset: window.innerWidth - innerRect.right,
                        width: innerRect.width
                    }
                });
            }
            
            // Get media query information
            const stylesheets = Array.from(document.styleSheets);
            const mediaQueries = [];
            
            try {
                for (const sheet of stylesheets) {
                    if (sheet.href && sheet.href.includes('on.com')) {
                        const rules = Array.from(sheet.cssRules || []);
                        for (const rule of rules) {
                            if (rule.type === CSSRule.MEDIA_RULE) {
                                mediaQueries.push(rule.conditionText);
                            }
                        }
                    }
                }
            } catch (e) {
                // CORS issues with stylesheets
            }
            
            measurements.mediaQueries = [...new Set(mediaQueries)];
            measurements.viewportWidth = window.innerWidth;
            
            return measurements;
        });
        
        results[viewport.name] = spacingData;
        console.log(`Completed ${viewport.width}px analysis`);
    }
    
    // Save results
    fs.writeFileSync('on-spacing-extract.json', JSON.stringify(results, null, 2));
    
    // Generate concise specs
    let specs = '# ON.com Spacing Specifications\n\n';
    
    // Identify consistent patterns across viewports
    const patterns = {};
    
    for (const [viewportName, data] of Object.entries(results)) {
        if (!data.mainContainer) continue;
        
        const containerSpacing = data.mainContainer;
        const leftSpace = containerSpacing.leftOffset;
        const rightSpace = containerSpacing.rightOffset;
        
        // Check if spacing is consistent
        const isEvenSpacing = Math.abs(leftSpace - rightSpace) < 5;
        
        patterns[viewportName] = {
            viewportWidth: data.viewportWidth,
            containerMaxWidth: containerSpacing.maxWidth,
            containerActualWidth: containerSpacing.actualWidth,
            leftSpacing: leftSpace,
            rightSpacing: rightSpace,
            isEvenSpacing,
            paddingLeft: containerSpacing.paddingLeft,
            paddingRight: containerSpacing.paddingRight,
            marginLeft: containerSpacing.marginLeft,
            marginRight: containerSpacing.marginRight
        };
    }
    
    specs += '## Key Spacing Patterns\n\n';
    
    for (const [viewport, pattern] of Object.entries(patterns)) {
        specs += `### ${viewport}\n`;
        specs += `- Viewport: ${pattern.viewportWidth}px\n`;
        specs += `- Container max-width: ${pattern.containerMaxWidth}\n`;
        specs += `- Container actual width: ${pattern.containerActualWidth}px\n`;
        specs += `- Left spacing: ${pattern.leftSpacing}px\n`;
        specs += `- Right spacing: ${pattern.rightSpacing}px\n`;
        specs += `- Even spacing: ${pattern.isEvenSpacing}\n`;
        specs += `- Container padding: ${pattern.paddingLeft} / ${pattern.paddingRight}\n`;
        specs += `- Container margin: ${pattern.marginLeft} / ${pattern.marginRight}\n\n`;
    }
    
    // Generate CSS recommendations
    specs += '## CSS Implementation Recommendations\n\n';
    specs += '```css\n';
    
    // Determine the pattern
    const desktopPattern = patterns['desktop-1440'];
    if (desktopPattern) {
        if (desktopPattern.containerMaxWidth && desktopPattern.containerMaxWidth !== 'none') {
            specs += '/* Container-based centering approach */\n';
            specs += '.main-container {\n';
            specs += `  max-width: ${desktopPattern.containerMaxWidth};\n`;
            specs += '  margin: 0 auto;\n';
            if (desktopPattern.paddingLeft !== '0px') {
                specs += `  padding-left: ${desktopPattern.paddingLeft};\n`;
                specs += `  padding-right: ${desktopPattern.paddingRight};\n`;
            }
            specs += '}\n\n';
        } else {
            specs += '/* Padding-based spacing approach */\n';
            specs += '.main-container {\n';
            specs += '  width: 100%;\n';
            specs += `  padding-left: ${desktopPattern.leftSpacing}px;\n`;
            specs += `  padding-right: ${desktopPattern.rightSpacing}px;\n`;
            specs += '}\n\n';
        }
    }
    
    // Add responsive breakpoints
    specs += '/* Responsive breakpoints */\n';
    for (const [viewport, pattern] of Object.entries(patterns)) {
        if (viewport === 'desktop-1440') continue;
        
        const width = viewport.includes('1024') ? '1024px' : '768px';
        specs += `@media (max-width: ${width}) {\n`;
        specs += '  .main-container {\n';
        if (pattern.leftSpacing !== desktopPattern?.leftSpacing) {
            specs += `    padding-left: ${pattern.leftSpacing}px;\n`;
            specs += `    padding-right: ${pattern.rightSpacing}px;\n`;
        }
        specs += '  }\n';
        specs += '}\n\n';
    }
    
    specs += '```\n';
    
    fs.writeFileSync('on-spacing-specs.md', specs);
    
    await browser.close();
    console.log('\n✅ Extraction complete!');
    console.log('📄 Check on-spacing-extract.json for raw data');
    console.log('📋 Check on-spacing-specs.md for implementation specs');
}

extractOnSpacing().catch(console.error);