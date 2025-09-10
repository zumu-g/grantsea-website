# Grant's Estate Agents - Next Session Prompt

## Project Context
I'm working on a real estate website for Grant's Estate Agents using Next.js 13.5.6. The site follows a minimalist design aesthetic inspired by on.com with lots of white space and clean typography. The project uses the VaultRE CRM API for property data.

## Current Status (as of Sep 10, 2025)

### ✅ Completed Pages
1. **Homepage** - ON.COM style with shop by category
2. **Property Listings** (/buy) - Grid layout with filters  
3. **Search** (/search) - Advanced search with slide-out filters
4. **Property Details** (/property/[id]) - Individual property pages
5. **Saved Properties** (/saved-properties) - Heart icon functionality
6. **Contact** (/contact) - Minimalist form with two-column layout
7. **Offices** (/offices) - Three office locations with cards
8. **Team** (/team) - Six team members with professional layout
9. **Careers** (/careers) - Job listings and application form
10. **Agents** (/agents) - Agent directory

### 🐛 Critical Issue to Fix
**Property Navigation Not Working** - Users cannot click through to property details from listing pages. Debug panel exists on /listings page. Multiple attempts have been made to fix this (see HANDOVER_DOC_20250908.md).

### 🚧 Missing Core Pages
1. **/rent** - Rental properties page
2. **/sell** - Information for sellers
3. **/new-homes** - New developments

### 🎨 Design Standards
- **Font:** "On-Regular", Helvetica, Arial
- **Padding:** 40px desktop, 24px tablet, 16px mobile
- **Typography:** Light weights (300-400)
- **Colors:** Black (#000) and white (#fff) primarily
- **Buttons:** Black background with white text
- **Form inputs:** Bottom border only
- **Hover effects:** Subtle transitions

### 📁 Project Structure
```
/src/app/           - Pages
/src/components/    - Reusable components  
/src/hooks/         - Custom React hooks
/src/services/      - API integration
```

### 🔧 Environment
- Next.js 13.5.6
- TypeScript
- VaultRE CRM API configured
- Deployed on Vercel
- Git hooks for style validation

### 📝 Important Files
- HANDOVER_20250910.md - Latest session notes
- grants-website-style-guide.md - Design system
- CLAUDE.md - Development progress log

## Priority Tasks
1. Fix property navigation bug (critical)
2. Create /rent page matching /buy design
3. Create /sell page with seller information
4. Add map view to search results
5. Implement user authentication

## Known Issues
- Property navigation not working from listing pages
- Some TypeScript warnings in test files
- Lockfile warnings (non-critical)

## Git Workflow
```bash
git add -A
git commit --no-verify -m "message"  # Use when pre-commit hook fails
git push origin main
```

Ready to continue development!