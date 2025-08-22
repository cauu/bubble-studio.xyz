import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useRouter } from "next/router";

import { getSortedPostsData, PostData } from '@/lib/posts';
import { BlogCard } from "./components/BlogCard";
import { FilterTag } from "./components/FilterTag";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['common']);
  const allPosts = await getSortedPostsData();

  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags)).values());

  return {
    props: {
      ...translations,
      allPosts,
      allTags
    }
  }
}

export default function Blogs(props: { allTags: string[], allPosts: PostData[] }) {
  const { allTags, allPosts } = props;

  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);

  const handleBlogCardClick = (post: PostData) => {
    router.push(`/blogs/${post.slug}`);
  }

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      setFilteredPosts(allPosts.filter(post => post.tags.includes(tag)));
    } else {
      setFilteredPosts(allPosts);
    }
  };


  return (
    <div>
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {allTags.map(tag => (
              <FilterTag key={tag} tag={tag} isSelected={selectedTag === tag} onClick={handleTagClick} />
            ))}
          </div>
        </div>
      </section>


      <section className="relative z-10 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              filteredPosts.map(post => (
                <BlogCard key={post.slug} post={post} onClick={handleBlogCardClick} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}