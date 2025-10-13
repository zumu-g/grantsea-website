import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Please provide a property ID as ?id=xxx' },
      { status: 400 }
    );
  }

  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'X-Api-Key': API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    // Try to fetch the property
    let rawProperty = null;
    let endpoint = '';

    // Try sale endpoint
    try {
      endpoint = `${API_BASE_URL}/properties/residential/sale/${id}`;
      const response = await fetch(endpoint, { headers, cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        rawProperty = data.data || data;
      }
    } catch (e) {
      // Try lease endpoint
      endpoint = `${API_BASE_URL}/properties/residential/lease/${id}`;
      const response = await fetch(endpoint, { headers, cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        rawProperty = data.data || data;
      }
    }

    if (!rawProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Extract all fields that might contain inspection times
    const inspectionFields = {
      inspection_times: rawProperty.inspection_times,
      inspectionTimes: rawProperty.inspectionTimes,
      inspections: rawProperty.inspections,
      openHomes: rawProperty.openHomes,
      open_homes: rawProperty.open_homes,
      viewingTimes: rawProperty.viewingTimes,
      viewing_times: rawProperty.viewing_times,
      appointments: rawProperty.appointments,
      scheduledInspections: rawProperty.scheduledInspections,
      scheduled_inspections: rawProperty.scheduled_inspections,
    };

    return NextResponse.json({
      propertyId: id,
      endpoint,
      inspectionFields,
      allPropertyKeys: Object.keys(rawProperty).sort(),
      rawPropertySample: {
        id: rawProperty.id,
        address: rawProperty.address || rawProperty.displayAddress,
        status: rawProperty.status,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch property',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
