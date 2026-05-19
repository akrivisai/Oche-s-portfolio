import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { Reveal } from './Reveal';
import { RECOGNITIONS } from '@/lib/content';

export function Recognition() {
  return (
    <section className="block" id="recognition" aria-label="Recognition">
      <div className="container">
        <Reveal as="header" className="section-head">
          <div className="eyebrow">Recognition</div>
          <h2>
            Earned, <span className="italic">not claimed.</span>
          </h2>
        </Reveal>
        <Reveal className="rec-grid">
          {RECOGNITIONS.map((rec) => (
            <article
              key={rec.title}
              className={`rec${rec.kind === 'trophy' ? ' promotion' : ''}`}
            >
              <div className="rec-media" aria-hidden={rec.kind === 'trophy' ? 'true' : undefined}>
                {rec.kind === 'image' && rec.image ? (
                  <Image
                    src={`/${rec.image}`}
                    alt={rec.alt ?? ''}
                    width={800}
                    height={600}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                ) : (
                  <>
                    <Trophy className="trophy" strokeWidth={1.4} aria-hidden="true" />
                    {rec.badge ? <span className="badge">{rec.badge}</span> : null}
                  </>
                )}
              </div>
              <div className="rec-body">
                <h3 className="rec-title">{rec.title}</h3>
                <div className="rec-meta">{rec.meta}</div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
