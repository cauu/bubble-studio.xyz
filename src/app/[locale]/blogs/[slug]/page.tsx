import { format } from 'date-fns';
import { notFound } from 'next/navigation';

import { getPostData } from '@/lib/posts';

import Comments from '@/components/Comments';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params: { locale, slug } }: Props) {
  try {
    const post = await getPostData(slug, locale);

    // 构建完整URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
    const postUrl = `${baseUrl}/${locale}/blogs/${slug}`;
    const description = post.contentHtml.substring(0, 160).replace(/<[^>]*>/g, '');

    return {
      title: post.title,
      description,

      // Open Graph 标签
      openGraph: {
        title: post.title,
        description,
        url: postUrl,
        type: 'article',
        images: [
          {
            url: post.image || `${baseUrl}/og-default.png`,
            width: 1200,
            height: 630,
            alt: post.title
          }
        ],
        publishedTime: post.date,
        authors: ['Bubble Studio'],
        tags: post.tags
      },

      // Twitter Card 标签
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [post.image || `${baseUrl}/og-default.png`],
        creator: '@bubblestudio' // 根据实际修改
      }
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post'
    };
  }
}

export default async function PostPage({ params: { locale, slug } }: Props) {
  try {
    const post = await getPostData(slug, locale);

    // 检查博客文章的语言是否匹配当前locale
    if (post.language !== locale) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto px-0 md:px-4 pt-0 pb-4 md:py-8">
        <article className="bg-white md:rounded-lg md:shadow-lg overflow-hidden">
          {/* 封面图 - 移动端更紧凑 */}
          {post.image && (
            <div className="relative h-[200px] md:h-[400px]">
              <img src={post.image} alt={post.title} className="object-cover h-full w-full" />
            </div>
          )}

          <div className="px-4 py-4 md:p-8">
            {/* 标题区域 - 移动端放在最前面，类似Twitter */}
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">{post.title}</h1>

            {/* 元信息 */}
            <div className="flex items-center gap-2 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-100">
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 md:px-3 py-0.5 md:py-1 bg-blue-50 text-blue-600 text-xs md:text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-gray-400 text-xs md:text-sm">·</span>
              <p className="text-gray-500 text-xs md:text-sm">{format(new Date(post.date), 'yyyy年MM月dd日')}</p>
            </div>

            {/* 正文内容 - 移动端使用更小的字体 */}
            <div
              className="prose prose-sm md:prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-lg prose-h2:md:text-2xl prose-h2:mt-6 prose-h2:mb-3
                prose-h3:text-base prose-h3:md:text-xl prose-h3:mt-4 prose-h3:mb-2
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-sm prose-p:md:text-base
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:my-4
                prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
                prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:rounded-lg
                prose-li:text-sm prose-li:md:text-base
              "
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>

        <div className="px-4 md:px-0">
          <Comments term={post.id} language={locale as any} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    // notFound();
  }
}
