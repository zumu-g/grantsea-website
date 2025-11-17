# Anima Exported Components

This directory contains components exported from Anima design tool. These components are integrated with the Next.js project using the Anima integration utilities.

## Directory Structure

```
anima-exports/
├── components/          # Individual Anima components
├── pages/              # Full page components from Anima
├── sections/           # Page sections and layouts
├── assets/             # Images, icons, and other assets
└── styles/             # CSS files and style definitions
```

## Integration Guidelines

### 1. Component Integration

When adding Anima components to this directory:

1. Place the component files in the appropriate subdirectory
2. Use the `AnimaComponentWrapper` for consistent loading and error handling
3. Apply the Anima integration utilities to convert styles to Tailwind classes
4. Ensure responsive design is maintained

### 2. Asset Management

- Place all images in `assets/images/`
- Place icons in `assets/icons/`
- Use the `animaAssets.processImage()` utility to optimize image paths
- Ensure all assets are optimized for web

### 3. Style Processing

- Use `animaStyleProcessor.convertToTailwind()` to convert CSS to Tailwind classes
- Place any custom CSS that can't be converted in `styles/custom.css`
- Maintain consistent design system integration

### 4. Performance Optimization

- Wrap components with lazy loading using React.lazy()
- Use the performance optimization utilities for images and animations
- Implement proper caching for static assets

## Example Integration

```tsx
import React from 'react';
import { AnimaComponentWrapper } from '@/components/anima/AnimaComponentWrapper';
import { animaIntegration } from '@/lib/anima-integration';

// Import your Anima component
import AnimaHeroSection from './components/HeroSection';

export const IntegratedHeroSection: React.FC = (props) => {
  const processedProps = animaIntegration.processComponent(props);
  
  return (
    <AnimaComponentWrapper 
      animationPreset="fadeIn"
      className={processedProps.className}
    >
      <AnimaHeroSection {...processedProps} />
    </AnimaComponentWrapper>
  );
};
```

## Testing

Before integrating Anima components:

1. Test components in isolation
2. Verify responsive behavior across devices
3. Check performance impact
4. Validate accessibility compliance
5. Test loading states and error handling

## Deployment

Anima components are automatically included in the build process. Ensure:

1. All assets are properly referenced
2. Environment variables are configured
3. Performance budgets are met
4. SEO meta tags are preserved