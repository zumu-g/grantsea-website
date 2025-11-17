# Real Estate Project Integration Guide

This document outlines how to integrate Anima exported code into the Grants Estate Agents website project.

## Project Overview

The project is now fully configured with:

- ✅ **React + TypeScript + Next.js 13.5** (Node.js 18.12.1 compatible)
- ✅ **WordPress API Integration** - Full headless CMS integration
- ✅ **CRM Integration** - HubSpot, Salesforce, and Pipedrive support
- ✅ **SEO Optimization** - Comprehensive SEO framework with structured data
- ✅ **Performance Optimization** - Image optimization, lazy loading, caching
- ✅ **Anima Integration Utilities** - Ready for component import

## Directory Structure

```
grantsea-website/
├── src/
│   ├── components/
│   │   ├── anima-exports/         # Your Anima components go here
│   │   ├── anima/                 # Integration utilities
│   │   ├── forms/                 # Contact & Appraisal forms (CRM integrated)
│   │   ├── layout/                # Header, Footer, Navigation
│   │   ├── seo/                   # SEO components
│   │   └── ui/                    # Reusable UI components
│   ├── hooks/
│   │   ├── useWordPress.ts        # WordPress API hooks
│   │   ├── useCRM.ts             # CRM integration hooks
│   │   └── usePerformance.ts     # Performance monitoring
│   ├── lib/
│   │   ├── wordpress.ts          # WordPress API client
│   │   ├── crm.ts               # CRM management
│   │   ├── performance.ts        # Performance utilities
│   │   ├── anima-integration.ts  # Anima integration helpers
│   │   ├── seo.ts               # SEO utilities
│   │   └── constants.ts         # Company constants
│   └── app/                     # Next.js 13 app directory
│       ├── api/                 # API routes
│       ├── about/               # About page
│       ├── locations/           # Location-specific pages
│       └── services/            # Service pages
```

## How to Integrate Your Anima Code

### Step 1: Upload Your Anima Export

1. Extract your Anima export files
2. Place components in `src/components/anima-exports/components/`
3. Place full pages in `src/components/anima-exports/pages/`
4. Place assets in `src/components/anima-exports/assets/`

### Step 2: Process Components

Use the integration utilities to convert Anima components:

```tsx
import React from 'react';
import { AnimaComponentWrapper } from '@/components/anima/AnimaComponentWrapper';
import { animaIntegration } from '@/lib/anima-integration';

// Your Anima component
import YourAnimaComponent from '@/components/anima-exports/components/YourComponent';

export const IntegratedComponent: React.FC<any> = (props) => {
  // Process Anima styles to Tailwind classes
  const processedProps = animaIntegration.processComponent(props);
  
  return (
    <AnimaComponentWrapper 
      animationPreset="slideUp"
      className={processedProps.className}
      errorBoundary={true}
    >
      <YourAnimaComponent {...processedProps} />
    </AnimaComponentWrapper>
  );
};
```

### Step 3: Handle Assets

Process images and assets:

```tsx
import { animaAssets } from '@/lib/anima-integration';

// In your component
const optimizedImage = animaAssets.createOptimizedImage(
  './your-anima-image.jpg',
  'Property image alt text',
  800,
  600
);

return (
  <img 
    src={optimizedImage.src}
    alt={optimizedImage.alt}
    width={optimizedImage.width}
    height={optimizedImage.height}
  />
);
```

### Step 4: Convert Styles

Convert Anima CSS to Tailwind classes:

```tsx
import { animaStyleProcessor } from '@/lib/anima-integration';

// Convert Anima styles
const animaStyles = {
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  backgroundColor: '#f3f4f6'
};

const tailwindClasses = animaStyleProcessor.convertToTailwind(animaStyles);
// Result: 'flex flex-col p-6 bg-gray-100'
```

## Integration with Existing Features

### WordPress Integration

Connect your Anima components to WordPress content:

```tsx
import { usePosts, useProperties } from '@/hooks/useWordPress';

export const AnimaPropertySection = () => {
  const { data: properties, loading } = useProperties({ per_page: 6 });
  
  return (
    <AnimaComponentWrapper loading={loading}>
      {/* Your Anima component with WordPress data */}
      <YourAnimaPropertyGrid properties={properties} />
    </AnimaComponentWrapper>
  );
};
```

### CRM Integration

Add CRM functionality to Anima forms:

```tsx
import { useContactFormCRM } from '@/hooks/useCRM';

export const AnimaContactForm = () => {
  const { submitContactForm, loading, error, success } = useContactFormCRM();
  
  const handleSubmit = async (formData: any) => {
    await submitContactForm(formData);
  };
  
  return (
    <AnimaComponentWrapper>
      {/* Your Anima form component */}
      <YourAnimaForm onSubmit={handleSubmit} loading={loading} />
    </AnimaComponentWrapper>
  );
};
```

### SEO Integration

Ensure SEO is maintained:

```tsx
import { generatePageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = generatePageMetadata({
  title: 'Your Anima Page Title',
  description: 'Page description',
  keywords: 'real estate, property',
  path: '/your-anima-page'
});

export default function AnimaPage() {
  return (
    <>
      <JsonLd data={yourStructuredData} />
      <YourAnimaPageComponent />
    </>
  );
}
```

## Performance Considerations

### Lazy Loading

Wrap heavy components with lazy loading:

```tsx
import { lazy } from 'react';

const LazyAnimaComponent = lazy(() => 
  import('@/components/anima-exports/components/HeavyComponent')
);

export const OptimizedAnimaSection = () => (
  <AnimaComponentWrapper loading={true}>
    <LazyAnimaComponent />
  </AnimaComponentWrapper>
);
```

### Image Optimization

Use Next.js Image component for Anima images:

```tsx
import Image from 'next/image';
import { animaAssets } from '@/lib/anima-integration';

export const OptimizedAnimaImage = ({ src, alt }) => {
  const optimizedSrc = animaAssets.processImage(src);
  
  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={800}
      height={600}
      priority={false}
      placeholder="blur"
      blurDataURL="..."
    />
  );
};
```

## Testing Your Integration

1. **Component Testing**: Test each Anima component in isolation
2. **Performance Testing**: Check loading times and bundle size
3. **Responsive Testing**: Verify mobile and desktop layouts
4. **Accessibility Testing**: Ensure WCAG compliance
5. **SEO Testing**: Verify meta tags and structured data

## Deployment Checklist

Before deploying:

- [ ] All Anima assets are optimized
- [ ] Components are properly wrapped with error boundaries
- [ ] Performance budgets are met
- [ ] SEO metadata is configured
- [ ] CRM integration is tested
- [ ] WordPress integration is working
- [ ] Responsive design is verified
- [ ] Accessibility is validated

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Configure your API keys and endpoints
3. Set up WordPress CMS with required custom fields
4. Configure CRM integration (HubSpot/Salesforce)
5. Set up Google Analytics and other tracking

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Performance analysis
ANALYZE=true npm run build
```

## Support

The project includes:

- Comprehensive error handling
- Loading states for all async operations
- Performance monitoring
- SEO optimization
- Responsive design utilities
- Accessibility features
- Integration helpers for Anima components

Upload your Anima code and I'll help you integrate it seamlessly with all the existing features!