import { getMessages, getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Layout } from '@/components/Layout';
import { IntlProvider } from '@/components/IntlProvider';

import { NextIntlClientProvider } from 'next-intl';

import '@/globals.css';
import { GlobalConfig } from '@/constants';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = baseUrl;

  return {
    title: {
      default: t('seo.defaultTitle'),
      template: `%s | ${t('seo.siteName')}`
    },
    description: t('seo.defaultDescription'),
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: t('seo.defaultTitle'),
      description: t('seo.defaultDescription'),
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
      ],
      alternateLocale: routing.locales.filter(l => l !== locale)
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.defaultTitle'),
      description: t('seo.defaultDescription'),
      images: [`${baseUrl}/og-default.png`],
      creator: '@bubblestudio'
    },
    alternates: {
      canonical: url,
      languages: {
        'en': baseUrl,
        'zh': `${baseUrl}/zh`,
        'tw': `${baseUrl}/tw`
      }
    },
    icons: {
      icon: GlobalConfig.assetsUrl.favicon
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5
    },
    themeColor: '#0ea5e9'
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // 获取当前语言的翻译消息
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
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

        {/* 可选：预加载次要字体（按需加载） */}
        <link
          rel="prefetch"
          href="https://cdn.jsdelivr.net/gh/cauu/bubble-studio-assets@main/fonts/AlibabaPuHuiTi-3-65-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="prefetch"
          href="https://cdn.jsdelivr.net/gh/cauu/bubble-studio-assets@main/fonts/AlibabaPuHuiTi-3-115-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <IntlProvider messages={messages}>
            <Layout>{children}</Layout>
          </IntlProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
