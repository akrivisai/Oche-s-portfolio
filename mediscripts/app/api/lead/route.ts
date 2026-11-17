import { NextResponse } from 'next/server';

// Waitlist + bulk-enquiry submissions.
// Forwards each one to LEAD_WEBHOOK_URL (e.g. the Google Apps Script in
// docs/lead-webhook.gs, which writes to a Google Sheet). Without it, returns
// 503 and the page hands the visitor over to WhatsApp instead.

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(body).slice(0, 30)) {
    if (typeof v === 'string') clean[k.slice(0, 40)] = v.trim().slice(0, 1000);
  }
  if (clean.kind !== 'waitlist' && clean.kind !== 'bulk') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!clean.phone && !clean.email) {
    return NextResponse.json({ ok: false, error: 'Contact details required.' }, { status: 400 });
  }

  const record = {
    ...clean,
    receivedAt: new Date().toISOString(),
    country: req.headers.get('x-vercel-ip-country') ?? '',
    city: decodeURIComponent(req.headers.get('x-vercel-ip-city') ?? ''),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.log('[lead] LEAD_WEBHOOK_URL not set:', JSON.stringify(record));
    return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (err) {
    console.error('[lead] forward failed', err, JSON.stringify(record));
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
