import { routing } from '@/i18n/routing';

export type AppLocale = (typeof routing.locales)[number];

export const DEFAULT_SITE_ORIGIN = 'https://www.bubble-studio.xyz';

export const HTML_LANG: Record<AppLocale, string> = {
  en: 'en',
  zh: 'zh-Hans',
  tw: 'zh-Hant'
};

export const HREFLANG: Record<AppLocale, string> = {
  en: 'en',
  zh: 'zh-Hans',
  tw: 'zh-Hant'
};

export const OPEN_GRAPH_LOCALE: Record<AppLocale, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  tw: 'zh_TW'
};

const asLocale = (locale: string): AppLocale => {
  if (routing.locales.includes(locale as AppLocale)) return locale as AppLocale;
  return routing.defaultLocale;
};

export const getSiteOrigin = (): string => {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_ORIGIN;

  try {
    const url = new URL(configuredOrigin);
    url.protocol = 'https:';

    if (url.hostname === 'bubble-studio.xyz') {
      url.hostname = 'www.bubble-studio.xyz';
    }

    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
};

const normalizePath = (pathname: string): string => {
  const trimmedPath = pathname.trim().replace(/^\/+|\/+$/g, '');
  return trimmedPath ? `/${trimmedPath}` : '';
};

export const getLocalizedPath = (locale: string, pathname = ''): string => {
  const resolvedLocale = asLocale(locale);
  const localePrefix = resolvedLocale === routing.defaultLocale ? '' : `/${resolvedLocale}`;
  return `${localePrefix}${normalizePath(pathname)}` || '/';
};

export const getLocalizedUrl = (locale: string, pathname = ''): string =>
  `${getSiteOrigin()}${getLocalizedPath(locale, pathname)}`;

export const getLanguageAlternates = (pathname = ''): Record<string, string> => ({
  [HREFLANG.en]: getLocalizedUrl('en', pathname),
  [HREFLANG.zh]: getLocalizedUrl('zh', pathname),
  [HREFLANG.tw]: getLocalizedUrl('tw', pathname),
  'x-default': getLocalizedUrl(routing.defaultLocale, pathname)
});

export const getHtmlLang = (locale: string): string => HTML_LANG[asLocale(locale)];

export const getOpenGraphLocale = (locale: string): string => OPEN_GRAPH_LOCALE[asLocale(locale)];

export const getAlternateOpenGraphLocales = (locale: string): string[] => {
  const resolvedLocale = asLocale(locale);
  return routing.locales.filter((item) => item !== resolvedLocale).map((item) => OPEN_GRAPH_LOCALE[item]);
};

export const getLocalizedPostSlug = (slug: string, locale: string): string => {
  const resolvedLocale = asLocale(locale);
  return `${slug.replace(/-(en|zh|tw)$/, '')}-${resolvedLocale}`;
};

export const getPostUrl = (locale: string, slug: string): string =>
  getLocalizedUrl(locale, `blogs/${getLocalizedPostSlug(slug, locale)}`);

export const getPostLanguageAlternates = (slug: string): Record<string, string> => ({
  [HREFLANG.en]: getPostUrl('en', slug),
  [HREFLANG.zh]: getPostUrl('zh', slug),
  [HREFLANG.tw]: getPostUrl('tw', slug),
  'x-default': getPostUrl(routing.defaultLocale, slug)
});

export const getAbsoluteUrl = (url: string): string => new URL(url, `${getSiteOrigin()}/`).toString();
