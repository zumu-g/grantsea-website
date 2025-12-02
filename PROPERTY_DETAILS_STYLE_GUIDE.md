# Property Details Page Style Guide

## 🚨 DESIGN PROTECTION PROTOCOL 🚨

**PROTECTED DESIGN ELEMENTS** - This style guide defines the complete visual and structural design of the property details page. 

**⚠️ IMPORTANT: ALL CHANGES TO PROPERTY DETAILS PAGE STYLING REQUIRE EXPLICIT APPROVAL FROM STUART GRANT**

---

## Page Structure & Layout

### 1. **Hero Section**
- **Background**: Property image overlay with dark gradient
- **Text Position**: Bottom-left overlay on hero image
- **Typography**: 
  - Main heading: 4rem desktop, 1.25rem subtitle
  - Font: Helvetica Neue, Arial, sans-serif
  - Color: White (#ffffff) with text shadow for readability
- **Height**: Full viewport height with responsive scaling

### 2. **Property Statistics Section**
- **Layout**: Horizontal flex grid with equal-width columns
- **Background**: Clean white with subtle shadows
- **Spacing**: 48px margin bottom
- **Statistics Display**:
  - Font Size: 36px for numbers
  - Font Weight: 700 (bold)
  - Color: Black (#000000)
  - Label Style: 11px uppercase, #525252, letter-spacing 0.1em

### 3. **Two-Column Inspection & Auction Layout** 🆕
- **Container**: CSS Grid with responsive columns
  - Desktop: `grid-template-columns: 1fr 1fr`
  - Mobile: `grid-template-columns: 1fr` (stacked)
- **Gap**: 48px desktop, 24px mobile
- **Background**: Transparent with 48px bottom margin

#### Left Column - Open for Inspection
- **Header**: "Open for inspection"
  - Font Size: 16px
  - Font Weight: 600
  - Color: Gold (#D4A853)
  - Typography: Helvetica Neue
- **Content**: 
  - Inspection times in Australian format
  - Color: #D4A853
  - Font Weight: 400

#### Right Column - Auction Details 🆕
- **Header**: "Auction" with gavel icon
  - SVG Gavel Icon: 16px × 16px, gold color
  - Same styling as inspection header
- **Content**:
  - Auction date/time in Australian format
  - Venue with location pin (📍)
  - Terms in italic, 14px font size
  - All text in gold color (#D4A853)

### 4. **Interactive Features Section**
- **Layout**: Flex layout with 16px gaps
- **Buttons**: 
  - Background: Black (#000000)
  - Text: White
  - Padding: 16px × 32px
  - Border Radius: 8px
  - Hover Effects: Transform and shadow changes

### 5. **Description Section**
- **Typography**: 18px line height 1.6
- **Color**: #333333
- **Spacing**: 32px margins
- **Font Family**: Helvetica Neue

### 6. **Key Features Section**
- **Layout**: Grid layout with feature bullets
- **Typography**: 16px with checkmark icons
- **Color Scheme**: Dark text with accent highlights

### 7. **Schools Section**
- **Layout**: Card-based grid
- **Styling**: Clean white cards with shadows
- **Content**: School names, ratings, distances

### 8. **Agent Information**
- **Layout**: Professional card layout
- **Image**: Circular agent photo
- **Contact**: Phone and email prominently displayed
- **Background**: White with subtle borders

## Color Palette

### Primary Colors
- **Gold Accent**: #D4A853 (rgb(153, 92, 0))
  - Used for: Inspection times, auction details, key highlights
- **Black Primary**: #000000
  - Used for: Headings, statistics, CTA buttons
- **White**: #ffffff
  - Used for: Backgrounds, hero text, button text

### Secondary Colors
- **Text Gray**: #333333 (body text)
- **Light Gray**: #525252 (labels and meta text)
- **Border Gray**: #e5e5e5 (borders and dividers)

## Typography System

### Font Hierarchy
1. **Primary Font**: "Helvetica Neue", Arial, sans-serif
2. **Hero Heading**: 4rem desktop, responsive scaling
3. **Section Headers**: 16px, weight 600
4. **Statistics**: 36px, weight 700
5. **Body Text**: 16-18px, weight 400
6. **Meta Labels**: 11px, uppercase, letter-spacing 0.1em

### Text Treatments
- **Gold Text**: All inspection and auction information
- **Bold Statistics**: Large numerical displays
- **Uppercase Labels**: Property feature labels
- **Italic Terms**: Auction terms and conditions

## Responsive Behavior

### Breakpoints
- **Mobile**: ≤ 768px
  - Two-column layout becomes single column
  - Grid gaps reduce to 24px
  - Hero text scales down proportionally
- **Desktop**: > 768px
  - Full two-column layout maintained
  - 48px gaps and spacing
  - Full-size typography

### Mobile Adaptations
- **Stack Inspection/Auction**: Vertically stacked on mobile
- **Touch Targets**: Minimum 44px for interactive elements
- **Readable Text**: Maintained readability at all screen sizes

## Icon System

### SVG Icons Used
1. **Gavel Icon** (Auction):
   ```svg
   <path d="M6 2l3 6 5-4-3 6.5c.33 2 1.5 3.14 2.5 3.5l-2.5 4.5c-.86 1.53-3 1-3-1l-2 .5c-1 .25-1.5-.75-1-1.5L6 10 4 8z"/>
   ```
2. **Clock Icon** (Inspection times)
3. **Location Pin**: 📍 (Unicode emoji)
4. **Feature Checkmarks**: For key features list

## Interactive Elements

### Button Styles
- **Primary CTA**: Black background, white text, 16px padding
- **Hover States**: Transform translateY(-2px) + shadow
- **Active States**: Appropriate focus indicators
- **Border Radius**: 8px standard

### Animation & Transitions
- **Hover Effects**: 0.3s ease transitions
- **Transform Effects**: Subtle translateY movements
- **Shadow Transitions**: Smooth shadow intensity changes

## Data Integration

### API Field Mapping
- **Auction Detection**: 
  - `property.saleMethod === 'auction'`
  - `property.methodOfSale.name.includes('auction')`
- **Auction Date**: 
  - `property.auctionDate`
  - `property.auctionDetails.dateTime`
- **Venue**: 
  - `property.auctionVenue`
  - `property.auctionDetails.venue`

### Content Requirements
- **Australian Date/Time Format**: Localized for Australia/Melbourne timezone
- **Real Data Only**: No mock data permitted
- **Graceful Fallbacks**: "Details TBA" when data unavailable

## Design Consistency Rules

### Spacing System
- **Section Margins**: 48px between major sections
- **Grid Gaps**: 48px desktop, 24px mobile
- **Internal Padding**: 16px standard, 32px for major containers
- **Text Margins**: 12px between related elements

### Visual Hierarchy
1. **Hero image and overlay text** (highest priority)
2. **Property statistics** (numerical prominence)
3. **Inspection/Auction information** (equal priority, side-by-side)
4. **Interactive features** (prominent CTAs)
5. **Description and details** (content priority)
6. **Supporting information** (schools, agent, etc.)

## Protected Elements - Change Restrictions

### 🔒 LOCKED ELEMENTS (Require Approval)
1. **Two-column inspection/auction layout**
2. **Gold color scheme (#D4A853)**
3. **Gavel icon design and placement**
4. **Typography hierarchy and font choices**
5. **Grid system and responsive breakpoints**
6. **Hero section overlay positioning**
7. **Property statistics display format**

### ⚠️ MODIFICATION PROTOCOL
- **Any changes** to protected elements require explicit approval
- **Color changes** must maintain accessibility standards
- **Layout modifications** must preserve mobile responsiveness
- **Typography changes** must maintain readability hierarchy
- **New features** must follow established design patterns

## Implementation Notes

### CSS Framework
- **Inline Styles**: Currently using React inline styles
- **Responsive**: CSS Grid and Flexbox for layouts
- **Performance**: Optimized for fast loading and rendering

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

### Accessibility
- **Color Contrast**: WCAG AA compliant
- **Focus Indicators**: Visible and accessible
- **Screen Readers**: Proper semantic markup
- **Touch Targets**: 44px minimum size

---

## Approval Process

**To modify any protected design elements:**

1. **Document Change Request**: Detailed description of proposed changes
2. **Visual Mockups**: Show before/after comparisons
3. **Impact Assessment**: Mobile responsiveness and accessibility impact
4. **Approval Required**: Explicit written approval from Stuart Grant
5. **Implementation**: Only proceed after documented approval

**Contact for Approvals**: Stuart Grant (Property Owner)

---

*Last Updated: December 2, 2025*
*Version: 1.0*
*Status: Active Design Protection*