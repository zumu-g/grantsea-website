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
      let url = `${API_BASE_URL}/properties/residential/sale?published=${published}&limit=${limit}`;
      if (suburb) {
        url += `&suburb=${encodeURIComponent(suburb)}`;
      }
      const response = await fetch(url, { headers });
      const data = await response.json();
      allProperties = data.items || [];
    } else if (type === 'lease' || type === 'rent') {
      let url = `${API_BASE_URL}/properties/residential/lease?published=${published}&limit=${limit}`;
      if (suburb) {
        url += `&suburb=${encodeURIComponent(suburb)}`;
      }
      const response = await fetch(url, { headers });
      const data = await response.json();
      allProperties = data.items || [];
    } else {
      // Fetch both sale and lease
      let saleUrl = `${API_BASE_URL}/properties/residential/sale?published=${published}&limit=${Math.floor(parseInt(limit) / 2)}`;
      let leaseUrl = `${API_BASE_URL}/properties/residential/lease?published=${published}&limit=${Math.floor(parseInt(limit) / 2)}`;
      
      if (suburb) {
        saleUrl += `&suburb=${encodeURIComponent(suburb)}`;
        leaseUrl += `&suburb=${encodeURIComponent(suburb)}`;
      }
      
      const [saleResponse, leaseResponse] = await Promise.all([
        fetch(saleUrl, { headers }),
        fetch(leaseUrl, { headers })
      ]);
      
      const saleData = await saleResponse.json();
      const leaseData = await leaseResponse.json();
      
      allProperties = [
        ...(saleData.items || []),
        ...(leaseData.items || [])
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