# Firecrawl Property Details Page Commit

## Summary

Found the commit that added the "You also might like" and "Also on market" sections with Firecrawl integration for searching properties on the same street.

## Commit Details

**Commit Hash:** `2b8a884561781b6cd515c1159bad54265a4d8840`

**Commit Message:**
```
Fix lease properties not showing open inspections and add market search for other agencies

- Fixed open homes API to properly fetch both sale and lease properties
- Added market search API endpoint to show properties from other agencies
- Updated property details page to show other agencies' listings for lease properties
- Added agency name and external URL support for market properties
- Disabled save button for external agency properties
- Fixed 'Also on the market' section to show competitive listings
```

**Author:** Claude <noreply@anthropic.com>  
**Date:** Wed Nov 19 07:41:52 2025 +1100

**Follow-up Commit:** `02ed3911` - "Fix 'You might also like' text wrapping and improve market search" (Wed Nov 19 07:47:35 2025 +1100)

## Files Changed

1. **`src/app/api/properties/market-search/route.ts`** (NEW FILE - 155 lines)
   - Market search API endpoint
   - Contains commented-out Firecrawl integration code with full implementation example
   - Searches for properties on the same street by extracting street name from address

2. **`src/app/property/[id]/page.tsx`** (MODIFIED)
   - Added logic to extract street name from property address
   - For lease properties: fetches from market search API to show other agencies' listings
   - For sale properties: uses internal properties
   - Displays "Also on the market for Lease" for lease properties
   - Displays "You might also like" for sale properties

3. **`src/app/api/open-homes/route.ts`** (MODIFIED)
   - Fixed to properly fetch both sale and lease properties

## Key Features

### 1. Property Details Page Sections

The property details page displays:
- **"You might also like"** - For sale properties, shows similar properties from Grant's listings
- **"Also on the market for Lease"** - For lease properties, shows competitive listings from other agencies (using market search)

### 2. Street-Based Property Search

The implementation:
- Extracts street name from property address using regex: `/^(\d+\s+)?(.+?),/`
- Searches for properties on the same street using the market search API
- Filters by listing type (sale/lease)

### 3. Firecrawl Integration Code

The commit includes a complete Firecrawl integration example (commented out) in the market search route:

```typescript
async function searchWithFirecrawl(street: string, suburb: string, listingType: string) {
  const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
  
  // Construct search URL for realestate.com.au
  const searchUrl = `https://www.realestate.com.au/${listingType}-in-${suburb.toLowerCase().replace(/\s+/g, '-')}-vic`;
  
  const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: searchUrl,
      pageOptions: {
        includeHtml: false,
        onlyMainContent: true
      },
      extractorOptions: {
        mode: 'llm-extraction',
        extractionPrompt: `Extract property listings that match the street "${street}" in ${suburb}. For each property, extract: address, price, bedrooms, bathrooms, carSpaces, propertyType, agency name, agent name, main image URL`,
        extractionSchema: {
          type: 'object',
          properties: {
            properties: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  address: { type: 'string' },
                  price: { type: 'string' },
                  bedrooms: { type: 'number' },
                  bathrooms: { type: 'number' },
                  carSpaces: { type: 'number' },
                  propertyType: { type: 'string' },
                  agency: { type: 'string' },
                  agentName: { type: 'string' },
                  imageUrl: { type: 'string' }
                }
              }
            }
          }
        }
      }
    })
  });

  const data = await response.json();
  return data.data?.properties || [];
}
```

## Current Status

The market search route file (`src/app/api/properties/market-search/route.ts`) does not exist in the current workspace, suggesting it may have been removed or refactored in later commits. However, the property details page still contains the sections with conditional logic for displaying "You might also like" and "Also on the market for Lease".

## Key Code Sections

### Street Name Extraction Logic

From `src/app/property/[id]/page.tsx`:
```typescript
// Extract street name from address
const streetMatch = data.data.address.match(/^(\d+\s+)?(.+?),/);
const streetName = streetMatch ? streetMatch[2] : '';

if (streetName) {
  parallelFetches.push(
    fetch(`/api/properties/market-search?street=${encodeURIComponent(streetName)}&suburb=${encodeURIComponent(data.data.suburb)}&type=lease&excludeId=${data.data.id}`)
      .then(res => res.json())
      .then(marketData => {
        if (marketData.success && marketData.properties) {
          setSimilarProperties(marketData.properties);
        }
      })
      .catch(err => {
        console.error('[PropertyPage] Failed to load market properties:', err);
        // Fallback to internal properties
      })
  );
}
```

### Section Heading Display

From `src/app/property/[id]/page.tsx`:
```typescript
{property.listingType === 'lease' ? 'Also on the market for Lease' : 'You might also like'}
```

### Market Search API Endpoint

The complete market search route file is available in the commit. It includes:
- Mock data for demonstration
- Full Firecrawl integration example (commented out)
- Street and suburb-based property search
- Support for both sale and lease listing types

## Viewing the Commit

To view the full commit:
```bash
git show 2b8a8845
```

To view just the market search route file from that commit:
```bash
git show 2b8a8845:src/app/api/properties/market-search/route.ts
```

To view the property details page from that commit:
```bash
git show 2b8a8845:src/app/property/[id]/page.tsx
```

To checkout this commit (read-only):
```bash
git show 2b8a8845 --stat
```

## Repository

GitHub: https://github.com/zumu-g/grantsea-website.git

## Next Steps

If you want to restore this functionality:
1. Restore the market search route file from commit `2b8a8845`
2. Uncomment and implement the Firecrawl integration code
3. Add `FIRECRAWL_API_KEY` to environment variables
4. Test the street-based property search functionality

