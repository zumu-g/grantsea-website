# Figma Import and Code Generation Guide

## Overview
This guide covers the complete workflow for importing Figma designs into our Next.js codebase, including Anima integration, code optimization, and quality assurance processes.

## Figma Setup and Preparation

### 1. Figma File Organization

#### File Structure Standards
```
GEA Website Design System/
├── 📄 Design Tokens
├── 🎨 Components Library
├── 📱 Mobile Layouts
├── 💻 Desktop Layouts
├── 🔧 Utilities & Icons
└── 📋 Documentation
```

#### Page Organization
- **Cover Page** - Project overview and navigation
- **Design System** - Colors, typography, spacing, components
- **Mobile First** - All mobile layouts (320px - 768px)
- **Desktop** - Desktop layouts (1024px+)
- **Components** - Reusable component definitions
- **Specs** - Developer handoff specifications

### 2. Design System Setup in Figma

#### Color Tokens
```figma-tokens
Primary Colors:
- primary-50: #eff6ff
- primary-100: #dbeafe
- primary-500: #3b82f6 (main brand)
- primary-600: #2563eb (hover states)
- primary-900: #1e3a8a (text)

Secondary Colors:
- success-500: #22c55e
- warning-500: #f59e0b
- error-500: #ef4444

Neutrals:
- gray-50: #f8fafc
- gray-100: #f1f5f9
- gray-500: #64748b
- gray-900: #0f172a
```

#### Typography Scale
```figma-tokens
Font Family: Inter (Google Fonts)

Scale:
- Heading 1: 36px / 40px (Bold)
- Heading 2: 30px / 36px (Bold)
- Heading 3: 24px / 32px (SemiBold)
- Heading 4: 20px / 28px (SemiBold)
- Body Large: 18px / 28px (Regular)
- Body: 16px / 24px (Regular)
- Body Small: 14px / 20px (Regular)
- Caption: 12px / 16px (Medium)
```

#### Spacing System
```figma-tokens
Base Unit: 4px

Scale:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
```

### 3. Component Design Standards

#### Button Component Variants
```figma-component
Button/
├── Primary (Blue background)
├── Secondary (White background, blue border)
├── Ghost (Transparent background)
├── Sizes: Small, Medium, Large
├── States: Default, Hover, Active, Disabled
└── Icons: Left icon, Right icon, Icon only
```

#### Property Card Component
```figma-component
PropertyCard/
├── Image (16:9 ratio)
├── Price (prominent)
├── Address
├── Property details (bed/bath/car)
├── Agent info
└── CTA buttons
```

## Anima Integration Workflow

### 1. Anima Plugin Setup

#### Installation
1. Install Anima plugin in Figma
2. Connect to React/Next.js project
3. Configure export settings for TypeScript
4. Set up Tailwind CSS integration

#### Export Configuration
```json
{
  "framework": "react",
  "typescript": true,
  "styling": "tailwind",
  "components": "functional",
  "hooks": true,
  "responsive": "mobile-first"
}
```

### 2. Pre-Export Checklist

#### Design Validation
- [ ] All components properly named
- [ ] Layers organized and grouped
- [ ] Auto Layout applied correctly
- [ ] Constraints set for responsive behavior
- [ ] Colors use design tokens
- [ ] Text styles applied consistently
- [ ] Images optimized and properly sized

#### Component Preparation
- [ ] Convert repeated elements to components
- [ ] Set up component variants
- [ ] Define component properties
- [ ] Create responsive breakpoint versions
- [ ] Test component interactions
- [ ] Document component usage

### 3. Export Process

#### Step 1: Component Export
```bash
# Export individual components first
1. Select component in Figma
2. Run Anima export
3. Choose "Component" export type
4. Configure naming conventions
5. Export to designated folder
```

#### Step 2: Page Layout Export
```bash
# Export complete page layouts
1. Select page/section
2. Run Anima export  
3. Choose "Page" export type
4. Configure responsive settings
5. Export with component references
```

