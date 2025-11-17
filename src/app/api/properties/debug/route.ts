import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET() {
  // First, let's check what properties are available
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'X-Api-Key': API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  let saleProperties = [];
  let leaseProperties = [];
  let errors = [];

  try {
    const saleResponse = await fetch(
      `${API_BASE_URL}/properties/residential/sale?published=true&limit=5`,
      { headers }
    );
    
    if (saleResponse.ok) {
      const saleData = await saleResponse.json();
      saleProperties = (saleData.items || []).map((p: any) => ({
        id: p.id,
        address: p.address,
        suburb: p.suburb,
        type: 'sale'
      }));
    } else {
      errors.push(`Sale endpoint error: ${saleResponse.status}`);
    }
  } catch (e) {
    errors.push(`Sale fetch error: ${e}`);
  }

  try {
    const leaseResponse = await fetch(
      `${API_BASE_URL}/properties/residential/lease?published=true&limit=5`,
      { headers }
    );
    
    if (leaseResponse.ok) {
      const leaseData = await leaseResponse.json();
      leaseProperties = (leaseData.items || []).map((p: any) => ({
        id: p.id,
        address: p.address,
        suburb: p.suburb,
        type: 'lease'
      }));
    } else {
      errors.push(`Lease endpoint error: ${leaseResponse.status}`);
    }
  } catch (e) {
    errors.push(`Lease fetch error: ${e}`);
  }

  return NextResponse.json({
    message: 'Property Debug Info',
    envVars: {
      hasApiKey: !!API_KEY,
      hasAccessToken: !!ACCESS_TOKEN,
      apiUrl: API_BASE_URL
    },
    sampleProperties: {
      sale: saleProperties,
      lease: leaseProperties
    },
    totalFound: saleProperties.length + leaseProperties.length,
    errors,
    hint: 'Use these IDs to test: /property/[id]'
  });
}