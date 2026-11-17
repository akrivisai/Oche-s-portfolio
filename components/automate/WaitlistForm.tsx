'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { ArrowRight, Check, Copy, Loader2 } from 'lucide-react';
import {
  DEPOSIT,
  HOURS_LOST,
  OFFER,
  PRICE_BANDS,
  PRICING_MODEL,
  QUANTITY,
  TEAM_SIZE,
  TIMELINE,
  TOOLS,
  USE_CASES,
  type Currency,
  type Option,
} from '@/lib/waitlist';

type Stage = 'email' | 'profile' | 'done';

type Profile = {
  useCases: string[];
  task: string;
  quantity: string;
  tools: string[];
  teamSize: string;
  hoursLost: string;
  pricingModel: string;
  currency: Currency;
  priceBand: string;
  timeline: string;
  deposit: string;
  company: string;
  whatsapp: string;
};

const EMPTY_PROFILE: Profile = {
  useCases: [],
  task: '',
  quantity: '',
  tools: [],
  teamSize: '',
  hoursLost: '',
  pricingModel: '',
  currency: 'NGN',
  priceBand: '',
  timeline: '',
  deposit: '',
  company: '',
  whatsapp: '',
};

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
  'ttclid',
  'ref',
];
const STORAGE_KEY = 'automate_attribution';

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

function fireConversion(name: 'Lead' | 'CompleteRegistration', data: Record<string, string>) {
  try {
    track(name === 'Lead' ? 'waitlist_email' : 'waitlist_profile', data);
  } catch {}
  const w = window as unknown as { fbq?: Fbq; gtag?: Gtag; ttq?: { track: Fbq } };
  try { w.fbq?.('track', name); } catch {}
  try { w.gtag?.('event', name === 'Lead' ? 'generate_lead' : 'sign_up'); } catch {}
  try { w.ttq?.track(name === 'Lead' ? 'SubmitForm' : 'CompleteRegistration'); } catch {}
}

function readAttribution(): Record<string, string> {
  const fromUrl: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ATTRIBUTION_KEYS) {
      const v = params.get(key);
      if (v) fromUrl[key] = v;
    }
  } catch {}
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {}
  const merged = {
    referrer: document.referrer || '',
    landingPath: window.location.pathname + window.location.search,
    ...stored,
    ...fromUrl,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {}
  return merged;
}

function newId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

async function send(payload: Record<string, unknown>) {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
}

