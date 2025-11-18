# on.com Hero Text Sizing Analysis

## Overview
This analysis provides insights into on.com's hero text styling approach based on modern web design patterns and performance-focused design principles.

## Expected Hero Text Structure

### Typography Scale (Desktop - 1024px+)
**Main Hero Heading:**
- Font-size: 56-72px (likely 64px)
- Line-height: 1.1 (tight leading for impact)
- Font-weight: 800-900 (extra bold)
- Letter-spacing: -0.02em (slight negative tracking)
- Font-family: Likely a custom sans-serif or system font stack

**Hero Subtitle/Supporting Text:**
- Font-size: 20-24px
- Line-height: 1.4-1.5
- Font-weight: 400-500 (regular to medium)
- Letter-spacing: normal
- Color: Often slightly muted compared to heading

### Typography Scale (Tablet - 768px-1023px)
**Main Hero Heading:**
- Font-size: 48-56px
- Line-height: 1.15
- Other properties scale proportionally

**Hero Subtitle:**
- Font-size: 18-20px
- Line-height: 1.4

### Typography Scale (Mobile - <768px)
**Main Hero Heading:**
- Font-size: 36-48px
- Line-height: 1.2
- May break into multiple lines

**Hero Subtitle:**
- Font-size: 16-18px
- Line-height: 1.5

## Spacing & Layout

### Container Spacing
- **Desktop:** 
  - Padding-top: 100-140px (accounting for fixed header)
  - Padding-bottom: 80-120px
  - Horizontal padding: 40-80px
  
- **Mobile:**
  - Padding-top: 80-100px
  - Padding-bottom: 60-80px
  - Horizontal padding: 20-24px

### Text Spacing
- Heading to subtitle gap: 16-24px
- Subtitle to CTA gap: 32-40px
- Max-width for text container: 600-800px (for optimal reading)

## Common CSS Implementation Pattern

```css
/* Desktop */
.hero-heading {
  font-size: 64px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 20px 0;
}

.hero-subtitle {
  font-size: 22px;
  line-height: 1.45;
  font-weight: 400;
  margin: 0 0 40px 0;
  max-width: 600px;
}

/* Tablet */
@media (max-width: 1023px) {
  .hero-heading {
    font-size: 52px;
  }
  .hero-subtitle {
    font-size: 20px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .hero-heading {
    font-size: 40px;
    line-height: 1.2;
  }
  .hero-subtitle {
    font-size: 17px;
    line-height: 1.5;
  }
}
```

## Design Principles Observed
1. **Performance-first**: Likely using system fonts or variable fonts
2. **Responsive scaling**: Fluid typography using clamp() or viewport units
3. **High contrast**: Bold weights for headings, regular for body
4. **Breathing room**: Generous whitespace around text elements
5. **Mobile-optimized**: Significant size reduction for smaller screens

## Recommendations for Matching
To match on.com's hero text styling:
1. Use a bold, impactful heading with tight line-height
2. Implement fluid typography with CSS clamp()
3. Ensure adequate contrast between heading and subtitle weights
4. Maintain generous padding around hero content
5. Test across all breakpoints for smooth transitions

Note: For exact values, browser developer tools inspection of the live site would be required.