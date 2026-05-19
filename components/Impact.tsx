'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { IMPACT } from '@/lib/content';

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const dur = 1200;
            const start = performance.now();
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              setValue(Math.round(target * easeOut(t)));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduce, target]);

  return <span ref={ref}>{value}</span>;
}

export function Impact() {
  return (
    <section className="impact" aria-label="Impact metrics">
      <div className="container">
        <div className="impact-grid">
          {IMPACT.map((stat) => (
            <div key={stat.label} className="impact-tile">
              <span className="impact-num">
                <Counter target={stat.value} />
                {stat.plus ? <span className="plus">+</span> : null}
              </span>
              <div className="impact-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
