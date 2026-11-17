import type { Metadata } from 'next';
import { Check, Clock, FileSpreadsheet, Mail, ShieldCheck, Workflow } from 'lucide-react';
import { EmailCapture, WaitlistForm } from '@/components/automate/WaitlistForm';
import { WorkflowDemo } from '@/components/automate/WorkflowDemo';
import { StickyCta } from '@/components/automate/StickyCta';
import { AUTOMATIONS, BRAND, FAQS, OFFER, PAINS, STEPS } from '@/lib/waitlist';
import './landing.css';

const title = `${BRAND.name}: done-for-you spreadsheet & email automation`;
const description =
  'Stop doing the same spreadsheet work every week. We build automations inside Google Sheets, Excel, Forms and email so reports, approvals and reminders run themselves. Join the waitlist.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/automate' },
  openGraph: { title, description, type: 'website', url: '/automate' },
  twitter: { card: 'summary_large_image', title, description },
};

const TOOL_ICONS = [
  { icon: FileSpreadsheet, label: 'Google Sheets' },
  { icon: FileSpreadsheet, label: 'Excel' },
  { icon: Workflow, label: 'Google Forms' },
  { icon: Mail, label: 'Gmail & Outlook' },
];

export default function AutomateLanding() {
  return (
    <div className="lp">
      <header className="lp-top">
        <div className="container lp-top-inner">
          <a href="#top" className="lp-logo" aria-label={BRAND.name}>
            <span className="lp-logo-mark" aria-hidden>A</span>
            {BRAND.name}
          </a>
          <a href="#join" className="lp-btn lp-btn-sm">Join the waitlist</a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="lp-hero">
          <div className="container lp-hero-grid">
            <div>
              <div className="eyebrow lp-eyebrow">
                <span className="lp-pulse" aria-hidden /> Founding waitlist open · {OFFER.slots} spots
              </div>
              <h1 className="display lp-h1">
                Stop doing the same spreadsheet work <span className="lp-italic">every week.</span>
              </h1>
              <p className="lp-lede">
                We build done-for-you automations inside Google Sheets, Excel, Forms and email, so
                your reports send themselves, approvals route themselves and reminders go out on time.
              </p>
              <EmailCapture />
              <ul className="lp-ticks">
                <li><Check size={14} aria-hidden /> No new software to learn</li>
                <li><Check size={14} aria-hidden /> Fixed price per automation</li>
                <li><Check size={14} aria-hidden /> Founding members: {OFFER.discount}</li>
              </ul>
            </div>
            <WorkflowDemo />
          </div>
          <div className="container">
            <div className="lp-tools">
              <span>Works with the tools you already use</span>
              <ul>
                {TOOL_ICONS.map(({ icon: Icon, label }) => (
                  <li key={label}><Icon size={15} aria-hidden /> {label}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pain */}
        <section className="lp-section">
          <div className="container">
            <div className="lp-head">
              <div className="eyebrow">Sound familiar?</div>
              <h2 className="lp-h2">Your team is doing a computer&rsquo;s job.</h2>
            </div>
            <div className="lp-pains">
              {PAINS.map((p) => (
                <div key={p.title} className="lp-pain">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we automate */}
        <section className="lp-section">
          <div className="container">
            <div className="lp-head">
              <div className="eyebrow">What we automate</div>
              <h2 className="lp-h2">If you repeat it, we can probably <span className="lp-italic">automate it.</span></h2>
            </div>
            <div className="lp-cards">
              {AUTOMATIONS.map((a) => (
                <article key={a.title} className="lp-card">
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                  <div className="lp-example"><Clock size={13} aria-hidden /> {a.example}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="lp-section">
          <div className="container">
            <div className="lp-head">
              <div className="eyebrow">How it works</div>
              <h2 className="lp-h2">Three steps. No IT project.</h2>
            </div>
            <ol className="lp-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="lp-step">
                  <span className="lp-step-num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Founder */}
        <section className="lp-section">
          <div className="container">
            <div className="lp-founder">
              <div className="eyebrow">Who builds it</div>
              <p className="lp-founder-quote">
                &ldquo;I&rsquo;ve spent years inside operations and HR teams replacing email-chain
                approvals, manual reports and copy-paste admin with systems that run on their own.
                {` ${BRAND.short}`} brings that to teams that don&rsquo;t have an engineer on staff.&rdquo;
              </p>
              <div className="lp-founder-meta">
                <b>{BRAND.founder}</b> · Founder · Product manager, enterprise systems · MBA
              </div>
              <div className="lp-trust">
                <span><ShieldCheck size={15} aria-hidden /> Your data stays in your own accounts</span>
                <span><ShieldCheck size={15} aria-hidden /> Remove our access at any time</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="lp-section lp-join" id="join">
          <div className="container lp-join-grid">
            <div>
              <div className="eyebrow">Founding members</div>
              <h2 className="lp-h2">Get the first builds, at the lowest price we&rsquo;ll ever offer.</h2>
              <ul className="lp-perks">
                <li><Check size={16} aria-hidden /> <span><b>{OFFER.discount}</b>, {OFFER.extra}</span></li>
                <li><Check size={16} aria-hidden /> <span><b>Priority build slot</b> in sign-up order</span></li>
                <li><Check size={16} aria-hidden /> <span><b>A say in what we build</b>: your answers shape the first templates and pricing</span></li>
              </ul>
              <p className="lp-muted">Only {OFFER.slots} founding spots. Joining is free and commits you to nothing.</p>
            </div>
            <WaitlistForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="lp-section">
          <div className="container lp-faq-wrap">
            <div className="lp-head">
              <div className="eyebrow">Questions</div>
              <h2 className="lp-h2">Before you join</h2>
            </div>
            <div className="lp-faq">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="lp-final">
          <div className="container">
            <h2 className="display lp-final-h">Give your team its Mondays back.</h2>
            <EmailCapture compact />
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="container lp-footer-inner">
          <span>© 2026 {BRAND.name}</span>
          <a href="/">By {BRAND.founder}</a>
        </div>
      </footer>

      <StickyCta />
    </div>
  );
}
