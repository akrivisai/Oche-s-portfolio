import { Reveal } from './Reveal';
import { CAPABILITIES } from '@/lib/content';

export function Capabilities() {
  return (
    <section className="block" id="capabilities" aria-label="Capabilities">
      <div className="container">
        <Reveal as="header" className="section-head">
          <div className="eyebrow">Capabilities</div>
          <h2>
            Where I create <span className="italic">leverage.</span>
          </h2>
        </Reveal>
        <Reveal className="cap-grid">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="cap">
                <div className="cap-icon">
                  <Icon strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
