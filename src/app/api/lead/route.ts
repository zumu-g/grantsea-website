import { NextRequest, NextResponse } from 'next/server';

// Lead capture endpoint for contact, appraisal, property-enquiry, and
// market-report forms. Delivers via Resend's HTTP API (no SDK needed).
// Requires env vars:
//   RESEND_API_KEY  - API key from resend.com
//   LEAD_EMAIL_TO   - inbox that receives leads (e.g. berwick@grantsea.com.au)
//   LEAD_EMAIL_FROM - verified sender (defaults to onboarding@resend.dev for testing)
// Without RESEND_API_KEY this returns 503 so forms can show an honest
// "call us" fallback instead of a fake success message. NEVER fake success.

const KNOWN_SUBURBS = [
  'Beaconsfield', 'Beaconsfield Upper', 'Berwick', 'Bunyip', 'Clyde', 'Clyde North',
  'Cranbourne', 'Cranbourne North', 'Endeavour Hills', 'Garfield', 'Hallam',
  'Hampton Park', 'Harkaway', 'Koo Wee Rup', 'Narre Warren', 'Narre Warren East',
  'Narre Warren South', 'Officer', 'Pakenham', 'Tynong',
];

// Fields we accept per lead type. Anything else in the body is dropped before
// it reaches the email — an attacker sending extra keys just has them ignored
// rather than stuffed into the staff inbox.
const ALLOWED_FIELDS: Record<string, string[]> = {
  contact: ['subject', 'propertyInterest', 'message', 'agentName', 'agentEmail'],
  appraisal: [
    'propertyType', 'address', 'suburb', 'postcode', 'bedrooms', 'bathrooms',
    'parking', 'propertyCondition', 'sellingTimeframe', 'preferredContact',
    'appraisalType', 'preferredTime', 'additionalInfo',
  ],
  'property-enquiry': ['propertyId', 'message'],
  'market-report': ['suburb'],
};

const MAX_BODY_BYTES = 10 * 1024;

// Best-effort per-IP rate limit. In-memory, so it resets on cold start —
// same tradeoff as the existing propertyCache/auctionsCache pattern — but it
// stops a naive bot script from burning the whole Resend quota in one burst.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

async function resolvePropertyDetails(origin: string, propertyId: string) {
  try {
    const res = await fetch(`${origin}/api/properties/${encodeURIComponent(propertyId)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    const property = json.data || json.property;
    if (!property) return null;
    return {
      address: property.address || 'Unknown address',
      agentName: property.agent?.name || '',
      agentEmail: property.agent?.email || '',
    };
  } catch {
    return null;
  }
}

// Fire-and-forget GA4 Measurement Protocol conversion event. Must never
// fail or delay the lead response; skips silently when env vars missing.
function trackLeadConversion(leadType: string) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA_API_SECRET;
  if (!measurementId || !apiSecret) return;
  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: `server.${Date.now()}`,
        events: [{ name: 'generate_lead', params: { lead_type: leadType, source: 'server' } }],
      }),
    }
  ).catch(() => {});
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  }

  let body: any;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in. Bots that blind-fill
  // every input trip it; we accept silently without sending an email.
  if (body?.website) {
    return NextResponse.json({ success: true });
  }

  const { type, name, email, phone } = body || {};

  if (!type || !ALLOWED_FIELDS[type]) {
    return NextResponse.json({ error: 'Invalid lead type' }, { status: 400 });
  }
  if (!name || typeof name !== 'string' || name.length > 200) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  // Only pass through the fields this lead type is allowed to carry.
  const extra: Record<string, unknown> = {};
  for (const field of ALLOWED_FIELDS[type]) {
    if (body[field] !== undefined) extra[field] = body[field];
  }

  if (type === 'property-enquiry') {
    const propertyId = String(extra.propertyId || '');
    if (!propertyId) {
      return NextResponse.json({ error: 'Property id is required' }, { status: 400 });
    }
    // Resolve address/agent server-side from the property id rather than
    // trusting client-supplied values — otherwise anyone can forge an
    // enquiry email that appears to be about a different property or agent.
    const details = await resolvePropertyDetails(request.nextUrl.origin, propertyId);
    if (!details) {
      return NextResponse.json({ error: 'Unknown property' }, { status: 400 });
    }
    extra.propertyAddress = details.address;
    extra.agentName = details.agentName;
    extra.agentEmail = details.agentEmail;
    delete extra.propertyId;
  }

  if (type === 'market-report') {
    const suburb = String(extra.suburb || '');
    if (!KNOWN_SUBURBS.includes(suburb)) {
      return NextResponse.json({ error: 'Unknown suburb' }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!apiKey || !to) {
    console.error(`Lead received (type=${type}) but email delivery is not configured (RESEND_API_KEY / LEAD_EMAIL_TO missing).`);
    return NextResponse.json(
      { error: 'Enquiry delivery is temporarily unavailable' },
      { status: 503 }
    );
  }

  const esc = (v: unknown) =>
    String(v ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));

  const detailRows = Object.entries({ name, email, phone, ...extra })
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join('');

  const subjectByType: Record<string, string> = {
    appraisal: `New appraisal request — ${name}`,
    contact: `New website enquiry — ${name}`,
    'property-enquiry': `New property enquiry — ${extra.propertyAddress || name}`,
    'market-report': `Market report request — ${extra.suburb} — ${name}`,
  };
  const subject = subjectByType[type];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || 'onboarding@resend.dev',
        to: [to],
        reply_to: email,
        subject,
        html: `<h2>${esc(subject)}</h2><table>${detailRows}</table><p>Submitted via grantsea website at ${new Date().toISOString()}</p>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend delivery failed:', res.status, detail);
      return NextResponse.json({ error: 'Failed to deliver enquiry' }, { status: 502 });
    }

    trackLeadConversion(type);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead delivery error:', error);
    return NextResponse.json({ error: 'Failed to deliver enquiry' }, { status: 502 });
  }
}
