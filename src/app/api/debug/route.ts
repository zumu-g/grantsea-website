import { NextResponse } from 'next/server';

export async function GET() {
  // Check which environment variables are available
  const envVars = {
    // Client-side variables (NEXT_PUBLIC_)
    NEXT_PUBLIC_CRM_API_URL: process.env.NEXT_PUBLIC_CRM_API_URL || 'NOT SET',
    NEXT_PUBLIC_CRM_API_KEY: process.env.NEXT_PUBLIC_CRM_API_KEY ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_CRM_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN ? 'SET' : 'NOT SET',
    
    // Server-side variables (without NEXT_PUBLIC_)
    CRM_API_URL: process.env.CRM_API_URL || 'NOT SET',
    CRM_API_KEY: process.env.CRM_API_KEY ? 'SET' : 'NOT SET',
    CRM_ACCESS_TOKEN: process.env.CRM_ACCESS_TOKEN ? 'SET' : 'NOT SET',
  };

  // Test API call
  let apiTestResult = null;
  const API_URL = process.env.NEXT_PUBLIC_CRM_API_URL || process.env.CRM_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || process.env.CRM_API_KEY;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || process.env.CRM_ACCESS_TOKEN;

  if (API_URL && API_KEY && ACCESS_TOKEN) {
    try {
      const response = await fetch(`${API_URL}/properties/residential/sale?published=true&limit=1`, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'X-Api-Key': API_KEY,
          'Accept': 'application/json',
        },
      });
      
      const data = await response.json();
      apiTestResult = {
        status: response.status,
        ok: response.ok,
        dataReceived: !!data,
        itemsCount: data.items?.length || 0,
        error: !response.ok ? data : null
      };
    } catch (error) {
      apiTestResult = {
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    envVars,
    apiTestResult,
    recommendation: 'If NEXT_PUBLIC_ vars are NOT SET but needed, add them in Vercel settings'
  });
}