import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = `${baseUrl}/${locale === 'en' ? '' : locale + '/'}governance`;

  return {
    title: t('seo.governance.title'),
    description: t('seo.governance.description'),
    openGraph: {
      title: t('seo.governance.title'),
      description: t('seo.governance.description'),
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
      title: t('seo.governance.title'),
      description: t('seo.governance.description'),
      images: [`${baseUrl}/og-default.png`]
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/governance`,
        zh: `${baseUrl}/zh/governance`,
        tw: `${baseUrl}/tw/governance`
      }
    }
  };
}

export default function GovernanceLayout({ children }: Props) {
  return <>{children}</>;
}
