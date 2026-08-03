import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getPoolInfo } from '@/services/pool';
import { GlobalConfig } from '@/constants';
import { Hero } from '@/components/home/Hero';
import { WhyBand } from '@/components/home/WhyBand';
import { ModelBand } from '@/components/home/ModelBand';
import { Perks } from '@/components/home/Perks';
import { ServicesBand } from '@/components/home/ServicesBand';
import type { PoolStats } from '@/components/home/PoolLedgerCard';

type Props = {
  params: { locale: string };
};

export const revalidate = 3600;

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

// live_stake is in lovelace (1 ADA = 1e6 lovelace)
const formatStake = (lovelace: string): string => {
  const ada = Number(lovelace) / 1e6;
  if (ada >= 1e6) return `${(ada / 1e6).toFixed(1)}M ADA`;
  if (ada >= 1e3) return `${(ada / 1e3).toFixed(1)}K ADA`;
  return `${Math.round(ada)} ADA`;
};

const getPoolStats = async (): Promise<PoolStats> => {
  const info = await getPoolInfo([GlobalConfig.POOL_ID]).catch(() => null);
  const pool = info?.[0];

  if (!pool) {
    return {
      ticker: 'PAO',
      stake: GlobalConfig.POOL_FALLBACK.stake,
      apy: GlobalConfig.POOL_APY,
      delegators: GlobalConfig.POOL_FALLBACK.delegators,
      isLive: false
    };
  }

  return {
    ticker: pool.meta_json?.ticker ?? 'PAO',
    stake: formatStake(pool.live_stake),
    apy: GlobalConfig.POOL_APY,
    delegators: String(pool.live_delegators),
    isLive: true
  };
};

export default async function HomePage() {
  const stats = await getPoolStats();

  return (
    <>
      <Hero stats={stats} />
      <Perks />
      <WhyBand />
      <ModelBand />
      <ServicesBand />
    </>
  );
}
