import { format } from 'date-fns';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPostData } from '@/lib/posts';

type Props = {
  params: { locale: string; slug: string };
};

export default async function PostPage({ params: { locale, slug } }: Props) {
  try {
    const post = await getPostData(slug);

    // 检查博客文章的语言是否匹配当前locale
    if (post.language !== locale) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image && (
            <div className="relative h-64 md:h-96">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
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
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch post:', error);
    // notFound();
  }
}
