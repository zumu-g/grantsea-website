# ON.com Spacing Specifications

## Key Spacing Patterns

### desktop-1440
- Viewport: 1440px
- Container max-width: none
- Container actual width: 1425px
- Left spacing: 0px
- Right spacing: 15px
- Even spacing: false
- Container padding: 0px / 0px
- Container margin: 0px / 0px

### tablet-1024
- Viewport: 1024px
- Container max-width: none
- Container actual width: 1009px
- Left spacing: 0px
- Right spacing: 15px
- Even spacing: false
- Container padding: 0px / 0px
- Container margin: 0px / 0px

### mobile-768
- Viewport: 768px
- Container max-width: none
- Container actual width: 753px
- Left spacing: 0px
- Right spacing: 15px
- Even spacing: false
- Container padding: 0px / 0px
- Container margin: 0px / 0px

## CSS Implementation Recommendations

```css
/* Padding-based spacing approach */
.main-container {
  width: 100%;
  padding-left: 0px;
  padding-right: 15px;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .main-container {
  }
}

@media (max-width: 768px) {
  .main-container {
  }
}

```
