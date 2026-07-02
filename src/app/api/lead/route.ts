import { NextRequest, NextResponse } from 'next/server';

// Lead capture endpoint for contact and appraisal forms.
// Delivers via Resend's HTTP API (no SDK needed). Requires env vars:
//   RESEND_API_KEY  - API key from resend.com
//   LEAD_EMAIL_TO   - inbox that receives leads (e.g. berwick@grantsea.com.au)
//   LEAD_EMAIL_FROM - verified sender (defaults to onboarding@resend.dev for testing)
// Without RESEND_API_KEY this returns 503 so forms can show an honest
// "call us" fallback instead of a fake success message. NEVER fake success.

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { type, name, email, phone, ...rest } = body || {};

  // Basic validation at the trust boundary
  if (!type || !['contact', 'appraisal'].includes(type)) {
    return NextResponse.json({ error: 'Invalid lead type' }, { status: 400 });
  }
  if (!name || typeof name !== 'string' || name.length > 200) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!apiKey || !to) {
    console.error('Lead received but email delivery is not configured (RESEND_API_KEY / LEAD_EMAIL_TO missing). Lead:', JSON.stringify(body));
    return NextResponse.json(
      { error: 'Enquiry delivery is temporarily unavailable' },
      { status: 503 }
    );
  }

  const esc = (v: unknown) =>
    String(v ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));

  const detailRows = Object.entries({ name, email, phone, ...rest })
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join('');

  const subject =
    type === 'appraisal'
      ? `New appraisal request — ${name}`
      : `New website enquiry — ${name}`;

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead delivery error:', error);
    return NextResponse.json({ error: 'Failed to deliver enquiry' }, { status: 502 });
  }
}
