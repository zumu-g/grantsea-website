# On.com Padding System Analysis Report

## Executive Summary

Based on my analysis using Playwright to measure the exact padding values on on.com across different viewport sizes, I've identified their responsive padding system:

### Key Findings

**Desktop (1440px width):**
- Primary container padding: **48px** (47.952px)
- Applied to: Sections, Footer, Main containers

**Tablet (768px width):**
- Primary container padding: **32px**
- Applied to: Sections, Footer, Navigation, Main containers

**Mobile (375px width):**
- Primary container padding: **16px** (16.0001px)
- Applied to: Sections, Footer, Navigation, Main containers

## Detailed Padding System

### 1. Horizontal Padding Values by Breakpoint

| Viewport | Width | Primary Padding | Secondary Padding | Usage |
|----------|-------|----------------|-------------------|--------|
| Desktop | 1440px | 48px | 24px, 16px, 8px | Main containers, sections |
| Tablet | 768px | 32px | 24px, 16px, 8px | Main containers, sections |
| Mobile | 375px | 16px | 24px, 8px | Main containers, sections |

### 2. Container Structure

On.com uses a consistent container system:

```css
/* Desktop */
.container {
  padding-left: 48px;
  padding-right: 48px;
  width: 100%;
  max-width: none;
}

/* Tablet */
@media (max-width: 768px) {
  .container {
    padding-left: 32px;
    padding-right: 32px;
  }
}

/* Mobile */
@media (max-width: 375px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
```

### 3. Key Elements Analyzed

**Headers:**
- Headers typically have no padding themselves
- Content within headers inherits container padding

**Navigation:**
- Tablet/Mobile: Uses container padding (32px/16px)
- Desktop: Often full-width with internal padding

**Sections:**
- Consistently use the primary padding values
- Full-width sections with internal padding

**Footer:**
- Uses same padding system as main containers
- Consistent across all breakpoints

### 4. Special Cases

1. **Negative Margins:** Some navigation elements use negative margins equal to the container padding to achieve full-width effects while maintaining alignment

2. **Secondary Padding Values:**
   - 30px: Used for specific UI elements (buttons, overlays)
   - 24px: Common for smaller components
   - 8px: Micro-padding for tight spaces
   - 2px: Border/outline spacing

## Implementation Recommendations

To match on.com's padding system exactly:

### 1. CSS Variables Approach
```css
:root {
  --padding-desktop: 48px;
  --padding-tablet: 32px;
  --padding-mobile: 16px;
}

.container {
  padding-left: var(--padding-desktop);
  padding-right: var(--padding-desktop);
}

@media (max-width: 768px) {
  .container {
    padding-left: var(--padding-tablet);
    padding-right: var(--padding-tablet);
  }
}

@media (max-width: 375px) {
  .container {
    padding-left: var(--padding-mobile);
    padding-right: var(--padding-mobile);
  }
}
```

### 2. Tailwind CSS Classes (if using Tailwind)
```css
/* Desktop: px-12 (48px) */
/* Tablet: md:px-8 (32px) */
/* Mobile: px-4 (16px) */

<div class="px-4 md:px-8 lg:px-12">
  <!-- Content -->
</div>
```

### 3. Breakpoint Strategy
- Mobile-first approach
- Key breakpoints: 375px, 768px, 1440px
- Smooth transitions between breakpoints

## Visual Consistency Notes

1. **Content Width:** While padding changes, on.com maintains visual hierarchy through consistent spacing ratios

2. **Full-Width Elements:** Achieved through negative margins or positioned outside containers

3. **Spacing Rhythm:** The padding values follow a clear rhythm: 16px → 32px → 48px (roughly 1:2:3 ratio)

## Files Generated

1. `on-padding-analysis.json` - Detailed JSON data of all measurements
2. `on-desktop.png` - Desktop viewport screenshot
3. `on-tablet.png` - Tablet viewport screenshot  
4. `on-mobile.png` - Mobile viewport screenshot

## Conclusion

On.com uses a simple, effective padding system:
- **Desktop: 48px**
- **Tablet: 32px**
- **Mobile: 16px**

This creates a consistent, responsive layout that maintains proper content breathing room across all devices while maximizing screen real estate on smaller viewports.