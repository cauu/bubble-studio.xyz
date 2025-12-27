'use client';

import { useEffect, useState } from 'react';
import { PostData } from '@/lib/posts';
import { BlogCard } from '@/components/blogs/BlogCard';
import { FilterTag } from '@/components/blogs/FilterTag';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface BlogsClientProps {
  allPosts: PostData[];
  allTags: string[];
}

// 移动端默认显示的tags数量
const MOBILE_VISIBLE_TAGS = 3;

export function BlogsClient({ allPosts, allTags }: BlogsClientProps) {
  const router = useRouter();
  const t = useTranslations();

  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动端
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedTag === 'all') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter((post) => post.tags.includes(selectedTag)));
    }
  }, [selectedTag, allPosts]);

  const handleBlogCardClick = (post: PostData) => {
    router.push(`/blogs/${post.slug}`);
  };

  // 计算显示的tags
  const visibleTags = isMobile && !isTagsExpanded ? allTags.slice(0, MOBILE_VISIBLE_TAGS) : allTags;
  const hiddenTagsCount = allTags.length - MOBILE_VISIBLE_TAGS;
  const showExpandButton = isMobile && allTags.length > MOBILE_VISIBLE_TAGS;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      <div className="mb-4 md:mb-8">
        <h1 className="hidden md:block md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">{t('header.blogs')}</h1>

        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-4 md:mb-6">
          <FilterTag tag="all" isSelected={selectedTag === 'all'} onClick={setSelectedTag} />
          {visibleTags.map((tag) => (
            <FilterTag key={tag} tag={tag} isSelected={selectedTag === tag} onClick={setSelectedTag} />
          ))}

          {/* 展开/收起按钮 */}
          {showExpandButton && (
            <button
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs font-medium transition-colors flex items-center gap-1"
            >
              {isTagsExpanded ? (
                <>
                  <span>{t('common.collapse') || '收起'}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>+{hiddenTagsCount}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} onClick={handleBlogCardClick} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-gray-500 text-sm md:text-base">{t('common.no_data')}</p>
        </div>
      )}
    </div>
  );
}
