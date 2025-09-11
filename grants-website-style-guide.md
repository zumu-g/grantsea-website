# Grant's Estate Agents - Website Style Guide

Generated from: https://grantsea-website.vercel.app/property/27311391
Date: 9/9/2025
Updated: To work with Anima ElementLight components

## Overview

This style guide defines the visual design system for Grant's Estate Agents website. It's designed to work harmoniously with the existing Anima ElementLight components while providing consistent branding and enhanced user experience.

## Integration with Anima Components

The Grant's style system is designed to:
1. **Extend** Anima components without breaking them
2. **Override** CSS variables for consistent branding
3. **Provide** utility classes for custom components
4. **Maintain** compatibility with the ElementLight structure

### How to Use

```jsx
// Example: Adding Grant's styling to Anima components
<div className="element-light grant-full-width">
  <h1 className="heading-1 grant-text-accent">Welcome to Grant's</h1>
  <button className="button grant-btn grant-btn-accent">
    View Properties
  </button>
</div>
```

## Typography

### Font Family
- **Primary**: "On" (On-Regular, On-Bold)
- **Fallback**: Helvetica, system fonts

### Headings

#### H1 - Hero/Page Title
- **Font Size:** 53px
- **Font Weight:** 700
- **Line Height:** 58.3px
- **Letter Spacing:** -0.53px
- **Color:** rgb(0, 0, 0)
- **Utility Class:** `.grant-heading-xl`
- **Anima Override:** `--www-on-com-semantic-heading-1-font-size`

#### H2 - Section Title  
- **Font Size:** 40px
- **Font Weight:** 700
- **Line Height:** 48px
- **Letter Spacing:** -0.4px
- **Color:** rgb(0, 0, 0)
- **Utility Class:** `.grant-heading-lg`

#### H3 - Subsection Title
- **Font Size:** 32px
- **Font Weight:** 700
- **Line Height:** 38px
- **Letter Spacing:** -0.32px
- **Color:** rgb(0, 0, 0)
- **Utility Class:** `.grant-heading-md`

### Body Text
- **Font Size:** 16px
- **Font Weight:** 400
- **Line Height:** 24px
- **Color:** rgb(0, 0, 0)
- **Utility Class:** `.grant-text-body`

### Responsive Typography
On mobile devices (< 768px):
- H1: 40px
- H2: 32px
- H3: 24px

## Color Palette

### Brand Colors
- **Primary Black:** rgb(0, 0, 0) - `var(--grant-primary-black)`
- **Primary White:** rgb(255, 255, 255) - `var(--grant-primary-white)`
- **Brand Accent:** rgb(153, 92, 0) - `var(--grant-brand-primary)`
- **Secondary Gray:** rgb(77, 77, 77) - `var(--grant-text-secondary)`

### Text Colors
- **Primary:** rgb(0, 0, 0)
- **Secondary:** rgb(77, 77, 77)
- **Accent:** rgb(153, 92, 0)

### Background Colors
- **Primary:** rgb(255, 255, 255)
- **Secondary:** rgb(0, 0, 0)
- **Light Overlay:** rgba(0, 0, 0, 0.05)
- **Medium Overlay:** rgba(0, 0, 0, 0.1)

### Border Colors
- **Primary:** rgb(0, 0, 0)
- **Light:** rgb(229, 229, 229)
- **Medium:** rgb(204, 204, 204)
- **Accent:** rgb(153, 92, 0)

## Components

### Buttons

#### Primary Button
- **Background:** Black (rgb(0, 0, 0))
- **Text:** White
- **Padding:** 12px 24px
- **Border Radius:** 40px
- **Utility Class:** `.grant-btn .grant-btn-primary`
- **Hover:** Slightly lighter background

#### Secondary Button
- **Background:** Transparent
- **Text:** Black
- **Border:** 1px solid black
- **Utility Class:** `.grant-btn .grant-btn-secondary`
- **Hover:** Light gray background

#### Accent Button
- **Background:** Brand accent (rgb(153, 92, 0))
- **Text:** White
- **Utility Class:** `.grant-btn .grant-btn-accent`
- **Hover:** Slight opacity reduction

### Cards
- **Border Radius:** 8px
- **Box Shadow:** 0 2px 4px rgba(0, 0, 0, 0.1)
- **Padding:** 20px
- **Border:** 1px solid rgb(229, 229, 229)
- **Utility Class:** `.grant-card-enhancement`
- **Hover:** Elevated shadow and slight translate

### Badges
- **Padding:** 4px 12px
- **Border Radius:** 20px
- **Font Size:** 14px
- **Font Weight:** 500
- **Accent Badge:** `.grant-badge .grant-badge-accent`
- **Light Badge:** `.grant-badge .grant-badge-light`

## Layout & Spacing

### Container (On.com Exact Match)
- **Max Width:** 100% (no max-width restriction like on.com)
- **Desktop Padding:** 48px (matches on.com exactly)
- **Tablet Padding:** 32px (≤1024px breakpoint)
- **Mobile Padding:** 16px (≤640px breakpoint)
- **Utility Class:** `.grant-container`

### Spacing Scale
- **XS:** 4px
- **SM:** 8px
- **MD:** 16px
- **LG:** 24px
- **XL:** 32px
- **2XL:** 48px
- **3XL:** 64px

### Padding System (On.com Match)
```css
/* Desktop - Default */
.grant-container {
  padding-left: 48px;
  padding-right: 48px;
}

/* Tablet */
@media (max-width: 1024px) {
  .grant-container {
    padding-left: 32px;
    padding-right: 32px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .grant-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
```

## Animation & Interactions

### Transitions
- **Default:** all 0.3s ease
- **Utility Class:** `.grant-smooth-transition`

### Hover Effects
- **Lift:** `.grant-hover-lift` - Translates up 4px
- **Glow:** `.grant-hover-glow` - Adds accent color shadow
- **Button Hover:** Slight opacity change and translate

## Responsive Design

### Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile Adjustments
- Reduced heading sizes
- Increased touch targets
- Stack layouts vertically
- Simplified navigation

## Using with Anima Components

### Best Practices
1. **Never remove Anima classes** - Add Grant's classes alongside
2. **Use CSS variable overrides** for global changes
3. **Test interactions** - Anima components may have complex states
4. **Progressive enhancement** - Add Grant's features without breaking existing functionality

### Example Integration
```html
<!-- Anima component with Grant's enhancements -->
<div class="element-light property-card grant-card-enhancement grant-hover-lift">
  <h3 class="heading-3 grant-text-accent">$1,250,000</h3>
  <button class="button grant-btn grant-btn-accent">
    View Details
  </button>
</div>
```

## Implementation Notes

### CSS Architecture
1. **Base:** Anima styleguide.css
2. **Overrides:** Grant's CSS variables
3. **Enhancements:** Utility classes
4. **Responsive:** Mobile-first approach

### File Structure
- `/src/app/styleguide.css` - Anima base styles
- `/src/app/grants-style-system.css` - Grant's enhancements
- `/src/app/full-screen-override.css` - Responsive fixes
- `/src/app/globals.css` - Import order management

### Performance
- CSS variables for theming
- Utility classes for reusability
- Minimal specificity conflicts
- Progressive enhancement approach

## Future Enhancements

1. **Dark Mode:** CSS variables support theme switching
2. **Component Library:** Build custom components using Grant's utilities
3. **Animation Library:** Expand interaction patterns
4. **Accessibility:** Enhanced focus states and ARIA support