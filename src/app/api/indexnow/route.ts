import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const HOST = 'grantsea.com.au';
const KEY = 'f016139c24ecc21175d71e4831953380';

const SUBURBS = [
  'beaconsfield',
  'beaconsfield-upper',
  'berwick',
  'bunyip',
  'clyde',
  'clyde-north',
  'cranbourne',
  'cranbourne-north',
  'endeavour-hills',
  'garfield',
  'hallam',
  'hampton-park',
  'harkaway',
  'koo-wee-rup',
  'narre-warren',
  'narre-warren-east',
  'narre-warren-south',
  'officer',
  'pakenham',
  'tynong',
];

// ponytail: static URL list; regenerate from sitemap script if pages churn
const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/buy`,
  `https://${HOST}/rent`,
  `https://${HOST}/sell`,
  `https://${HOST}/agents`,
  ...SUBURBS.map((s) => `https://${HOST}/suburbs/${s}`),
];

async function submit(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Not configured — do nothing rather than expose an open trigger.
    return NextResponse.json({ ok: false, skipped: 'CRON_SECRET not set' });
  }
  if (request.nextUrl.searchParams.get('secret') !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorised' }, { status: 401 });
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: URL_LIST,
    }),
  });

  return NextResponse.json({
    ok: res.ok,
    status: res.status,
    submitted: URL_LIST.length,
  });
}

export async function GET(request: NextRequest) {
  return submit(request);
}

export async function POST(request: NextRequest) {
  return submit(request);
}
