import { promises as fs } from 'node:fs';
import path from 'node:path';

const requestOrigin = process.argv[2] || 'http://127.0.0.1:3000';
const canonicalOrigin = 'https://www.bubble-studio.xyz';
const poolId = 'pool1jh5p5627hzqxdzjutfenz83qs7p2qtha4kvst3hs0829sdc0ksm';
const sectionIds = ['how-it-works', 'rewards', 'pao-pool', 'delegate', 'choose-a-pool', 'membership', 'faq', 'sources'];
const officialSources = [
  'https://docs.cardano.org/about-cardano/new-to-cardano/how-to-delegate',
  'https://developers.cardano.org/docs/get-started/infrastructure/cardano-cli/basic-operations/withdraw-rewards/',
  'https://cardano.org/stake-pool-operation/',
  'https://docs.cardano.org/about-cardano/learn/stake-pools'
];

const pageCases = [
  {
    name: 'staking-en',
    path: '/staking',
    canonical: `${canonicalOrigin}/staking`,
    lang: 'en',
    openGraphLocale: 'en_US',
    boundary: 'Rewards are not guaranteed'
  },
  {
    name: 'staking-zh',
    path: '/zh/staking',
    canonical: `${canonicalOrigin}/zh/staking`,
    lang: 'zh-Hans',
    openGraphLocale: 'zh_CN',
    boundary: '奖励并不保证'
  },
  {
    name: 'staking-tw',
    path: '/tw/staking',
    canonical: `${canonicalOrigin}/tw/staking`,
    lang: 'zh-Hant',
    openGraphLocale: 'zh_TW',
    boundary: '獎勵並不保證'
  }
];

const contextCases = [
  { name: 'home', path: '/', needle: 'href="/staking"' },
  { name: 'projects', path: '/projects', needle: 'href="/staking"' }
];

