# Inspection Times API Analysis & Solutions

## Executive Summary
After thorough investigation as a senior developer and API expert, I've identified why inspection times for 10 History Lane are not showing in the API feed and propose several solutions.

## Key Findings

### 1. **The Property Exists**
- Property ID: 31765985
- Address: 10 History Lane, Narre Warren South VIC
- Status: listing
- Sale Life ID: 36736468

### 2. **Current Code Issues**
- The code tries to fetch from `/user/upcomingOpenHomes` which returns **403 Forbidden**
- The accessible `/openHomes` endpoint is not being used
- No inspection times are embedded in the property object itself
- The most recent open homes in the API are from April 2024, not October 2025

### 3. **API Structure**
The `/openHomes` endpoint returns:
```json
{
  "items": [{
    "id": 15183739,
    "start": "2023-09-23T05:00:00+00:00",
    "end": "2023-09-23T05:30:00+00:00",
    "property": {
      "id": 4992438,
      "saleLifeId": 26139550
    }
  }]
}
```

## Root Cause Analysis

### Primary Issue: Data Not in API
The inspection times for Oct 16 & 18, 2025 are **not present in the VaultRE API** at all. The API query for property 31765985 returns 0 open homes.

### Secondary Issue: Wrong Endpoint
Even if the data was present, the code is using an endpoint that returns 403 Forbidden.

## Solutions (in priority order)

### Solution 1: Ensure Data Entry in VaultRE
**Action Required**: Verify that the inspection times are correctly entered in VaultRE CRM
- Check if there's a specific workflow for entering future open homes
- Confirm the property status allows open homes
- Verify the user has permissions to create open homes

### Solution 2: Fix the API Integration Code

Replace the failing `/user/upcomingOpenHomes` endpoint with the working `/openHomes` endpoint:

```typescript
// In src/app/api/properties/route.ts
// Replace lines 142-148 with:
const openHomesResponse = await fetch(
  `${API_BASE_URL}/openHomes?limit=500&includeRecent=true`,
  {
    headers,
    cache: 'no-store'
  }
);

// In src/app/api/properties/[id]/route.ts
// Replace lines 81-86 with:
const openHomesResponse = await fetch(
  `${API_BASE_URL}/openHomes?propertyId=${id}&limit=100`,
  {
    headers,
    cache: 'no-store'
  }
);
```

### Solution 3: Add Manual Override Capability

Create a fallback system for manually entering inspection times:

```typescript
// In src/services/api.ts
export interface ManualInspection {
  propertyId: string;
  inspections: {
    startTime: string;
    endTime: string;
    agent: string;
  }[];
}

// Store manual inspections in a separate data structure
const MANUAL_INSPECTIONS: ManualInspection[] = [
  {
    propertyId: '31765985',
    inspections: [
      {
        startTime: '2025-10-16T14:00:00+11:00',
        endTime: '2025-10-16T14:20:00+11:00',
        agent: 'Stuart Grant'
      },
      {
        startTime: '2025-10-18T12:20:00+11:00',
        endTime: '2025-10-18T12:40:00+11:00',
        agent: 'Stuart Grant'
      }
    ]
  }
];
```

### Solution 4: Contact VaultRE Support

If the data is correctly entered but not appearing:
1. Check if there's an API permission issue
2. Verify if there's a different endpoint for future-dated open homes
3. Ask if there's a sync delay for newly entered data
4. Confirm the propertyId filter parameter is working correctly

## Implementation Priority

1. **Immediate**: Implement Solution 2 to use the working endpoint
2. **Short-term**: Add Solution 3 as a temporary workaround
3. **Long-term**: Work with VaultRE to ensure proper data flow

## Testing Checklist

- [ ] Verify inspection times are entered in VaultRE
- [ ] Test the `/openHomes` endpoint with propertyId filter
- [ ] Check if data appears after implementing code fix
- [ ] Monitor for any timezone issues (UTC vs Melbourne time)
- [ ] Validate that future dates are supported by the API

## Monitoring

Add logging to track:
- API response status codes
- Number of open homes returned per property
- Any properties missing inspection times
- Failed API calls and their error messages