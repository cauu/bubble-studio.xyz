import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const requestOrigin = process.argv[2] || 'http://127.0.0.1:3100';
const canonicalOrigin = 'https://www.bubble-studio.xyz';
const poolId = 'pool1jh5p5627hzqxdzjutfenz83qs7p2qtha4kvst3hs0829sdc0ksm';
const organizationId = `${canonicalOrigin}/#organization`;
const websiteId = `${canonicalOrigin}/#website`;
const personId = `${canonicalOrigin}/about#martin`;
const poolServiceId = `${canonicalOrigin}/staking#pao-pool`;
const github = 'https://github.com/cauu';
const twitter = 'https://x.com/cauu_128';
const cardanoscan = `https://cardanoscan.io/pool/${poolId}`;
const cexplorer = `https://cexplorer.io/pool/${poolId}`;

const aboutCases = [
  {
    name: 'about-en',
    path: '/about',
    canonical: `${canonicalOrigin}/about`,
    lang: 'en',
    authorPath: '/about#martin'
  },
  {
    name: 'about-zh',
    path: '/zh/about',
    canonical: `${canonicalOrigin}/zh/about`,
    lang: 'zh-Hans',
    authorPath: '/zh/about#martin'
  },
  {
    name: 'about-tw',
    path: '/tw/about',
    canonical: `${canonicalOrigin}/tw/about`,
    lang: 'zh-Hant',
    authorPath: '/tw/about#martin'
  }
];

const articleCases = [
  ['/blogs/20260405-subscriptions-are-failing-en', '/about#martin'],
  ['/zh/blogs/20260405-subscriptions-are-failing-zh', '/zh/about#martin'],
  ['/tw/blogs/20260405-subscriptions-are-failing-tw', '/tw/about#martin']
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

const getGraphNodes = (html) => getJsonLd(html).flatMap((item) => item['@graph'] || [item]);

const getElementHtml = (html, tagName) =>
  html.match(new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, 'i'))?.[0] || '';

const getPage = async (pathname) => {
  const response = await fetch(`${requestOrigin}${pathname}`);
  assert(response.ok, `${pathname}: expected 200, received ${response.status}`);
  return { headers: response.headers, html: await response.text() };
};

const aboutPages = new Map();

for (const pageCase of aboutCases) {
  const page = await getPage(pageCase.path);
  aboutPages.set(pageCase.name, page);
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
    en: `${canonicalOrigin}/about`,
    'zh-Hans': `${canonicalOrigin}/zh/about`,
    'zh-Hant': `${canonicalOrigin}/tw/about`,
    'x-default': `${canonicalOrigin}/about`
  };
  const nodes = getGraphNodes(page.html);
  const organization = nodes.find((node) => node['@id'] === organizationId);
  const website = nodes.find((node) => node['@id'] === websiteId);
  const person = nodes.find((node) => node['@id'] === personId);
  const service = nodes.find((node) => node['@id'] === poolServiceId);
  const aboutPage = nodes.find((node) => node['@type'] === 'AboutPage');
  const breadcrumb = nodes.find((node) => node['@type'] === 'BreadcrumbList');

  assert(getAttribute(htmlTag, 'lang') === pageCase.lang, `${pageCase.name}: HTML lang mismatch`);
  assert(getAttribute(canonical || '', 'href') === pageCase.canonical, `${pageCase.name}: canonical mismatch`);
  assert(JSON.stringify(alternates) === JSON.stringify(expectedAlternates), `${pageCase.name}: hreflang mismatch`);
  assert(
    !metas.some((tag) => getAttribute(tag, 'name') === 'robots' && /noindex/i.test(getAttribute(tag, 'content') || '')),
    `${pageCase.name}: unexpected noindex`
  );
  assert((page.html.match(/<h1(?:\s|>)/gi) || []).length === 1, `${pageCase.name}: expected one H1`);
  assert(
    ['Pao Studio', 'Bubble Studio', 'Martin', '0xMartin', 'Pao Pool', poolId].every((value) =>
      page.html.includes(value)
    ),
    `${pageCase.name}: visible identity fact missing`
  );
  assert(
    [github, twitter, cardanoscan, cexplorer].every((value) => page.html.includes(value)),
    `${pageCase.name}: link missing`
  );
  assert(organization && website && person && service, `${pageCase.name}: site entity missing`);
  assert(!organization.sameAs?.includes(cardanoscan), `${pageCase.name}: pool link remains on Organization`);
  assert(
    JSON.stringify(person.sameAs) === JSON.stringify([github, twitter]),
    `${pageCase.name}: Person sameAs mismatch`
  );
  assert(person.worksFor?.['@id'] === organizationId, `${pageCase.name}: Person worksFor mismatch`);
  assert(
    JSON.stringify(service.sameAs) === JSON.stringify([cardanoscan, cexplorer]),
    `${pageCase.name}: Service sameAs mismatch`
  );
  assert(service.provider?.['@id'] === organizationId, `${pageCase.name}: Service provider mismatch`);
  assert(service.identifier?.value === poolId, `${pageCase.name}: Service pool ID mismatch`);
  assert(aboutPage?.isPartOf?.['@id'] === websiteId, `${pageCase.name}: AboutPage WebSite mismatch`);
  assert(
    aboutPage?.about?.map((item) => item['@id']).join('|') === [organizationId, personId, poolServiceId].join('|'),
    `${pageCase.name}: AboutPage entity references mismatch`
  );
  assert(breadcrumb?.itemListElement?.length === 2, `${pageCase.name}: breadcrumb mismatch`);

  console.log(`PASS ${pageCase.name} 200 canonical=${pageCase.canonical} entities=4 links=4`);
}

