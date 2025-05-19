/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'zh', 'tw'], // 支持的语言
    defaultLocale: 'en' // 默认语言
  },
  images: {
    domains: ['pbs.twimg.com']
  }
};

export default nextConfig;
