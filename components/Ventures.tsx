import { ArrowUpRight, GraduationCap, Briefcase } from 'lucide-react';
import { Reveal } from './Reveal';
import { VENTURES } from '@/lib/content';

const ICONS = [GraduationCap, Briefcase];

export function Ventures() {
  return (
    <section className="block" id="ventures" aria-label="Ventures">
      <div className="container">
        <Reveal as="header" className="section-head">
          <div className="eyebrow">Ventures</div>
          <h2>
            Products I <span className="italic">founded.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '20px' }}>
          {VENTURES.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={v.name} style={{ height: '100%' }}>
                <div className="project" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Icon size={24} aria-hidden="true" /></div>
                  <div className="project-role">{v.role}</div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 420, margin: '6px 0 12px', letterSpacing: '-0.01em' }}>{v.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: v.points.length ? '12px' : '24px' }}>
                    {v.summary}
                  </p>
                  {v.points.length ? (
                    <ul className="case-list" style={{ marginBottom: '24px' }}>
                      {v.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div style={{ flex: 1 }} />
                  {v.url ? (
                    <a href={v.url} target="_blank" rel="noopener noreferrer" className="project-expand" style={{ alignSelf: 'flex-start', textDecoration: 'none' }}>
                      Visit {v.name} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
