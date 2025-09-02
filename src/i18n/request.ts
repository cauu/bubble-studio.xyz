import { notFound } from 'next/navigation';
import { getRequestConfig, RequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 验证传入的 locale 参数
  let locale = await requestLocale;

  if (!routing.locales.includes(locale as any)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  } as RequestConfig;
});
