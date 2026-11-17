'use client';

import { useEffect, useRef, useState } from 'react';

// Muted looping clip that only loads once near the viewport, and never on
// reduced-motion or data-saver connections (the poster shows instead).
export function RealVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '');
    if (reduce || slow || !ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLoad(true); io.disconnect(); }
    }, { rootMargin: '200px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (load) ref.current?.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      className="real-video"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      {load ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
