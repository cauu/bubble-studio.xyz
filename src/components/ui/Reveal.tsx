'use client';

import { ElementType, ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

type Props = {
  as?: ElementType;
  /** Stagger delay in ms before the reveal transition starts */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Scroll-reveal wrapper. The hidden state only applies when JS is available
 * (`.js` on <html>, see layout.tsx), so content stays visible without JS.
 */
export const Reveal = ({ as: Tag = 'div', delay = 0, className, children }: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timer = setTimeout(() => el.classList.add('in'), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={clsx('reveal', className)}>
      {children}
    </Tag>
  );
};
