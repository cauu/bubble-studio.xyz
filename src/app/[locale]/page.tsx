import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import { HomeClient } from './HomeClient';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = `${baseUrl}/${locale === 'en' ? '' : locale}`;

  return {
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    openGraph: {
      title: t('seo.home.title'),
      description: t('seo.home.description'),
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
      title: t('seo.home.title'),
      description: t('seo.home.description'),
      images: [`${baseUrl}/og-default.png`]
    },
    alternates: {
      canonical: url,
      languages: {
        en: baseUrl,
        zh: `${baseUrl}/zh`,
        tw: `${baseUrl}/tw`
      }
    }
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  const posts = await getSortedPostsData(locale as 'zh' | 'en' | 'tw');
  const latestPosts = posts.slice(0, 3);

  return <HomeClient latestPosts={latestPosts} />;
}
