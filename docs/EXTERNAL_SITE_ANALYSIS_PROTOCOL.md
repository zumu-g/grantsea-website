# External Site Analysis Protocol

## IMPORTANT: Always Use Playwright MCP for External Website Analysis

When analyzing external websites (like on.com) for design patterns, layout, or styling information, **ALWAYS use Playwright MCP** instead of WebFetch or other tools.

## Why Playwright MCP?

1. **Accurate Visual Analysis**
   - Gets computed styles after all CSS is applied
   - Measures exact pixel positions and dimensions
   - Sees the page as users see it

2. **Dynamic Content**
   - Captures JavaScript-rendered content
   - Handles lazy-loaded elements
   - Can interact with hover states and animations

3. **Responsive Testing**
   - Can resize viewport to test mobile/tablet/desktop
   - Captures breakpoint-specific styles
   - Measures actual rendered dimensions

## Standard Protocol

### For any request involving external site analysis:

1. **Identify the need**: User asks to match styling from on.com or any external site
2. **Use Task Agent with Playwright MCP**: Create a task specifically for visual analysis
3. **Request specific measurements**:
   ```
   Task: Analyze [website] hero section using Playwright MCP
   - Get exact text positioning (top/bottom/left/right values)
   - Measure padding and margins
   - Check font sizes and line heights
   - Note flex/grid properties
   - Test responsive behavior at mobile/tablet/desktop
   - Capture any hover/interaction states
   ```

### Example Task Prompt:

```
Use Playwright MCP to analyze on.com's hero section:
1. Navigate to https://www.on.com/en-au/
2. Find the hero section element
3. Get computed styles for:
   - Text positioning (use getBoundingClientRect())
   - Padding values (getComputedStyle)
   - Font sizes for heading and subtext
   - Flex/grid container properties
   - Background image handling
4. Check at viewport widths: 375px (mobile), 768px (tablet), 1440px (desktop)
5. Return exact CSS values, not descriptions
```

## What NOT to Use

### ❌ WebFetch
- Only returns HTML text
- Can't see computed styles
- Misses dynamic content
- No visual positioning info

### ❌ Manual assumptions
- Never assume "standard" patterns
- Always verify actual implementation
- Don't guess based on common practices

## Implementation Checklist

When implementing based on external site analysis:

- [ ] Used Playwright MCP to get exact measurements
- [ ] Verified positioning at all breakpoints
- [ ] Captured all relevant CSS properties
- [ ] Tested hover/interaction states
- [ ] Double-checked against live site

## Common Properties to Capture

Always get these specific values:
- `position`, `top`, `bottom`, `left`, `right`
- `padding`, `margin` (all sides)
- `display`, `flex-direction`, `align-items`, `justify-content`
- `font-size`, `line-height`, `font-weight`, `letter-spacing`
- `max-width`, `width`, `height`
- `text-align`, `color`, `background`
- Media query breakpoints

## Error Prevention

This protocol prevents:
- Incorrect positioning (like centered vs bottom-left text)
- Wrong spacing/padding values  
- Missing responsive behaviors
- Inaccurate font sizes
- Layout misalignments

---

**Remember**: For ANY external site analysis, ALWAYS use Playwright MCP through the Task agent. This is the only reliable way to get accurate visual design information.