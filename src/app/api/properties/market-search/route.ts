import { NextRequest, NextResponse } from 'next/server';

// DISABLED: This endpoint was returning mock data which violates the NO MOCK DATA policy
// All property data must come from VaultRE API only
// Future implementation must integrate with real VaultRE comparable sales API

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Market search endpoint disabled - no mock data allowed',
      details: 'All property data must use VaultRE API only'
    },
    { status: 410 } // 410 Gone - endpoint intentionally disabled
  );
}