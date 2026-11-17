'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cards, site } from '@/site.config';
import { CardFace, Glyph, PlaceholderTag } from './Visuals';

// The "aha" moment: a card that turns into the real object at home.
export function CardToLife() {
  const [active, setActive] = useState(0);
  const [real, setReal] = useState(false);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const card = cards[active];

  // Plays itself once in view: card → real life, then the next card.
  useEffect(() => {
    if (!auto) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    const step = (isReal: boolean) => {
      timer = setTimeout(() => {
        if (!visible) return;
        if (!isReal) { setReal(true); step(true); }
        else { setReal(false); setActive((a) => (a + 1) % cards.length); step(false); }
      }, isReal ? 4200 : 2200);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      clearTimeout(timer);
      if (visible) step(real);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  const pick = (i: number) => { setAuto(false); setActive(i); setReal(false); };

  return (
    <div className="ctl" ref={ref}>
      <div className="ctl-tabs" role="tablist" aria-label="Choose a card">
        {cards.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={i === active}
            className={i === active ? 'is-on' : ''}
            onClick={() => pick(i)}
          >
            {c.object}
          </button>
        ))}
      </div>

      <div className={`ctl-stage${real ? ' is-real' : ''}`} aria-live="polite">
        {card.cardImage ? null : <PlaceholderTag>Placeholder art</PlaceholderTag>}
        <div className="ctl-layer ctl-card" aria-hidden={real}>
          <CardFace card={card} className="ctl-cardface" sizes="(max-width: 640px) 55vw, 260px" label={false} />
        </div>
        <div className="ctl-layer ctl-real" aria-hidden={!real}>
          {card.realImage ? (
            <Image src={card.realImage} alt={card.realAlt} fill sizes="(max-width: 900px) 100vw, 640px" />
          ) : (
            <div className="ctl-scene" role="img" aria-label={card.realAlt}>
              <span className="ctl-scene-wall" />
              <span className="ctl-scene-shelf" />
              <Glyph kind={card.glyph} className="ctl-scene-obj" />
              {site.flags.showPlaceholderLabels ? (
                <span className="ctl-scene-label">Photo coming: {card.realAlt.toLowerCase()}</span>
              ) : null}
            </div>
          )}
          <div className="ctl-bubble">
            <span className="ctl-child">“{card.childLine}</span>
            <span className="ctl-verse">{card.verse}”</span>
            <span className="ctl-ref">{card.ref}</span>
          </div>
        </div>
      </div>

      <div className="ctl-controls">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => { setAuto(false); setReal((r) => !r); }}
        >
          {real ? 'Show the card' : `Now spot it at home →`}
        </button>
      </div>
    </div>
  );
}
