# Claude Code Prompts & Documentation Package

## 📁 Project Structure Setup

### Initial Project Setup Prompt
```bash
# Run this first to set up your project structure
claude-code init website-redesign --template react-typescript
cd website-redesign
```

**Claude Code Prompt:**
```
I'm redesigning a website using a Figma → Anima → React workflow. Set up a modern React TypeScript project with the following structure:

```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── layout/       # Layout components
│   └── pages/        # Page components
├── assets/
│   ├── images/
│   └── styles/
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── tests/            # Test files
```

Install and configure:
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- ESLint and Prettier with strict configs
- Vite as build tool
- Playwright for E2E testing

Create proper tsconfig.json, tailwind.config.js, and package.json with all necessary dependencies.
```

---

## 🎨 Phase 1: Design Analysis & Import

### 1.1 Reference Website Analysis

**Documentation: `docs/01-design-analysis.md`**

```markdown
# Design Analysis Checklist

## Website Analysis Template
- **URL**: [Target website URL]
- **Key Pages**: Homepage, About, Products/Services, Contact
- **Design Patterns**: 
  - Navigation style
  - Hero sections
  - Card layouts
  - Form designs
  - Footer structure
- **Responsive Breakpoints**: Mobile (320px), Tablet (768px), Desktop (1024px+)
- **Color Palette**: [Extract primary, secondary, accent colors]
- **Typography**: [Note font families, sizes, weights]
- **Components to Replicate**: [List specific UI elements]

## Pre-Import Checklist
- [ ] Screenshot all key sections
- [ ] Note any complex interactions
- [ ] Identify reusable components
- [ ] Document responsive behaviors
```

**Claude Code Agent Prompt:**
```
Create an automated website analysis agent that:

1. Takes a URL as input
2. Screenshots the website at different viewport sizes
3. Extracts color palette, fonts, and spacing patterns
4. Identifies reusable UI components
5. Generates a comprehensive analysis report in markdown
6. Saves screenshots to `analysis/screenshots/` folder

Use Playwright to capture screenshots and analyze the DOM structure. Output findings to `docs/website-analysis-report.md`.
```

### 1.2 Figma Import Quality Check

**Documentation: `docs/02-figma-import-guide.md`**

```markdown
# Figma Import Best Practices

## html.to.design Import Steps
1. Install html.to.design plugin in Figma
2. Enter target website URL
3. Select import options:
   - Include images: Yes
   - Preserve text: Yes
   - Import responsive breakpoints: Yes
4. Review imported layers for:
   - Missing elements
   - Incorrect positioning
   - Text rendering issues
   - Image quality problems

## Post-Import Cleanup Checklist
- [ ] Fix broken image links
- [ ] Correct text formatting
- [ ] Adjust spacing inconsistencies  
- [ ] Organize layer structure
- [ ] Create component variants for responsive states
```

---

## 🎯 Phase 2: Design Customization

### 2.1 Brand Adaptation Prompt

**Claude Code Prompt:**
```
I need to adapt an imported Figma design to match my brand. Help me create:

1. A design system configuration file that defines:
   - Brand colors (primary, secondary, accent, neutrals)
   - Typography scale (headings, body, captions)
   - Spacing system (4px, 8px, 16px, 24px, 32px, 48px, 64px)
   - Border radius values
   - Shadow definitions

2. A Figma style guide template that I can apply to:
   - Replace placeholder colors with brand colors
   - Update typography to match brand fonts
   - Standardize spacing across components

3. A component audit checklist to ensure consistency

Export as TypeScript constants that I can use in my React app later.
```

### 2.2 Component Documentation Template

**Documentation: `docs/03-design-system.md`**

