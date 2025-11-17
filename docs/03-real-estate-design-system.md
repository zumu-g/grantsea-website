# Real Estate Design System

## Overview
This document defines the complete design system for Grants Estate Agents, providing a comprehensive foundation for all visual and interactive elements across the website and marketing materials.

## Brand Foundation

### Brand Values
- **Trust**: 30+ years of proven results and community connection
- **Innovation**: AI-powered tools meeting traditional service excellence  
- **Local Expertise**: Deep South East Melbourne market knowledge
- **Personal Service**: Individual attention in every transaction

### Brand Personality
- **Professional yet approachable**
- **Modern while respecting tradition**
- **Confident without being aggressive**
- **Helpful and educational**
- **Technologically advanced but human-centered**

## Visual Identity

### Logo Usage

#### Primary Logo
```
GRANTS ESTATE AGENTS
A tradition of trust
```

**Specifications:**
- Primary format: Horizontal lockup
- Minimum size: 120px width (digital), 25mm (print)
- Clear space: Equal to the height of "GRANTS"
- Background: Works on white, light gray, and dark blue

#### Logo Variations
- **Horizontal**: Primary usage for headers and marketing
- **Stacked**: Square social media profiles and compact spaces
- **Icon**: "GEA" monogram for app icons and favicons
- **Reverse**: White version for dark backgrounds

#### Logo Don'ts
- ❌ Don't stretch or distort proportions
- ❌ Don't change colors outside brand palette
- ❌ Don't place on busy backgrounds without proper contrast
- ❌ Don't use drop shadows or effects

### Color System

#### Primary Palette
```css
/* Brand Blue - Primary */
--blue-50: #eff6ff;   /* Lightest backgrounds */
--blue-100: #dbeafe;  /* Light backgrounds, borders */
--blue-200: #bfdbfe;  /* Subtle accents */
--blue-300: #93c5fd;  /* Disabled states */
--blue-400: #60a5fa;  /* Hover states, secondary actions */
--blue-500: #3b82f6;  /* Primary brand color, main CTAs */
--blue-600: #2563eb;  /* Hover states, pressed buttons */
--blue-700: #1d4ed8;  /* Active states, links */
--blue-800: #1e40af;  /* High contrast text */
--blue-900: #1e3a8a;  /* Darkest text, headers */
```

#### Secondary Colors
```css
/* Success Green */
--green-50: #f0fdf4;
--green-100: #dcfce7;
--green-500: #22c55e;  /* Success messages, positive indicators */
--green-600: #16a34a;  /* Success button hover */
--green-900: #14532d;  /* Success text */

/* Warning Orange */
--orange-50: #fff7ed;
--orange-100: #ffedd5;
--orange-500: #f97316;  /* Warning messages, price alerts */
--orange-600: #ea580c;  /* Warning button hover */
--orange-900: #9a3412;  /* Warning text */

/* Error Red */
--red-50: #fef2f2;
--red-100: #fee2e2;
--red-500: #ef4444;    /* Error messages, required fields */
--red-600: #dc2626;    /* Error button hover */
--red-900: #991b1b;    /* Error text */
```

#### Neutral Palette
```css
/* Grays - Main content and UI */
--gray-50: #f8fafc;    /* Page backgrounds */
--gray-100: #f1f5f9;   /* Card backgrounds, dividers */
--gray-200: #e2e8f0;   /* Borders, inactive states */
--gray-300: #cbd5e1;   /* Form borders, subtle dividers */
--gray-400: #94a3b8;   /* Placeholder text, icons */
--gray-500: #64748b;   /* Secondary text */
--gray-600: #475569;   /* Body text */
--gray-700: #334155;   /* Headings */
--gray-800: #1e293b;   /* Primary text */
--gray-900: #0f172a;   /* High contrast headings */
```

#### Real Estate Specific Colors
```css
/* Price Indicators */
--price-increase: var(--green-500);  /* Property value gains */
--price-decrease: var(--red-500);    /* Property value losses */
--price-neutral: var(--gray-500);    /* Stable prices */

/* Property Status */
--status-available: var(--green-500);      /* For sale/rent */
--status-under-contract: var(--orange-500);  /* Under contract */
--status-sold: var(--red-500);             /* Sold/rented */
--status-withdrawn: var(--gray-400);       /* Off market */
```

### Typography System

#### Font Stack
**Primary**: Inter (Google Fonts)
- Modern, highly legible sans-serif
- Excellent character support
- Optimized for digital interfaces
- Professional appearance

**Fallback Stack**: 
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

