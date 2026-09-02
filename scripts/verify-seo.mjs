import { promises as fs } from 'node:fs';
import path from 'node:path';

const requestOrigin = process.argv[2] || 'http://127.0.0.1:3100';
const canonicalOrigin = 'https://www.bubble-studio.xyz';

const pageCases = [
  {
    name: 'home',
    path: '/',
    canonical: canonicalOrigin,
    lang: 'en',
    openGraphLocale: 'en_US',
    alternates: {
      en: canonicalOrigin,
      'zh-Hans': `${canonicalOrigin}/zh`,
      'zh-Hant': `${canonicalOrigin}/tw`,
      'x-default': canonicalOrigin
    }
  },
  {
    name: 'projects-zh',
    path: '/zh/projects',
    canonical: `${canonicalOrigin}/zh/projects`,
    lang: 'zh-Hans',
    openGraphLocale: 'zh_CN',
    alternates: {
      en: `${canonicalOrigin}/projects`,
      'zh-Hans': `${canonicalOrigin}/zh/projects`,
      'zh-Hant': `${canonicalOrigin}/tw/projects`,
      'x-default': `${canonicalOrigin}/projects`
    }
  },
  {
    name: 'skills',
    path: '/skills',
    canonical: `${canonicalOrigin}/skills`,
    lang: 'en',
    openGraphLocale: 'en_US',
    alternates: {
      en: `${canonicalOrigin}/skills`,
      'zh-Hans': `${canonicalOrigin}/zh/skills`,
      'zh-Hant': `${canonicalOrigin}/tw/skills`,
      'x-default': `${canonicalOrigin}/skills`
    }
  },
  {
    name: 'governance',
    path: '/governance',
    canonical: `${canonicalOrigin}/governance`,
    lang: 'en',
    openGraphLocale: 'en_US',
    alternates: {
      en: `${canonicalOrigin}/governance`,
      'zh-Hans': `${canonicalOrigin}/zh/governance`,
      'zh-Hant': `${canonicalOrigin}/tw/governance`,
      'x-default': `${canonicalOrigin}/governance`
    }
  },
  {
    name: 'article',
    path: '/blogs/20260405-subscriptions-are-failing-en',
    canonical: `${canonicalOrigin}/blogs/20260405-subscriptions-are-failing-en`,
    lang: 'en',
    openGraphLocale: 'en_US',
    alternates: {
      en: `${canonicalOrigin}/blogs/20260405-subscriptions-are-failing-en`,
      'zh-Hans': `${canonicalOrigin}/zh/blogs/20260405-subscriptions-are-failing-zh`,
      'zh-Hant': `${canonicalOrigin}/tw/blogs/20260405-subscriptions-are-failing-tw`,
      'x-default': `${canonicalOrigin}/blogs/20260405-subscriptions-are-failing-en`
    }
  }
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)`, 'i'));
  return match?.[1];
};

const getTags = (html, tagName) => html.match(new RegExp(`<${tagName}[^>]*>`, 'gi')) || [];

const getJsonLd = (html) =>
  [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) =>
    JSON.parse(match[1])
  );

const getPage = async ({ name, path: pathname }) => {
  const response = await fetch(`${requestOrigin}${pathname}`);
  assert(response.ok, `${name}: expected 200, received ${response.status}`);
  return { headers: response.headers, html: await response.text() };
};

const pages = new Map();

for (const pageCase of pageCases) {
  const page = await getPage(pageCase);
  pages.set(pageCase.name, page);

  const htmlTag = getTags(page.html, 'html')[0] || '';
  const links = getTags(page.html, 'link');
  const metas = getTags(page.html, 'meta');
  const canonical = links.find((tag) => getAttribute(tag, 'rel') === 'canonical');
  const alternates = Object.fromEntries(
    links
      .filter((tag) => getAttribute(tag, 'rel') === 'alternate')
      .map((tag) => [getAttribute(tag, 'hrefLang'), getAttribute(tag, 'href')])
  );
  const openGraphLocale = metas.find((tag) => getAttribute(tag, 'property') === 'og:locale');
  const jsonLd = getJsonLd(page.html);
  const graphNodes = jsonLd.flatMap((item) => item['@graph'] || []);

  assert(getAttribute(htmlTag, 'lang') === pageCase.lang, `${pageCase.name}: HTML lang mismatch`);
  assert(getAttribute(canonical || '', 'href') === pageCase.canonical, `${pageCase.name}: canonical mismatch`);
  assert(
    getAttribute(openGraphLocale || '', 'content') === pageCase.openGraphLocale,
    `${pageCase.name}: Open Graph locale mismatch`
  );
  assert(
    JSON.stringify(alternates) === JSON.stringify(pageCase.alternates),
    `${pageCase.name}: alternate language links mismatch`
  );
  assert(
    graphNodes.some((node) => node['@type'] === 'Organization'),
    `${pageCase.name}: Organization missing`
  );
  assert(
    graphNodes.some((node) => node['@type'] === 'WebSite'),
    `${pageCase.name}: WebSite missing`
  );
  assert(
    !/rel="alternate"[^>]*hreflang/i.test(page.headers.get('link') || ''),
    `${pageCase.name}: conflicting HTTP hreflang`
  );

  console.log(
    `PASS html ${pageCase.name} canonical=${pageCase.canonical} lang=${pageCase.lang} og=${pageCase.openGraphLocale}`
  );
}

const articleJsonLd = getJsonLd(pages.get('article').html).find((item) => item['@type'] === 'BlogPosting');
assert(articleJsonLd, 'article: BlogPosting missing');
assert(articleJsonLd.datePublished === '2026-04-05', 'article: datePublished mismatch');
assert(articleJsonLd.author?.name === 'Martin', 'article: author mismatch');
assert(articleJsonLd.inLanguage === 'en', 'article: inLanguage mismatch');
assert(articleJsonLd.mainEntityOfPage === pageCases[4].canonical, 'article: mainEntityOfPage mismatch');
console.log('PASS BlogPosting date=2026-04-05 author=Martin language=en');

const governanceHtml = pages.get('governance').html;
assert((governanceHtml.match(/<h1(?:\s|>)/gi) || []).length === 1, 'governance: expected exactly one H1');
assert(governanceHtml.includes('Review selected Cardano governance actions'), 'governance: intro missing');
assert(governanceHtml.includes('Amaru Node Development 2025'), 'governance: server-rendered action summary missing');
console.log('PASS governance SSR h1=1 intro=yes action-summary=yes');

const robotsResponse = await fetch(`${requestOrigin}/robots.txt`);
assert(robotsResponse.ok, `robots: expected 200, received ${robotsResponse.status}`);
assert(robotsResponse.headers.get('content-type')?.startsWith('text/plain'), 'robots: content type mismatch');
const robots = await robotsResponse.text();
assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), 'robots: sitemap origin mismatch');

const sitemapResponse = await fetch(`${requestOrigin}/sitemap.xml`);
assert(sitemapResponse.ok, `sitemap: expected 200, received ${sitemapResponse.status}`);
assert(sitemapResponse.headers.get('content-type')?.startsWith('application/xml'), 'sitemap: content type mismatch');
const sitemap = await sitemapResponse.text();
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
  loc: match[1].match(/<loc>([^<]+)/)?.[1],
  lastModified: match[1].match(/<lastmod>([^<]+)/)?.[1]
}));

const postsDirectory = path.join(process.cwd(), 'posts');
const postFiles = (await fs.readdir(postsDirectory)).filter((fileName) => fileName.endsWith('.md')).sort();
const expectedPosts = new Map();

for (const fileName of postFiles) {
  const source = await fs.readFile(path.join(postsDirectory, fileName), 'utf8');
  const date = source.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const language = source.match(/^language:\s*(en|zh|tw)\s*$/m)?.[1];
  assert(date && language, `${fileName}: invalid front matter date or language`);
  const slug = fileName.replace(/\.md$/, '');
  const localePrefix = language === 'en' ? '' : `/${language}`;
  expectedPosts.set(`${canonicalOrigin}${localePrefix}/blogs/${slug}`, `${date}T00:00:00.000Z`);
}

const staticEntries = sitemapEntries.filter(({ loc }) => !loc?.includes('/blogs/') || loc.endsWith('/blogs'));
const articleEntries = sitemapEntries.filter(({ loc }) => loc?.includes('/blogs/') && !loc.endsWith('/blogs'));

assert(sitemapEntries.length === 18 + expectedPosts.size, 'sitemap: unexpected total URL count');
assert(
  sitemapEntries.every(({ loc }) => loc?.startsWith(canonicalOrigin)),
  'sitemap: non-canonical origin found'
);
assert(
  sitemapEntries.every(({ loc }) => !loc?.startsWith(`${canonicalOrigin}/en/`)),
  'sitemap: /en prefix found'
);
assert(staticEntries.length === 18, 'sitemap: static URL count mismatch');
assert(
  staticEntries.every(({ lastModified }) => !lastModified),
  'sitemap: static page has fabricated lastModified'
);
assert(articleEntries.length === expectedPosts.size, 'sitemap: article URL count mismatch');
assert(
  articleEntries.every(({ loc, lastModified }) => loc && expectedPosts.get(loc) === lastModified),
  'sitemap: article URL or front matter date mismatch'
);

console.log(
  `PASS metadata routes robots=200/text sitemap=200/xml urls=${sitemapEntries.length} static=${staticEntries.length} articles=${articleEntries.length}`
);
