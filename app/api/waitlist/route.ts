import { NextResponse } from 'next/server';

// Receives waitlist submissions from /automate.
//
// Two stages per lead, linked by leadId:
//   stage "email"   — sent as soon as someone enters their email (so no lead is lost)
//   stage "profile" — the qualifying answers (quantity, budget, timeline, …)
//
// If WAITLIST_WEBHOOK_URL is set (for example a Google Apps Script web app that
// writes to a Sheet, see docs/waitlist-apps-script.gs), each submission is
// forwarded there as JSON. Without it, submissions are only logged.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_STR = 1000;

function clean(value: unknown, max = MAX_STR): unknown {
  if (typeof value === 'string') return value.trim().slice(0, max);
  if (Array.isArray(value)) return value.slice(0, 20).map((v) => clean(v, 100));
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value).slice(0, 40)) out[k.slice(0, 50)] = clean(v);
    return out;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) return value;
  return undefined;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const stage = body.stage;
  const leadId = typeof body.leadId === 'string' ? body.leadId.slice(0, 64) : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 200) : '';

  if (stage !== 'email' && stage !== 'profile') {
    return NextResponse.json({ ok: false, error: 'Invalid stage.' }, { status: 400 });
  }
  if (!leadId || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 });
  }

  const record = {
    ...(clean(body) as Record<string, unknown>),
    stage,
    leadId,
    email,
    receivedAt: new Date().toISOString(),
    country: req.headers.get('x-vercel-ip-country') ?? '',
    city: decodeURIComponent(req.headers.get('x-vercel-ip-city') ?? ''),
    userAgent: (req.headers.get('user-agent') ?? '').slice(0, 300),
  };
  delete (record as Record<string, unknown>).website;

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    console.log('[waitlist] WAITLIST_WEBHOOK_URL not set; submission:', JSON.stringify(record));
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      // Apps Script web apps answer with a redirect.
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error('[waitlist] forward failed', err, JSON.stringify(record));
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
