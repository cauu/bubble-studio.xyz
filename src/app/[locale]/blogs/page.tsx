import { getSortedPostsData } from '@/lib/posts';
import { BlogsClient } from './BlogsClient';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = `${baseUrl}/${locale === 'en' ? '' : locale + '/'}blogs`;

  return {
    title: t('seo.blogs.title'),
    description: t('seo.blogs.description'),
    openGraph: {
      title: t('seo.blogs.title'),
      description: t('seo.blogs.description'),
      url,
      siteName: t('seo.siteName'),
      type: 'website',
      locale: locale,
      images: [
        {
          url: `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: t('seo.siteName')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.blogs.title'),
      description: t('seo.blogs.description'),
      images: [`${baseUrl}/og-default.png`]
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/blogs`,
        zh: `${baseUrl}/zh/blogs`,
        tw: `${baseUrl}/tw/blogs`
      }
    }
  };
}

export default async function Blogs({ params: { locale } }: Props) {
  const allPosts = await getSortedPostsData(locale as 'zh' | 'en' | 'tw');
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)).values());

  return <BlogsClient allPosts={allPosts} allTags={allTags} />;
}
