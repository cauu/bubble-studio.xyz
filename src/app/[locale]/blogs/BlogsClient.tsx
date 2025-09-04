'use client';

import { useEffect, useState } from 'react';
import { PostData } from '@/lib/posts';
import { BlogCard } from '@/components/blogs/BlogCard';
import { FilterTag } from '@/components/blogs/FilterTag';
import { useRouter } from 'next/navigation';

interface BlogsClientProps {
  allPosts: PostData[];
  allTags: string[];
}

export function BlogsClient({ allPosts, allTags }: BlogsClientProps) {
  const router = useRouter();

  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    if (selectedTag === 'all') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter((post) => post.tags.includes(selectedTag)));
    }
  }, [selectedTag, allPosts]);

  const handleBlogCardClick = (post: PostData) => {
    router.push(`/blogs/${post.slug}`);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">博客</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          <FilterTag tag="all" isSelected={selectedTag === 'all'} onClick={setSelectedTag} />
          {allTags.map((tag) => (
            <FilterTag key={tag} tag={tag} isSelected={selectedTag === tag} onClick={setSelectedTag} />
          ))}
        </div>
      </div>

      <div className="grid grid-col-4 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} onClick={handleBlogCardClick} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无相关文章</p>
        </div>
      )}
    </div>
  );
}
