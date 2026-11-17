// Fires ad-pixel events if the pixels are loaded (see components/Pixels.tsx).
type Fn = (...args: unknown[]) => void;

export function trackEvent(
  meta: 'InitiateCheckout' | 'Lead' | 'Contact',
  tiktok: 'InitiateCheckout' | 'SubmitForm' | 'Contact',
  data?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { fbq?: Fn; ttq?: { track: Fn } };
  try { w.fbq?.('track', meta, data); } catch {}
  try { w.ttq?.track(tiktok, data); } catch {}
}

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid', 'gclid'];

// Ad attribution, kept for the session so form submissions can carry it.
export function attribution(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const saved = JSON.parse(sessionStorage.getItem('ms_attr') ?? '{}');
    Object.assign(out, saved);
  } catch {}
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of KEYS) {
      const v = params.get(k);
      if (v) out[k] = v;
    }
    if (!out.referrer && document.referrer) out.referrer = document.referrer;
    sessionStorage.setItem('ms_attr', JSON.stringify(out));
  } catch {}
  return out;
}
