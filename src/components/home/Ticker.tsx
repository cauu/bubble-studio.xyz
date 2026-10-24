'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

/** Slogan ticker: slow idle drift, accelerated by scroll velocity, paused off-screen; static for reduced motion */
export const Ticker = () => {
  const t = useTranslations('landing');
  const items = t.raw('ticker') as string[];
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tr = trackRef.current;
    if (!tr || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let off = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let boost = 0;
    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(tr.parentElement!);
    const run = (now: number) => {
      const dt = Math.min(64, now - lastT);
      lastT = now;
      boost = boost * 0.9 + Math.abs(window.scrollY - lastY) * 0.9;
      lastY = window.scrollY;
      if (visible) {
        off = (off + dt * 0.03 + boost * 0.12) % (tr.scrollWidth / 2);
        tr.style.transform = `translateX(${-off.toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const line = (
    <span>
      {items.map((item) => (
        <span key={item} style={{ padding: 0 }}>
          {item}
          <b />
        </span>
      ))}
    </span>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="tr" ref={trackRef}>
        {line}
        {line}
      </div>
    </div>
  );
};
