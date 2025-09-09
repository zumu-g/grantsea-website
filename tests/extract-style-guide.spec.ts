import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Extract style guide from property page', async ({ page }) => {
  // Navigate to the property page
  await page.goto('https://grantsea-website.vercel.app/property/27311391');
  await page.waitForLoadState('networkidle');
  
  // Take a full-page screenshot
  await page.screenshot({ 
    path: 'property-page-full.png', 
    fullPage: true 
  });
  
  // Extract comprehensive style information
  const styleData = await page.evaluate(() => {
    const styles = {
      metadata: {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      typography: {
        headings: {},
        body: {},
        captions: {},
        links: {}
      },
      colors: {
        primary: [],
        text: [],
        background: [],
        borders: [],
        shadows: []
      },
      spacing: {
        containers: [],
        sections: [],
        components: [],
        grid: []
      },
      components: {
        buttons: [],
        cards: [],
        badges: [],
        forms: [],
        navigation: []
      },
      layout: {
        breakpoints: [],
        containers: [],
        grid: []
      }
    };
    
    // Helper function to get unique styles
    const getUniqueStyles = (elements: NodeListOf<Element>, maxItems = 5) => {
      const unique = new Map();
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const key = JSON.stringify({
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          color: style.color
        });
        if (!unique.has(key) && unique.size < maxItems) {
          unique.set(key, { element: el, style });
        }
      });
      return Array.from(unique.values());
    };
    
    // Extract heading styles (H1-H6)
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      const elements = document.querySelectorAll(tag);
      if (elements.length > 0) {
        const el = elements[0];
        const style = window.getComputedStyle(el);
        styles.typography.headings[tag] = {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          fontFamily: style.fontFamily,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
          color: style.color,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
          examples: Array.from(elements).slice(0, 3).map(e => ({
            text: e.textContent?.trim() || '',
            className: e.className
          }))
        };
      }
    });
    
    // Extract body text styles
    const bodySelectors = ['p', '.text-base', '.text-sm', '.text-lg', '.description'];
    bodySelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const uniqueStyles = getUniqueStyles(elements, 3);
        uniqueStyles.forEach((item, index) => {
          const { element, style } = item;
          styles.typography.body[`${selector}-${index + 1}`] = {
            selector,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            fontFamily: style.fontFamily,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            color: style.color,
            example: element.textContent?.trim().substring(0, 100) || ''
          };
        });
      }
    });
    
    // Extract link styles
    const links = document.querySelectorAll('a');
    const linkStates = ['normal', 'hover'];
    if (links.length > 0) {
      const link = links[0];
      const style = window.getComputedStyle(link);
      styles.typography.links = {
        color: style.color,
        textDecoration: style.textDecoration,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        transition: style.transition
      };
    }
    
    // Extract button styles
    const buttonSelectors = ['button', '.btn', '[role="button"]', 'a.button'];
    const buttons = document.querySelectorAll(buttonSelectors.join(','));
    const uniqueButtons = getUniqueStyles(buttons, 5);
    
    uniqueButtons.forEach((item, index) => {
      const { element, style } = item;
      styles.components.buttons.push({
        type: `button-variant-${index + 1}`,
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontFamily: style.fontFamily,
        padding: style.padding,
        margin: style.margin,
        borderRadius: style.borderRadius,
        border: style.border,
        boxShadow: style.boxShadow,
        textTransform: style.textTransform,
        transition: style.transition,
        minWidth: style.minWidth,
        height: style.height,
        display: style.display,
        alignItems: style.alignItems,
        justifyContent: style.justifyContent,
        cursor: style.cursor,
        example: element.textContent?.trim() || '',
        className: element.className
      });
    });
    
    // Extract color palette
    const allElements = document.querySelectorAll('*');
    const colors = new Set<string>();
    const backgrounds = new Set<string>();
    const borders = new Set<string>();
    
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      
      // Text colors
      if (style.color && style.color !== 'rgba(0, 0, 0, 0)' && style.color !== 'rgb(0, 0, 0)') {
        colors.add(style.color);
      }
      
      // Background colors
      if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
        backgrounds.add(style.backgroundColor);
      }
      
      // Border colors
      if (style.borderColor && style.borderColor !== 'rgba(0, 0, 0, 0)') {
        borders.add(style.borderColor);
      }
    });
    
    styles.colors.text = Array.from(colors).slice(0, 15);
    styles.colors.background = Array.from(backgrounds).slice(0, 15);
    styles.colors.borders = Array.from(borders).slice(0, 10);
    
    // Extract spacing patterns
    const containerSelectors = ['.container', '.max-w-7xl', '.mx-auto', 'main', 'section'];
    containerSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const el = elements[0];
        const style = window.getComputedStyle(el);
        styles.spacing.containers.push({
          selector,
          maxWidth: style.maxWidth,
          width: style.width,
          margin: style.margin,
          padding: style.padding,
          boxSizing: style.boxSizing
        });
      }
    });
    
    // Extract card/component styles
    const cardSelectors = ['.rounded-lg', '.shadow', '.border', '.card', '[class*="card"]'];
    const cards = document.querySelectorAll(cardSelectors.join(','));
    const uniqueCards = getUniqueStyles(cards, 5);
    
    uniqueCards.forEach((item, index) => {
      const { element, style } = item;
      styles.components.cards.push({
        type: `card-variant-${index + 1}`,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        border: style.border,
        backgroundColor: style.backgroundColor,
        padding: style.padding,
        margin: style.margin,
        overflow: style.overflow,
        className: element.className
      });
    });
    
    // Extract badge/chip styles
    const badgeSelectors = ['.badge', '.chip', '.tag', '.px-2.py-1', '.px-3.py-1', '.rounded-full'];
    const badges = document.querySelectorAll(badgeSelectors.join(','));
    const uniqueBadges = getUniqueStyles(badges, 5);
    
    uniqueBadges.forEach((item, index) => {
      const { element, style } = item;
      if (element.textContent && element.textContent.trim().length < 20) {
        styles.components.badges.push({
          type: `badge-variant-${index + 1}`,
          backgroundColor: style.backgroundColor,
          color: style.color,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          padding: style.padding,
          borderRadius: style.borderRadius,
          border: style.border,
          display: style.display,
          example: element.textContent.trim(),
          className: element.className
        });
      }
    });
    
    // Extract grid and flex layouts
    const gridElements = document.querySelectorAll('.grid, [class*="grid-cols"]');
    gridElements.forEach((el, index) => {
      if (index < 3) {
        const style = window.getComputedStyle(el);
        styles.layout.grid.push({
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns,
          gap: style.gap,
          className: el.className
        });
      }
    });
    
    // Extract form elements
    const inputs = document.querySelectorAll('input, textarea, select');
    if (inputs.length > 0) {
      const input = inputs[0];
      const style = window.getComputedStyle(input);
      styles.components.forms.push({
        type: 'input',
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        borderWidth: style.borderWidth,
        borderRadius: style.borderRadius,
        padding: style.padding,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        color: style.color,
        placeholderColor: style.color
      });
    }
    
    return styles;
  });
  
  // Create the style guide markdown
  const styleGuide = `# Grant's Estate Agents - Website Style Guide

Generated from: ${styleData.metadata.url}
Date: ${new Date().toLocaleDateString()}
Viewport: ${styleData.metadata.viewport.width}x${styleData.metadata.viewport.height}

## Typography

### Headings

${Object.entries(styleData.typography.headings).map(([tag, styles]: [string, any]) => `
#### ${tag.toUpperCase()}
- **Font Size:** ${styles.fontSize}
- **Font Weight:** ${styles.fontWeight}
- **Font Family:** ${styles.fontFamily}
- **Line Height:** ${styles.lineHeight}
- **Letter Spacing:** ${styles.letterSpacing}
- **Color:** ${styles.color}
- **Margin:** ${styles.marginTop} 0 ${styles.marginBottom} 0
${styles.textTransform !== 'none' ? `- **Text Transform:** ${styles.textTransform}` : ''}

