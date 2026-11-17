'use client';

import { useEffect, useState } from 'react';
import { orderUrl, site } from '@/site.config';
import { attribution, trackEvent } from './track';

const QTYS = site.checkout.quantities;

function onOrder(qty: number) {
  trackEvent('InitiateCheckout', 'InitiateCheckout', {
    value: site.product.priceValue ?? undefined,
    currency: site.product.currency,
    num_items: qty,
  });
}

export function OrderBox({ dark = false, id }: { dark?: boolean; id?: string }) {
  const [qty, setQty] = useState(QTYS[0]);
  const plus = qty === QTYS[QTYS.length - 1] && QTYS.length > 1;
  useEffect(() => { attribution(); }, []);
  return (
    <div className={`order${dark ? ' order-dark' : ''}`} id={id}>
      <div className="qty" role="radiogroup" aria-label="How many packs?">
        <span className="qty-label">Packs</span>
        {QTYS.map((q, i) => {
          const last = i === QTYS.length - 1 && QTYS.length > 1;
          return (
            <button
              key={q}
              type="button"
              role="radio"
              aria-checked={qty === q}
              className={qty === q ? 'is-on' : ''}
              onClick={() => setQty(q)}
            >
              {q}
              {last ? '+' : ''}
            </button>
          );
        })}
      </div>
      <a
        className="btn btn-primary btn-lg"
        href={orderUrl(qty, plus)}
        target="_blank"
        rel="noopener"
        onClick={() => onOrder(qty)}
      >
        Order the Word Pack · {site.product.priceDisplay}
      </a>
      <p className="order-note">
        {site.checkout.mode === 'whatsapp'
          ? 'Orders open in WhatsApp with your message ready to send.'
          : 'Secure checkout.'}
      </p>
    </div>
  );
}

export function StickyOrder() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    const final = document.getElementById('order');
    if (!hero) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? seen.add(e.target) : seen.delete(e.target);
        const pastHero = hero.getBoundingClientRect().bottom < 0;
        setShow(pastHero && seen.size === 0);
      },
      { threshold: 0 }
    );
    io.observe(hero);
    if (final) io.observe(final);
    const onScroll = () => {
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      setShow(pastHero && !seen.size);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
  return (
    <div className={`sticky${show ? ' is-shown' : ''}`} aria-hidden={!show}>
      <div className="sticky-info">
        <b>The Word Pack</b>
        <span>{site.product.priceDisplay} · {site.product.edition}</span>
      </div>
      <a
        className="btn btn-primary"
        href={orderUrl(1)}
        target="_blank"
        rel="noopener"
        tabIndex={show ? 0 : -1}
        onClick={() => onOrder(1)}
      >
        Order now
      </a>
    </div>
  );
}
