'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CopyButton } from './CopyButton';

type Heading = { id: string; text: string; color: string };
export const ArticleNavigation = ({ headings, url }: { headings: Heading[]; url: string }) => {
  const t = useTranslations('pages');
  const [active, setActive] = useState(headings[0]?.id);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const content = document.getElementById('article-body');
      if (!content) return;
      const rect = content.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (innerHeight - rect.top) / (rect.height + innerHeight)));
      if (progress.current) progress.current.style.transform = `scaleX(${ratio})`;
      const current = [...headings]
        .reverse()
        .find((h) => (document.getElementById(h.id)?.getBoundingClientRect().top ?? Infinity) <= 160);
      setActive(current?.id ?? headings[0]?.id);
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    update();
    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
      cancelAnimationFrame(raf);
    };
  }, [headings]);
  return (
    <>
      <div className="rbar" ref={progress} aria-hidden="true" />
      <aside className="toc">
        <nav aria-label={t('toc')}>
          <span className="lbl">{t('toc')}</span>
          <ol>
            {headings.map((h, i) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={active === h.id ? 'on' : undefined}
                  aria-current={active === h.id ? 'location' : undefined}
                  style={{ ['--c' as string]: `var(--${h.color})` }}
                >
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>{h.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="tools">
          <CopyButton value={url} label={t('copyLink')} copiedLabel={t('copied')} />
        </div>
      </aside>
    </>
  );
};
