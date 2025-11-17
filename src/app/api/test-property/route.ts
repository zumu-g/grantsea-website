import { NextResponse } from 'next/server';

export async function GET() {
  // Block test endpoint in production
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not Found', { status: 404 });
  }

  const apiUrl = process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
  const apiKey = process.env.NEXT_PUBLIC_CRM_API_KEY || '';

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // Try to fetch one property
    const response = await fetch(`${apiUrl}/properties/residential/sale?limit=1`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'X-API-Key': apiKey,
        'Api-Key': apiKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json({ 
        error: 'Invalid JSON response', 
        status: response.status,
        statusText: response.statusText,
        responseText: responseText.substring(0, 500)
      }, { status: 500 });
    }

    // Return the full response to see the structure
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      apiUrl: `${apiUrl}/properties/residential/sale?limit=1`,
      data: data,
      headers: Object.fromEntries(response.headers.entries())
    });

  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      apiUrl,
      apiKeySet: !!apiKey
    }, { status: 500 });
  }
}