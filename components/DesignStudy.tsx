'use client';

import { FileText, MonitorPlay } from 'lucide-react';
import { Reveal } from './Reveal';

// TODO: the design document and prototype links were removed because they
// could not be confirmed free of the original company's branding. Add the links
// back here once both files are clean; the links render only when set.
const PROTOTYPE_URL = '';
const DESIGN_DOC_URL = '';

export function DesignStudy() {
  return (
    <section className="block" id="design-study">
      <div className="container">
        <Reveal as="header" className="section-head" style={{ marginBottom: '40px' }}>
          <div className="eyebrow">FEATURED DESIGN STUDY · 2026</div>
          <h2 style={{ marginBottom: '8px' }}>
            Employee lifecycle operating design
          </h2>
          <p className="lede" style={{ opacity: 0.7, color: 'var(--text)' }}>
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--sans)' }}>A design study for a global employer-of-record company.</span>
          </p>
        </Reveal>

        <Reveal>
          <p style={{ maxWidth: '880px', marginBottom: '48px', fontSize: '16px', lineHeight: 1.65, color: 'var(--text-muted)' }}>
            A self-directed design exercise: how a globally distributed employer-of-record company could run resignations, conversions and offboarding as one operating system, with clear ownership, async-first workflows, compliance checks built in, and AI used where it helps and kept out where it does not.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '20px', marginBottom: '32px' }}>

          <Reveal style={{ height: '100%' }}>
            <div className="project" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><FileText size={24} /></div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 420, marginBottom: '12px', letterSpacing: '-0.01em' }}>Design Document</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                An 8,500-word operational design covering architecture, workflow maps for resignations / conversions / offboarding, a five-country compliance matrix, dashboard design, a lessons-learned framework, AI use cases with guardrails, and a phased rollout plan.
              </p>
              {DESIGN_DOC_URL ? (
                <a href={DESIGN_DOC_URL} target="_blank" rel="noopener noreferrer" className="project-expand" style={{ alignSelf: 'flex-start', textDecoration: 'none' }}>
                  Read the document &rarr;
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal style={{ height: '100%' }}>
            <div className="project" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'color-mix(in oklab, var(--accent) 50%, var(--border))', boxShadow: '0 0 0 1px color-mix(in oklab, var(--accent) 15%, transparent) inset' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><MonitorPlay size={24} /></div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 420, marginBottom: '12px', letterSpacing: '-0.01em' }}>Interactive Prototype</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                A working three-dashboard console — Specialist, Manager, and Compliance views — with realistic mock data, a floating navigation overlay, hash-based routing, and operational details across 10 countries. Built to show that the operational thinking ships.
              </p>
              {PROTOTYPE_URL ? (
                <a href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" className="project-expand" style={{ alignSelf: 'flex-start', color: 'var(--accent)', borderColor: 'color-mix(in oklab, var(--accent) 40%, var(--border))', textDecoration: 'none' }}>
                  Launch the prototype &rarr;
                </a>
              ) : null}
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
