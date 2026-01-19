import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/posts';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const staticRoutes = ['', 'about', 'products', 'staking', 'governance', 'blogs'];

  // 生成静态路由（所有语言版本）
  const staticRouteEntries = routing.locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const path = route === '' ? '' : `/${route}`;
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      const url = `${baseUrl}${localePrefix}${path}`;

      return {
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? ('daily' as const) : ('monthly' as const),
        priority: route === '' ? 1.0 : 0.8
      };
    })
  );

  // 生成博客文章路由
  try {
    const allPostSlugs = await getAllPostSlugs();
    const blogRouteEntries = allPostSlugs.flatMap(({ params }) => {
      const slug = params.slug;
      // 从 slug 中提取语言（假设格式为 xxx-xxx-xxx-locale）
      const parts = slug.split('-');
      // const possibleLocale = parts[parts.length - 1];
      // const locale = routing.locales.includes(possibleLocale as any) ? possibleLocale : 'en';
      const baseSlug = parts.slice(0, -1).join('-');

      return routing.locales.map((loc) => {
        // 为每个语言版本生成对应的博客文章 URL
        // 如果原文章是该语言，则生成该语言的 URL；否则生成所有语言的 URL
        const localePrefix = loc === 'en' ? '' : `/${loc}`;
        const url = `${baseUrl}${localePrefix}/blogs/${baseSlug}`;

        return {
          url,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7
        };
      });
    });

    // 去重（可能有重复的 URL）
    const uniqueBlogRoutes = Array.from(new Map(blogRouteEntries.map((entry) => [entry.url, entry])).values());

    return [...staticRouteEntries, ...uniqueBlogRoutes];
  } catch (error) {
    console.error('Error generating blog routes for sitemap:', error);
    return staticRouteEntries;
  }
}
