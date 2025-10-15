# iOS App Open Homes Implementation Guide

## Overview

This document outlines the open homes feature implementation for the Grant's Estate Agents website and provides guidance for implementing the same functionality in the iOS app.

## Problem Summary

The VaultRE CRM API returns ALL open homes data (including historical records) across many pages. Upcoming open homes for active properties are scattered throughout the paginated results, making it challenging to efficiently retrieve only the relevant data.

### Key Challenges:
1. Open homes are buried across many pages (e.g., pages 6, 16, 17, 24, 45, 46 out of 50+ total pages)
2. The API returns all historical data, not just upcoming open homes
3. Properties change daily, so hardcoded page numbers won't work
4. Need to scan all pages to ensure no upcoming open homes are missed

## Web Implementation Solution

### 1. Comprehensive Scanning Algorithm

The web implementation uses a comprehensive scanning approach that:
- Scans ALL pages of open homes data from the API
- Filters for upcoming open homes only (startTime > current time)
- Caches results for 15 minutes to improve performance
- Groups open homes by property ID

### 2. Caching Strategy

```typescript
// Cache implementation with 15-minute TTL
class OpenHomesCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 15 * 60 * 1000; // 15 minutes
}
```

### 3. API Endpoints

The web app exposes these endpoints:
- `/api/open-homes` - Returns all upcoming open homes
- `/api/properties` - Includes open homes data for each property
- `/api/properties/[id]` - Includes open homes for a specific property

## iOS Implementation Recommendations

### 1. Direct API Integration

The iOS app should directly integrate with the VaultRE API rather than relying on the web app's endpoints for better performance and offline capability.

**API Details:**
```
Base URL: https://ap-southeast-2.api.vaultre.com.au/api/v1.3
Endpoint: /openHomes
Authentication: Bearer token + API key
```

### 2. Swift Implementation Approach

```swift
// Recommended structure for iOS

class OpenHomesService {
    private let apiBaseURL = "https://ap-southeast-2.api.vaultre.com.au/api/v1.3"
    private let cache = OpenHomesCache()
    private let cacheTimeout: TimeInterval = 900 // 15 minutes
    
    func fetchAllUpcomingOpenHomes() async throws -> [PropertyOpenHomes] {
        // Check cache first
        if let cached = cache.getCachedOpenHomes() {
            return cached
        }
        
        // Scan all pages
        var allOpenHomes: [OpenHome] = []
        var page = 1
        var hasMorePages = true
        
        while hasMorePages {
            let openHomes = try await fetchOpenHomesPage(page: page)
            
            if openHomes.isEmpty {
                hasMorePages = false
            } else {
                // Filter for upcoming only
                let upcoming = openHomes.filter { $0.startTime > Date() }
                allOpenHomes.append(contentsOf: upcoming)
                page += 1
                
                // Safety limit
                if page > 100 {
                    hasMorePages = false
                }
            }
        }
        
        // Group by property and cache
        let grouped = groupByProperty(allOpenHomes)
        cache.store(grouped)
        
        return grouped
    }
}
```

### 3. Key Implementation Points

#### A. Pagination Handling
- Start from page 1 and scan sequentially
- Use a limit of 100 items per page for efficiency
- Continue until receiving an empty page
- Implement a safety limit (e.g., 100 pages) to prevent infinite loops

#### B. Filtering Strategy
- Filter each page for upcoming open homes immediately
- Only store open homes where `startTime > currentDate`
- This reduces memory usage on mobile devices

#### C. Caching
- Implement a 15-minute cache to avoid repeated full scans
- Store cache in memory for active use
- Consider persistent storage for offline capability

#### D. Background Updates
- Use iOS background fetch to periodically update the cache
- Implement push notifications for new open homes if required

### 4. Data Models

```swift
struct OpenHome: Codable {
    let id: String
    let propertyId: String
    let startTime: Date
    let endTime: Date
    let type: String // "public" or "private"
    let notes: String?
}

struct PropertyOpenHomes {
    let propertyId: String
    let openHomes: [OpenHome]
}
```

### 5. Performance Optimizations

1. **Parallel Processing**: Consider fetching multiple pages concurrently after determining the total page count
2. **Incremental Updates**: After initial scan, implement a strategy to check only recent pages for new open homes
3. **Property-Specific Requests**: For individual property views, consider fetching just that property's open homes

### 6. Error Handling

- Implement retry logic for failed page requests
- Handle network connectivity issues gracefully
- Provide offline fallback using cached data
- Log scanning progress for debugging

### 7. UI Considerations

- Show loading state during initial scan
- Display cached data immediately while refreshing in background
- Implement pull-to-refresh for manual updates
- Consider showing "Last updated" timestamp

## API Response Format

The VaultRE API returns open homes in this format:
```json
{
  "items": [
    {
      "id": "12345",
      "property": { "id": "31765985" },
      "start": "2024-01-20T00:30:00Z",
      "end": "2024-01-20T01:00:00Z",
      "type": "public"
    }
  ]
}
```

Note: Times are in UTC and need conversion to local timezone.

## Testing Recommendations

1. Test with properties that have multiple open homes
2. Verify behavior when no upcoming open homes exist
3. Test cache expiry and refresh logic
4. Simulate poor network conditions
5. Verify timezone handling for different locations

## Summary

The key to implementing this feature successfully is understanding that:
1. You must scan ALL pages to find ALL upcoming open homes
2. Caching is essential for performance
3. The data changes daily as properties are added/removed
4. Filtering for upcoming events must happen after fetching

This approach ensures your iOS app will always display accurate, up-to-date open homes information regardless of how the data is distributed across the API's pagination.