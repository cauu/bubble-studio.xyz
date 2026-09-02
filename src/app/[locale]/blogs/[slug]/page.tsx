import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { getPostData } from '@/lib/posts';
import { CATEGORY_CHIP } from '@/lib/categories';
import { Chip } from '@/components/ui/Chip';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getOpenGraphLocale,
  getPostLanguageAlternates,
  getPostUrl
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
    const description = post.contentHtml
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);
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

    // 检查博客文章的语言是否匹配当前locale
    if (post.language !== locale) {
      notFound();
    }

    return (
      <div className="max-w-[760px] mx-auto px-6 max-[600px]:px-[18px] pt-16 pb-24 max-[860px]:pt-11 max-[860px]:pb-[72px]">
        <article>
          <header className="mb-8">
            <h1 className="text-[clamp(28px,3.6vw,40px)] leading-[1.2] mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-hairline">
              <Chip color={CATEGORY_CHIP[post.category]}>{t(`blog.categories.${post.category}`)}</Chip>
              <span className="text-[13.5px] font-semibold text-muted tnum">{post.date.replaceAll('-', '.')}</span>
              <span className="text-muted-soft" aria-hidden="true">
                ·
              </span>
              <span className="text-[13.5px] font-semibold text-muted">{post.author}</span>
            </div>
          </header>

          {post.image && <img src={post.image} alt={post.title} className="rounded-lg w-full mb-8" />}

          <div
            className="prose prose-sm md:prose-lg max-w-none prose-a:underline prose-a:underline-offset-[3px] prose-a:decoration-hairline hover:prose-a:text-brand-incana prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <div className="mt-12 pt-8 border-t border-hairline">
          <Comments term={post.id} language={locale as any} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    notFound();
  }
}
