import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// 定义博文元数据类型
export interface PostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  time: string;
  image: string;
  tags: string[];
  [key: string]: any;
}

export async function getSortedPostsData(locale: 'zh' | 'en' | 'tw'): Promise<PostData[]> {
  // 获取 /posts 目录下的所有文件名
  const fileNames = await fs.promises.readdir(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // 移除 ".md" 后缀作为 slug
      const slug = fileName.replace(/\.md$/, '');

      // 读取 markdown 文件内容
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.promises.readFile(fullPath, 'utf8');

      // 使用 gray-matter 解析 frontmatter
      const matterResult = matter(fileContents);

      // 组合数据
      return {
        slug,
        abstract: `${matterResult.content.slice(0, 60)}...`,
        ...(matterResult.data as {
          title: string;
          date: string;
          author: string;
          time: string;
          image: string;
          tags: string[];
          language: string;
        })
      };
    })
  );

  // 根据日期降序排序
  return allPostsData
    .filter((post) => post.language === locale)
    .sort((a, b) => {
      const fullDateA = new Date(`${a.date}T${a.time}`);
      const fullDateB = new Date(`${b.date}T${b.time}`);
      return fullDateB.getTime() - fullDateA.getTime();
    });
}

export async function getAllPostSlugs() {
  const fileNames = await fs.promises.readdir(postsDirectory);
  // 返回格式必须是 [{ params: { slug: '...' } }, ...]
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export async function getPostData(slug: string, locale: string = 'en') {
  const slugWithLocale = slug.split('-').slice(0, -1).concat(locale).join('-');
  const fullPath = path.join(postsDirectory, `${slugWithLocale}.md`);

  const fileContents = await fs.promises.readFile(fullPath, 'utf8');

  // 使用 gray-matter 解析
  const matterResult = matter(fileContents);

  // 使用 remark 将 markdown 转换为 HTML
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 组合数据
  return {
    slug,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      date: string;
      author: string;
      image: string;
      tags: string[];
      language: string;
    })
  };
}
