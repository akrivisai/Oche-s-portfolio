'use client';

import { FileText, Image as ImageIcon, MonitorPlay } from 'lucide-react';
import { Reveal } from './Reveal';

const PROTOTYPE_URL = "https://lifecycle-ops-prototype.vercel.app/prototype/index.html";
const DESIGN_DOC_URL = "https://smoggy-geometry-600.notion.site/ebd//e1a69790f03b4357b22c2eee0113d752";
const VISUAL_DEPICTION_URL = "https://smoggy-geometry-600.notion.site/ebd//e1a69790f03b4357b22c2eee0113d752";

export function LifecycleOps() {
  return (
    <section className="block" id="lifecycle-ops">
      <div className="container">
        <Reveal as="header" className="section-head" style={{ marginBottom: '40px' }}>
          <div className="eyebrow">FEATURED DEEP DIVE · 2026</div>
          <h2 style={{ marginBottom: '8px' }}>
            Lifecycle Operations Console
          </h2>
          <p className="lede" style={{ opacity: 0.7, color: 'var(--text)' }}>
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--sans)' }}>A system approach to Employee Relations &amp; Transitions at scale.</span>
          </p>
        </Reveal>
        
        <Reveal>
          <p style={{ maxWidth: '880px', marginBottom: '48px', fontSize: '16px', lineHeight: 1.65, color: 'var(--text-muted)' }}>
            Built as a design exercise for a Lifecycle Operations Lead role at Remote.com — a globally distributed Employer-of-Record platform operating in 80+ countries. This artifact translates publicly stated principles from Remote's AI ethics doctrine, async-first operating philosophy, and Compliance Watchtower product into an operational layer for resignations, conversions, and offboarding. The thinking is mine; the alignment is to their published philosophy.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          {/* Card 1 */}
          <Reveal style={{ height: '100%' }}>
            <div className="project" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><FileText size={24} /></div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 420, marginBottom: '12px', letterSpacing: '-0.01em' }}>Design Document</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                An 8,500-word operational design covering architecture, workflow maps for resignations / conversions / offboarding, a five-country compliance matrix, dashboard design, lessons-learned framework, AI use cases anchored to Remote's published five principles, and a phased rollout plan.
              </p>
              <a href={DESIGN_DOC_URL} target="_blank" rel="noopener noreferrer" className="project-expand" style={{ alignSelf: 'flex-start', textDecoration: 'none' }}>
                Read the document &rarr;
              </a>
            </div>
          </Reveal>



          {/* Card 3 */}
          <Reveal style={{ height: '100%' }}>
            <div className="project" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'color-mix(in oklab, var(--accent) 50%, var(--border))', boxShadow: '0 0 0 1px color-mix(in oklab, var(--accent) 15%, transparent) inset' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><MonitorPlay size={24} /></div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 420, marginBottom: '12px', letterSpacing: '-0.01em' }}>Interactive Prototype</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                A working three-dashboard console — Specialist, Manager, and Compliance views — with realistic mock data, a floating navigation overlay, hash-based routing, and operational details across 10 countries. Built to demonstrate that the operational thinking ships.
              </p>
              <a href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" className="project-expand" style={{ alignSelf: 'flex-start', color: 'var(--accent)', borderColor: 'color-mix(in oklab, var(--accent) 40%, var(--border))', textDecoration: 'none' }}>
                Launch the prototype &rarr;
              </a>
            </div>
          </Reveal>

        </div>

        <Reveal>
          <p style={{ fontSize: '13.5px', fontStyle: 'italic', color: 'var(--text-faint)', margin: 0 }}>
            Each artifact stands alone. Read in any order — though the prototype is the fastest way to see it land.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
