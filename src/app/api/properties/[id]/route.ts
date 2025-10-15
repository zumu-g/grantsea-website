import { NextRequest, NextResponse } from 'next/server';
import { transformVaultREProperty } from '@/services/api';

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

    let property = null;

    // Try residential sale endpoint first (has full data including description)
    try {
      const response = await fetch(
        `${API_BASE_URL}/properties/residential/sale/${id}`,
        {
          headers,
          cache: 'no-store'
        }
      );

      if (response.ok) {
        const data = await response.json();
        property = data.data || data;
      }
    } catch (e) {
      // Continue to fallback
    }

    // Fallback: Try residential lease endpoint
    if (!property) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/properties/residential/lease/${id}`,
          {
            headers,
            cache: 'no-store'
          }
        );

        if (response.ok) {
          const data = await response.json();
          property = data.data || data;
        }
      } catch (e) {
        // Last attempt failed
      }
    }

    if (property) {
      // Transform the property data to our format
      let transformedProperty = transformVaultREProperty(property);

      // For individual properties, skip open homes for now to prevent timeout
      // Open homes will be fetched on the properties listing page
      transformedProperty.inspectionTimes = [];
      

      return NextResponse.json({
        success: true,
        data: transformedProperty
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
    return NextResponse.json(
      {
        error: 'Failed to fetch property',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}