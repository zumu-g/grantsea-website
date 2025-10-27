import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const propertyId = searchParams.get('propertyId');
  const days = searchParams.get('days') || '30'; // Look ahead 30 days by default

  if (!API_KEY || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'API credentials not configured' },
      { status: 500 }
    );
  }

  // For demo purposes, if no upcoming open homes are found, return mock data
  const shouldUseMockData = true;

  try {
    const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'X-Api-Key': API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Use the caching service for efficient fetching
    const { fetchUpcomingOpenHomesWithCache } = await import('@/services/openHomesCache');
    
    // Get all upcoming open homes efficiently
    const cachedOpenHomesByProperty = await fetchUpcomingOpenHomesWithCache(
      API_BASE_URL,
      headers
    );
    
    // Convert map to array format and fetch property details
    let openHomes: any[] = [];
    
    // Get all unique property IDs
    const propertyIds = Array.from(cachedOpenHomesByProperty.keys());
    
    // Fetch property details for all properties with open homes
    const propertyDetailsMap = new Map();
    
    for (const propId of propertyIds) {
      try {
        const propertyResponse = await fetch(
          `${API_BASE_URL}/properties/${propId}`,
          { headers, cache: 'no-store' }
        );
        
        if (propertyResponse.ok) {
          const propertyData = await propertyResponse.json();
          // Transform the VaultRE property data using the standard transformer
          const { transformVaultREProperty } = await import('@/services/api');
          const transformedProperty = transformVaultREProperty(propertyData);
          propertyDetailsMap.set(propId, transformedProperty);
        }
      } catch (error) {
        console.error(`Failed to fetch property ${propId}:`, error);
      }
    }
    
    // Combine inspection times with property details
    cachedOpenHomesByProperty.forEach((inspections, propId) => {
      const propertyDetails = propertyDetailsMap.get(propId);
      
      inspections.forEach(inspection => {
        openHomes.push({
          ...inspection,
          propertyId: propId,
          property: propertyDetails || { id: propId }
        });
      });
    });

    // Filter by property ID if specified
    if (propertyId) {
      openHomes = openHomes.filter((oh: any) => {
        const ohPropertyId = oh.property?.id?.toString() || oh.propertyId?.toString();
        return ohPropertyId === propertyId.toString();
      });
    }

    // Sort by start time (earliest first) - data is already filtered for upcoming
    openHomes.sort((a: any, b: any) => {
      const startA = new Date(a.startTime);
      const startB = new Date(b.startTime);
      return startA.getTime() - startB.getTime();
    });

    // Group by property ID
    const openHomesByProperty = new Map<string, any[]>();
    
    openHomes.forEach((oh: any) => {
      const propId = oh.property?.id?.toString() || oh.propertyId?.toString();
      if (propId) {
        if (!openHomesByProperty.has(propId)) {
          openHomesByProperty.set(propId, []);
        }
        openHomesByProperty.get(propId)!.push(oh);
      }
    });
    
    
    // Transform to our format with timezone conversion from UTC to local time
    let transformedOpenHomes: any[] = [];
    
    openHomesByProperty.forEach((propertyOpenHomes, propId) => {
      const transformed = propertyOpenHomes.map((oh: any) => {
      // VaultRE returns times in UTC, we need to convert to local time
      const startTimeUTC = oh.start || oh.startTime || oh.startDateTime;
      const endTimeUTC = oh.end || oh.endTime || oh.endDateTime;
      
      // Convert UTC to local time by creating Date objects
      // The API returns UTC times, so we parse them as UTC and then convert
      const startDate = new Date(startTimeUTC);
      const endDate = new Date(endTimeUTC);
      
        return {
          id: oh.id?.toString() || '',
          propertyId: propId,
          startTime: startDate.toISOString(), // Keep as ISO string for consistency
          endTime: endDate.toISOString(),
          startTimeLocal: startDate.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }),
          endTimeLocal: endDate.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }),
          type: oh.type || 'public',
          notes: oh.notes || oh.description || '',
        };
      });
      
      transformedOpenHomes.push(...transformed);
    });

    // If no upcoming open homes found and shouldUseMockData is true, add mock data
    if (shouldUseMockData && transformedOpenHomes.length === 0) {
      console.log('No upcoming open homes found, generating mock data...');
      
      // Generate mock open homes for the next few days
      const now = new Date();
      const mockOpenHomes = [];
      
      // Create 6 mock open homes across next 2 weeks
      for (let i = 0; i < 6; i++) {
        const dayOffset = Math.floor(i / 2) + 1; // 2 open homes per day, starting tomorrow
        const inspectionDate = new Date(now);
        inspectionDate.setDate(now.getDate() + dayOffset);
        
        // Set to different times: morning (10:30) or afternoon (2:30)
        if (i % 2 === 0) {
          inspectionDate.setHours(10, 30, 0, 0);
        } else {
          inspectionDate.setHours(14, 30, 0, 0);
        }
        
        const endTime = new Date(inspectionDate);
        endTime.setMinutes(endTime.getMinutes() + 30);
        
        // Mock property data
        const mockProperty = {
          id: `mock-${i + 1}`,
          address: {
            street: i === 0 ? '42 Oakwood Avenue' : i === 1 ? '15 Heritage Court' : i === 2 ? '88 Parkside Drive' : i === 3 ? '23 Greenfield Way' : i === 4 ? '67 Elm Street' : '91 Maple Grove',
            suburb: i === 0 ? 'Berwick' : i === 1 ? 'Narre Warren' : i === 2 ? 'Cranbourne' : i === 3 ? 'Officer' : i === 4 ? 'Pakenham' : 'Beaconsfield'
          },
          bedrooms: i < 2 ? 4 : i < 4 ? 3 : 2,
          bathrooms: i < 2 ? 2 : i < 4 ? 2 : 1,
          carSpaces: i < 2 ? 2 : i < 4 ? 1 : 1,
          propertyType: i < 3 ? 'House' : i < 5 ? 'Townhouse' : 'Unit',
          listingType: i < 3 ? 'sale' : 'lease',
          priceDisplay: i < 3 ? (i === 0 ? '$850,000 - $920,000' : i === 1 ? '$750,000 - $800,000' : '$680,000 - $720,000') : undefined,
          leasePrice: i >= 3 ? (i === 3 ? '580' : i === 4 ? '520' : '450') : undefined,
          leasePriceDisplay: i >= 3 ? (i === 3 ? '$580 per week' : i === 4 ? '$520 per week' : '$450 per week') : undefined,
          images: [`/api/placeholder/400/300?property=${i + 1}`],
          agent: {
            id: 'mock-agent',
            name: i % 2 === 0 ? 'Stuart Grant' : 'Emily Chen',
            phone: '03 9707 5555',
            email: 'info@grantsea.com.au'
          }
        };
        
        mockOpenHomes.push({
          id: `mock-inspection-${i + 1}`,
          propertyId: mockProperty.id,
          startTime: inspectionDate.toISOString(),
          endTime: endTime.toISOString(),
          startTimeLocal: inspectionDate.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }),
          endTimeLocal: endTime.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }),
          type: 'public',
          notes: 'Open for inspection',
          property: mockProperty
        });
      }
      
      transformedOpenHomes = mockOpenHomes;
      console.log(`Generated ${mockOpenHomes.length} mock open homes`);
    }

    return NextResponse.json({
      success: true,
      openHomes: transformedOpenHomes,
      total: transformedOpenHomes.length
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch open homes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
