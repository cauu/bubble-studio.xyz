import { getMessages, getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Layout } from '@/components/Layout';
import { IntlProvider } from '@/components/IntlProvider';
import { JsonLd } from '@/components/JsonLd';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getHtmlLang,
  getLanguageAlternates,
  getLocalizedUrl,
  getOpenGraphLocale,
  getSiteOrigin
} from '@/lib/seo';

import { NextIntlClientProvider } from 'next-intl';

import '@/globals.css';
import { GlobalConfig } from '@/constants';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap'
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#13585d'
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const siteOrigin = getSiteOrigin();
  const url = getLocalizedUrl(locale);

  return {
    title: {
      default: t('seo.defaultTitle'),
      template: `%s | ${t('seo.siteName')}`
    },
    description: t('seo.defaultDescription'),
    metadataBase: new URL(siteOrigin),
    openGraph: {
      title: t('seo.defaultTitle'),
      description: t('seo.defaultDescription'),
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
      title: t('seo.defaultTitle'),
      description: t('seo.defaultDescription'),
      images: [getAbsoluteUrl('/og-default.png')],
      creator: '@cauu_128'
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates()
    },
    icons: {
      icon: GlobalConfig.assetsUrl.favicon
    }
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // 获取当前语言的翻译消息
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'seo' });
  const siteOrigin = getSiteOrigin();
  const organizationId = `${siteOrigin}/#organization`;
  const websiteId = `${siteOrigin}/#website`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: t('siteName'),
        alternateName: 'Bubble Studio',
        url: siteOrigin,
        logo: {
          '@type': 'ImageObject',
          url: GlobalConfig.assetsUrl.bubbleLogo
        },
        description: t('defaultDescription'),
        email: GlobalConfig.CONTACT_EMAIL,
        sameAs: [GlobalConfig.social.github, GlobalConfig.social.twitter, GlobalConfig.CARDANOSCAN_POOL_URL]
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteOrigin,
        name: t('siteName'),
        alternateName: 'Bubble Studio',
        description: t('defaultDescription'),
        inLanguage: ['en', 'zh-Hans', 'zh-Hant'],
        publisher: {
          '@id': organizationId
        }
      }
    ]
  };

  return (
    <html lang={getHtmlLang(locale)} className={inter.variable}>
      <head>
        {/* Hidden reveal state only applies when JS runs (no-JS safety gate) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* 字体优化：预加载关键字体文件 */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/cauu/bubble-studio-assets@main/fonts/AlibabaPuHuiTi-3-55-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/cauu/bubble-studio-assets@main/fonts/AlibabaPuHuiTi-3-85-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="prefetch"
          href="https://cdn.jsdelivr.net/gh/cauu/bubble-studio-assets@main/fonts/AlibabaPuHuiTi-3-65-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans">
        <JsonLd id="site-structured-data" data={structuredData} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <IntlProvider messages={messages}>
            <Layout>{children}</Layout>
          </IntlProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
