# Inspection Times / Open Home Times - Investigation Findings

**Date**: October 7, 2025
**Status**: ⚠️ **Blocked - API Access Issue**

## Summary

Inspection times (open home times) are **NOT included** in the standard property API responses from VaultRE. They require separate API endpoints that we currently **do not have access to**.

## Investigation Details

### 1. Property API Response Analysis

**Tested Endpoint**: `/properties/residential/sale/{id}`

**Result**: Property objects do NOT contain any inspection time fields.

**Checked Fields** (all returned empty):
- `inspection_times`
- `inspectionTimes`
- `inspections`
- `openHomes`
- `open_homes`
- `viewingTimes`
- `viewing_times`
- `appointments`
- `scheduledInspections`
- `scheduled_inspections`

### 2. VaultRE API Documentation

According to the VaultRE Swagger documentation (`https://docs.api.vaultre.com.au/swagger/vaultre.yaml`), inspection times are accessed via **separate user endpoints**:

#### Open Homes Endpoint
```
GET /user/upcomingOpenHomes
```

**Parameters**:
- `days` (integer): Number of days to look ahead/back (default: 7)
- `includeRecent` (boolean): Include recently completed open homes

**Returns**: `OpenHomeWithProperty` schema containing:
- Open home details (start time, end time, type)
- Associated property information

#### Tenancy Inspections Endpoint
```
GET /user/tenancyInspections
```

**Parameters**:
- `days` (integer): Number of days to look ahead/back (default: 7)
- `includeRecent` (boolean): Include recently completed inspections
- `start` (datetime): Filter inspections starting on/after this date
- `end` (datetime): Filter inspections starting before this date

**Returns**: `InspectionWithProperty` schema for rental property inspections

### 3. Access Issue

**Problem**: Both endpoints return `403 Forbidden` with our current API credentials.

**Possible Reasons**:
1. **User-specific endpoints**: These endpoints may be designed for authenticated users (agents) rather than public API access
2. **OAuth required**: May require OAuth authentication instead of API key + access token
3. **Permission scope**: Our access token may not have the required permissions
4. **Account type limitation**: May only be available to certain VaultRE account types

## Current Code Implementation

### Interface Definition
Location: `src/app/property/[id]/page.tsx:40-45`

```typescript
inspectionTimes?: Array<{
  id: string;
  startTime: string;
  endTime: string;
  type: string;
}>;
```

### API Transformation
Location: `src/services/api.ts:882-887`

```typescript
inspectionTimes: (vaultProperty.inspection_times || []).map((inspection: any) => ({
  id: inspection.id,
  startTime: inspection.start || inspection.startTime,
  endTime: inspection.end || inspection.endTime,
  type: inspection.type || 'public'
}))
```

**Current Result**: Always returns empty array `[]`

### Display Component
Location: `src/app/property/[id]/page.tsx:884-976`

- Renders inspection times in a black box with white text
- Shows formatted day, date, and time range
- Only displays when `inspectionTimes` array has items
- **Currently never displays** due to empty data

## Recommendations

### Option 1: Contact VaultRE Support (RECOMMENDED)
Request access to the `/user/upcomingOpenHomes` endpoint or clarification on:
1. How to access inspection times for published properties
2. What authentication method is required
3. If there's an alternative endpoint for public-facing websites

### Option 2: Manual Entry via CMS
If API access isn't available, consider:
1. Adding a custom field in the admin interface
2. Manually entering open home times for each property
3. Storing in a separate database table linked to property ID

### Option 3: Alternative Data Source
Check if inspection times are:
1. Available in the property export/webhook data
2. Included in portal feeds (e.g., Domain, realestate.com.au)
3. Accessible via a different VaultRE API version

### Option 4: Use Placeholder Data (Development Only)
For testing the UI:
1. Add mock inspection times in the transformation function
2. Only enabled in development environment
3. Shows how the feature would work when data is available

## Files Created During Investigation

1. **Debug Endpoint**: `/src/app/api/properties/inspect-debug/route.ts`
   - Shows raw property data and all available fields
   - Useful for checking what data is available

2. **Open Homes Endpoint**: `/src/app/api/open-homes/route.ts`
   - Attempts to fetch open homes from VaultRE user endpoint
   - Currently returns 403 Forbidden

3. **This Documentation**: `/docs/INSPECTION_TIMES_FINDINGS.md`

## Next Steps

1. **Contact VaultRE support** to request access to inspection times data
2. **Ask client** if they have access to a different API or data export
3. **Decide on temporary solution** (manual entry, placeholder, or hide feature)
4. **Update UI** to handle the empty state gracefully

## Testing Commands

```bash
# Get sample property IDs
curl http://localhost:3000/api/properties/debug

# Check raw property data for inspection fields
curl "http://localhost:3000/api/properties/inspect-debug?id=27311391"

# Test open homes endpoint (currently returns 403)
curl "http://localhost:3000/api/open-homes"
```

## References

- VaultRE API Docs: https://docs.api.vaultre.com.au
- Swagger Spec: https://docs.api.vaultre.com.au/swagger/vaultre.yaml
- API Base URL: https://ap-southeast-2.api.vaultre.com.au/api/v1.3
