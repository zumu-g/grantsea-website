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

  // Use VaultRE API only - no mock data
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
          property: propertyDetailsMap.get(propId) || { id: propId }
        };
      });
      
      transformedOpenHomes.push(...transformed);
    });

    console.log(`Found ${transformedOpenHomes.length} upcoming open homes from VaultRE API`);

    return NextResponse.json({
      success: true,
      openHomes: transformedOpenHomes,
      total: transformedOpenHomes.length
    });

  } catch (error) {
    console.error('Error fetching open homes:', error);
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