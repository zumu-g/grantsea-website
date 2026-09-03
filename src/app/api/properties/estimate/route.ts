import { NextResponse } from 'next/server';

// Removed 2026-07-14: this endpoint fell back to fabricated comparable sales
// (generateMockEstimate) whenever the VaultRE call failed or returned no
// matches, violating the site's no-mock-data policy. Real market data is
// tracked separately (see docs/plans/2026-07-14-001-feat-site-audit-next-stage-plan.md, U7).
export async function POST() {
  return NextResponse.json(
    { error: 'This endpoint has been retired. Real comparable-sales data is not yet available.' },
    { status: 410 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