Examples:
${styles.examples.map((ex: any) => `- "${ex.text}" ${ex.className ? `(.${ex.className})` : ''}`).join('\n')}
`).join('\n')}

### Body Text

${Object.entries(styleData.typography.body).map(([key, styles]: [string, any]) => `
#### ${styles.selector}
- **Font Size:** ${styles.fontSize}
- **Font Weight:** ${styles.fontWeight}
- **Font Family:** ${styles.fontFamily}
- **Line Height:** ${styles.lineHeight}
- **Color:** ${styles.color}
${styles.letterSpacing !== 'normal' ? `- **Letter Spacing:** ${styles.letterSpacing}` : ''}
`).join('\n')}

### Links

${styleData.typography.links ? `
- **Color:** ${styleData.typography.links.color}
- **Text Decoration:** ${styleData.typography.links.textDecoration}
- **Font Size:** ${styleData.typography.links.fontSize}
- **Font Weight:** ${styleData.typography.links.fontWeight}
${styleData.typography.links.transition !== 'none' ? `- **Transition:** ${styleData.typography.links.transition}` : ''}
` : 'No link styles found'}

## Color Palette

### Text Colors
${styleData.colors.text.map((color: string) => `- \`${color}\``).join('\n')}

### Background Colors
${styleData.colors.background.map((color: string) => `- \`${color}\``).join('\n')}

