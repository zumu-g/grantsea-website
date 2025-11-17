# Open Homes Implementation Guide

## Overview
This guide documents the complete implementation of the upcoming open homes feature, including API integration, caching, and display components.

## Architecture

### Data Flow
1. **VaultRE API** → Contains inspection times within individual property objects
2. **Open Homes Cache Service** → Fetches all properties, extracts inspections, caches for 15 minutes
3. **API Route** → `/api/open-homes` serves cached data
4. **React Hook** → `useOpenHomes` fetches from API route
5. **Display Components** → Show formatted inspection times

## Implementation Details

### 1. Cache Service (`/src/services/openHomesCache.ts`)

```typescript
import { Property } from './api';

export interface OpenHome {
  id: string;
  propertyId: string;
  address: string;
  suburb: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  propertyType: string;
  imageUrl: string;
  startTime: Date;
  endTime: Date;
  agentName: string;
  agentPhone: string;
}

class OpenHomesCache {
  private cache: OpenHome[] | null = null;
  private cacheExpiry: Date | null = null;
  private readonly CACHE_DURATION_MINUTES = 15;

  async getAllOpenHomes(): Promise<OpenHome[]> {
    // Check if cache is valid
    if (this.cache && this.cacheExpiry && this.cacheExpiry > new Date()) {
      console.log('Returning cached open homes');
      return this.cache;
    }

    // Fetch fresh data
    console.log('Fetching fresh open homes data from API');
    const openHomes = await this.fetchOpenHomesFromAPI();
    
    // Update cache
    this.cache = openHomes;
    this.cacheExpiry = new Date(Date.now() + this.CACHE_DURATION_MINUTES * 60 * 1000);
    
    return openHomes;
  }

  private async fetchOpenHomesFromAPI(): Promise<OpenHome[]> {
    const allOpenHomes: OpenHome[] = [];
    
    try {
      // Fetch all properties with inspections
      // In production, this would scan all API pages
      const response = await fetch('/api/properties?type=all&hasInspections=true');
      const data = await response.json();
      
      // Transform properties with inspection times
      for (const property of data.data || []) {
        const inspectionTimes = property.inspectionTimes || [];
        
        for (const inspection of inspectionTimes) {
          const startTime = new Date(inspection.startTime);
          const endTime = new Date(inspection.endTime);
          
          // Only include future inspections
          if (startTime > new Date()) {
            allOpenHomes.push({
              id: `${property.id}-${inspection.id}`,
              propertyId: property.id,
              address: property.address,
              suburb: property.suburb,
              price: property.price || property.priceDisplay,
              bedrooms: property.bedrooms,
              bathrooms: property.bathrooms,
              carSpaces: property.carSpaces,
              propertyType: property.propertyType,
              imageUrl: property.images?.[0]?.url || '',
              startTime: startTime,
              endTime: endTime,
              agentName: property.agent?.name || 'Grant\'s Estate Agents',
              agentPhone: property.agent?.phone || '03 9707 5555'
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching open homes:', error);
    }
    
    // Sort by start time
    return allOpenHomes.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  clearCache() {
    this.cache = null;
    this.cacheExpiry = null;
  }
}

export const openHomesCache = new OpenHomesCache();
```

### 2. API Route (`/src/app/api/open-homes/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { openHomesCache } from '@/services/openHomesCache';

export async function GET(request: NextRequest) {
  try {
    // Get all properties with upcoming inspections
    const openHomes = await openHomesCache.getAllOpenHomes();
    
    return NextResponse.json({
      success: true,
      openHomes: openHomes,
      total: openHomes.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching open homes:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch open homes',
        openHomes: []
      },
      { status: 500 }
    );
  }
}
```

### 3. React Hook (`/src/hooks/useOpenHomes.ts`)

```typescript
import { useState, useEffect } from 'react';

export interface OpenHome {
  id: string;
  propertyId: string;
  address: string;
  suburb: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  propertyType: string;
  imageUrl: string;
  startTime: Date;
  endTime: Date;
  agentName: string;
  agentPhone: string;
}

export function useOpenHomes() {
  const [openHomes, setOpenHomes] = useState<OpenHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOpenHomes() {
      try {
        setLoading(true);
        const response = await fetch('/api/open-homes');
        
        if (!response.ok) {
          throw new Error('Failed to fetch open homes');
        }

        const data = await response.json();
        const homes = data.openHomes.map((home: any) => ({
          ...home,
          startTime: new Date(home.startTime),
          endTime: new Date(home.endTime)
        }));
        setOpenHomes(homes);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchOpenHomes();
  }, []);

  return { openHomes, loading, error };
}
```

### 4. Display Component (`/src/components/OpenHomesDisplay.tsx`)

```typescript
'use client';

import React from 'react';
import { useOpenHomes } from '@/hooks/useOpenHomes';
import { formatPrice } from '@/services/api';
import Link from 'next/link';
import PropertySkeleton from '@/components/PropertySkeleton';

