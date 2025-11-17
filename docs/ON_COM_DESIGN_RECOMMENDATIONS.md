# On.com Design Implementation Guide for Real Estate

Based on direct analysis of https://www.on.com/en-au/

## Navigation Implementation

### Desktop Navigation (90px height)
```css
.navigation {
  height: 90px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1001;
  background: transparent;
  transition: background-color 0.3s ease;
}

/* On scroll */
.navigation--scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

/* Logo */
.nav-logo {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Nav Links */
.nav-link {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-decoration: none;
  padding: 0 20px;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 0.7;
}
```

## Typography System (Updated from on.com)

### Responsive Typography
```css
/* Hero Heading */
.hero-heading {
  font-size: clamp(40px, 5vw, 53px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Section Heading */
.section-heading {
  font-size: clamp(32px, 4vw, 53px);
  font-weight: 700;
  line-height: 1.2;
}

/* Product/Property Title */
.property-title {
  font-size: clamp(48px, 6vw, 68px);
  font-weight: 700;
  line-height: 1.1;
}

/* Body Text */
.body-text {
  font-size: 16px;
  line-height: 1.5;
  color: #797971;
}

/* Price Display */
.price {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
```

## Color System (on.com Palette)

```css
:root {
  /* Primary */
  --color-black: #000000;
  --color-white: #FFFFFF;
  
  /* Text */
  --color-text-primary: #000000;
  --color-text-secondary: #797971;
  
  /* Interactive */
  --color-accent: #2F7EFE;
  
  /* Backgrounds */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F5F5F5;
  
  /* Borders */
  --color-border: rgba(0, 0, 0, 0.1);
}
```

## Button Styles (on.com Pattern)

```css
/* Primary Button - Pill Shape */
.button-primary {
  background: #000000;
  color: #FFFFFF;
  padding: 0 24px;
  height: 48px;
  border-radius: 40px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Secondary Button */
.button-secondary {
  background: transparent;
  color: #000000;
  padding: 0 24px;
  height: 48px;
  border-radius: 40px;
  border: 1px solid #000000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-secondary:hover {
  background: #000000;
  color: #FFFFFF;
}
```

## Grid & Spacing System

### Responsive Spacing
```css
:root {
  /* Fluid padding that scales with viewport */
  --padding-x: clamp(1rem, 4.2667vw, 2rem);
  --padding-y: clamp(2rem, 8vw, 6rem);
  
  /* Fixed spacing scale */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 96px;
}

/* Container */
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--padding-x);
}
```

## Property Card Design (Adapted from Product Cards)

```css
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.property-card {
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.property-card__image {
  position: relative;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  overflow: hidden;
  background: #f5f5f5;
}

.property-card__image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.property-card:hover .property-card__image img {
  transform: scale(1.05);
}

.property-card__content {
  padding: 24px;
}

.property-card__price {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.property-card__address {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.property-card__details {
  font-size: 14px;
  color: #797971;
}
```

## Property Detail Page Layout

```css
/* Two-column layout like product page */
.property-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding-top: 120px; /* Account for fixed nav */
}

.property-detail__gallery {
  position: sticky;
  top: 120px;
  height: calc(100vh - 120px);
}

.property-detail__info {
  padding: 40px 0;
}

.property-detail__title {
  font-size: clamp(48px, 6vw, 68px);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
}

.property-detail__price {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
}
```

## Animations & Interactions

```css
/* Page transitions */
.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;
}

/* Scroll animations */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hover states */
.interactive-element {
  transition: all 0.2s ease;
}

.interactive-element:hover {
  transform: translateY(-2px);
}
```

## Hero Section Pattern

```css
.hero {
  height: 100vh;
  min-height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 120px var(--padding-x) 60px;
}

.hero__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.hero__background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__content {
  max-width: 800px;
  color: white;
  z-index: 1;
}

.hero__title {
  font-size: clamp(40px, 5vw, 53px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}

.hero__subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.9;
}
```

## Form Styles

```css
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  background: #FFFFFF;
}

.form-input:focus {
  outline: none;
  border-color: #000000;
}
```

## Mobile Responsiveness

```css
@media (max-width: 768px) {
  .navigation {
    height: 64px;
  }
  
  .property-detail {
    grid-template-columns: 1fr;
    padding-top: 80px;
  }
  
  .property-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .hero {
    padding: 80px 20px 40px;
  }
}
```

## Implementation Checklist

1. ✅ Implement transparent to solid navigation on scroll
2. ✅ Use pill-shaped buttons (40px border radius)
3. ✅ Apply fluid typography with clamp()
4. ✅ Create smooth hover transitions (0.2s - 0.3s)
5. ✅ Use consistent spacing scale
6. ✅ Implement two-column layout for property details
7. ✅ Add subtle shadows and transforms on hover
8. ✅ Keep color palette minimal (black, white, one accent)
9. ✅ Use high-quality imagery with proper aspect ratios
10. ✅ Ensure all interactive elements have clear hover states

This guide provides exact specifications from on.com adapted for real estate use cases.