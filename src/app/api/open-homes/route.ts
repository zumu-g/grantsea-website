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

    // Fetch upcoming open homes
    const url = `${API_BASE_URL}/user/upcomingOpenHomes?days=${days}&includeRecent=false`;
    const response = await fetch(url, {
      headers,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // If propertyId is specified, filter to that property only
    let openHomes = data.data || data.items || data || [];

    if (propertyId) {
      openHomes = openHomes.filter((oh: any) =>
        oh.property?.id?.toString() === propertyId ||
        oh.propertyId?.toString() === propertyId
      );
    }

    // Transform to our format
    const transformedOpenHomes = openHomes.map((oh: any) => ({
      id: oh.id?.toString() || '',
      propertyId: oh.property?.id?.toString() || oh.propertyId?.toString() || '',
      startTime: oh.start || oh.startTime || oh.startDateTime,
      endTime: oh.end || oh.endTime || oh.endDateTime,
      type: oh.type || 'public',
      notes: oh.notes || oh.description || '',
    }));

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
