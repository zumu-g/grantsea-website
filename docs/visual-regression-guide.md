# Visual Regression Testing Guide

## Overview
This guide helps you achieve pixel-perfect matching with on.com's design using visual regression testing.

## Quick Start

### 1. Run Padding Debug Test
```bash
npm run playwright test debug-padding.spec.ts
```
This will:
- Compare left padding across all viewports
- Generate `tests/padding-debug-report.json`
- Create visual debug screenshot at `tests/padding-debug-visual.png`

### 2. Capture Baseline Screenshots (Optional)
```bash
npm run playwright test capture-baselines.spec.ts
```
This captures screenshots from on.com at standard viewports.

### 3. Run Visual Regression Tests
```bash
npm run playwright test visual-regression.spec.ts
```
This compares your implementation against the baselines.

### 4. Use the Helper Script
```bash
./scripts/run-visual-tests.sh --debug-padding
```

## Font Management

### Download Exact Fonts
1. Check on.com's font files:
   ```javascript
   // In browser console on on.com
   Array.from(document.fonts).map(f => ({
     family: f.family,
     weight: f.weight,
     style: f.style,
     src: f.src
   }))
   ```

2. Download the actual font files (not Google Fonts URLs)

3. Place in `public/fonts/` and update CSS:
   ```css
   @font-face {
     font-family: 'On';
     src: url('/fonts/on-regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
     font-display: block; /* Prevents FOUT */
   }
   ```

### Match Font Settings
```css
body {
  font-family: 'On', Helvetica, sans-serif;
  font-weight: 400; /* Match exact weight */
  letter-spacing: 0; /* Match exact spacing */
  font-feature-settings: "liga" 1; /* Match ligatures */
  font-synthesis-weight: none; /* Prevent auto-bold */
}
```

## CSS Variables & Measurements

### Extract from on.com
Use Chrome DevTools:
1. Select element
2. Go to Computed tab
3. Copy all values

### Key Metrics to Match
```css
:root {
  /* Spacing */
  --content-padding: 20px; /* Exact value from on.com */
  --max-width: 1200px;
  
  /* Typography */
  --heading-size: 48px;
  --body-size: 16px;
  --line-height: 1.5;
  
  /* Colors - extract exact hex */
  --text-primary: #000000;
  --background: #ffffff;
}
```

## Debugging Padding Issues

### 1. Check Container Structure
```css
/* Common issue: nested containers with conflicting padding */
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px; /* This might be doubling up */
}

.inner-wrapper {
  padding: 0 20px; /* Remove if parent has padding */
}
```

### 2. Browser DevTools Method
1. Open on.com and your site side by side
2. Use DevTools ruler (Cmd+Shift+M)
3. Measure distance from viewport edge to content
4. Compare computed styles panel

### 3. Use the Debug Test
The `debug-padding.spec.ts` test will show:
- Exact padding values
- Position differences
- Visual overlay of padding

## Common Fixes

### Left Padding Mismatch
```css
/* Instead of: */
.container {
  padding-left: 40px;
}

/* Match on.com exactly: */
.container {
  padding-left: 20px;
}

@media (min-width: 768px) {
  .container {
    padding-left: 40px;
  }
}
```

### Container Width Issues
```css
/* Ensure max-width matches */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}
```

### Remove Anima Fixed Widths
```css
/* Override Anima's fixed positioning */
.element-light,
.element-light > div {
  position: relative !important;
  left: auto !important;
  right: auto !important;
}
```

## Workflow

1. **Identify Differences**
   - Run debug-padding test
   - Check report for specific elements

2. **Fix Systematically**
   - Start with body/html
   - Then containers
   - Finally, content elements

3. **Verify Changes**
   - Run visual regression test
   - Check screenshot differences
   - Iterate until match

## Tips

- Always test at exact viewport sizes (1440, 1024, 768, 375)
- Disable browser extensions during testing
- Use same OS/browser as baseline captures
- Check zoom level is 100%
- Clear cache between tests