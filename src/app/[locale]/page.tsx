import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { HeroStage } from '@/components/home/HeroStage';
import { Ticker } from '@/components/home/Ticker';
import { HomeEnd, HomeMembers, HomePao, HomePosts, HomeWorks } from '@/components/home/HomeSections';
import { getPoolMembers, getPoolStats } from '@/lib/pool-stats';
import { getSortedPostsData } from '@/lib/posts';
import type { AppLocale } from '@/lib/seo';
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

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const url = getLocalizedUrl(locale);

  return {
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    openGraph: {
      title: t('seo.home.title'),
      description: t('seo.home.description'),
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
      title: t('seo.home.title'),
      description: t('seo.home.description'),
      images: [getAbsoluteUrl('/og-default.png')]
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates()
    }
  };
}

// Works and writing first, then what we do and who stakes with us (S0006 D5)
export default async function HomePage({ params: { locale } }: Props) {
  const [stats, posts] = await Promise.all([getPoolStats(), getSortedPostsData(locale as AppLocale)]);
  const members = await getPoolMembers(stats.owners);

  return (
    <>
      <HeroStage stakeAda={stats.stakeAda} delegatorCount={stats.delegatorCount} />
      <Ticker />
      <HomeWorks />
      <HomePosts posts={posts.slice(0, 4)} />
      <HomePao />
      <HomeMembers stats={stats} members={members} />
      <HomeEnd />
    </>
  );
}
