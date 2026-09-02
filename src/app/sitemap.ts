import { MetadataRoute } from 'next';
import { getPostSitemapEntries } from '@/lib/posts';
import { routing } from '@/i18n/routing';
import { getLocalizedUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', 'projects', 'skills', 'governance', 'blogs'];

  // 生成静态路由（所有语言版本）
  const staticRouteEntries = routing.locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const url = getLocalizedUrl(locale, route);

      return {
        url,
        changeFrequency: route === '' ? ('daily' as const) : ('monthly' as const),
        priority: route === '' ? 1.0 : 0.8
      };
    })
  );

  // 生成博客文章路由
  try {
    const posts = await getPostSitemapEntries();
    const blogRouteEntries = posts.map((post) => ({
      url: getLocalizedUrl(post.language, `blogs/${post.slug}`),
      lastModified: `${post.date}T00:00:00.000Z`,
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }));

    return [...staticRouteEntries, ...blogRouteEntries];
  } catch (error) {
    console.error('Error generating blog routes for sitemap:', error);
    return staticRouteEntries;
  }
}
