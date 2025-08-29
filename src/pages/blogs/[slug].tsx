import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getPostData, getAllPostSlugs, PostData } from '@/lib/posts';


// // 告诉 Next.js 需要预渲染哪些路径
// export async function generateStaticParams() {
//     const paths = await getAllPostSlugs();

//     return paths.map(path => ({ slug: path.params.slug }));
// }

// // 为每个页面生成元数据（例如页面标题）
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//     const postData = await getPostData(params.slug);
//     return {
//         title: postData.title,
//     };
// }

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
    const translations = await serverSideTranslations(locale || 'en', ['common']);

    try {
        const post = await getPostData(params!.slug as any);

        // 检查博客文章的语言是否匹配当前locale
        if (post.language !== locale) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                ...translations,
                post
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}
export default function PostPage(props: { post: PostData }) {
    const { post } = props;

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-4xl mx-auto py-8 px-4">
            {/* 标题 */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>

            {/* 元数据：日期和标签 */}
            <div className="text-gray-500 mb-6 flex items-center space-x-4">
                <time dateTime={post.date}>
                    {format(new Date(post.date), 'LLLL d, yyyy')}
                </time>
                <div className="flex space-x-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 头图 */}
            {post.image && (
                <div className="mb-8 relative w-full h-96">
                    <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            )}

            {/* 正文内容 */}
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
        </article>
    );
}