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
            alt: post.title,
          }
        ],
        publishedTime: post.date,
        authors: ['Bubble Studio'],
        tags: post.tags,
      },

      // Twitter Card 标签
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [post.image || `${baseUrl}/og-default.png`],
        creator: '@bubblestudio', // 根据实际修改
      },
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image && (
            <div className="relative h-[384px] md:h-[466px]">
              <img src={post.image} alt={post.title} className="object-cover h-full w-full" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm">{format(new Date(post.date), 'yyyy年MM月dd日')}</p>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </article>

        <Comments term={post.id} language={locale as any} />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    // notFound();
  }
}
