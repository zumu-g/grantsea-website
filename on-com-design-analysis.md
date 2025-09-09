# ON.com Design System Analysis

Based on CSS analysis and observable patterns from ON.com (On Running's website), here are the key design specifications:

## 1. Header Structure

### Typography & Base Styles
- **Font Family**: Custom "On" font family
- **Base Font Size**: 16px (1rem)
- **Line Height**: 1.5

### Navigation (Inferred from CSS patterns)
- Clean, minimal design approach
- Likely fixed or sticky positioning
- Height: Approximately 60-80px (standard for e-commerce)
- Z-index layering for dropdown menus

### Logo & Icons
- SVG-based icons for scalability
- Monochromatic color scheme (black/white)

## 2. Hero Section

### Text Positioning & Typography
```css
/* Headline Sizes - Responsive Clamp */
.headline-large {
  font-size: clamp(2.0625rem, calc(2.0625rem + (53 - 33) * (100vw - 360px) / (1200 - 360)), 3.3125rem);
  /* Mobile: 33px → Desktop: 53px */
}

.headline-xlarge {
  font-size: clamp(3.3125rem, calc(3.3125rem + (86 - 53) * (100vw - 768px) / (1200 - 768)), 5.375rem);
  /* Tablet: 53px → Desktop: 86px */
}
```

### Button Styling
```css
.button-primary {
  border-radius: 2.5rem; /* 40px - Fully rounded */
  height: 3rem; /* 48px */
  padding: 0 1.5rem; /* 0 24px */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
```

### Background Treatment
- Likely uses full-width background images
- Responsive background positioning
- Possible use of radial gradients for overlays

## 3. Category/Product Grid Section

### Grid Layout
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem; /* 24px */
}
```

### Image Aspect Ratios
- Product images: 1:1 (square)
- Category banners: 16:9 or 2:1
- Consistent use of object-fit: cover

### Hover Effects
```css
.product-card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}
```

## 4. General Layout

### Page Structure
```css
.container {
  max-width: 92.5rem; /* 1480px */
  margin: 0 auto;
  padding: 0 1.5rem; /* 0 24px */
}
```

### Responsive Padding
```css
.section {
  padding: clamp(3rem, 5vw, 6rem) 0;
  /* Mobile: 48px → Desktop: 96px */
}
```

### Breakpoints
- Mobile: 360px
- Tablet: 768px
- Desktop: 1024px
- Large Desktop: 1200px

### Color Scheme
```css
:root {
  --color-primary: #000000;
  --color-secondary: #ffffff;
  --color-gray-light: #f5f5f5;
  --color-gray-medium: #e0e0e0;
  --color-accent: /* Brand-specific color */
}
```

## 5. Key Design Principles

### Minimalism
- Clean, uncluttered layouts
- Generous whitespace
- Focus on product imagery

### Performance
- Responsive font sizing using clamp()
- Optimized image loading
- CSS Grid for flexible layouts

### Accessibility
- High contrast ratios
- Clear focus states
- Semantic HTML structure

### Animation
- Subtle transitions (0.2s - 0.3s)
- Transform-based animations for performance
- Hover states on interactive elements

## Implementation Notes

1. **Responsive Typography**: Heavy use of clamp() for fluid typography that scales smoothly between breakpoints

2. **Grid System**: Flexible CSS Grid implementation allows for responsive layouts without media queries

3. **Component Variants**: Multiple versions of components (compact, featured) for different contexts

4. **Performance Focus**: CSS-only solutions where possible, minimal JavaScript for core functionality

5. **Brand Consistency**: Custom font family and strict color palette maintain brand identity

This analysis is based on CSS patterns and common e-commerce best practices. For exact measurements, direct inspection of the live site would be required.