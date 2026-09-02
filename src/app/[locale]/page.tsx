import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ModelBand } from '@/components/home/ModelBand';
import { Perks } from '@/components/home/Perks';
import { StakeBenefits } from '@/components/home/StakeBenefits';
import { ServicesBand, ServicesContact } from '@/components/home/ServicesBand';
import { getPoolStats } from '@/lib/pool-stats';
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

export default async function HomePage() {
  const stats = await getPoolStats();

  return (
    <>
      <Hero stats={stats} />
      <Perks />
      <StakeBenefits />
      <ServicesBand />
      <ModelBand />
      <ServicesContact />
    </>
  );
}