```markdown
# Design System Specifications

## Color Palette
```typescript
export const colors = {
  primary: {
    50: '#...',
    100: '#...',
    // ... generate full scale
  },
  // ... other color groups
};
```

## Typography Scale
```typescript
export const typography = {
  fontFamily: {
    heading: ['Your Font', 'fallback'],
    body: ['Your Font', 'fallback'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    // ... complete scale
  }
};
```

## Component Inventory
- [ ] Button (primary, secondary, outline variants)
- [ ] Card (basic, with image, with actions)
- [ ] Input (text, email, password, textarea)
- [ ] Navigation (header, sidebar, breadcrumbs)
- [ ] Modal/Dialog
- [ ] Form layouts
- [ ] Grid/Layout components
```

---

## ⚙️ Phase 3: Code Generation & Import

### 3.1 Anima Export Optimization

**Documentation: `docs/04-anima-export-guide.md`**

```markdown
# Anima Export Best Practices

## Export Configuration
- Framework: React with TypeScript
- CSS: Tailwind CSS classes (if supported) or CSS Modules
- Components: Separate files for each component
- Images: Optimize and use proper formats (WebP, AVIF)
- Responsive: Export all breakpoint variations

## Pre-Export Checklist
- [ ] Name all Figma layers semantically
- [ ] Group related elements into components
- [ ] Set proper constraints for responsive behavior
- [ ] Use Auto Layout where possible
- [ ] Define component properties and variants

## Quality Gates Before Import
- [ ] Review generated file structure
- [ ] Check component props and TypeScript types
- [ ] Validate CSS class usage
- [ ] Test responsive behavior in generated code
```

### 3.2 Code Import and Cleanup

**Claude Code Agent Prompt:**
```
Create an import and cleanup agent that:

1. **Analyzes exported Anima code** and generates a quality report covering:
   - Component structure and organization
   - TypeScript type coverage
   - CSS/styling approach used
   - Accessibility compliance
   - Performance concerns (large bundles, inline styles)

2. **Auto-refactors the code** to:
   - Convert inline styles to Tailwind classes
   - Extract reusable components
   - Add proper TypeScript interfaces
   - Implement proper error boundaries
   - Add loading states and error handling
   - Optimize images and assets

3. **Generates migration plan** with:
   - Priority order for refactoring components
   - Estimated time for each component cleanup
   - Dependencies between components
   - Testing requirements for each component

4. **Creates component documentation** automatically with:
   - Props interface documentation
   - Usage examples
   - Storybook stories (if applicable)
   - Accessibility notes

Output structure:
```
imported-code/
├── raw/              # Original Anima export
├── analyzed/         # Analysis reports
├── refactored/       # Cleaned up components
└── docs/             # Generated documentation
```
```

### 3.3 Component Integration Prompt

**Claude Code Prompt:**
```
Help me integrate and optimize the imported React components:

1. **Component Architecture Review**:
   - Analyze current component structure
   - Identify opportunities for composition
   - Suggest performance optimizations
   - Plan for code splitting

2. **Create Base Component Library**:
   - Extract common UI patterns into base components
   - Implement proper prop forwarding
   - Add variant support using class-variance-authority
   - Ensure consistent API across components

3. **State Management Setup**:
   - Identify components needing state management
   - Set up Context providers where needed
   - Implement custom hooks for complex logic
   - Plan for form state management

4. **Integration Checklist**:
   - Import path optimization
   - Bundle size analysis
   - Tree-shaking verification
   - Performance profiling setup

Generate the refactored components with proper file organization and documentation.
```

---

## 🧪 Phase 4: Testing Setup

### 4.1 Playwright Configuration

**Claude Code Agent Prompt:**
```
Set up comprehensive Playwright testing with MCP integration:

1. **Configure Playwright** with:
   - Multi-browser testing (Chrome, Firefox, Safari)
   - Mobile device emulation
   - Visual regression testing
   - Accessibility testing with axe-playwright
   - Performance testing

2. **Create Page Object Models** for:
   - Homepage interactions
   - Navigation flows
   - Form submissions
   - Responsive behavior testing

3. **Implement Test Suites**:
   - Smoke tests for critical paths
   - Visual regression tests for design consistency
   - Cross-browser compatibility tests
   - Mobile responsiveness tests
   - Performance benchmarks

4. **MCP Integration**:
   - Set up Model Context Protocol for AI-assisted test generation
   - Create test case generators based on component props
   - Implement intelligent test data generation
   - Add AI-powered test result analysis

Configuration files needed:
- playwright.config.ts
- test-setup.ts  
- page-objects/
- test-data/
- visual-baselines/
```

### 4.2 Testing Documentation

**Documentation: `docs/05-testing-strategy.md`**

```markdown
# Testing Strategy

## Test Pyramid
1. **Unit Tests** (70%)
   - Component rendering
   - Hook functionality
   - Utility functions
   - TypeScript type checking

2. **Integration Tests** (20%)
   - Component interactions
   - API integration
   - Form workflows
   - State management

3. **E2E Tests** (10%)
   - Critical user journeys
   - Cross-browser compatibility
   - Performance thresholds
   - Accessibility compliance

## Playwright Test Scripts
```typescript
// Example: Homepage test
test('Homepage loads correctly across devices', async ({ page }) => {
  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage-mobile.png');
  
  // Desktop view  
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page).toHaveScreenshot('homepage-desktop.png');
});
```

## Visual Regression Testing
- Baseline screenshots for each component
- Cross-browser visual comparisons
- Responsive layout verification
- Dark mode variant testing
```

