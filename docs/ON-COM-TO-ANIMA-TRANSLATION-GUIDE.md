# ON.COM to Anima Translation Guide

## The Core Problem

When Playwright MCP analyzes on.com, it extracts modern, flexible CSS that doesn't work with Anima's rigid structure. Here's how to properly translate on.com styles to work with your Anima components.

## Key Differences

### ON.COM Structure
```html
<!-- Clean, semantic HTML -->
<header>
  <nav>
    <a href="/">Logo</a>
    <a href="/shop">Shop</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <section class="hero">
    <h1>Hero Title</h1>
    <p>Subtitle</p>
    <a href="/shop" class="button">Shop Now</a>
  </section>
</main>
```

### Anima Structure
```html
<!-- Deeply nested, absolute positioned -->
<div class="element-light">
  <div class="overlap-group">
    <div class="container-4">
      <header style="position: absolute; top: 0;">
        <div class="container-5">
          <div class="nav-navigation">
            <!-- Complex nested structure -->
          </div>
        </div>
      </header>
    </div>
    <div class="section-main">
      <div class="section-article">
        <div class="container-9" style="position: absolute; top: 930px;">
          <!-- Hero content pushed down -->
        </div>
      </div>
    </div>
  </div>
</div>
```

## Translation Rules

### 1. Header Translation

**ON.COM Style:**
```css
header {
  position: sticky;
  top: 0;
  height: 64px;
  background: transparent;
  backdrop-filter: blur(10px);
}
```

**Anima Translation:**
```css
/* DON'T change position or height on Anima header */
.element-light header {
  /* Only safe visual changes */
  background-color: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.3s ease;
}

/* Use the existing absolute positioning */
.element-light .header.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
}
```

### 2. Typography Translation

**ON.COM Style:**
```css
nav a {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
```

**Anima Translation:**
```css
/* Target the specific Anima nav elements */
.element-light .nav-link,
.element-light nav a {
  /* Safe typography changes */
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  /* Keep existing color logic */
  color: inherit;
}
```

### 3. Hero Section Translation

**ON.COM Style:**
```css
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero h1 {
  font-size: 72px;
  font-weight: 900;
}
```

**Anima Translation:**
```css
/* DON'T change container-9 position! */
/* Instead, make the parent full height */
.element-light .section-article {
  min-height: 100vh !important;
  /* Keep the background image */
}

/* Style the text without moving it */
.element-light .text-wrapper-2 {
  font-size: 72px !important;
  font-weight: 900 !important;
  /* Text stays where Anima put it */
}
```

### 4. Category Grid Translation

**ON.COM Style:**
```css
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.category-item {
  aspect-ratio: 3/4;
  border-radius: 4px;
}
```

**Anima Translation:**
```css
/* Work with Anima's container-11 */
.element-light .container-11 {
  /* Override Anima's layout carefully */
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 4px !important;
  /* Remove Anima's absolute children positioning */
  position: relative !important;
}

/* Fix the component sizing */
.element-light .container-11 > * {
  position: relative !important;
  width: 100% !important;
  aspect-ratio: 3/4 !important;
  border-radius: 4px !important;
}
```

## Safe Implementation Strategy

### Step 1: Visual Analysis Only
When using Playwright MCP, extract:
- Color values
- Font sizes and weights
- Spacing ratios (not absolute values)
- Visual effects (shadows, borders)
- Animation timings

### Step 2: Create Override Styles
Create a new CSS file for on.com overrides:
```css
/* on-com-overrides.css */
:root {
  /* Define on.com values as variables */
  --on-com-nav-size: 14px;
  --on-com-nav-weight: 700;
  --on-com-hero-size: 72px;
  --on-com-gap: 4px;
}
```

### Step 3: Apply Carefully
Only apply styles that:
1. Don't change positioning
2. Don't modify layout structure
3. Use Anima's existing containers
4. Enhance rather than replace

### Step 4: Test Incrementally
1. Apply one section at a time
2. Check for layout breaks
3. Test responsive behavior
4. Verify API data still displays

## Common Pitfalls to Avoid

### ❌ DON'T: Direct Position Changes
```css
/* This breaks everything */
.element-light .container-9 {
  position: relative !important;
  top: 0 !important; /* BREAKS LAYOUT */
}
```

### ✅ DO: Work Within Constraints
```css
/* Safe enhancement */
.element-light .container-9 {
  /* Keep position absolute */
  /* Only change visual properties */
  background: rgba(0,0,0,0.5);
}
```

### ❌ DON'T: Change Container Heights
```css
/* Breaks Anima calculations */
.element-light .section-article {
  height: 100vh !important; /* BREAKS */
}
```

### ✅ DO: Use Min-Height
```css
/* Safe approach */
.element-light .section-article {
  min-height: 100vh !important; /* SAFE */
}
```

## Playwright MCP Usage Guidelines

### Correct Approach
1. Use Playwright to understand on.com's design principles
2. Note the visual hierarchy and spacing relationships
3. Extract color palettes and typography scales
4. Observe interaction patterns

### Implementation Approach
1. Create new utility classes inspired by on.com
2. Apply utilities alongside Anima classes
3. Use CSS custom properties for theming
4. Build new components for major changes

### Example: Proper Navigation Update
```javascript
// Playwright extracts:
const onComNav = {
  fontSize: '14px',
  fontWeight: '700',
  letterSpacing: '0.5px',
  gap: '40px'
};

// You implement as:
```
```css
/* Safe navigation update */
.element-light .nav-link {
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  /* DON'T change positioning */
}

/* Use padding/margin for spacing, not gap */
.element-light .nav-navigation {
  /* DON'T use gap on flex - breaks Anima */
}
.element-light .nav-link {
  margin: 0 20px; /* Safe spacing */
}
```

## Testing Checklist

Before committing on.com-inspired changes:
- [ ] Hero text still visible over image?
- [ ] Navigation links properly spaced?
- [ ] Category grid maintains structure?
- [ ] No absolute positioning changed?
- [ ] All sections still in correct order?
- [ ] Mobile responsive still works?
- [ ] API data displays correctly?

## Conclusion

The key is to extract on.com's design language (colors, typography, spacing ratios) but implement it within Anima's constraints. Think of it as applying on.com's "skin" to Anima's "skeleton" without breaking the bones.