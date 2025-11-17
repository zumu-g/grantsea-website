import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET(request: NextRequest) {
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

    // Test direct VaultRE API call
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 30);
    
    const fromDate = now.toISOString().split('T')[0];
    const toDate = futureDate.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_BASE_URL}/openHomes?limit=10&page=1&from=${fromDate}&to=${toDate}`,
      { headers, cache: 'no-store' }
    );

    const data = await response.json();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      url: `${API_BASE_URL}/openHomes?limit=10&page=1&from=${fromDate}&to=${toDate}`,
      credentials: {
        hasApiKey: !!API_KEY,
        hasAccessToken: !!ACCESS_TOKEN,
        apiKeyLength: API_KEY.length,
        accessTokenLength: ACCESS_TOKEN.length
      },
      dateRange: {
        from: fromDate,
        to: toDate
      },
      data: data,
      totalItems: data?.items?.length || data?.data?.length || 0
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}