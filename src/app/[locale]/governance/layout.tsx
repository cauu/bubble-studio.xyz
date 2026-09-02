import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getLanguageAlternates,
  getLocalizedUrl,
  getOpenGraphLocale
} from '@/lib/seo';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const url = getLocalizedUrl(locale, 'governance');

  return {
    title: t('seo.governance.title'),
    description: t('seo.governance.description'),
    openGraph: {
      title: t('seo.governance.title'),
      description: t('seo.governance.description'),
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
      title: t('seo.governance.title'),
      description: t('seo.governance.description'),
      images: [getAbsoluteUrl('/og-default.png')]
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('governance')
    }
  };
}

export default function GovernanceLayout({ children }: Props) {
  return <>{children}</>;
}
