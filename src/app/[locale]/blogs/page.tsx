import { getSortedPostsData } from '@/lib/posts';
import { BlogsClient } from './BlogsClient';

type Props = {
  params: { locale: string };
};

export default async function Blogs({ params: { locale } }: Props) {
  const allPosts = await getSortedPostsData(locale as 'zh' | 'en' | 'tw');
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)).values());

  return <BlogsClient allPosts={allPosts} allTags={allTags} />;
}
