'use client';

import { useEffect, useState } from 'react';

// Mobile-only bottom CTA. Hidden while the hero form or the main form is on screen.
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const targets = ['.lp-hero', '#join', '.lp-final']
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => !!el);
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setShow(visible.size === 0);
      },
      { threshold: 0.05 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return (
    <a href="#join" className={`lp-sticky${show ? ' is-shown' : ''}`} aria-hidden={!show} tabIndex={show ? 0 : -1}>
      Join the waitlist
    </a>
  );
}