---

## 🚀 Phase 5: Optimization & Deployment

### 5.1 Performance Optimization

**Claude Code Agent Prompt:**
```
Create a performance optimization agent that:

1. **Analyzes current bundle**:
   - Identifies large dependencies
   - Finds unused code opportunities
   - Analyzes chunk splitting effectiveness
   - Reviews image optimization

2. **Implements optimizations**:
   - Set up code splitting at route and component level
   - Implement lazy loading for images and components
   - Add React.memo where beneficial
   - Optimize CSS bundle size
   - Configure proper caching headers

3. **Performance monitoring setup**:
   - Web Vitals tracking
   - Bundle analyzer integration
   - Lighthouse CI configuration
   - Performance budget enforcement

4. **SEO optimization**:
   - Meta tags management
   - Open Graph tags
   - Structured data implementation
   - Sitemap generation

Generate optimized build configuration and deployment scripts.
```

### 5.2 Deployment Configuration

**Documentation: `docs/06-deployment-guide.md`**

```markdown
# Deployment Guide

## Build Optimization Checklist
- [ ] Bundle size < 500KB (initial load)
- [ ] Images optimized and using modern formats
- [ ] CSS purged of unused styles
- [ ] JavaScript minified and compressed
- [ ] Service worker configured for caching
- [ ] Error tracking configured (Sentry, LogRocket)

## Environment Configuration
```typescript
// env.config.ts
export const env = {
  development: {
    API_URL: 'http://localhost:3001',
    DEBUG: true,
  },
  production: {
    API_URL: 'https://api.yoursite.com',
    DEBUG: false,
  }
};
```

## Deployment Scripts
```bash
# Build and deploy
npm run build
npm run test:e2e:production
npm run deploy:staging
npm run test:smoke:staging
npm run deploy:production
```

## Monitoring Setup
- Performance monitoring
- Error tracking
- User analytics
- Core Web Vitals tracking
```

---

## 📝 Master Orchestration Agent

### Final Integration Prompt

**Claude Code Master Agent:**
```
You are the senior developer orchestrating this entire website redesign project. Your role is to:

1. **Project Coordination**:
   - Track progress across all phases
   - Identify and resolve blockers
   - Ensure quality standards are met
   - Coordinate between different tools and workflows

2. **Quality Assurance**:
   - Review all generated code for best practices
   - Ensure consistent patterns across components
   - Validate accessibility and performance standards
   - Maintain TypeScript strict mode compliance

3. **Problem Solving**:
   - Debug issues with tool integrations
   - Provide alternatives when workflows fail
   - Optimize processes for efficiency
   - Generate custom solutions for unique requirements

4. **Documentation Management**:
   - Keep all documentation up to date
   - Generate progress reports
   - Create handoff documentation for team members
   - Maintain architectural decision records

When I run into issues or need guidance, provide specific, actionable solutions with code examples. Always consider the entire project context and suggest improvements to the overall workflow.

Current project status: [Update this as you progress]
Active phase: [Current phase]
Known issues: [List any blockers]
Next priorities: [What to focus on next]
```

