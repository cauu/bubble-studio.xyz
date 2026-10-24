import { getMessages, getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
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
import { getSiteEntityGraph } from '@/lib/entities';

import { NextIntlClientProvider } from 'next-intl';

import '@/globals.css';
import '@/styles/neon.css';
import '@/styles/pages.css';
import { GlobalConfig } from '@/constants';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-mono',
  display: 'swap'
});

/**
 * Runs before first paint: `.js` enables reveal states; `.intro-on` arms the home intro once per session
 * (skipped for reduced motion). A timer drops `.intro-on` if the intro never mounts, so the page cannot stay hidden.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(['/','/zh','/zh/','/tw','/tw/'].indexOf(location.pathname)!==-1&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var seen=false;try{seen=sessionStorage.getItem('pao-intro')==='1'}catch(e){}if(!seen||new URLSearchParams(location.search).has('intro')){d.classList.add('intro-on');setTimeout(function(){if(!document.querySelector('.intro'))d.classList.remove('intro-on')},4000)}}}catch(e){}})();`;

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
  themeColor: '#0a0910'
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
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': getSiteEntityGraph({
      locale,
      organizationName: t('siteName'),
      organizationDescription: t('defaultDescription')
    })
  };

  return (
    <html lang={getHtmlLang(locale)} className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Hidden reveal / intro states only apply when JS runs (no-JS safety gate) */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
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
