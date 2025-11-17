# ON.COM Matching Agent - Design Verification Checklist

## Purpose
This agent ensures all design changes match on.com's exact design patterns before implementation.

## ON.COM Design System

### 1. Typography
- **Logo**: Bold, uppercase, sans-serif (typically 24-32px)
- **Navigation**: 14px, medium weight (500), sentence case
- **Hero Headlines**: 72-96px, bold (700-900), tight line height (0.9-1.1)
- **Body Text**: 16px, regular (400), 1.5-1.7 line height
- **Buttons**: 14px, semibold (600), uppercase, letter-spacing 0.5px

### 2. Colors
- **Primary Black**: #000000
- **Primary White**: #FFFFFF
- **Gray Text**: #666666
- **Light Gray**: #E5E5E5 (borders)
- **Background Gray**: #F5F5F5

### 3. Spacing
- **Page Margins**: 40px (desktop), 20px (mobile)
- **Max Width**: 1400px for content
- **Grid Gaps**: 8px (images), 16px (cards), 24-48px (sections)
- **Section Padding**: 80px vertical, 40px horizontal

### 4. Layout Patterns
- **Header**: Fixed, 64px height, white background, subtle border
- **Hero**: Full viewport height, text left-aligned, bottom positioned
- **Grid**: 2-4 columns, minimal gaps, square aspect ratios
- **Cards**: No shadows initially, subtle shadow on hover

### 5. Components

#### Navigation
```
- Fixed header
- Logo left
- Nav center/left of center
- Icons right (search, heart, menu)
- No dropdown on scroll
```

#### Buttons
```
Primary: Black background, white text, no radius
Secondary: White background, black border, no radius
Hover: Subtle transform or opacity change
Padding: 16px 48px (large), 12px 24px (medium)
```

#### Property Cards
```
- Image with aspect ratio 3:4 or 1:1
- No initial shadow
- Text below image
- Price prominent
- Bed/bath/car in single line
```

### 6. Interactions
- **Hover**: Subtle scale (1.02) or opacity (0.9)
- **Transitions**: 200-300ms ease
- **Loading**: Simple spinner, no elaborate animations

## Verification Process

Before implementing any change:

1. **Visual Match**
   - [ ] Does the spacing match on.com exactly?
   - [ ] Are the font sizes and weights correct?
   - [ ] Do the colors match precisely?
   - [ ] Is the layout structure identical?

2. **Component Structure**
   - [ ] Is it using the same HTML structure?
   - [ ] Are the CSS properties similar?
   - [ ] Does it respond the same way on hover/interaction?

3. **Responsive Behavior**
   - [ ] Does it stack/reflow the same way on mobile?
   - [ ] Are the breakpoints similar?
   - [ ] Do touch interactions work the same?

## Page-Specific Requirements

### Homepage
- Hero: Full height, left-aligned text at bottom
- Categories: Grid of 3-4 items, minimal gap
- No carousel indicators
- Clean, minimal design

### Property Listing
- Grid layout, 3-4 columns
- Consistent card height
- Load more button at bottom
- Filters in sidebar or top bar

### Property Detail
- Breadcrumb navigation
- Image gallery with grid layout
- Sticky agent contact form
- Clean section divisions

## Implementation Rules

1. **NO Anima components** - Build from scratch
2. **Use semantic HTML** - Proper heading hierarchy
3. **Inline styles first** - Convert to CSS modules later
4. **Mobile-first responsive** - Stack elements naturally
5. **Minimal dependencies** - No heavy UI libraries

## Rejection Criteria

The agent will REJECT changes if:
- Font sizes don't match on.com
- Spacing is inconsistent with on.com
- Colors are off (even slightly)
- Layout structure differs
- Animations are too elaborate
- Components have unnecessary complexity

## Approval Process

The agent will APPROVE changes when:
- Visual appearance matches on.com exactly
- Code is clean and maintainable
- Responsive behavior matches
- Performance is optimized
- Accessibility is maintained