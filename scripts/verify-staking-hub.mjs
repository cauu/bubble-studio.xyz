import { promises as fs } from 'node:fs';
import { createHash } from 'node:crypto';
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
    navLabel: 'Staking',
    boundary: 'Rewards are not guaranteed'
  },
  {
    name: 'staking-zh',
    path: '/zh/staking',
    canonical: `${canonicalOrigin}/zh/staking`,
    lang: 'zh-Hans',
    openGraphLocale: 'zh_CN',
    navLabel: '质押',
    boundary: '奖励并不保证'
  },
  {
    name: 'staking-tw',
    path: '/tw/staking',
    canonical: `${canonicalOrigin}/tw/staking`,
    lang: 'zh-Hant',
    openGraphLocale: 'zh_TW',
    navLabel: '質押',
    boundary: '獎勵並不保證'
  }
];

const contextCases = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects' }
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

const getVisibleText = (html) =>
  decodeText(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, ' ')
  );

const getElementHtml = (html, tagName) =>
  html.match(new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, 'i'))?.[0] || '';

const getPage = async ({ name, path: pathname }) => {
  const response = await fetch(`${requestOrigin}${pathname}`);
  assert(response.ok, `${name}: expected 200, received ${response.status}`);
  return { headers: response.headers, html: await response.text() };
};

const stakingSource = await fs.readFile(path.join(process.cwd(), 'src/app/[locale]/staking/page.tsx'), 'utf8');
const stakingSections = [...stakingSource.matchAll(/<section\b[^>]*className="([^"]*)"/g)].map((match) => match[1]);

assert(
  stakingSections.every((className) => !className.includes('bg-primary') && !className.includes('bg-brand-lemon')),
  'visual contract: full-width primary or lemon section remains'
);
assert(stakingSource.includes('rounded-xl bg-brand-incana'), 'visual contract: inset Incana reward container missing');
assert(
  stakingSource.includes('rounded-xl bg-brand-lemon'),
  'visual contract: inset lemon membership container missing'
);
assert(!stakingSource.includes('shadow-soft'), 'visual contract: independent shadow cards remain');
assert(!stakingSource.includes('grid-cols-5'), 'visual contract: five-column delegation layout remains');
console.log('PASS visual contract inset-accents=yes shadow-cards=0 five-column-layout=absent');

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
  const visibleText = getVisibleText(page.html);
  const navText = getVisibleText(getElementHtml(page.html, 'nav'));
  const footerText = getVisibleText(getElementHtml(page.html, 'footer'));

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
  assert(
    !metas.some((tag) => getAttribute(tag, 'name') === 'robots' && /noindex/i.test(getAttribute(tag, 'content') || '')),
    `${pageCase.name}: unexpected noindex`
  );
  assert(!navText.includes(pageCase.navLabel), `${pageCase.name}: prominent navigation entry remains`);
  assert(!footerText.includes('Cardano · PAO'), `${pageCase.name}: prominent footer entry remains`);
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
  assert(!page.html.includes('href="/staking"'), `${contextCase.name}: prominent staking link remains`);
  if (contextCase.name === 'projects')
    assert(!getVisibleText(page.html).includes('Pao Pool'), 'projects: Pao Pool card remains');
  console.log(`PASS ${contextCase.name} prominent-staking-entry=absent`);
}

for (const [relativePath, backlink] of articleBacklinks) {
  const source = await fs.readFile(path.join(process.cwd(), relativePath), 'utf8');
  assert(source.includes(`](${backlink})`), `${relativePath}: localized staking backlink missing`);
}
console.log(`PASS article backlinks files=${articleBacklinks.length}`);

const llmsResponse = await fetch(`${requestOrigin}/llms.txt`);
assert(llmsResponse.ok, `llms.txt: expected 200, received ${llmsResponse.status}`);
assert(llmsResponse.headers.get('content-type')?.startsWith('text/plain'), 'llms.txt: content type mismatch');
const llms = await llmsResponse.text();
const llmsRequiredValues = [
  'Pao Studio',
  'Pao Pool',
  poolId,
  ...pageCases.map((pageCase) => pageCase.canonical),
  ...officialSources,
  `${canonicalOrigin}/sitemap.xml`
];
assert(
  llmsRequiredValues.every((value) => llms.includes(value)),
  'llms.txt: required discovery value missing'
);
console.log('PASS llms.txt 200/text entities=yes locales=3 sources=4');

const googlebotResponse = await fetch(`${requestOrigin}/staking`, {
  headers: { 'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' }
});
assert(googlebotResponse.ok, `Googlebot staking: expected 200, received ${googlebotResponse.status}`);
const googlebotHtml = await googlebotResponse.text();
const humanHtml = pages.get('staking-en').html;
assert(googlebotHtml === humanHtml, 'staking: Googlebot and normal-user HTML differ');
const stakingHash = createHash('sha256').update(humanHtml).digest('hex').slice(0, 12);
console.log(`PASS no-cloaking staking html-sha256=${stakingHash}`);

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
