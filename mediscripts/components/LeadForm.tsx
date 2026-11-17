'use client';

import { useState } from 'react';
import { site, whatsappUrl } from '@/site.config';
import { attribution, trackEvent } from './track';

type Kind = 'waitlist' | 'bulk';

const INTERESTS = [
  'Prayer Pack',
  'Obedience Pack',
  'Word Pack · Ages 2–5',
  'Word Pack · Ages 10–12',
];

const BULK_QTY = ['10–24', '25–49', '50–99', '100+'];

export function LeadForm({ kind }: { kind: Kind }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'fallback'>('idle');
  const [error, setError] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    if (form.get('company_site')) return; // honeypot
    const data: Record<string, string> = {};
    form.forEach((v, k) => { if (typeof v === 'string' && k !== 'company_site') data[k] = v.trim(); });
    if (!data.phone && !data.email) {
      setError('Please add a WhatsApp number or an email so we can reach you.');
      return;
    }
    if (kind === 'waitlist') data.interests = interests.join(', ');

    const summary =
      kind === 'bulk'
        ? `Hi MediScripts, I'd like bulk pricing for the Word Pack. Name: ${data.name}. Organisation: ${data.organisation || '-'}. Quantity: ${data.quantity || '-'}. ${data.message || ''}`
        : `Hi MediScripts, please add me to the waitlist for: ${data.interests || 'new packs'}. Name: ${data.name}.`;

    setStatus('sending');
    try {
      const res = await fetch(site.forms.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, ...data, ...attribution(), page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent(kind === 'bulk' ? 'Contact' : 'Lead', kind === 'bulk' ? 'Contact' : 'SubmitForm', { kind });
      setStatus('done');
    } catch {
      // No endpoint yet, or it failed: hand over to WhatsApp so the lead isn't lost.
      setFallbackUrl(whatsappUrl(summary));
      setStatus('fallback');
    }
  }

  if (status === 'done') {
    return (
      <div className="form-done" role="status">
        <b>{kind === 'bulk' ? 'Thank you. We’ll be in touch with pricing soon.' : 'You’re on the list.'}</b>
        <span>
          {kind === 'bulk'
            ? 'Expect a message from us on WhatsApp or email.'
            : 'We’ll let you know as soon as your pack is ready.'}
        </span>
      </div>
    );
  }

  if (status === 'fallback') {
    return (
      <div className="form-done" role="status">
        <b>Almost done: send it to us on WhatsApp</b>
        <span>We couldn’t save your details just now. Tap below to send them to us directly. Your message is ready.</span>
        <a className="btn btn-primary" href={fallbackUrl} target="_blank" rel="noopener">
          Send on WhatsApp
        </a>
      </div>
    );
  }

  const id = (n: string) => `${kind}-${n}`;

  return (
    <form className="lead" onSubmit={submit} noValidate>
      {kind === 'waitlist' ? (
        <fieldset className="lead-interests">
          <legend>I’m interested in</legend>
          <div className="chips">
            {INTERESTS.map((i) => {
              const on = interests.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  className={`chip${on ? ' is-on' : ''}`}
                  onClick={() => setInterests((xs) => (on ? xs.filter((x) => x !== i) : [...xs, i]))}
                >
                  {i}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="lead-grid">
        <div className="field">
          <label htmlFor={id('name')}>Your name</label>
          <input id={id('name')} name="name" required autoComplete="name" />
        </div>
        {kind === 'bulk' ? (
          <div className="field">
            <label htmlFor={id('org')}>Church or school</label>
            <input id={id('org')} name="organisation" autoComplete="organization" />
          </div>
        ) : null}
        <div className="field">
          <label htmlFor={id('phone')}>WhatsApp number</label>
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234" />
        </div>
        <div className="field">
          <label htmlFor={id('email')}>Email <span>(optional)</span></label>
          <input id={id('email')} name="email" type="email" autoComplete="email" />
        </div>
        {kind === 'bulk' ? (
          <>
            <div className="field">
              <label htmlFor={id('qty')}>Roughly how many packs?</label>
              <select id={id('qty')} name="quantity" defaultValue="">
                <option value="" disabled>Choose…</option>
                {BULK_QTY.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div className="field field-wide">
              <label htmlFor={id('msg')}>Anything else? <span>(optional)</span></label>
              <textarea id={id('msg')} name="message" rows={3} placeholder="e.g. Children’s church of about 60 kids, needed by March." />
            </div>
          </>
        ) : null}
      </div>
      <input name="company_site" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
        {status === 'sending'
          ? 'Sending…'
          : kind === 'bulk'
            ? 'Request bulk pricing'
            : 'Join the waitlist'}
      </button>
    </form>
  );
}
