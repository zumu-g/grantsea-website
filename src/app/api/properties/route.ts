import { NextRequest, NextResponse } from 'next/server';
import { transformVaultREProperty } from '@/services/api';

// In API routes, we can't access NEXT_PUBLIC_ variables on the server
// We need to use regular env vars or duplicate them without the prefix
const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'all';
  const limit = searchParams.get('limit') || '20';
  const published = searchParams.get('published') || 'true';
  const suburb = searchParams.get('suburb');
  
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

    let allProperties = [];

    // Fetch based on type
    if (type === 'sale') {
      // Fetch residential, land, and commercial properties for sale
      const fetchPromises = [];

      // Residential properties
      let residentialUrl = `${API_BASE_URL}/properties/residential/sale?published=${published}&limit=${Math.floor(parseInt(limit) / 3)}`;
      if (suburb) {
        residentialUrl += `&suburb=${encodeURIComponent(suburb)}`;
      }
      fetchPromises.push(fetch(residentialUrl, { headers }));

      // Land for sale
      let landUrl = `${API_BASE_URL}/properties/land/sale?published=${published}&limit=${Math.floor(parseInt(limit) / 3)}`;
      if (suburb) {
        landUrl += `&suburb=${encodeURIComponent(suburb)}`;
      }
      fetchPromises.push(fetch(landUrl, { headers }));

      // Commercial properties
      let commercialUrl = `${API_BASE_URL}/properties/commercial/sale?published=${published}&limit=${Math.floor(parseInt(limit) / 3)}`;
      if (suburb) {
        commercialUrl += `&suburb=${encodeURIComponent(suburb)}`;
      }
      fetchPromises.push(fetch(commercialUrl, { headers }));

      const responses = await Promise.all(fetchPromises);
      const dataResults = await Promise.all(responses.map(r => r.json()));

      allProperties = [
        ...(dataResults[0].items || []),
        ...(dataResults[1].items || []),
        ...(dataResults[2].items || [])
      ];
    } else if (type === 'lease' || type === 'rent') {
      let url = `${API_BASE_URL}/properties/residential/lease?published=${published}&limit=${limit}`;
      if (suburb) {
        url += `&suburb=${encodeURIComponent(suburb)}`;
      }
      const response = await fetch(url, { headers });
      const data = await response.json();
      allProperties = data.items || [];
    } else {
      // Fetch all property types
      const fetchPromises = [];
      const limitPerType = Math.floor(parseInt(limit) / 5);

      // Residential sale
      let residentialSaleUrl = `${API_BASE_URL}/properties/residential/sale?published=${published}&limit=${limitPerType}`;
      if (suburb) residentialSaleUrl += `&suburb=${encodeURIComponent(suburb)}`;
      fetchPromises.push(fetch(residentialSaleUrl, { headers }));

      // Residential lease
      let residentialLeaseUrl = `${API_BASE_URL}/properties/residential/lease?published=${published}&limit=${limitPerType}`;
      if (suburb) residentialLeaseUrl += `&suburb=${encodeURIComponent(suburb)}`;
      fetchPromises.push(fetch(residentialLeaseUrl, { headers }));

      // Land sale
      let landUrl = `${API_BASE_URL}/properties/land/sale?published=${published}&limit=${limitPerType}`;
      if (suburb) landUrl += `&suburb=${encodeURIComponent(suburb)}`;
      fetchPromises.push(fetch(landUrl, { headers }));

      // Commercial sale
      let commercialSaleUrl = `${API_BASE_URL}/properties/commercial/sale?published=${published}&limit=${limitPerType}`;
      if (suburb) commercialSaleUrl += `&suburb=${encodeURIComponent(suburb)}`;
      fetchPromises.push(fetch(commercialSaleUrl, { headers }));

      // Commercial lease
      let commercialLeaseUrl = `${API_BASE_URL}/properties/commercial/lease?published=${published}&limit=${limitPerType}`;
      if (suburb) commercialLeaseUrl += `&suburb=${encodeURIComponent(suburb)}`;
      fetchPromises.push(fetch(commercialLeaseUrl, { headers }));

      const responses = await Promise.all(fetchPromises);
      const dataResults = await Promise.all(responses.map(r => r.json()));

      allProperties = [
        ...(dataResults[0].items || []),
        ...(dataResults[1].items || []),
        ...(dataResults[2].items || []),
        ...(dataResults[3].items || []),
        ...(dataResults[4].items || [])
      ];
    }

    // If we have a suburb filter and the API doesn't support it natively,
    // filter the results client-side as a fallback
    if (suburb && allProperties.length > 0) {
      allProperties = allProperties.filter((property: any) => 
        property.address && 
        property.address.toLowerCase().includes(suburb.toLowerCase()) ||
        property.suburb && 
        property.suburb.toLowerCase().includes(suburb.toLowerCase())
      );
    }

    // Transform the properties to our format
    const transformedProperties = allProperties.map(transformVaultREProperty);

    // Fetch upcoming open homes and merge with properties
    try {
      const openHomesResponse = await fetch(`${API_BASE_URL}/user/upcomingOpenHomes?days=30&includeRecent=false`, {
        headers,
        cache: 'no-store'
      });

      if (openHomesResponse.ok) {
        const openHomesData = await openHomesResponse.json();
        const openHomes = openHomesData.items || openHomesData.data || [];
        
        // Create a map of property ID to inspection times
        const openHomesByProperty = new Map<string, any[]>();
        
        // Filter to only upcoming open homes
        const now = new Date();
        const upcomingOpenHomes = openHomes.filter((oh: any) => {
          const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
          return startTime > now;
        });

        upcomingOpenHomes.forEach((oh: any) => {
          const propertyId = oh.property?.id?.toString() || oh.propertyId?.toString();
          if (!propertyId) return;
          
          const inspection = {
            id: oh.id?.toString() || '',
            startTime: oh.start || oh.startTime || oh.startDateTime,
            endTime: oh.end || oh.endTime || oh.endDateTime,
            type: oh.type || 'public'
          };
          
          if (!openHomesByProperty.has(propertyId)) {
            openHomesByProperty.set(propertyId, []);
          }
          openHomesByProperty.get(propertyId)!.push(inspection);
        });
        
        // Merge open homes into properties
        transformedProperties.forEach((property: any) => {
          if (openHomesByProperty.has(property.id)) {
            property.inspectionTimes = openHomesByProperty.get(property.id);
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch open homes:', error);
      // Continue without open homes data
    }

    return NextResponse.json({
      success: true,
      data: transformedProperties,
      total: transformedProperties.length,
      properties: transformedProperties // For backward compatibility
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch properties',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}