function Chips({
  name,
  options,
  value,
  onChange,
  multi = false,
}: {
  name: string;
  options: Option[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const selected = (v: string) => (multi ? (value as string[]).includes(v) : value === v);
  const toggle = (v: string) => {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    } else {
      onChange(v);
    }
  };
  return (
    <div className="lp-chips" role={multi ? 'group' : 'radiogroup'} aria-label={name}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role={multi ? 'checkbox' : 'radio'}
          aria-checked={selected(o.value)}
          className={`lp-chip${selected(o.value) ? ' is-on' : ''}`}
          onClick={() => toggle(o.value)}
        >
          {multi && selected(o.value) ? <Check size={13} aria-hidden /> : null}
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="lp-field">
      <div className="lp-label">
        {label}
        {hint ? <span className="lp-hint">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

export function EmailCapture({ compact = false }: { compact?: boolean }) {
  // The hero form hands off to the main form section.
  const [email, setEmail] = useState('');
  return (
    <form
      className={`lp-inline${compact ? ' is-compact' : ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('automate:email', { detail: email }));
        document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      <label htmlFor="hero-email" className="sr-only">Work email</label>
      <input
        id="hero-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="lp-btn">
        Join the waitlist <ArrowRight size={16} aria-hidden />
      </button>
    </form>
  );
}

export function WaitlistForm() {
  const [stage, setStage] = useState<Stage>('email');
  const [leadId] = useState(newId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const attribution = useRef<Record<string, string>>({});
  const startedAt = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    attribution.current = readAttribution();
    startedAt.current = Date.now();
    const onEmail = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (value) {
        setEmail(value);
        void captureRef.current(value);
      }
    };
    window.addEventListener('automate:email', onEmail);
    return () => window.removeEventListener('automate:email', onEmail);
  }, []);

  const set = <K extends keyof Profile>(key: K, v: Profile[K]) =>
    setProfile((p) => ({ ...p, [key]: v }));

  const bands = useMemo(() => {
    const model = profile.pricingModel === 'monthly' ? 'monthly' : 'one_off';
    return PRICE_BANDS[profile.currency][model];
  }, [profile.currency, profile.pricingModel]);

  const priceLabel = bands.find((b) => b.value === profile.priceBand)?.label ?? '';

  const scrollToCard = () =>
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  async function captureEmail(value: string) {
    setError('');
    setBusy(true);
    try {
      await send({ stage: 'email', leadId, name, email: value, website, ...attribution.current });
      fireConversion('Lead', { source: attribution.current.utm_source ?? 'direct' });
      setStage('profile');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const captureRef = useRef(captureEmail);
  captureRef.current = captureEmail;

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    await captureEmail(email);
    scrollToCard();
  }

  async function submitProfile(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!profile.useCases.length || !profile.quantity || !profile.priceBand) {
      setError('Please answer the three questions marked with *.');
      return;
    }
    setBusy(true);
    try {
      await send({
        stage: 'profile',
        leadId,
        name,
        email,
        website,
        ...profile,
        useCases: profile.useCases.join(', '),
        tools: profile.tools.join(', '),
        priceLabel,
        secondsOnForm: Math.round((Date.now() - startedAt.current) / 1000),
        ...attribution.current,
      });
      fireConversion('CompleteRegistration', {
        quantity: profile.quantity,
        price: priceLabel,
        deposit: profile.deposit,
      });
      setStage('done');
      scrollToCard();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function share() {
    const url = window.location.origin + window.location.pathname + '?ref=share';
    const text = 'Found this: done-for-you automations for Google Sheets, Excel and email.';
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text, url });
        return;
      }
    } catch {}
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="lp-form-card" ref={cardRef}>
      <ol className="lp-progress" aria-label="Progress">
        <li className={stage === 'email' ? 'is-current' : 'is-done'}>
          <span>{stage === 'email' ? '1' : <Check size={12} aria-hidden />}</span> Reserve your spot
        </li>
        <li className={stage === 'profile' ? 'is-current' : stage === 'done' ? 'is-done' : ''}>
          <span>{stage === 'done' ? <Check size={12} aria-hidden /> : '2'}</span> Tell us what to automate
        </li>
      </ol>

      {stage === 'email' && (
        <form onSubmit={submitEmail} noValidate={false}>
          <h3 className="lp-form-title">Reserve your founding-member spot</h3>
          <p className="lp-form-sub">
            {OFFER.slots} founding spots: {OFFER.discount}, {OFFER.extra}. Free to join.
          </p>
          <div className="lp-row">
            <label className="lp-input">
              <span>First name</span>
              <input
                id="join-name"
                type="text"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada"
              />
            </label>
            <label className="lp-input">
              <span>Work email *</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </label>
          </div>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="lp-hp"
            aria-hidden
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          {error ? <p className="lp-error" role="alert">{error}</p> : null}
          <button type="submit" className="lp-btn lp-btn-block" disabled={busy}>
            {busy ? <Loader2 size={16} className="lp-spin" aria-hidden /> : null}
            Continue <ArrowRight size={16} aria-hidden />
          </button>
          <p className="lp-fine">No spam. We only email you about your spot and the launch.</p>
        </form>
      )}

      {stage === 'profile' && (
        <form onSubmit={submitProfile}>
          <h3 className="lp-form-title">
            {name ? `You're in, ${name}.` : "You're in."} Now, what should we automate?
          </h3>
          <p className="lp-form-sub">
            Takes about a minute. Your answers decide what we build first and how we price it.
          </p>

          <Field label="What would you automate first? *" hint="Pick any">
            <Chips name="Use cases" multi options={USE_CASES} value={profile.useCases} onChange={(v) => set('useCases', v as string[])} />
          </Field>

          <Field label="Describe one task you do by hand today" hint="Optional">
            <textarea
              rows={3}
              value={profile.task}
              onChange={(e) => set('task', e.target.value)}
              placeholder="e.g. Every Friday I copy sales from 4 branch sheets into one report and email it to the MD."
            />
          </Field>

          <Field label="How many workflows would you want automated? *">
            <Chips name="Quantity" options={QUANTITY} value={profile.quantity} onChange={(v) => set('quantity', v as string)} />
          </Field>

          <Field label="Which tools do you use?" hint="Pick any">
            <Chips name="Tools" multi options={TOOLS} value={profile.tools} onChange={(v) => set('tools', v as string[])} />
          </Field>

          <div className="lp-split">
            <Field label="Team size">
              <Chips name="Team size" options={TEAM_SIZE} value={profile.teamSize} onChange={(v) => set('teamSize', v as string)} />
            </Field>
            <Field label="Hours lost to this each week">
              <Chips name="Hours lost" options={HOURS_LOST} value={profile.hoursLost} onChange={(v) => set('hoursLost', v as string)} />
            </Field>
          </div>

          <Field label="How would you prefer to pay?">
            <Chips name="Pricing model" options={PRICING_MODEL} value={profile.pricingModel} onChange={(v) => { set('pricingModel', v as string); set('priceBand', ''); }} />
          </Field>

          <Field
            label={`What would you pay ${profile.pricingModel === 'monthly' ? 'per month' : 'for one automation'} that saved you those hours? *`}
          >
            <div className="lp-currency" role="radiogroup" aria-label="Currency">
              {(['NGN', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={profile.currency === c}
                  className={profile.currency === c ? 'is-on' : ''}
                  onClick={() => { set('currency', c); set('priceBand', ''); }}
                >
                  {c === 'NGN' ? '₦ NGN' : '$ USD'}
                </button>
              ))}
            </div>
            <Chips name="Price" options={bands} value={profile.priceBand} onChange={(v) => set('priceBand', v as string)} />
          </Field>

          <div className="lp-split">
            <Field label="When do you need it?">
              <Chips name="Timeline" options={TIMELINE} value={profile.timeline} onChange={(v) => set('timeline', v as string)} />
            </Field>
            <Field label="Would you pay a small refundable deposit to lock in founding pricing?">
              <Chips name="Deposit" options={DEPOSIT} value={profile.deposit} onChange={(v) => set('deposit', v as string)} />
            </Field>
          </div>

          <div className="lp-row">
            {name ? null : (
              <label className="lp-input">
                <span>First name <em>optional</em></span>
                <input type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
            )}
            <label className="lp-input">
              <span>Company <em>optional</em></span>
              <input type="text" autoComplete="organization" value={profile.company} onChange={(e) => set('company', e.target.value)} />
            </label>
            <label className="lp-input">
              <span>WhatsApp number <em>optional, for a quick follow-up</em></span>
              <input type="tel" autoComplete="tel" inputMode="tel" value={profile.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+234…" />
            </label>
          </div>

          {error ? <p className="lp-error" role="alert">{error}</p> : null}
          <button type="submit" className="lp-btn lp-btn-block" disabled={busy}>
            {busy ? <Loader2 size={16} className="lp-spin" aria-hidden /> : null}
            Submit my answers <ArrowRight size={16} aria-hidden />
          </button>
          <button type="button" className="lp-skip" onClick={() => setStage('done')}>
            Skip for now. My spot is already reserved.
          </button>
        </form>
      )}

      {stage === 'done' && (
        <div className="lp-done">
          <div className="lp-done-icon"><Check size={26} aria-hidden /></div>
          <h3 className="lp-form-title">You&rsquo;re on the list.</h3>
          <p className="lp-form-sub">
            We&rsquo;ll email <b>{email}</b> when your founding spot opens. If you shared a WhatsApp
            number, expect a short message from us first.
          </p>
          <p className="lp-form-sub">Know someone drowning in spreadsheets?</p>
          <button type="button" className="lp-btn lp-btn-ghost" onClick={share}>
            {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
            {copied ? 'Link copied' : 'Share this page'}
          </button>
        </div>
      )}
    </div>
  );
}
