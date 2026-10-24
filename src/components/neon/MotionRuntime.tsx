'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Observe both initial and streamed route content; reveal remains progressive enhancement. */
export const MotionRuntime = () => {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const wide = matchMedia('(min-width: 901px)');
    const observed = new WeakSet<Element>();
    let layers: HTMLElement[] = [];
    let raf = 0;
    const offsets = new WeakMap<Element, number>();
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('in');
                  io?.unobserve(entry.target);
                }
              });
            },
            { rootMargin: '0px 0px -4% 0px' }
          )
        : null;
    const scan = () => {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        if (reduced.matches || !io) el.classList.add('in');
        else if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
      layers = Array.from(document.querySelectorAll<HTMLElement>('[data-py]'));
    };
    const update = () => {
      raf = 0;
      // Fast scrolling can skip an observer's intersection window. Content already passed stays visible.
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight * 0.96) {
          el.classList.add('in');
          io?.unobserve(el);
        }
      });
      layers.forEach((el) => {
        if (reduced.matches || !wide.matches) {
          el.style.transform = '';
          offsets.set(el, 0);
          return;
        }
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const offset = (r.top - (offsets.get(el) || 0) + r.height / 2 - innerHeight / 2) * Number(el.dataset.py);
        offsets.set(el, offset);
        el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const change = () => {
      scan();
      schedule();
    };
    const mutation = new MutationObserver(change);
    mutation.observe(document.getElementById('main')!, { childList: true, subtree: true });
    scan();
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', change);
    return () => {
      io?.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', change);
    };
  }, [pathname]);
  return null;
};