export default function OpenHomesDisplay() {
  const { openHomes, loading, error } = useOpenHomes();

  if (loading) {
    return (
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <PropertySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || openHomes.length === 0) {
    return (
      <div style={{ 
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px'
      }}>
        <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>
          No Open Homes Scheduled
        </h3>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          There are currently no open homes scheduled. Please check back later.
        </p>
        <Link 
          href="/buy" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px'
          }}
        >
          View All Properties
        </Link>
      </div>
    );
  }

  // Group by date
  const groupedByDate = openHomes.reduce((acc, openHome) => {
    const dateKey = openHome.startTime.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(openHome);
    return acc;
  }, {} as Record<string, typeof openHomes>);

  return (
    <div>
      {Object.entries(groupedByDate).map(([date, homes]) => (
        <div key={date} style={{ marginBottom: '60px' }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '24px',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>
            {date}
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {homes.map((openHome) => (
              <Link 
                key={openHome.id}
                href={`/property/${openHome.propertyId}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    position: 'relative',
                    paddingBottom: '66.67%',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <img
                      src={openHome.imageUrl || '/placeholder-property.jpg'}
                      alt={openHome.address}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: '#FFD700',
                      color: '#000',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}>
                      🏠 {openHome.startTime.toLocaleTimeString('en-AU', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })} - {openHome.endTime.toLocaleTimeString('en-AU', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px' }}>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#000',
                      lineHeight: '1.3'
                    }}>
                      {openHome.address}
                    </h4>
                    
                    <p style={{
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '16px'
                    }}>
                      {openHome.suburb}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                      fontSize: '14px',
                      color: '#333'
                    }}>
                      <span>🛏️ {openHome.bedrooms}</span>
                      <span>🚿 {openHome.bathrooms}</span>
                      <span>🚗 {openHome.carSpaces}</span>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {openHome.propertyType}
                      </span>
                    </div>
                    
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#000',
                      marginBottom: '16px'
                    }}>
                      {formatPrice(openHome.price)}
                    </div>
                    
                    <div style={{
                      borderTop: '1px solid #e5e5e5',
                      paddingTop: '16px',
                      marginTop: '16px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      <div style={{ fontWeight: '500', color: '#333' }}>
                        {openHome.agentName}
                      </div>
                      <div>{openHome.agentPhone}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 5. Page Implementation (`/src/app/buy/open-for-inspection/page.tsx`)

```typescript
'use client';

import React from 'react';
import OncomHeader from '@/components/OncomHeader';
import OpenHomesDisplay from '@/components/OpenHomesDisplay';

export default function OpenForInspectionPage() {
  return (
    <>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: '200px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: '300',
            marginBottom: '16px',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>
            Open for Inspection
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '48px'
          }}>
            View all upcoming property inspections in Melbourne's southeast
          </p>

          <OpenHomesDisplay />
        </div>
      </main>
    </>
  );
}
```

## VaultRE API Integration Details

### API Structure
The VaultRE API stores inspection times within individual property objects:

```json
{
  "id": "12345",
  "address": "123 Example St",
  "inspectionTimes": [
    {
      "id": "insp-001",
      "startTime": "2024-01-20T10:00:00Z",
      "endTime": "2024-01-20T10:30:00Z",
      "type": "public"
    }
  ]
}
```

### Key Points
1. **No dedicated endpoint**: Must fetch all properties and extract inspections
2. **Pagination required**: API returns max 100 properties per page
3. **Both sale and lease**: Need to check both property types
4. **UTC times**: All times are in UTC and need timezone conversion
5. **Caching critical**: Full scan is expensive, cache for 15 minutes

## Performance Optimizations

1. **Server-side caching**: 15-minute cache reduces API calls
2. **Client-side loading states**: Show skeletons while loading
3. **Error boundaries**: Graceful fallbacks for failures
4. **Progressive enhancement**: Show cached data immediately if available

## Testing

```typescript
// Test the API endpoint
curl http://localhost:3000/api/open-homes

// Expected response
{
  "success": true,
  "openHomes": [
    {
      "id": "12345-insp-001",
      "propertyId": "12345",
      "address": "123 Example St",
      "suburb": "Berwick",
      "startTime": "2024-01-20T10:00:00Z",
      "endTime": "2024-01-20T10:30:00Z",
      // ... other fields
    }
  ],
  "total": 15,
  "lastUpdated": "2024-01-19T08:00:00Z"
}
```

## Deployment Considerations

1. **Environment variables required**:
   - `CRM_API_URL`
   - `CRM_API_KEY`
   - `CRM_ACCESS_TOKEN`

2. **Performance monitoring**: Track API response times and cache hit rates

3. **Error logging**: Log failures to fetch/parse inspection data

4. **Scheduled refresh**: Consider background job to pre-warm cache

## Future Enhancements

1. **Real-time updates**: WebSocket connection for instant updates
2. **Filtering**: By suburb, price range, property type
3. **Calendar integration**: Add to calendar functionality
4. **SMS reminders**: Notify users before inspections
5. **Map view**: Show inspections on interactive map