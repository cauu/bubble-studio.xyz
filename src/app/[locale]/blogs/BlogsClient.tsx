'use client';

import { Fragment, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { PostData } from '@/lib/posts';
import { CATEGORIES, type Category } from '@/lib/categories';
import { PageHeader } from '@/components/neon/PageHeader';
import { Reveal } from '@/components/ui/Reveal';

const colors: Record<Category, string> = { ai: 'mag', cardano: 'cy', engineering: 'yel', weekly: 'grn', essay: 'pur' };
export function BlogsClient({ allPosts }: { allPosts: PostData[] }) {
  const t = useTranslations('blog');
  const p = useTranslations('pages');
  const [selected, setSelected] = useState<'all' | Category>('all');
  const filtered = selected === 'all' ? allPosts : allPosts.filter((post) => post.category === selected);
  const featured = filtered.find((post) => post.featured) ?? filtered[0];
  const years = Array.from(new Set(filtered.map((post) => post.date.slice(0, 4))));
  return (
    <div className="blog-page">
      <PageHeader path="blog" title={<span className="hl">{t('title')}</span>} sub={t('sub')} color="mag" />
      <section className="lane" aria-label={t('allPosts')}>
        <div className="filters" aria-label={t('filterLabel')}>
          {(['all', ...CATEGORIES] as const).map((key) => (
            <button
              key={key}
              className="chip-btn"
              aria-pressed={selected === key}
              onClick={() => setSelected(key)}
              style={{ ['--c' as string]: `var(--${key === 'all' ? 'mag' : colors[key]})` }}
            >
              {key === 'all' ? t('all') : t(`categories.${key}`)}
              <span className="ct">
                {key === 'all' ? allPosts.length : allPosts.filter((post) => post.category === key).length}
              </span>
            </button>
          ))}
        </div>
        {featured && (
          <Link
            className="feat"
            href={`/blogs/${featured.slug}`}
            style={{ ['--c' as string]: `var(--${colors[featured.category]})` }}
          >
            <span className="img">
              {featured.image && <img src={featured.image} alt="" width={960} height={600} />}
            </span>
            <div className="fb">
              <span className="tag">
                {t('featured')} · {t(`categories.${featured.category}`)}
              </span>
              <h2>{featured.title}</h2>
              <span className="meta">
                {featured.date} · {featured.author}
              </span>
              <span className="go">{p('read')} →</span>
            </div>
          </Link>
        )}
        <p className="result-count" aria-live="polite">
          {t('count', { count: filtered.length })}
        </p>
        <div className="plist">
          {years.map((year) => (
            <Fragment key={year}>
              <h2 className="yr">{year}</h2>
              <ul>
                {filtered
                  .filter((post) => post.date.startsWith(year))
                  .map((post) => (
                    <li className="pr" key={post.slug}>
                      <Link
                        href={`/blogs/${post.slug}`}
                        style={{ ['--c' as string]: `var(--${colors[post.category]})` }}
                      >
                        <time className="d" dateTime={post.date}>
                          {post.date.slice(5).replace('-', '.')}
                        </time>
                        <span className="c">{t(`categories.${post.category}`)}</span>
                        <span className="t">{post.title}</span>
                        <span className="th">
                          {post.image && <img src={post.image} alt="" width={160} height={100} loading="lazy" />}
                        </span>
                        <span className="ar" aria-hidden="true">
                          ↗
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </Fragment>
          ))}
        </div>
        {!filtered.length && <Reveal className="empty">{t('empty')}</Reveal>}
      </section>
      <div className="sec-end" />
    </div>
  );
}
