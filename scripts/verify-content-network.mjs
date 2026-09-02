import { promises as fs } from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

const requestOrigin = process.argv[2] || 'http://127.0.0.1:3000';
const canonicalOrigin = 'https://www.bubble-studio.xyz';
const updated = '2026-09-02';
const locales = {
  en: { prefix: '', lang: 'en' },
  zh: { prefix: '/zh', lang: 'zh-Hans' },
  tw: { prefix: '/tw', lang: 'zh-Hant' }
};

const families = [
  {
    slug: '20260405-subscriptions-are-failing',
    published: '2026-04-05',
    related: '20260131-digital-sovereignty'
  },
  {
    slug: '20260131-digital-sovereignty',
    published: '2026-01-31',
    related: '20260405-subscriptions-are-failing'
  },
  {
    slug: '20260325-composability-ai-cardano-ethereum',
    published: '2026-03-25',
    related: '20260131-digital-sovereignty'
  }
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)`, 'i'));
  return match?.[1];
};

const decodeAttribute = (value = '') =>
  value
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const getTags = (html, tagName) => html.match(new RegExp(`<${tagName}[^>]*>`, 'gi')) || [];

const getJsonLd = (html) =>
  [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) =>
    JSON.parse(match[1])
  );

const getElementHtml = (html, tagName) =>
  html.match(new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, 'i'))?.[0] || '';

const getPage = async (pathname) => {
  const response = await fetch(`${requestOrigin}${pathname}`);
  assert(response.ok, `${pathname}: expected 200, received ${response.status}`);
  return response.text();
};

const articlePageSource = await fs.readFile(path.join(process.cwd(), 'src/app/[locale]/blogs/[slug]/page.tsx'), 'utf8');
const visibleMarkup = articlePageSource.slice(articlePageSource.indexOf('    return ('));
assert(!visibleMarkup.includes('post.summary'), 'visual contract: summary was added to visible article markup');
assert(!visibleMarkup.includes('post.updated'), 'visual contract: updated date was added to visible article markup');
assert(!/sources|related/i.test(visibleMarkup), 'visual contract: sources or related UI was added');
console.log('PASS article visual contract visible-template-additions=0');

const checkedLinks = new Set();

for (const family of families) {
  for (const [locale, localeConfig] of Object.entries(locales)) {
    const localizedSlug = `${family.slug}-${locale}`;
    const pathname = `${localeConfig.prefix}/blogs/${localizedSlug}`;
    const canonical = `${canonicalOrigin}${pathname}`;
    const markdown = await fs.readFile(path.join(process.cwd(), 'posts', `${localizedSlug}.md`), 'utf8');
    const { data } = matter(markdown);
    const html = await getPage(pathname);
    const htmlTag = getTags(html, 'html')[0] || '';
    const metas = getTags(html, 'meta');
    const links = getTags(html, 'link');
    const canonicalTag = links.find((tag) => getAttribute(tag, 'rel') === 'canonical');
    const descriptionTag = metas.find((tag) => getAttribute(tag, 'name') === 'description');
    const article = getJsonLd(html).find((item) => item['@type'] === 'BlogPosting');
    const articleHtml = getElementHtml(html, 'article');
    const stakingPath = `${localeConfig.prefix}/staking` || '/staking';
    const relatedPath = `${localeConfig.prefix}/blogs/${family.related}-${locale}`;

    assert(typeof data.summary === 'string' && data.summary.trim(), `${localizedSlug}: summary missing`);
    assert(data.summary.length <= 160, `${localizedSlug}: summary exceeds 160 characters`);
    assert(data.updated === updated, `${localizedSlug}: updated mismatch`);
    assert(getAttribute(htmlTag, 'lang') === localeConfig.lang, `${localizedSlug}: HTML lang mismatch`);
    assert(getAttribute(canonicalTag || '', 'href') === canonical, `${localizedSlug}: canonical mismatch`);
    assert(
      decodeAttribute(getAttribute(descriptionTag || '', 'content')) === data.summary,
      `${localizedSlug}: metadata description mismatch`
    );
    assert(article?.description === data.summary, `${localizedSlug}: BlogPosting description mismatch`);
    assert(article?.datePublished === family.published, `${localizedSlug}: datePublished mismatch`);
    assert(article?.dateModified === updated, `${localizedSlug}: dateModified mismatch`);
    assert(articleHtml.includes(`href="${stakingPath}"`), `${localizedSlug}: localized staking link missing`);
    assert(articleHtml.includes(`href="${relatedPath}"`), `${localizedSlug}: localized related link missing`);

    checkedLinks.add(stakingPath);
    checkedLinks.add(relatedPath);
    console.log(`PASS ${localizedSlug} summary=yes modified=${updated} links=2`);
  }
}

for (const pathname of checkedLinks) {
  await getPage(pathname);
}
console.log(`PASS contextual link targets 200 count=${checkedLinks.size}`);

const legacyPath = '/blogs/20250905-our-dreams-en';
const legacyHtml = await getPage(legacyPath);
const legacyDescription = getTags(legacyHtml, 'meta').find((tag) => getAttribute(tag, 'name') === 'description');
const legacyArticle = getJsonLd(legacyHtml).find((item) => item['@type'] === 'BlogPosting');
assert(
  decodeAttribute(getAttribute(legacyDescription || '', 'content')).length > 0,
  'legacy: description fallback missing'
);
assert(!('dateModified' in legacyArticle), 'legacy: fabricated dateModified');
console.log('PASS legacy article fallback=description dateModified=absent');

console.log('PASS S0003 article metadata and topic network verification');
