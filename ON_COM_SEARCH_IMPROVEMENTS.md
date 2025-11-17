# Search Page Improvements Based on On.com Design

## Key Changes Needed

### 1. **Filter Panel Redesign**
**Current**: Static sidebar at 320px width
**On.com Style**: Slide-out panel from left with overlay

```css
/* Recommended Changes */
- Width: 400px (more spacious)
- Slide animation from left: -400px to 0
- Dark overlay backdrop when open
- Close button in top-right
- Mobile: Full screen takeover
```

### 2. **Typography System**
**Current**: Basic system fonts
**On.com Style**: Custom font with fluid sizing

```css
/* Add to your styles */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
font-size: clamp(14px, 1.2vw, 16px); /* Responsive text */
```

### 3. **Color Scheme Update**
**Current**: Blue/gray theme
**On.com Style**: Black/white with accent gradients

```css
/* New color palette */
--primary: #000000;
--background: #FFFFFF;
--surface: #F8F8F8;
--border: #E5E5E5;
--accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### 4. **Product Card Improvements**
**Current**: Traditional real estate cards
**On.com Style**: Minimal, clean cards

Key changes:
- Remove border, use subtle shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Larger, square images (1:1 ratio) or 4:3 for properties
- Simplified information hierarchy
- Price as the dominant element
- Smaller, gray secondary text

### 5. **Grid Layout**
**Current**: 3 columns with large gaps
**On.com Style**: Tighter grid with minimal gaps

```css
/* Responsive grid */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 16px; /* Reduced from 24px */
```

### 6. **Interactive Elements**

#### Filter Buttons
```css
/* Current: Traditional buttons */
/* On.com style: Minimal with black selection */
background: transparent;
border: 1px solid #E5E5E5;
selected: background: #000, color: #FFF;
```

#### Hover Effects
```css
/* Subtle scale and shadow */
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(0,0,0,0.12);
```

### 7. **Header Integration**
- Reduce header height to 64px (from 72px)
- Integrate search directly into header
- Remove redundant navigation
- Add filter toggle button for mobile

### 8. **Mobile Optimization**
- Filter button: Fixed bottom-right FAB
- Swipe gestures for filter panel
- Larger touch targets (min 48px)
- 2 column grid on mobile (not 1)

## Implementation Priority

1. **Phase 1**: Update color scheme and typography
2. **Phase 2**: Implement slide-out filter panel
3. **Phase 3**: Redesign property cards
4. **Phase 4**: Optimize grid and spacing
5. **Phase 5**: Add animations and transitions

## Specific Code Changes Needed

### Filter Panel Animation
```javascript
// Add transition styles
const filterPanelStyle = {
  position: 'fixed',
  top: 0,
  left: showFilters ? 0 : '-400px',
  width: '400px',
  height: '100vh',
  backgroundColor: 'white',
  boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
  transition: 'left 0.3s ease-out',
  zIndex: 50,
  overflowY: 'auto'
};

// Overlay
const overlayStyle = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  opacity: showFilters ? 1 : 0,
  visibility: showFilters ? 'visible' : 'hidden',
  transition: 'opacity 0.3s ease-out',
  zIndex: 49
};
```

### Property Card Redesign
```javascript
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '4px',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  cursor: 'pointer'
};

const imageContainerStyle = {
  position: 'relative',
  paddingTop: '75%', // 4:3 ratio
  backgroundColor: '#f8f8f8'
};
```

### Filter Button Style
```javascript
const filterButtonStyle = {
  padding: '8px 16px',
  border: '1px solid #e5e5e5',
  borderRadius: '24px',
  backgroundColor: selected ? '#000' : 'transparent',
  color: selected ? '#fff' : '#000',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  cursor: 'pointer'
};
```

## Expected Outcome
A cleaner, more modern search interface that matches on.com's minimalist aesthetic while maintaining functionality for real estate browsing. The improvements will make the site feel more premium and easier to navigate on all devices.