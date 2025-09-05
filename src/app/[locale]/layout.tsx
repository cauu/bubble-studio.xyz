import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { Layout } from '@/components/Layout';
import { IntlProvider } from '@/components/IntlProvider';

import { NextIntlClientProvider } from 'next-intl';

import '@/globals.css';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // 获取当前语言的翻译消息
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Bubble Studio - 扎根于 Cardano 的独立小作坊" />
        <meta name="title" content="Bubble Studio" />
        <title>Bubble Studio</title>
        <link rel="icon" href="/favicon.svg" />

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
