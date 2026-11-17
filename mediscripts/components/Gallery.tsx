'use client';

import { useEffect, useRef, useState } from 'react';
import { cards, site } from '@/site.config';
import { CardBack, CardFace } from './Visuals';

export function Gallery() {
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector('li');
    el.scrollBy({ left: dir * ((item?.clientWidth ?? 240) + 16), behavior: 'smooth' });
  };

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const current = open !== null ? cards[open] : null;

  return (
    <div className="gallery">
      <ul className="gallery-track" ref={track} aria-label="Cards from the Word Pack">
        {cards.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              className="gallery-item"
              onClick={() => { setFlipped(false); setOpen(i); }}
              aria-label={`Open the ${c.object} card`}
            >
              <CardFace card={c} sizes="(max-width: 640px) 62vw, 240px" label={false} />
              <span className="gallery-cap">
                <b>{c.object}</b> · {c.ref}
                {!c.cardImage && site.flags.showPlaceholderLabels ? <em> · placeholder art</em> : null}
              </span>
            </button>
          </li>
        ))}
        <li>
          <div className="gallery-more">
            <span className="gallery-more-num">+{site.product.cards - cards.length}</span>
            <span>more cards in every pack, each with its own picture and verse</span>
          </div>
        </li>
      </ul>
      <div className="gallery-nav">
        <button type="button" className="icon-btn" onClick={() => scrollBy(-1)} aria-label="Previous cards">←</button>
        <button type="button" className="icon-btn" onClick={() => scrollBy(1)} aria-label="Next cards">→</button>
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dialog.current) setOpen(null); }}
        aria-label={current ? `${current.object} card` : 'Card'}
      >
        {current ? (
          <div className="lightbox-inner">
            <button
              type="button"
              className={`flip${flipped ? ' is-flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
              aria-label={flipped ? 'Show the picture side' : 'Flip to see the verse'}
            >
              <span className="flip-face flip-front"><CardFace card={current} sizes="(max-width: 640px) 75vw, 340px" label={false} priority /></span>
              <span className="flip-face flip-back"><CardBack card={current} priority /></span>
            </button>
            <p className="lightbox-hint">{flipped ? 'Tap to see the picture' : 'Tap the card to see the verse'}</p>
            <button type="button" className="btn btn-ghost lightbox-close" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
