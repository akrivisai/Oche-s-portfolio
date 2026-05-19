import Image from 'next/image';
import { Reveal } from './Reveal';
import { ABOUT } from '@/lib/content';

export function About() {
  return (
    <section className="block" id="about" aria-label="About">
      <div className="container">
        <Reveal as="header" className="section-head">
          <div className="eyebrow">About</div>
          <h2>
            How I <span className="italic">got here.</span>
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-photo">
            <Image
              src={`/${ABOUT.photo}`}
              alt="Portrait of Ameh Matthew Oche"
              width={1048}
              height={1080}
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </Reveal>
          <Reveal className="about-prose">
            {ABOUT.paragraphs.map((para, i) => (
              <p key={i} className={ABOUT.paragraphMuted[i] ? 'muted' : undefined}>
                {para}
              </p>
            ))}
            <div className="about-meta">
              {ABOUT.meta.map((m) => (
                <span key={m} className="tag-pill">
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
