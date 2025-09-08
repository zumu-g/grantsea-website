import { NextRequest, NextResponse } from 'next/server';

// In API routes, we can't access NEXT_PUBLIC_ variables on the server
// We need to use regular env vars or duplicate them without the prefix
const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  if (!API_KEY || !ACCESS_TOKEN) {
    console.error('API credentials missing:', {
      hasApiKey: !!API_KEY,
      hasAccessToken: !!ACCESS_TOKEN,
      apiUrl: API_BASE_URL
    });
    return NextResponse.json(
      { 
        error: 'API credentials not configured',
        details: 'Missing API key or access token in environment variables'
      },
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

    // Try different endpoints - VaultRE might use different paths for single properties
    let property = null;
    let error = null;

    // First, try to fetch from the properties list and filter by ID
    try {
      const response = await fetch(
        `${API_BASE_URL}/properties/residential/sale?published=true`,
        { headers }
      );
      
      if (response.ok) {
        const data = await response.json();
        const properties = data.items || [];
        property = properties.find((p: any) => p.id?.toString() === id);
      }
    } catch (e) {
      console.error('Error fetching from sale endpoint:', e);
    }

    // If not found in sale, try lease
    if (!property) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/properties/residential/lease?published=true`,
          { headers }
        );
        
        if (response.ok) {
          const data = await response.json();
          const properties = data.items || [];
          property = properties.find((p: any) => p.id?.toString() === id);
        }
      } catch (e) {
        console.error('Error fetching from lease endpoint:', e);
      }
    }

    // Try the direct property endpoint if available
    if (!property) {
      try {
        const directResponse = await fetch(
          `${API_BASE_URL}/properties/${id}`,
          { headers }
        );
        
        if (directResponse.ok) {
          property = await directResponse.json();
        } else if (directResponse.status === 404) {
          // Try with /listings endpoint instead
          const listingsResponse = await fetch(
            `${API_BASE_URL}/listings/${id}`,
            { headers }
          );
          
          if (listingsResponse.ok) {
            property = await listingsResponse.json();
          }
        }
      } catch (e) {
        console.error('Error fetching direct property:', e);
        error = e instanceof Error ? e.message : 'Unknown error';
      }
    }

    if (property) {
      return NextResponse.json({
        success: true,
        data: property
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Property not found',
          details: `No property found with ID: ${id}`
        },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch property',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}