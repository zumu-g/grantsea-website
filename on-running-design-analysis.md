# On Running Website Design Analysis for Real Estate Adaptation

## Overview
This analysis examines the On Running website (www.on.com/en-au) to identify design patterns and UI/UX strategies that can be adapted for a premium real estate website. The analysis covers key pages including Homepage, Product Listings, Product Details, and About pages.

## Key Design Principles Observed

### 1. Typography System
- **Font Family**: Custom "On" font with system font fallbacks
- **Responsive Sizing**: Uses `clamp()` for fluid typography
  - H1: 2.625rem - 5.375rem (42px - 86px)
  - H2: 2.0625rem - 4.25rem (33px - 68px)  
  - Body: 1rem - 1.25rem (16px - 20px)
- **Font Weights**: 400 (regular), 500 (medium), 700 (bold)
- **Line Heights**: Generous spacing (1.5x for body text)

### 2. Color Palette
- **Primary Colors**:
  - Black: #000000
  - White: #FFFFFF
  - Gray text: #797971 (subtle contrast)
- **Accent Colors**:
  - Focus states: #2F7EFE (bright blue)
- **Backgrounds**: Primarily white with strategic use of gradients
- **Dark/Light Mode**: CSS variables support theming

### 3. Grid & Layout System
- **12-column responsive grid**
- **Container Max Width**: 846px (content), full-width sections
- **Breakpoints**:
  - Mobile: 360px
  - Tablet: 768px
  - Desktop: 1024px
- **Spacing**: Fluid padding using `clamp(1rem, 4.2667vw, 2rem)`

### 4. Navigation Patterns
- **Header**: 
  - Height: 90px desktop
  - Position: Absolute on homepage, sticky on other pages
  - Transparent background transitioning to solid on scroll
  - Z-index: 1001 (stays above content)
- **Mobile**: Hamburger menu pattern
- **Dropdown menus** for categories

### 5. Button Design
- **Primary Button**:
  - Padding: 0px 24px
  - Border Radius: 40px (pill shape)
  - Background: Black on white / White on black
  - Font Size: 16px
  - Font Weight: 500
  - Height: ~48px
- **Hover States**: Subtle transitions (0.25s - 0.3s)
- **Focus States**: Blue outline (#2F7EFE)

### 6. Product Grid (Adaptable for Property Listings)
- **Responsive columns**: 
  - Mobile: 1-2 columns
  - Desktop: 3-4 columns
- **Card Design**:
  - Clean white background
  - Subtle shadows on hover
  - Image aspect ratio: 1:1 (square)
  - Padding: Consistent internal spacing
- **Quick Actions**: Hover reveals additional options

### 7. Product Detail Layout (Property Detail Adaptation)
- **Two-column layout**: Images left, details right
- **Image Gallery**: 
  - Swiper/carousel implementation
  - Thumbnail navigation
  - Fullscreen capability
- **Information Hierarchy**:
  - Large product name (H1)
  - Prominent price display
  - Clear CTAs
  - Accordion for additional details
- **Sticky elements**: Add to cart button on scroll

### 8. Hero Sections
- **Full viewport height**: 100vh
- **Content positioning**: Centered or bottom-aligned
- **Typography**: Large, bold headlines
- **CTA placement**: Clear primary action
- **Background**: High-quality imagery or video

### 9. Animation & Interactions
- **Transitions**: 0.25s - 0.3s ease
- **Hover effects**: Scale, opacity changes
- **Scroll animations**: Fade-in on view
- **Loading states**: Skeleton screens
- **Micro-interactions**: Button feedback

### 10. Component Patterns

#### Cards
```css
.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}
```

#### Form Inputs
```css
.input {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 16px;
  height: 48px;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: #2F7EFE;
  outline: none;
}
```

## Real Estate Website Adaptations

### 1. Homepage
- **Hero**: Full-screen property showcase with search overlay
- **Featured Properties**: Grid similar to product cards
- **Categories**: Neighborhoods/property types like product categories
- **Trust indicators**: Awards, testimonials, stats

### 2. Property Listings
- **Filter sidebar**: Collapsible on mobile
- **Property cards**: 
  - Primary image with aspect ratio 4:3 or 16:9
  - Price prominently displayed
  - Key details (beds, baths, size)
  - Favorite/save functionality
- **Map toggle**: Switch between grid and map view
- **Sort options**: Price, date, size, etc.

### 3. Property Details
- **Gallery**: Large image carousel with floorplans
- **Information sections**:
  - Price and key features
  - Description
  - Amenities (grid layout)
  - Location/map
  - Contact form (sticky on desktop)
- **Related properties**: Similar listings below

### 4. About/Team Page
- **Story section**: Company history and values
- **Team grid**: Agent profiles with contact info
- **Testimonials**: Client reviews
- **Awards/certifications**: Trust building

### 5. Mobile Considerations
- **Touch-friendly**: Minimum 48px tap targets
- **Swipeable galleries**: Native gesture support
- **Bottom navigation**: Key actions accessible
- **Progressive disclosure**: Expandable sections

## Implementation Recommendations

1. **Design System**: Create component library with these patterns
2. **Performance**: Optimize images, lazy load content
3. **Accessibility**: WCAG compliance, keyboard navigation
4. **SEO**: Structured data for properties
5. **Responsive Images**: Multiple sizes for different devices
6. **Animation**: Use sparingly for enhanced UX
7. **Forms**: Multi-step for complex processes
8. **Search**: Prominent placement with autocomplete
9. **Social Proof**: Reviews, testimonials throughout
10. **CTAs**: Clear, consistent action buttons

## Technical Implementation Notes

- Use CSS Grid and Flexbox for layouts
- Implement CSS custom properties for theming
- Use `clamp()` for fluid typography and spacing
- Implement intersection observer for scroll animations
- Consider Next.js for optimal performance
- Use Tailwind CSS utilities matching these patterns
- Implement proper image optimization (WebP, lazy loading)

## Conclusion

The On Running website demonstrates a clean, modern design system that prioritizes user experience through thoughtful typography, spacing, and interactions. These patterns can be effectively adapted for a premium real estate website while maintaining the elegance and functionality that makes the On site successful.