#### Step 3: Asset Export
```bash
# Export images and icons
1. Select all images/icons
2. Export as optimized formats
3. SVG for icons, WebP for images
4. Multiple sizes for responsive images
```

## Code Optimization Process

### 1. Anima Code Review

#### Common Issues to Fix
```typescript
// ❌ Anima Generated (needs fixing)
const Component1 = () => {
  return (
    <div className="w-[375px] h-[812px] bg-white">
      <div className="absolute left-[24px] top-[100px]">
        <span className="text-[16px] font-[400]">Text</span>
      </div>
    </div>
  );
};

// ✅ Optimized Version
const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {property.title}
        </h3>
      </div>
    </div>
  );
};
```

#### Optimization Checklist
- [ ] Remove fixed pixel values
- [ ] Replace absolute positioning with flexbox/grid
- [ ] Convert to semantic HTML elements
- [ ] Add proper TypeScript interfaces
- [ ] Implement responsive design patterns
- [ ] Add accessibility attributes
- [ ] Optimize class names for consistency

### 2. Component Structure Standardization

#### File Organization
```
src/components/
├── ui/           # Basic UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── forms/        # Form components
│   ├── ContactForm.tsx
│   └── PropertySearchForm.tsx
├── property/     # Property-specific components
│   ├── PropertyCard.tsx
│   ├── PropertyGallery.tsx
│   └── PropertyDetails.tsx
└── layout/       # Layout components
    ├── Header.tsx
    ├── Footer.tsx
    └── Navigation.tsx
```

#### Component Template
```typescript
// Component interface
interface ComponentProps {
  // Define all props with proper types
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

// Component implementation
export function Component({ 
  title, 
  description, 
  variant = 'primary',
  className = '' 
}: ComponentProps) {
  return (
    <div className={`base-classes ${variant} ${className}`}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}

// Export default
export default Component;
```

### 3. Responsive Optimization

#### Breakpoint Strategy
```css
/* Mobile First Approach */
/* Default: Mobile (320px - 640px) */
.component {
  @apply w-full px-4;
}

/* Tablet (640px - 1024px) */
@media (min-width: 640px) {
  .component {
    @apply px-6 max-w-2xl mx-auto;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .component {
    @apply px-8 max-w-7xl;
  }
}
```

#### Responsive Component Pattern
```typescript
interface ResponsiveProps {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

const ResponsiveWrapper = ({ children, mobile, tablet, desktop }: Props) => {
  const classes = [
    mobile || 'w-full',
    tablet ? `md:${tablet}` : '',
    desktop ? `lg:${desktop}` : ''
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};
```

## Quality Assurance Process

### 1. Automated Code Quality Checks

#### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error"
  }
}
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80
}
```

### 2. Manual Review Checklist

#### Code Quality
- [ ] TypeScript interfaces defined
- [ ] Props properly typed
- [ ] Error handling implemented
- [ ] Loading states included
- [ ] Accessibility attributes added
- [ ] SEO considerations addressed

#### Design Fidelity
- [ ] Visual appearance matches Figma
- [ ] Spacing and typography accurate
- [ ] Colors match design system
- [ ] Hover states implemented
- [ ] Mobile responsive behavior correct
- [ ] Interactive elements functional

#### Performance
- [ ] Images optimized and responsive
- [ ] CSS classes minimized
- [ ] JavaScript bundles reasonable size
- [ ] Core Web Vitals considerations
- [ ] Lazy loading implemented where appropriate

### 3. Testing Integration

#### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';

describe('PropertyCard', () => {
  const mockProperty = {
    id: '1',
    title: 'Modern Family Home',
    price: '$850,000',
    address: 'Narre Warren VIC 3805'
  };

  it('renders property information correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('Modern Family Home')).toBeInTheDocument();
    expect(screen.getByText('$850,000')).toBeInTheDocument();
    expect(screen.getByText('Narre Warren VIC 3805')).toBeInTheDocument();
  });

  it('handles missing data gracefully', () => {
    const incompleteProperty = { id: '1', title: 'Test Property' };
    render(<PropertyCard property={incompleteProperty} />);
    
    expect(screen.getByText('Test Property')).toBeInTheDocument();
    // Should not crash with missing data
  });
});
```