for (const [pathname, authorPath] of articleCases) {
  const page = await getPage(pathname);
  const articleHtml = getElementHtml(page.html, 'article');
  const article = getJsonLd(page.html).find((item) => item['@type'] === 'BlogPosting');
  assert(articleHtml.includes(`href="${authorPath}"`), `${pathname}: localized Martin link missing`);
  assert(article?.author?.['@id'] === personId, `${pathname}: stable Person author ID missing`);
  console.log(`PASS ${pathname} Martin link=${authorPath} person-id=yes`);
}

const martinBotPath = '/blogs/20260130-the-river-just-flows-en';
const martinBotPage = await getPage(martinBotPath);
const martinBotArticleHtml = getElementHtml(martinBotPage.html, 'article');
const martinBotArticle = getJsonLd(martinBotPage.html).find((item) => item['@type'] === 'BlogPosting');
assert(!martinBotArticleHtml.includes('href="/about#martin"'), 'MartinBot: false Martin link found');
assert(martinBotArticle?.author?.name === 'MartinBot', 'MartinBot: author name mismatch');
assert(!martinBotArticle?.author?.['@id'], 'MartinBot: false Person ID found');
console.log('PASS MartinBot identity remains separate');

for (const pathname of ['/', '/projects']) {
  const page = await getPage(pathname);
  const navAndFooter = `${getElementHtml(page.html, 'nav')} ${getElementHtml(page.html, 'footer')}`;
  assert(!navAndFooter.includes('href="/about"'), `${pathname}: prominent About entry found`);
}
console.log('PASS About remains absent from nav and footer');

const sitemapResponse = await fetch(`${requestOrigin}/sitemap.xml`);
assert(sitemapResponse.ok, `sitemap: expected 200, received ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
assert(
  aboutCases.every((pageCase) => sitemap.includes(`<loc>${pageCase.canonical}</loc>`)),
  'sitemap: localized About URL missing'
);

const llmsResponse = await fetch(`${requestOrigin}/llms.txt`);
assert(llmsResponse.ok, `llms.txt: expected 200, received ${llmsResponse.status}`);
const llms = await llmsResponse.text();
assert(
  [...aboutCases.map((pageCase) => pageCase.canonical), personId, poolServiceId].every((value) => llms.includes(value)),
  'llms.txt: entity discovery value missing'
);
console.log('PASS sitemap and llms.txt localized About discovery=yes');

const googlebotResponse = await fetch(`${requestOrigin}/about`, {
  headers: { 'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' }
});
assert(googlebotResponse.ok, `Googlebot About: expected 200, received ${googlebotResponse.status}`);
const googlebotHtml = await googlebotResponse.text();
const humanHtml = aboutPages.get('about-en').html;
assert(googlebotHtml === humanHtml, 'About: Googlebot and normal-user HTML differ');
console.log(`PASS no-cloaking About html-sha256=${createHash('sha256').update(humanHtml).digest('hex').slice(0, 12)}`);

const metadataSource = await fs.readFile(path.join(process.cwd(), 'public/md.json'));
assert(
  createHash('sha256').update(metadataSource).digest('hex') ===
    'cbd5f020eed7e847537fe95e34adf2ffb29816740c791920b75b2fb66c1d4707',
  'public/md.json: protected pool metadata changed'
);
console.log('PASS protected public/md.json unchanged');

console.log('PASS S0004 entity authority verification');
