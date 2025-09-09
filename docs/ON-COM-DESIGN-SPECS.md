# ON.COM Design Specifications

This document contains the exact design specifications from on.com that must be followed.

## Header

### Initial State (Top of Page)
- **Background**: Transparent
- **Height**: 64px
- **Position**: Fixed
- **Text Color**: White
- **Icons**: Hidden (no heart icon, no sign in)

### Scrolled State
- **Background**: White (#fff)
- **Border**: 1px solid #e5e5e5
- **Text Color**: Black (#000)
- **Icons**: Visible (heart icon + "Sign in" link)
- **Transition**: 0.3s ease

### Typography
- **Logo**: 24px, font-weight 800
- **Navigation**: 14px, font-weight 500
- **Icon Size**: 20px

## Hero Section

### Layout
- **Height**: 100vh (full viewport)
- **Background**: Full-bleed image with gradient overlay
- **Text Position**: Left-aligned, vertically centered

### Typography
- **Heading**: 64px, font-weight 800, line-height 1.1
- **Subheading**: 20px, font-weight 400, line-height 1.5
- **Color**: White (#fff)

### Buttons
- **Style**: Rounded pill buttons (border-radius: 32px)
- **Padding**: 16px 32px
- **Primary**: White background, black text
- **Secondary**: Transparent with white border

## Shop by Category

### Grid Layout
- **Columns**: 3 (desktop)
- **Gap**: 32px
- **Container**: Max-width 1400px

### Category Cards
- **Aspect Ratio**: 2:3 portrait (148.15% padding-bottom)
- **Exact dimensions**: 571px × 847px per image
- **Border Radius**: 4px
- **Image**: object-fit: cover, no filter/overlay
- **Gradient**: Only on bottom portion for text readability

### Typography
- **Section Heading**: 48px, font-weight 700, letter-spacing -0.48px
- **Not uppercase**: Normal case ("Shop by category")
- **Text align**: Left-aligned, not centered
- **Line height**: 1.1
- **Bottom margin**: 32px
- **Category Title**: 28px, font-weight 700
- **Category Subtitle**: 14px, regular weight

### Category Items
- **Count**: Exactly 3 items (Buy, Rent, Sell)
- **No "Sold" category** in the shop by category section

## Property Cards

### Layout
- **Grid**: auto-fill, minmax(300px, 1fr)
- **Gap**: 24px
- **Background**: White
- **Border Radius**: 4px
- **Shadow**: 0 1px 3px rgba(0,0,0,0.1)

### Typography
- **Price**: 20px, font-weight 600
- **Address**: 14px, color #666
- **Features**: 14px, color #666

## Color Palette

```css
--primary: #000
--primary-inverse: #fff
--background: #fff
--background-alt: #f8f8f8
--border: #e5e5e5
--text-secondary: #666
--overlay: rgba(0,0,0,0.6)
```

## Container Widths
- **Maximum**: 1400px
- **Padding**: 20px (mobile), 40px (desktop)

## Common Patterns

### Hover Effects
- **Links**: opacity 0.7
- **Cards**: translateY(-2px) and increased shadow
- **Images**: scale(1.05)

### Transitions
- **Duration**: 0.2s - 0.3s
- **Easing**: ease or cubic-bezier(0.4, 0, 0.2, 1)

## Validation Checklist

- [ ] Header transparent at top, white on scroll
- [ ] Icons only visible when scrolled
- [ ] Shop categories are 3:4 portrait ratio
- [ ] Typography matches specified sizes
- [ ] Proper hover states implemented
- [ ] Container max-width is 1400px
- [ ] Color palette matches exactly