## Advanced Integration Techniques

### 1. Design Token Integration

#### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-primary-50: theme('colors.blue.50');
  --color-primary-500: theme('colors.blue.500');
  --color-primary-900: theme('colors.blue.900');
  
  /* Spacing */
  --space-xs: theme('spacing.1');
  --space-sm: theme('spacing.2');
  --space-md: theme('spacing.4');
  
  /* Typography */
  --font-size-sm: theme('fontSize.sm');
  --font-size-base: theme('fontSize.base');
  --font-size-lg: theme('fontSize.lg');
}
```

#### JavaScript Token Usage
```typescript
// Design tokens as TypeScript constants
export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px'
  }
} as const;
```

### 2. Animation Integration

#### Framer Motion Setup
```typescript
import { motion } from 'framer-motion';

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="property-card"
    >
      {/* Card content */}
    </motion.div>
  );
};
```

#### CSS Animation Utilities
```css
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.slide-up {
  animation: slideUp 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

## Troubleshooting Common Issues

### 1. Anima Export Problems

#### Fixed Width Issues
```typescript
// Problem: Fixed widths from Figma
<div className="w-[375px]">

// Solution: Responsive widths
<div className="w-full max-w-md">
```

#### Absolute Positioning Overuse
```typescript
// Problem: Everything positioned absolutely
<div className="absolute left-[24px] top-[100px]">

// Solution: Use flexbox/grid
<div className="flex flex-col p-6">
```

#### Missing Semantic HTML
```typescript
// Problem: All divs
<div>Button Text</div>

// Solution: Proper HTML elements
<button type="button">Button Text</button>
```

### 2. Performance Issues

#### Large Bundle Sizes
```typescript
// Problem: Importing entire libraries
import * as React from 'react';
import { motion } from 'framer-motion';

// Solution: Tree shaking imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
```

#### Image Optimization
```typescript
// Problem: Large unoptimized images
<img src="/large-image.jpg" alt="Property" />

// Solution: Next.js Image optimization
import Image from 'next/image';
<Image 
  src="/large-image.jpg" 
  alt="Property"
  width={400}
  height={300}
  priority={false}
/>
```

## Documentation and Handoff

### 1. Component Documentation

#### Storybook Integration
```typescript
// PropertyCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PropertyCard } from './PropertyCard';

const meta: Meta<typeof PropertyCard> = {
  title: 'Components/PropertyCard',
  component: PropertyCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    property: {
      id: '1',
      title: 'Modern Family Home',
      price: '$850,000',
      address: 'Narre Warren VIC 3805'
    }
  },
};
```

#### README Template
```markdown
# PropertyCard Component

## Overview
Displays property information in a card format with image, price, and key details.

## Usage
```tsx
import { PropertyCard } from '@/components/property/PropertyCard';

<PropertyCard 
  property={propertyData}
  onViewDetails={handleViewDetails}
  onContactAgent={handleContact}
/>
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| property | PropertyData | Yes | Property information object |
| onViewDetails | function | No | Callback for view details action |
| onContactAgent | function | No | Callback for contact agent action |

## Examples
[Include various usage examples]
```

### 2. Design System Documentation

#### Component Library Overview
```markdown
# GEA Design System

## Components Inventory
- [ ] Buttons (5 variants)
- [ ] Form inputs (8 types)
- [ ] Cards (3 layouts)
- [ ] Navigation (header, footer, breadcrumb)
- [ ] Property display (card, grid, list)
- [ ] Modals and overlays
- [ ] Loading states
- [ ] Error states

## Implementation Status
- ✅ Design tokens defined
- ✅ Base components created
- 🚧 Property components in progress
- ⏳ Form components pending
- ⏳ Layout components pending
```

---

*This guide ensures high-quality conversion from Figma designs to production-ready React components while maintaining design fidelity and code quality standards.*