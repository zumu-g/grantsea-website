import { NextRequest, NextResponse } from 'next/server';

// VaultRE has no working /agents or /staff endpoint on this account (both
// 404), so the real agent roster is derived from the listing agent embedded
// on every property record (already fetched via /api/properties). This is
// real VaultRE data — no fabricated names, bios, or photos — per the site's
// no-mock-data policy. See docs/plans/2026-07-14-001-feat-site-audit-next-stage-plan.md, U3.

// Uses request.nextUrl.origin, which requires a real request — must be
// dynamic, not statically pre-rendered at build time.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const origin = request.nextUrl.origin;
    const response = await fetch(`${origin}/api/properties?type=all&limit=100`, {
      // Reuse the properties route's own caching; no need to double-cache here.
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Unable to load agents from live listings' },
        { status: 502 }
      );
    }

    const { data: properties = [] } = await response.json();

    const agentsById = new Map<string, any>();
    for (const property of properties) {
      const agent = property.agent;
      if (agent?.id && !agentsById.has(agent.id)) {
        agentsById.set(agent.id, {
          id: agent.id,
          name: agent.name || 'Grant\'s Estate Agents',
          position: agent.position || '',
          email: agent.email || '',
          phone: agent.phone || agent.mobile || '',
          photo: agent.photo || null,
        });
      }
    }

    const agents = Array.from(agentsById.values());

    const nextResponse = NextResponse.json({ success: true, agents, total: agents.length });
    nextResponse.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return nextResponse;
  } catch (error) {
    console.error('Failed to derive agents from listings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load agents' },
      { status: 500 }
    );
  }
}
