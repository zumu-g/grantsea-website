# Grant's Estate Agents - Brand Style Guide

Based on the Anima Property Page Design System

## Typography System

### Font Families
- **Primary Font**: "On", Helvetica (fallback)
- **Monospace Font**: "On Mono", Helvetica (fallback)
- **Semi-Mono Font**: "On Semi Mono", Helvetica (fallback)

### Type Scale

#### Headings
```css
/* Heading 1 - Hero/Page Titles */
font-family: "On", Helvetica;
font-size: 42px;
font-weight: 700;
letter-spacing: -0.42px;
line-height: 50.4px;

/* Heading 2 - Section Headers */
font-family: "On", Helvetica;
font-size: 15.9px;
font-weight: 700;
line-height: 23.9px;

/* Heading 3 - Large Display */
font-family: "On", Helvetica;
font-size: 67.9px;
font-weight: 700;
letter-spacing: -1.36px;
line-height: 74.69px;
```

#### Body Text
```css
/* Regular Text */
font-family: "On", Helvetica;
font-size: 26px;
font-weight: 400;
line-height: 39px;

/* Medium Text */
font-family: "On", Helvetica;
font-size: 16px;
font-weight: 500;
line-height: 20px;

/* Label Text */
font-family: "On", Helvetica;
font-size: 16px;
font-weight: 400;
line-height: 22px;
```

#### Special Text
```css
/* Button Text */
font-family: "On", Helvetica;
font-size: 16px;
font-weight: 400;
line-height: 16px;

/* Button Text Uppercase */
font-family: "On Mono", Helvetica;
font-size: 16px;
font-weight: 400;
letter-spacing: 1.2px;
line-height: 17.6px;
text-transform: uppercase;

/* Link Text */
font-family: "On", Helvetica;
font-size: 16px;
font-weight: 400;
line-height: 16px;

/* Mono Regular */
font-family: "On Mono", Helvetica;
font-size: 14px;
font-weight: 400;
line-height: 14px;
```

## Color System

### Primary Colors
- **Black**: #000000
- **White**: #FFFFFF

### Semantic Colors
- **Primary Action**: Black buttons with white text
- **Secondary Action**: White/transparent buttons with black text
- **Links**: Black with underline on hover
- **Borders**: Light gray (#E5E5E5)

## Spacing System

### Container Widths
- **Max Width**: 1440px
- **Content Padding**: 40px (desktop), 20px (mobile)

### Component Spacing
```css
/* Vertical Rhythm */
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-2xl: 64px;
--space-3xl: 96px;
```

### Grid System
- **Columns**: 12 column grid
- **Gutter**: 24px
- **Margin**: 40px (desktop), 20px (mobile)

## Component Patterns

### Buttons
```css
/* Primary Button */
.button-primary {
  background: #000000;
  color: #FFFFFF;
  padding: 16px 32px;
  border: none;
  border-radius: 100px;
  font-family: "On", Helvetica;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.2s;
}

/* Secondary Button */
.button-secondary {
  background: transparent;
  color: #000000;
  padding: 16px 32px;
  border: 1px solid #000000;
  border-radius: 100px;
  font-family: "On", Helvetica;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
```

### Cards
```css
.property-card {
  background: #FFFFFF;
  border-radius: 0;
  overflow: hidden;
  transition: transform 0.2s;
}

.property-card:hover {
  transform: translateY(-4px);
}
```

### Navigation
```css
.nav-link {
  font-family: "On", Helvetica;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  text-decoration: none;
  transition: opacity 0.2s;
}

.nav-link:hover {
  opacity: 0.7;
}
```

### Forms
```css
.form-input {
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E5E5;
  border-radius: 0;
  font-family: "On", Helvetica;
  font-size: 16px;
  background: #FFFFFF;
}

.form-label {
  font-family: "On", Helvetica;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  display: block;
}
```

## Icons System

### Icon Sizes
- **Small**: 16px × 16px
- **Medium**: 24px × 24px
- **Large**: 32px × 32px

### Icon Style
- **Stroke Width**: 1.5px
- **Color**: Black (#000000)
- **Style**: Outline/Line icons

## Layout Principles

### Header
- **Height**: 80px (desktop), 64px (mobile)
- **Logo Position**: Left aligned
- **Navigation**: Center or right aligned
- **Sticky**: Yes, with subtle shadow on scroll

### Hero Sections
- **Min Height**: 80vh
- **Content Alignment**: Center or left aligned
- **Image Treatment**: Full bleed, high contrast

### Content Sections
- **Padding**: 96px 0 (desktop), 64px 0 (mobile)
- **Max Width**: 1440px
- **Alignment**: Left aligned with consistent margins

### Footer
- **Background**: Black (#000000)
- **Text Color**: White (#FFFFFF)
- **Padding**: 64px 0
- **Layout**: Multi-column grid

## Animation Guidelines

### Transitions
```css
/* Standard Transition */
transition: all 0.2s ease;

/* Hover Effects */
transition: transform 0.2s ease, opacity 0.2s ease;

/* Page Transitions */
transition: opacity 0.3s ease;
```

### Hover States
- **Buttons**: Slight opacity reduction (0.9)
- **Cards**: Subtle lift (translateY(-4px))
- **Links**: Underline or opacity change
- **Images**: Zoom (scale(1.05)) or overlay

## Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

## Image Guidelines

### Aspect Ratios
- **Hero Images**: 16:9 or 21:9
- **Property Cards**: 4:3
- **Gallery Images**: 3:2
- **Thumbnails**: 1:1

### Image Treatment
- **Overlay**: Black at 20-40% opacity for text overlay
- **Loading**: Skeleton or blur-up technique
- **Alt Text**: Descriptive for accessibility

## Accessibility Standards

### Color Contrast
- **Normal Text**: 4.5:1 minimum
- **Large Text**: 3:1 minimum
- **Interactive Elements**: Clear focus states

### Keyboard Navigation
- **Tab Order**: Logical flow
- **Focus Indicators**: Visible outline
- **Skip Links**: For main content

### ARIA Labels
- **Interactive Elements**: Proper labels
- **Form Fields**: Associated labels
- **Images**: Alt text or aria-label

## Implementation Notes

1. **Font Loading**: Use font-display: swap for performance
2. **CSS Variables**: Define all values as CSS custom properties
3. **Component Library**: Create reusable components following these patterns
4. **Dark Mode**: Consider inverse color scheme (white on black)
5. **Print Styles**: Simplified layout for property brochures

## Usage Examples

### Property Card Component
```jsx
<article className="property-card">
  <div className="property-card__image">
    <img src="property.jpg" alt="Property description" />
  </div>
  <div className="property-card__content">
    <h3 className="heading-2">$1,250,000</h3>
    <p className="label">4 Bedroom House</p>
    <p className="label">123 Main Street, Melbourne</p>
  </div>
</article>
```

### Button Component
```jsx
<button className="button-primary">
  View Property
</button>

<button className="button-secondary">
  Save to Favorites
</button>
```

This style guide should be used as the foundation for all UI development to ensure consistency across the Grant's Estate Agents website.