'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#fc5ff6', '#2ffff3', '#fff590', '#31ee6b'];

type Particle = {
  x: number;
  y: number;
  s: number;
  vy: number;
  ph: number;
  sp: number;
  c: string;
  dx: number;
  dy: number;
};
type Streak = { x: number; y: number; v: number; l: number; c: string };

/**
 * Ambient neon particles on a fixed canvas behind the content: pixel squares drift up and twinkle,
 * rare horizontal data streaks, the pointer pushes them away. Off for reduced motion; paused when hidden.
 */
export const Particles = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let parts: Particle[] = [];
    let streaks: Streak[] = [];
    let px = -1e4;
    let py = -1e4;
    let last = performance.now();
    let running = true;
    let raf = 0;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const make = (y?: number): Particle => ({
      x: rand(0, w),
      y: y ?? rand(0, h),
      s: Math.random() < 0.8 ? 2 : 3,
      vy: rand(6, 18),
      ph: rand(0, 6.28),
      sp: rand(0.6, 1.8),
      c: COLORS[(Math.random() * 4) | 0],
      dx: 0,
      dy: 0
    });
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: w < 600 ? 18 : 42 }, () => make());
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy * dt;
        p.ph += p.sp * dt;
        const ddx = p.x - px;
        const ddy = p.y - py;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 < 14400) {
          const f = (1 - Math.sqrt(d2) / 120) * 3 * dt;
          p.dx += ddx * f;
          p.dy += ddy * f;
        }
        p.dx *= 0.92;
        p.dy *= 0.92;
        if (p.y < -10) Object.assign(p, make(h + 10));
        ctx.globalAlpha = Math.min(0.9, 0.18 + 0.22 * (1 + Math.sin(p.ph)) + (d2 < 14400 ? 0.5 : 0));
        ctx.fillStyle = p.c;
        ctx.fillRect(Math.round(p.x + p.dx), Math.round(p.y + p.dy), p.s, p.s);
      }
      if (Math.random() < dt * 0.35) {
        streaks.push({
          x: -80,
          y: rand(80, h - 40),
          v: rand(600, 1100),
          l: rand(30, 90),
          c: COLORS[(Math.random() * 2) | 0]
        });
      }
      streaks = streaks.filter((st) => st.x < w + 100);
      for (const st of streaks) {
        st.x += st.v * dt;
        const g = ctx.createLinearGradient(st.x - st.l, 0, st.x, 0);
        g.addColorStop(0, 'transparent');
        g.addColorStop(1, st.c);
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = g;
        ctx.fillRect(st.x - st.l, st.y, st.l, 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
};
