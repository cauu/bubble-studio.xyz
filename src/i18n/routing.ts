import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // 支持的语言列表
  locales: ['en', 'zh', 'tw'],

  // 默认语言
  defaultLocale: 'en',

  localePrefix: 'as-needed'
});
