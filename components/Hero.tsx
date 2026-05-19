'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { HERO, EASE } from '@/lib/content';

const STAGGER_DELAYS = [200, 350, 500, 650, 800, 950]; // ms

export function Hero() {
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (reduce) return;
    const btn = btnRef.current;
    if (!btn) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > 100) {
        cancelAnimationFrame(raf);
        btn.style.transform = '';
        return;
      }
      const pull = Math.min(1, (100 - dist) / 100);
      const tx = (dx / 100) * 6 * pull;
      const ty = (dy / 100) * 6 * pull;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        btn.style.transform = `translate(${tx}px,${ty}px)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      btn.style.transform = '';
    };
    window.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', reset);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const staggerInitial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const staggerAnimate = { opacity: 1, y: 0 };
  const ease = EASE as unknown as number[];

  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: staggerInitial,
          animate: staggerAnimate,
          transition: { duration: 1.0, ease, delay: STAGGER_DELAYS[i] / 1000 },
        };

  const portraitMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, rotate: -1.5, y: 20, scale: 0.98 },
        animate: { opacity: 1, rotate: -1.5, y: 0, scale: 1 },
        transition: { duration: 1.2, ease, delay: 0.4 },
      };

  return (
    <section className="hero" id="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.div className="eyebrow hero-eyebrow" {...item(0)}>
            {HERO.eyebrow.role}
            <span className="dot" />
            {HERO.eyebrow.org}
          </motion.div>

          <motion.h1 className="display" {...item(1)}>
            {HERO.name.first} <span className="italic">{HERO.name.last}</span>
          </motion.h1>

          <motion.p className="hero-tagline" {...item(2)}>
            {HERO.tagline.primary}
            <br />
            <span className="accent">{HERO.tagline.accent}</span>
          </motion.p>

          <motion.p className="hero-lede" {...item(3)}>
            {HERO.lede}
          </motion.p>

          <motion.div className="cta-row" {...item(4)}>
            <a ref={btnRef} href="#work" className="btn btn-primary">
              See selected work
              <ArrowRight strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href={HERO.cv}
              className="btn btn-ghost"
              download
              aria-label="Download CV"
            >
              Download CV
              <Download strokeWidth={2} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div className="status-pill" {...item(5)}>
            <span className="status-dot" aria-hidden="true" />
            {HERO.statusPill}
          </motion.div>
        </div>

        <motion.div className="hero-portrait" {...portraitMotion}>
          <div className="frame">
            <Image
              src={`/${HERO.portrait}`}
              alt="Portrait of Ameh Matthew Oche"
              width={710}
              height={659}
              priority
              sizes="(max-width: 900px) 320px, 420px"
            />
          </div>
          <div className="tag">
            {HERO.portraitTag.location} · <b>{HERO.portraitTag.accent}</b>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
