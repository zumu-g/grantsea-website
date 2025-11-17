# Brand Styling Agent - Pre-Change Validation System

## Purpose
This agent acts as a gatekeeper to ensure all styling changes maintain the integrity of the Grant's Estate Agents brand and the Anima-based design system. It must be consulted BEFORE making any CSS or layout changes.

## Why Previous Changes Failed

### Root Causes of Formatting Issues:
1. **Anima Component Fragility**: The Anima-exported components use absolute positioning and fixed dimensions that break when modified
2. **CSS Specificity Conflicts**: New CSS overrides can unintentionally cascade to nested Anima components
3. **Missing Context**: Playwright MCP analyzes external sites but doesn't understand the existing component structure
4. **Incomplete Testing**: Changes tested in isolation don't account for the full component hierarchy

### Specific Issues That Occurred:
- Changed `container-9` from `top: 930px` to `top: 0` which broke the hero layout
- Added CSS that conflicted with Anima's absolute positioning system
- Modified container structures without understanding their dependencies
- Applied on.com styles directly without adapting them to Anima's structure

## Pre-Change Checklist

### 1. Component Analysis
Before any change, document:
- [ ] Which Anima components will be affected
- [ ] Current CSS classes and their purpose
- [ ] Absolute/relative positioning dependencies
- [ ] Parent-child component relationships
- [ ] Any inline styles that might be overridden

### 2. Style Inheritance Check
Verify:
- [ ] CSS specificity won't break child components
- [ ] No unintended cascade effects
- [ ] Media queries won't conflict
- [ ] Z-index stacking order maintained

### 3. Anima Preservation Rules
NEVER:
- Remove Anima classes
- Change position properties on Anima containers
- Modify the HTML structure of Anima components
- Override critical layout properties (top, left, position)

ALWAYS:
- Add new classes alongside Anima classes
- Use CSS custom properties for theming
- Test with full component hierarchy
- Create separate override files

### 4. Testing Protocol
Before committing:
- [ ] Visual regression test against current production
- [ ] Check all breakpoints (mobile, tablet, desktop)
- [ ] Verify no layout shifts
- [ ] Test all interactive states
- [ ] Confirm API data still displays correctly

## Safe Modification Patterns

### Pattern 1: Overlay Enhancements
```css
/* SAFE: Add enhancements without changing layout */
.element-light .existing-anima-class {
  /* Only add non-layout properties */
  transition: opacity 0.3s ease;
  cursor: pointer;
}

/* Add hover states */
.element-light .existing-anima-class:hover {
  opacity: 0.9;
}
```

### Pattern 2: Custom Property Overrides
```css
/* SAFE: Use CSS variables */
:root {
  --anima-heading-color: #000;
  --anima-heading-size: 53px;
}

/* Override via variables, not direct properties */
.element-light h1 {
  color: var(--anima-heading-color);
  font-size: var(--anima-heading-size);
}
```

### Pattern 3: New Utility Classes
```css
/* SAFE: Add utilities that don't conflict */
.grant-enhance-card {
  /* Enhancement only properties */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

/* Apply alongside Anima classes */
/* <div class="anima-card grant-enhance-card"> */
```

## Decision Framework

### Should You Make This Change?

1. **Is it a visual enhancement only?** ✅ Proceed with caution
2. **Does it modify layout/positioning?** ❌ Stop and reconsider
3. **Will it affect Anima components?** ⚠️ Document all impacts first
4. **Is there an existing Anima pattern?** ✅ Follow that pattern

### Alternative Approaches

Instead of modifying Anima components directly:
1. Create wrapper components with desired styling
2. Use CSS custom properties for theming
3. Add utility classes for enhancements
4. Build new components alongside Anima ones
5. Gradually replace Anima components if needed

## Emergency Rollback Plan

If changes break the layout:
1. `git revert HEAD --no-edit`
2. Clear browser cache
3. Restart development server
4. Document what went wrong
5. Update this guide with learnings

## Best Practices for External Inspiration

When using tools like Playwright MCP to analyze other sites:

### DO:
- Extract design principles (spacing ratios, color relationships)
- Note interaction patterns
- Understand typography scales
- Document user experience flows

### DON'T:
- Copy CSS directly without adaptation
- Apply absolute measurements without testing
- Assume external patterns work with Anima
- Make structural changes based on external sites

## Component-Specific Guidelines

### Hero Section
- Current: Uses `container-9` with `top: 930px`
- Structure: Gradient overlay + text container
- Danger: Changing position breaks entire layout
- Safe: Modify text styles, colors, transitions

### Navigation
- Current: Absolute positioned header
- Structure: Logo left, nav center, icons right
- Danger: Changing header height affects all sections
- Safe: Modify colors, hover states, fonts

### Category Grid
- Current: Anima Component4 instances
- Structure: Fixed grid with specific gaps
- Danger: Modifying grid structure
- Safe: Enhance hover effects, add overlays

## Validation Script

Before pushing any style changes, run:
```bash
# 1. Screenshot current state
npm run screenshot:current

# 2. Apply changes
# ... make your changes ...

# 3. Screenshot new state
npm run screenshot:new

# 4. Compare visually
npm run compare:screenshots

# 5. Run style validation
npm run validate:styles
```

## Conclusion

The key to successful styling updates is understanding that Anima components are fragile, interconnected systems. Any change must be approached with:
1. Full understanding of the existing structure
2. Minimal, targeted modifications
3. Comprehensive testing
4. Ready rollback plan

When in doubt, create new components rather than modifying Anima ones.