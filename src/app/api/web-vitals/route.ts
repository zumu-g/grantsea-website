import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const record = {
      ...body,
      receivedAt: Date.now(),
      userAgent: request.headers.get('user-agent') || '',
    };

    const outDir = path.join(process.cwd(), 'test-results', 'rum');
    fs.mkdirSync(outDir, { recursive: true });
    const file = path.join(outDir, `rum-${new Date().toISOString().slice(0, 10)}.ndjson`);
    fs.appendFileSync(file, JSON.stringify(record) + '\n');

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

