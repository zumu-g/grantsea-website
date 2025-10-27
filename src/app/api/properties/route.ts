import { NextRequest, NextResponse } from 'next/server';
import { transformVaultREProperty } from '@/services/api';
import { fetchUpcomingOpenHomesWithCache } from '@/services/openHomesCache';

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

    // Fetch based on type - optimize for speed
    if (type === 'sale') {
      // Focus on residential properties first (most common), add others if needed
      let residentialUrl = `${API_BASE_URL}/properties/residential/sale?published=${published}&limit=${limit}`;
      if (suburb) {
        residentialUrl += `&suburb=${encodeURIComponent(suburb)}`;
      }
      
      const residentialResponse = await fetch(residentialUrl, { headers });
      const residentialData = await residentialResponse.json();
      allProperties = residentialData.items || [];
      
      // Only fetch additional property types if we have fewer than requested limit
      if (allProperties.length < parseInt(limit)) {
        const remainingLimit = parseInt(limit) - allProperties.length;
        const fetchPromises = [];

        // Land for sale
        let landUrl = `${API_BASE_URL}/properties/land/sale?published=${published}&limit=${Math.ceil(remainingLimit / 2)}`;
        if (suburb) {
          landUrl += `&suburb=${encodeURIComponent(suburb)}`;
        }
        fetchPromises.push(fetch(landUrl, { headers }));

        // Commercial properties
        let commercialUrl = `${API_BASE_URL}/properties/commercial/sale?published=${published}&limit=${Math.ceil(remainingLimit / 2)}`;
        if (suburb) {
          commercialUrl += `&suburb=${encodeURIComponent(suburb)}`;
        }
        fetchPromises.push(fetch(commercialUrl, { headers }));

        try {
          const additionalResponses = await Promise.all(fetchPromises);
          const additionalResults = await Promise.all(additionalResponses.map(r => r.json()));
          
          allProperties = [
            ...allProperties,
            ...(additionalResults[0].items || []),
            ...(additionalResults[1].items || [])
          ];
        } catch (error) {
          console.warn('Failed to fetch additional property types:', error);
          // Continue with just residential properties
        }
      }
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

    // Transform the properties to our format and optimize for listing view
    const transformedProperties = allProperties.map((property: any) => {
      const transformed = transformVaultREProperty(property);
      // Optimize for listing view - only include first 2 images to reduce payload size
      if (transformed.images && transformed.images.length > 2) {
        transformed.images = transformed.images.slice(0, 2);
      }
      // Remove heavy description data for listing view
      if (transformed.description && transformed.description.length > 200) {
        transformed.description = transformed.description.substring(0, 200) + '...';
      }
      return transformed;
    });

    // Fetch upcoming open homes only for active properties
    try {
      // Get list of property IDs we need open homes for
      const activePropertyIds = transformedProperties.map((p: any) => p.id);
      
      // Use cached/optimized fetch
      const openHomesByProperty = await fetchUpcomingOpenHomesWithCache(
        API_BASE_URL,
        headers,
        activePropertyIds
      );
      
      // Add open homes to properties
      transformedProperties.forEach((property: any) => {
        property.inspectionTimes = openHomesByProperty.get(property.id) || [];
      });
      
      console.log(`Added open homes to ${openHomesByProperty.size} properties`);
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