### Border Colors
${styleData.colors.borders.map((color: string) => `- \`${color}\``).join('\n')}

## Components

### Buttons

${styleData.components.buttons.map((btn: any, index: number) => `
#### ${btn.type}
- **Background:** ${btn.backgroundColor}
- **Text Color:** ${btn.color}
- **Font Size:** ${btn.fontSize}
- **Font Weight:** ${btn.fontWeight}
- **Padding:** ${btn.padding}
- **Border Radius:** ${btn.borderRadius}
- **Border:** ${btn.border}
${btn.boxShadow !== 'none' ? `- **Box Shadow:** ${btn.boxShadow}` : ''}
${btn.textTransform !== 'none' ? `- **Text Transform:** ${btn.textTransform}` : ''}
- **Example:** "${btn.example}"
- **Class:** ${btn.className}
`).join('\n')}

### Cards

${styleData.components.cards.map((card: any, index: number) => `
#### ${card.type}
- **Border Radius:** ${card.borderRadius}
- **Box Shadow:** ${card.boxShadow}
- **Border:** ${card.border}
- **Background:** ${card.backgroundColor}
- **Padding:** ${card.padding}
- **Class:** ${card.className}
`).join('\n')}

### Badges/Tags

${styleData.components.badges.map((badge: any, index: number) => `
#### ${badge.type}
- **Background:** ${badge.backgroundColor}
- **Text Color:** ${badge.color}
- **Font Size:** ${badge.fontSize}
- **Font Weight:** ${badge.fontWeight}
- **Padding:** ${badge.padding}
- **Border Radius:** ${badge.borderRadius}
- **Example:** "${badge.example}"
`).join('\n')}

## Layout & Spacing

### Containers

${styleData.spacing.containers.map((container: any) => `
#### ${container.selector}
- **Max Width:** ${container.maxWidth}
- **Width:** ${container.width}
- **Margin:** ${container.margin}
- **Padding:** ${container.padding}
- **Box Sizing:** ${container.boxSizing}
`).join('\n')}

### Grid Layouts

${styleData.layout.grid.map((grid: any, index: number) => `
#### Grid Layout ${index + 1}
- **Display:** ${grid.display}
- **Grid Template Columns:** ${grid.gridTemplateColumns}
- **Gap:** ${grid.gap}
- **Class:** ${grid.className}
`).join('\n')}

## Form Elements

${styleData.components.forms.map((form: any) => `
### ${form.type}
- **Background:** ${form.backgroundColor}
- **Border:** ${form.borderWidth} solid ${form.borderColor}
- **Border Radius:** ${form.borderRadius}
- **Padding:** ${form.padding}
- **Font Size:** ${form.fontSize}
- **Line Height:** ${form.lineHeight}
- **Text Color:** ${form.color}
`).join('\n')}

## Implementation Notes

### Font Stack
The website uses a modern font stack with system fonts as fallbacks. The primary font family appears to be the system default sans-serif stack.

### Responsive Design
The site uses responsive container widths and grid layouts that adapt to different screen sizes. Key breakpoints appear to be:
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

### Color Usage
- Primary brand colors are used consistently across CTAs and important UI elements
- Neutral grays are used for text and borders
- White/light backgrounds with dark text for optimal readability

### Spacing System
The site appears to use a consistent spacing scale, likely based on Tailwind CSS's spacing utilities:
- Small: 0.5rem (8px)
- Medium: 1rem (16px)
- Large: 2rem (32px)
- Extra Large: 4rem (64px)

### Component Patterns
- Cards use consistent border radius and shadow for depth
- Buttons have clear hover states and consistent padding
- Form inputs have subtle borders and generous padding for usability
`;

  // Write the style guide to file
  const styleGuidePath = path.join(process.cwd(), 'grants-website-style-guide.md');
  fs.writeFileSync(styleGuidePath, styleGuide);
  
  // Also save the raw JSON data
  const jsonPath = path.join(process.cwd(), 'style-guide-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(styleData, null, 2));
  
  console.log(`Style guide created at: ${styleGuidePath}`);
  console.log(`Raw style data saved at: ${jsonPath}`);
});