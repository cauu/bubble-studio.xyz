import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { getPostData, getPostDescription, getSortedPostsData } from '@/lib/posts';
import { getArticleLayout } from '@/lib/article-layout';
import { ArticleNavigation } from '@/components/neon/ArticleNavigation';
import { GlobalConfig } from '@/constants';
import type { AppLocale } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { getEntityIds } from '@/lib/entities';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getHtmlLang,
  getOpenGraphLocale,
  getPostLanguageAlternates,
  getPostUrl,
  getSiteOrigin
} from '@/lib/seo';

import Comments from '@/components/Comments';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  try {
    const post = await getPostData(slug, locale);
    const t = await getTranslations({ locale });

    const canonicalUrl = getPostUrl(locale, slug);
    const description = getPostDescription(post);
    const image = getAbsoluteUrl(post.image || '/og-default.png');

    return {
      title: post.title,
      description,

      // Open Graph 标签
      openGraph: {
        title: post.title,
        description,
        url: canonicalUrl,
        siteName: t('seo.siteName'),
        type: 'article',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: post.title
          }
        ],
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
        locale: getOpenGraphLocale(locale),
        alternateLocale: getAlternateOpenGraphLocales(locale)
      },

      // Twitter Card 标签
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [image],
        creator: '@cauu_128'
      },
      alternates: {
        canonical: canonicalUrl,
        languages: getPostLanguageAlternates(slug)
      }
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post'
    };
  }
}

export default async function PostPage({ params: { locale, slug } }: Props) {
  const t = await getTranslations({ locale });

  try {
    const post = await getPostData(slug, locale);
    const canonicalUrl = getPostUrl(locale, slug);
    const description = getPostDescription(post);
    const image = getAbsoluteUrl(post.image || '/og-default.png');
    const siteOrigin = getSiteOrigin();
    const entityIds = getEntityIds();
    const isMartin = post.author === 'Martin';
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      headline: post.title,
      description,
      image: [image],
      datePublished: post.date,
      ...(post.updated ? { dateModified: post.updated } : {}),
      author: isMartin
        ? {
            '@id': entityIds.martin
          }
        : {
            '@type': 'Person',
            name: post.author
          },
      publisher: {
        '@id': `${siteOrigin}/#organization`
      },
      isPartOf: {
        '@id': `${siteOrigin}/#website`
      },
      mainEntityOfPage: canonicalUrl,
      inLanguage: getHtmlLang(locale),
      keywords: post.tags.join(', ')
    };

    // 检查博客文章的语言是否匹配当前locale
    if (post.language !== locale) {
      notFound();
    }

    const { contentHtml, headings, minutes } = getArticleLayout(post.contentHtml);
    const allPosts = await getSortedPostsData(locale as AppLocale);
    const index = allPosts.findIndex((p) => p.slug === slug);
    const adjacent = [
      { post: allPosts[index + 1], label: 'previous' },
      { post: index > 0 ? allPosts[index - 1] : undefined, label: 'next' }
    ];
    return (
      <div className="article-page">
        <JsonLd id="article-structured-data" data={structuredData} />
        <article>
          <header className="lane ah">
            <div className="crumb">
              &gt; <Link href="/">~</Link>/<Link href="/blogs">blog</Link>/{post.date}
            </div>
            <Link href="/blogs" className="cat">
              {t(`blog.categories.${post.category}`)}
            </Link>
            <h1>{post.title}</h1>
            <div className="am">
              <time dateTime={post.date}>{post.date}</time>
              {isMartin ? <Link href="/about#martin">{post.author}</Link> : <span>{post.author}</span>}
              <span>{t('pages.readingTime', { minutes })}</span>
              <span className="tags">
                {post.tags.map((tag) => (
                  <i key={tag}>{tag}</i>
                ))}
              </span>
            </div>
            {post.image && (
              <div className="cover">
                <img src={post.image} alt={post.title} width={1600} height={686} />
              </div>
            )}
          </header>
          <div className="lane read">
            <ArticleNavigation headings={headings} url={canonicalUrl} />
            <div id="article-body" className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </article>
        <div className="lane after">
          {isMartin && (
            <Link href="/about#martin" className="au">
              <span className="sh g-a" aria-hidden="true" />
              <span>
                <span className="meta">{t('pages.author')}</span>
                <b className="nm">{post.author} ↗</b>
                <span className="dsc">{t('about.author.body')}</span>
              </span>
            </Link>
          )}
          <nav className="pn" aria-label={t('pages.backBlog')}>
            {adjacent.map(
              ({ post: other, label }) =>
                other && (
                  <Link
                    key={label}
                    href={`/blogs/${other.slug}`}
                    style={{ ['--c' as string]: label === 'next' ? 'var(--mag)' : 'var(--cy)' }}
                  >
                    <span className="meta">
                      {t(`pages.${label}`)} {label === 'next' ? '→' : '←'}
                    </span>
                    <h3>{other.title}</h3>
                  </Link>
                )
            )}
          </nav>
          <a className="stake" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
            <span>
              <b>
                Stake with <em>PAO</em> Pool
              </b>
              <span>
                {t('landing.sub')}
                {t('landing.subTail')}
              </span>
            </span>
            <span className="cbtn sm">{t('nav.stakeCta')} ↗</span>
          </a>
          <Comments term={String(post.id)} language={locale as AppLocale} />
        </div>
        <div className="sec-end" />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    notFound();
  }
}
