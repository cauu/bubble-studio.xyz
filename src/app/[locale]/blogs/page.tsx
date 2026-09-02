import { getSortedPostsData } from '@/lib/posts';
import { BlogsClient } from './BlogsClient';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getLanguageAlternates,
  getLocalizedUrl,
  getOpenGraphLocale
} from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const url = getLocalizedUrl(locale, 'blogs');

  return {
    title: t('seo.blogs.title'),
    description: t('seo.blogs.description'),
    openGraph: {
      title: t('seo.blogs.title'),
      description: t('seo.blogs.description'),
      url,
      siteName: t('seo.siteName'),
      type: 'website',
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: getAbsoluteUrl('/og-default.png'),
          width: 1200,
          height: 630,
          alt: t('seo.siteName')
        }
      ],
      alternateLocale: getAlternateOpenGraphLocales(locale)
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.blogs.title'),
      description: t('seo.blogs.description'),
      images: [getAbsoluteUrl('/og-default.png')]
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('blogs')
    }
  };
}

export default async function Blogs({ params: { locale } }: Props) {
  const allPosts = await getSortedPostsData(locale as 'zh' | 'en' | 'tw');

  return <BlogsClient allPosts={allPosts} />;
}