#### Type Scale
```css
/* Display Headings - Hero sections, page titles */
--text-display-xl: 4.5rem;   /* 72px - Major hero headlines */
--text-display-lg: 3.75rem;  /* 60px - Page hero headlines */
--text-display-md: 3rem;     /* 48px - Section headlines */
--text-display-sm: 2.25rem;  /* 36px - Card headlines */

/* Headings - Content structure */
--text-h1: 1.875rem;  /* 30px - Main page headings */
--text-h2: 1.5rem;    /* 24px - Section headings */
--text-h3: 1.25rem;   /* 20px - Subsection headings */
--text-h4: 1.125rem;  /* 18px - Card titles */

/* Body Text */
--text-lg: 1.125rem;  /* 18px - Large body text, introductions */
--text-base: 1rem;    /* 16px - Standard body text */
--text-sm: 0.875rem;  /* 14px - Small body text, captions */
--text-xs: 0.75rem;   /* 12px - Labels, tiny text */
```

#### Font Weights
```css
--font-thin: 100;
--font-light: 300;
--font-normal: 400;     /* Body text */
--font-medium: 500;     /* Emphasis, labels */
--font-semibold: 600;   /* Subheadings, buttons */
--font-bold: 700;       /* Headings, strong emphasis */
--font-extrabold: 800;  /* Display text, hero headings */
--font-black: 900;      /* Maximum emphasis */
```

#### Line Heights
```css
--leading-tight: 1.25;    /* Headings, compact text */
--leading-snug: 1.375;    /* Subheadings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.625; /* Large body text */
--leading-loose: 2;       /* Spaced text, quotes */
```

#### Typography Usage Guidelines

**Display Text (Hero Headlines)**
```css
.text-display {
  font-size: var(--text-display-lg);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}
```

**Headings**
```css
.text-heading-1 {
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--gray-900);
}

.text-heading-2 {
  font-size: var(--text-h2);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--gray-800);
}
```

**Body Text**
```css
.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--gray-600);
}

.text-body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--gray-600);
}
```

### Spacing System

#### Base Grid: 4px
All spacing values are multiples of 4px for consistent rhythm and alignment.

```css
/* Spacing Scale */
--space-0: 0;
--space-px: 1px;
--space-0-5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-1-5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px */
--space-2-5: 0.625rem;  /* 10px */
--space-3: 0.75rem;     /* 12px */
--space-3-5: 0.875rem;  /* 14px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-7: 1.75rem;     /* 28px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-32: 8rem;       /* 128px */
--space-40: 10rem;      /* 160px */
--space-48: 12rem;      /* 192px */
--space-56: 14rem;      /* 224px */
--space-64: 16rem;      /* 256px */
```

#### Spacing Usage Guidelines

**Component Internal Spacing**
- Small components: 12px - 16px internal padding
- Medium components: 20px - 24px internal padding  
- Large components: 32px - 48px internal padding

**Component External Spacing**
- Related components: 16px - 24px gap
- Section spacing: 48px - 64px gap
- Page section spacing: 80px - 128px gap

**Text Spacing**
- Paragraph spacing: 16px bottom margin
- List item spacing: 8px between items
- Heading spacing: 24px top margin, 16px bottom margin

### Layout System

#### Breakpoints
```css
/* Mobile First Approach */
--screen-xs: 320px;   /* Small phones */
--screen-sm: 640px;   /* Large phones */
--screen-md: 768px;   /* Tablets */
--screen-lg: 1024px;  /* Small laptops */
--screen-xl: 1280px;  /* Laptops */
--screen-2xl: 1536px; /* Desktop */
```

#### Container Sizes
```css
--container-xs: 100%;      /* Mobile full width */
--container-sm: 640px;     /* Small container */
--container-md: 768px;     /* Medium container */
--container-lg: 1024px;    /* Large container */
--container-xl: 1280px;    /* Extra large container */
--container-2xl: 1536px;   /* Maximum container */
```

#### Grid System
```css
/* 12-column grid with flexible gaps */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* Responsive column spans */
.col-span-1 { grid-column: span 1 / span 1; }
.col-span-2 { grid-column: span 2 / span 2; }
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-4 { grid-column: span 4 / span 4; }
.col-span-6 { grid-column: span 6 / span 6; }
.col-span-8 { grid-column: span 8 / span 8; }
.col-span-12 { grid-column: span 12 / span 12; }
```

## Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--blue-500);
  color: white;
  font-weight: var(--font-medium);
  padding: var(--space-3) var(--space-6);
  border-radius: 0.5rem;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--blue-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: white;
  color: var(--blue-500);
  font-weight: var(--font-medium);
  padding: var(--space-3) var(--space-6);
  border-radius: 0.5rem;
  border: 2px solid var(--blue-500);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: var(--blue-50);
  border-color: var(--blue-600);
  color: var(--blue-600);
}
```

#### Button Sizes
```css
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.btn-md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}
```

### Form Elements

#### Input Fields
```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: var(--text-base);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--blue-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:invalid {
  border-color: var(--red-500);
}
```

#### Labels
```css
.label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-700);
  margin-bottom: var(--space-2);
}
```

### Cards

#### Property Card
```css
.property-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.property-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.property-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.property-card-content {
  padding: var(--space-6);
}

.property-card-price {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--green-600);
  margin-bottom: var(--space-2);
}
```

## Real Estate Specific Components

### Property Status Indicators

#### Status Badge
```css
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: 9999px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-available {
  background-color: var(--green-100);
  color: var(--green-800);
}

.status-under-contract {
  background-color: var(--orange-100);
  color: var(--orange-800);
}

.status-sold {
  background-color: var(--red-100);
  color: var(--red-800);
}
```

### Property Features

#### Feature List
```css
.property-features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--gray-600);
}

.feature-icon {
  width: 16px;
  height: 16px;
  color: var(--blue-500);
}
```

### Agent Cards

#### Agent Profile
```css
.agent-card {
  background: white;
  border-radius: 0.75rem;
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.agent-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto var(--space-4);
  object-fit: cover;
}

.agent-name {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--gray-900);
  margin-bottom: var(--space-1);
}

.agent-title {
  font-size: var(--text-sm);
  color: var(--gray-600);
  margin-bottom: var(--space-4);
}
```

## Iconography

### Icon Library
Using Heroicons (outline and solid variants) for consistency:

#### Common Icons
- **Home**: Property listings, navigation
- **Search**: Search functionality  
- **Phone**: Contact information
- **Email**: Contact forms
- **Map**: Location features
- **Calculator**: Valuation tools
- **Star**: Reviews and ratings
- **User**: Agent profiles
- **Calendar**: Appointments
- **Clock**: Time-based information

#### Icon Sizes
```css
--icon-xs: 12px;   /* Inline text icons */
--icon-sm: 16px;   /* Small UI elements */
--icon-md: 20px;   /* Standard buttons */
--icon-lg: 24px;   /* Feature highlights */
--icon-xl: 32px;   /* Hero sections */
```

### Custom Icons
Real estate specific icons should maintain the same visual weight and style as Heroicons:

- Property type indicators (house, apartment, land)
- Amenity icons (garage, pool, garden)
- Directional arrows for galleries
- Social media platforms
- Office locations

## Accessibility Guidelines

### Color Contrast
- **Text on backgrounds**: Minimum 4.5:1 contrast ratio
- **Large text (18px+)**: Minimum 3:1 contrast ratio
- **Interactive elements**: Clear visual focus indicators
- **Error states**: Multiple indicators (color + icon + text)

### Typography Accessibility
- **Minimum font size**: 16px for body text
- **Line height**: Minimum 1.5 for body text
- **Paragraph spacing**: At least 2x font size
- **Letter spacing**: Normal or slightly increased

### Interactive Elements
- **Touch targets**: Minimum 44px x 44px
- **Focus indicators**: Clear, high-contrast outlines
- **Hover states**: Consistent across all interactive elements
- **Loading states**: Clear visual feedback for all actions

## Animation and Motion

### Transition Guidelines
```css
/* Standard transitions */
--transition-fast: 0.1s ease;      /* Micro-interactions */
--transition-base: 0.2s ease;      /* Button hovers, simple transitions */
--transition-slow: 0.3s ease;      /* Complex animations */
--transition-slower: 0.5s ease;    /* Page transitions */
```

### Common Animations
```css
/* Hover lift effect */
.hover-lift {
  transition: transform var(--transition-base);
}
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Fade in animation */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up animation */
.slide-up {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

## Implementation Guidelines

### CSS Architecture
1. **Base styles**: Reset, typography, layout foundations
2. **Component styles**: Reusable component classes
3. **Utility classes**: Single-purpose helper classes
4. **Page-specific styles**: Unique page styling

### Naming Conventions
- **BEM methodology** for CSS classes
- **Kebab-case** for CSS custom properties
- **PascalCase** for React components
- **camelCase** for JavaScript variables

### Performance Considerations
- **Critical CSS**: Inline above-the-fold styles
- **Font optimization**: Preload, font-display: swap
- **Color optimization**: Use CSS custom properties
- **Animation performance**: Prefer transform and opacity changes

---

*This design system provides the foundation for creating a cohesive, professional, and user-friendly real estate website that reflects the Grants Estate Agents brand values and serves the needs of property buyers, sellers, and renters in South East Melbourne.*