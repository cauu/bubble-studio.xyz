
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { Layout } from '@/components/Layout';
import { IntlProvider } from '@/components/IntlProvider';

import '@/globals.css';
import { NextIntlClientProvider } from 'next-intl';

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
                <link rel="icon" href="/favicon.svg" />
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