const articleBacklinks = [
  ['posts/20260405-subscriptions-are-failing-en.md', '/staking'],
  ['posts/20260405-subscriptions-are-failing-zh.md', '/zh/staking'],
  ['posts/20260405-subscriptions-are-failing-tw.md', '/tw/staking'],
  ['posts/20260131-digital-sovereignty-en.md', '/staking'],
  ['posts/20260131-digital-sovereignty-zh.md', '/zh/staking'],
  ['posts/20260131-digital-sovereignty-tw.md', '/tw/staking']
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

const decodeText = (value) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();

const getPage = async ({ name, path: pathname }) => {
  const response = await fetch(`${requestOrigin}${pathname}`);
  assert(response.ok, `${name}: expected 200, received ${response.status}`);
  return { headers: response.headers, html: await response.text() };
};

for (const pageCase of pageCases) {
  const page = await getPage(pageCase);
  const htmlTag = getTags(page.html, 'html')[0] || '';
  const links = getTags(page.html, 'link');
  const metas = getTags(page.html, 'meta');
  const canonical = links.find((tag) => getAttribute(tag, 'rel') === 'canonical');
  const alternates = Object.fromEntries(
    links
      .filter((tag) => getAttribute(tag, 'rel') === 'alternate')
      .map((tag) => [getAttribute(tag, 'hrefLang'), getAttribute(tag, 'href')])
  );
  const expectedAlternates = {
    en: `${canonicalOrigin}/staking`,
    'zh-Hans': `${canonicalOrigin}/zh/staking`,
    'zh-Hant': `${canonicalOrigin}/tw/staking`,
    'x-default': `${canonicalOrigin}/staking`
  };
  const openGraphLocale = metas.find((tag) => getAttribute(tag, 'property') === 'og:locale');
  const graphNodes = getJsonLd(page.html).flatMap((item) => item['@graph'] || []);
  const webPage = graphNodes.find((node) => node['@type'] === 'WebPage');
  const breadcrumb = graphNodes.find((node) => node['@type'] === 'BreadcrumbList');
  const faq = graphNodes.find((node) => node['@type'] === 'FAQPage');
  const visibleText = decodeText(page.html);

  assert(getAttribute(htmlTag, 'lang') === pageCase.lang, `${pageCase.name}: HTML lang mismatch`);
  assert(getAttribute(canonical || '', 'href') === pageCase.canonical, `${pageCase.name}: canonical mismatch`);
  assert(
    getAttribute(openGraphLocale || '', 'content') === pageCase.openGraphLocale,
    `${pageCase.name}: Open Graph locale mismatch`
  );
  assert(JSON.stringify(alternates) === JSON.stringify(expectedAlternates), `${pageCase.name}: hreflang mismatch`);
  assert(
    !/rel="alternate"[^>]*hreflang/i.test(page.headers.get('link') || ''),
    `${pageCase.name}: HTTP hreflang conflict`
  );
  assert((page.html.match(/<h1(?:\s|>)/gi) || []).length === 1, `${pageCase.name}: expected one H1`);
  assert(
    sectionIds.every((id) => page.html.includes(`id="${id}"`)),
    `${pageCase.name}: section missing`
  );
  assert((page.html.match(/<details(?:\s|>)/gi) || []).length === 5, `${pageCase.name}: expected five visible FAQs`);
  assert(webPage?.url === pageCase.canonical, `${pageCase.name}: WebPage URL mismatch`);
  assert(breadcrumb?.itemListElement?.length === 2, `${pageCase.name}: BreadcrumbList mismatch`);
  assert(faq?.mainEntity?.length === 5, `${pageCase.name}: FAQPage count mismatch`);
  assert(
    faq.mainEntity.every((item) => visibleText.includes(item.name) && visibleText.includes(item.acceptedAnswer?.text)),
    `${pageCase.name}: FAQPage does not match visible content`
  );
  assert(page.html.includes(poolId), `${pageCase.name}: pool ID missing`);
  assert(page.html.includes(pageCase.boundary), `${pageCase.name}: reward boundary missing`);
  assert(
    officialSources.every((source) => page.html.includes(source)),
    `${pageCase.name}: official source missing`
  );

  console.log(
    `PASS ${pageCase.name} 200 canonical=${pageCase.canonical} lang=${pageCase.lang} faq=5 sections=${sectionIds.length}`
  );
}

for (const contextCase of contextCases) {
  const page = await getPage(contextCase);
  assert(page.html.includes(contextCase.needle), `${contextCase.name}: staking link missing`);
  if (contextCase.name === 'projects') assert(page.html.includes('Pao Pool'), 'projects: Pao Pool card missing');
  console.log(`PASS ${contextCase.name} contextual-link=/staking`);
}

for (const [relativePath, backlink] of articleBacklinks) {
  const source = await fs.readFile(path.join(process.cwd(), relativePath), 'utf8');
  assert(source.includes(`](${backlink})`), `${relativePath}: localized staking backlink missing`);
}
console.log(`PASS article backlinks files=${articleBacklinks.length}`);

const sitemapResponse = await fetch(`${requestOrigin}/sitemap.xml`);
assert(sitemapResponse.ok, `sitemap: expected 200, received ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const stakingEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map((match) => match[1])
  .filter((entry) => /<loc>[^<]*\/staking<\/loc>/.test(entry));
const expectedStakingUrls = pageCases.map((pageCase) => pageCase.canonical);

assert(stakingEntries.length === 3, 'sitemap: expected three staking entries');
assert(
  expectedStakingUrls.every((url) => stakingEntries.some((entry) => entry.includes(`<loc>${url}</loc>`))),
  'sitemap: staking canonical missing'
);
assert(
  stakingEntries.every((entry) => !entry.includes('<lastmod>')),
  'sitemap: fabricated staking lastModified'
);
console.log('PASS sitemap staking=3 lastModified=none');

console.log('PASS S0002 Cardano staking topic hub verification');
