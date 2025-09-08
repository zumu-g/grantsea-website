import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = process.env.NEXT_PUBLIC_CRM_API_URL || '';
  const API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || '';
  
  const results: any = {
    config: {
      url: API_URL,
      keyPresent: !!API_KEY,
      keyLength: API_KEY.length,
      keyPrefix: API_KEY.substring(0, 10) + '...'
    },
    tests: {}
  };

  // Test 1: Basic listings endpoint
  try {
    const response = await fetch(`${API_URL}/listings?per_page=5`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = { parseError: true, text: responseText.substring(0, 500) };
    }
    
    results.tests.listings = {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'content-type': response.headers.get('content-type'),
        'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining'),
      },
      data: data
    };
  } catch (error) {
    results.tests.listings = { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }

  // Test 2: Try without Bearer prefix (some APIs accept raw key)
  try {
    const response = await fetch(`${API_URL}/listings?per_page=2`, {
      headers: {
        'Authorization': API_KEY,
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    results.tests.rawKey = {
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    results.tests.rawKey = { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }

  // Test 3: Check if we need a different endpoint
  const endpoints = [
    '/properties',
    '/properties/residential', 
    '/api/properties',
    '/v1/listings'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${API_URL}${endpoint}?per_page=1`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        }
      });
      
      results.tests[`endpoint_${endpoint}`] = {
        status: response.status,
        exists: response.status !== 404
      };
    } catch (error) {
      results.tests[`endpoint_${endpoint}`] = { error: 'Network error' };
    }
  }

  return NextResponse.json(results);
}