---

## 🛠️ Quick Start Commands

### Project Initialization
```bash
# Set up project
claude-code init website-redesign --agents
cd website-redesign

# Initialize documentation
mkdir -p docs analysis imported-code/{raw,analyzed,refactored,docs}

# Start development server
npm run dev
```

### Agent Workflows
```bash
# Analyze reference website
claude-code agent run website-analyzer --url="https://example.com"

# Process Anima export  
claude-code agent run code-importer --source="./anima-export"

# Run optimization suite
claude-code agent run optimizer --target="production"

# Execute test suite
claude-code agent run test-runner --suite="full"
```

### 📋 Real Estate Success Metrics

Track these KPIs throughout the real estate project:

#### **Technical Metrics**
- **Code Quality**: ESLint score, TypeScript coverage for property types
- **Performance**: 
  - Property search response time < 500ms
  - Property detail page load < 1.5s
  - Image gallery first paint < 1s
  - Core Web Vitals scores for property pages
- **Testing**: Coverage percentage, E2E test pass rate for property workflows
- **Accessibility**: Lighthouse accessibility score for property listings

#### **Real Estate Specific Metrics**
- **API Performance**: 
  - CRM API response times
  - Property data cache hit rates
  - Search query optimization effectiveness
- **User Experience**:
  - Property search conversion rates
  - Property inquiry form completion rates
  - Mobile property browsing engagement
  - Property image loading performance
- **Data Quality**:
  - Property data validation error rates
  - Image optimization success rates
  - Search result relevance scores

#### **Business Metrics**
- **Property Engagement**:
  - Property view time and bounce rates
  - Property inquiry submission rates
  - Property comparison usage
  - Favorite properties conversion rates
- **Search Effectiveness**:
  - Search result click-through rates
  - Filter usage patterns
  - Search-to-inquiry conversion rates
- **Timeline**: Actual vs estimated completion time per phase

---

## 🏠 Real Estate Specific Quick Start Commands

### Project Initialization
```bash
# Set up real estate project
claude-code init real-estate-website --agents --template="real-estate"
cd real-estate-website

# Initialize real estate documentation
mkdir -p docs analysis imported-code/{raw,analyzed,refactored,docs}
mkdir -p test-data/properties fixtures/crm-api

# Install real estate specific dependencies
npm install @tanstack/react-query zustand react-hook-form zod axios
npm install -D @types/google-maps @playwright/test axe-playwright

# Start development server with API proxy
npm run dev:with-api
```

### Real Estate Agent Workflows
```bash
# Analyze reference real estate website
claude-code agent run real-estate-analyzer --url="https://domain.com.au" --type="real-estate"

# Set up CRM API integration
claude-code agent run crm-integrator --api-docs="./docs/crm-api.json"

# Process Anima export for real estate components
claude-code agent run real-estate-importer --source="./anima-export" --type="property-focused"

# Generate property component library
claude-code agent run property-component-generator --design-tokens="./design-system.json"

# Run real estate optimization suite
claude-code agent run real-estate-optimizer --target="production" --focus="property-performance"

# Execute real estate test suite
claude-code agent run real-estate-tester --suite="full" --include-api-tests
```

### Real Estate Development Workflow
```bash
# Property data type generation
claude-code agent run property-type-generator --crm-schema="./crm-schema.json"

# Property component scaffolding
claude-code generate component PropertyCard --type="real-estate" --variants="grid,list,featured"

# Search functionality setup
claude-code agent run search-builder --type="property-search" --filters="price,location,features"

# CRM API service layer
claude-code agent run api-service-builder --endpoints="./api-endpoints.json" --auth-type="api-key"
```

---

*This comprehensive documentation package is specifically designed for real estate websites with CRM integration, optimized for Claude Code agents to maximize automation while maintaining high quality standards for property-focused user experiences.*