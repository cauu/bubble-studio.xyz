'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PostData } from '@/lib/posts';
import { CATEGORIES, CATEGORY_CHIP, Category } from '@/lib/categories';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';

interface BlogsClientProps {
  allPosts: PostData[];
}

const formatDate = (date: string) => date.replaceAll('-', '.');

export function BlogsClient({ allPosts }: BlogsClientProps) {
  const t = useTranslations('blog');
  const [selected, setSelected] = useState<'all' | Category>('all');

  const featured = useMemo(
    () => allPosts.find((post) => post.featured) ?? allPosts.find((post) => post.category === 'essay') ?? allPosts[0],
    [allPosts]
  );

  const filteredPosts = selected === 'all' ? allPosts : allPosts.filter((post) => post.category === selected);

  const tabs: Array<{ key: 'all' | Category; label: string }> = [
    { key: 'all', label: t('all') },
    ...CATEGORIES.map((category) => ({ key: category, label: t(`categories.${category}`) }))
  ];

  return (
    <div className="relative">
      <div className="page-aura animate-aura-drift" aria-hidden="true" />

      <header className="pt-16 max-[860px]:pt-11">
        <Reveal className="wrap">
          <h1 className="text-[clamp(36px,4.5vw,52px)] leading-[1.15] mb-3">{t('title')}</h1>
          <p className="text-[16.5px] text-muted">{t('sub')}</p>
        </Reveal>
      </header>

      {featured && (
        <section className="pt-8 max-[860px]:pt-6" aria-label={t('featured')}>
          <div className="wrap">
            <Reveal>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group flex items-center gap-5 bg-white rounded-lg px-7 py-6 max-[860px]:flex-wrap max-[860px]:p-5 shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:scale-[1.01] hover:shadow-card-hover"
              >
                <Chip color="lemon">{t('featured')}</Chip>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[clamp(18px,2.2vw,23px)] leading-[1.4] mb-1.5 transition-colors group-hover:text-brand-incana">
                    {featured.title}
                  </h2>
                  <div className="flex gap-2 text-[13px] font-semibold text-muted">
                    <span className="tnum">{formatDate(featured.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t(`categories.${featured.category}`)}</span>
                  </div>
                </div>
                <span
                  className="flex-none text-base text-ink transition-transform duration-200 ease-brand group-hover:translate-x-[5px]"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="pt-7 pb-24 max-[860px]:pb-[72px]" aria-label={t('allPosts')}>
        <div className="wrap">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex flex-wrap gap-2" aria-label={t('filterLabel')}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  aria-pressed={selected === tab.key}
                  onClick={() => setSelected(tab.key)}
                  className={clsx(
                    'text-sm px-4 py-2 rounded-pill transition-all duration-200 ease-brand hover:text-ink',
                    selected === tab.key
                      ? 'bg-white text-ink font-semibold shadow-[0_1px_2px_rgba(23,32,38,.06),0_4px_12px_rgba(23,32,38,.08)]'
                      : 'text-body font-medium hover:bg-[rgba(255,255,255,.75)]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="text-[13.5px] font-semibold text-body tnum">
              {t('count', { count: filteredPosts.length })}
            </span>
          </Reveal>

          <Reveal className="rounded-lg overflow-hidden bg-white shadow-card">
            <div
              className="flex gap-[22px] px-6 pt-3.5 pb-1 text-[11.5px] font-bold tracking-[.1em] uppercase text-muted"
              aria-hidden="true"
            >
              <span className="min-w-[120px]">{t('thead.date')}</span>
              <span className="flex-1">{t('thead.title')}</span>
              <span>{t('thead.category')}</span>
            </div>

            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group relative flex items-center gap-[22px] px-6 py-[19px] transition-colors duration-200 hover:bg-hairline-soft max-[600px]:flex-wrap max-[600px]:gap-2.5 after:content-[''] after:absolute after:left-6 after:right-6 after:bottom-0 after:h-px after:bg-[rgba(23,32,38,.05)] last:after:hidden"
              >
                <span className="text-[13.5px] font-semibold text-muted min-w-[120px] flex-none tnum max-[600px]:min-w-0">
                  {formatDate(post.date)}
                </span>
                <span className="flex-1 text-base font-semibold text-ink min-w-0 leading-[1.45] transition-colors group-hover:text-brand-incana">
                  {post.title}
                </span>
                <Chip color={CATEGORY_CHIP[post.category]} className="flex-none max-[600px]:order-3">
                  {t(`categories.${post.category}`)}
                </Chip>
                <span
                  className="flex-none text-base text-ink transition-transform duration-200 ease-brand group-hover:translate-x-[5px] max-[600px]:hidden"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}

            {filteredPosts.length === 0 && (
              <div className="px-6 py-10 text-center text-muted text-sm">{t('empty')}</div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
