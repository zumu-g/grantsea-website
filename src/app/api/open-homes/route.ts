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

  try {
    const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'X-Api-Key': API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Fetch ALL pages of open homes since upcoming ones are scattered throughout
    let allOpenHomes: any[] = [];
    let page = 1;
    let hasMore = true;
    
    // Get total count first
    const countResponse = await fetch(`${API_BASE_URL}/openHomes?limit=1`, {
      headers,
      cache: 'no-store'
    });
    
    let totalItems = 0;
    if (countResponse.ok) {
      const countData = await countResponse.json();
      totalItems = countData.totalItems || 0;
      console.log(`Total open homes in API: ${totalItems}`);
    }
    
    // Fetch all pages (with safety limit)
    while (hasMore && page <= 50) {
      const url = `${API_BASE_URL}/openHomes?limit=100&page=${page}`;
      const response = await fetch(url, {
        headers,
        cache: 'no-store'
      });

      if (!response.ok) {
        if (page === 1) {
          throw new Error(`API request failed: ${response.status}`);
        }
        break; // Stop if we can't fetch more pages
      }

      const data = await response.json();
      const pageOpenHomes = data.data || data.items || [];
      
      if (pageOpenHomes.length === 0) {
        hasMore = false;
      } else {
        allOpenHomes.push(...pageOpenHomes);
      }
      
      page++;
    }
    
    console.log(`Fetched ${allOpenHomes.length} open homes across ${page - 1} pages`);

    // If propertyId is specified, filter to that property only
    let openHomes = allOpenHomes;

    // Filter by property ID if specified
    if (propertyId) {
      openHomes = openHomes.filter((oh: any) => {
        const ohPropertyId = oh.property?.id?.toString() || oh.propertyId?.toString();
        return ohPropertyId === propertyId.toString();
      });
    }

    // Filter to only upcoming open homes (not past ones)
    const now = new Date();
    openHomes = openHomes.filter((oh: any) => {
      const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
      return startTime > now;
    });

    // Sort by start time (earliest first)
    openHomes.sort((a: any, b: any) => {
      const startA = new Date(a.start || a.startTime || a.startDateTime);
      const startB = new Date(b.start || b.startTime || b.startDateTime);
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
    const transformedOpenHomes: any[] = [];
    
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

    return NextResponse.json({
      success: true,
      data: transformedOpenHomes,
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
