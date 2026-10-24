const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:3100';
const out = process.env.QA_OUT || require('path').join(require('os').tmpdir(), 'pao-d5-qa');
fs.mkdirSync(out, { recursive: true });
const routes = (locale) =>
  [
    '',
    'projects',
    'blogs',
    `blogs/20260306-immutable-spec-${locale}`,
    'skills',
    'about',
    'staking',
    'governance',
    'action-detail/GA%3A14'
  ].map((path) => ({
    path: `${locale === 'en' ? '' : `/${locale}`}/${path}`.replace(/\/$/, '') || '/',
    name: path === '' ? 'home' : path.startsWith('blogs/') ? 'article' : path.startsWith('action') ? 'detail' : path
  }));
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.QA_BROWSER_PATH || chromium.executablePath(),
    headless: true
  });
  const report = [];
  for (const locale of (process.env.QA_LOCALES || 'zh,en,tw').split(',')) {
    for (const width of (process.env.QA_WIDTHS || '375,768,1440').split(',').map(Number)) {
      const context = await browser.newContext({
        viewport: { width, height: width === 375 ? 812 : 900 },
        reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.__cls = 0;
        new PerformanceObserver((list) =>
          list.getEntries().forEach((e) => {
            if (!e.hadRecentInput) window.__cls += e.value;
          })
        ).observe({ type: 'layout-shift', buffered: true });
      });
      for (const route of routes(locale)) {
        const errors = [];
        const error = (e) => errors.push(e.message);
        page.on('pageerror', error);
        const response = await page.goto(origin + route.path, { waitUntil: 'load', timeout: 60000 });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
            scrollTo({ top: y, behavior: 'instant' });
            await new Promise((r) => setTimeout(r, 35));
          }
          scrollTo({ top: 0, behavior: 'instant' });
        });
        await page.waitForTimeout(200);
        await page.evaluate(() =>
          Promise.all(
            [...document.images].map((img) =>
              img.complete
                ? null
                : new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                    setTimeout(resolve, 10000);
                  })
            )
          )
        );
        const metrics = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1: document.querySelectorAll('h1').length,
          clippedHeadings: [...document.querySelectorAll('h1,h2,h3,h4')]
            .filter((e) => e.scrollWidth > e.clientWidth + 2)
            .map((e) => e.textContent),
          hidden: [...document.querySelectorAll('.reveal')].filter((e) => getComputedStyle(e).opacity === '0').length,
          broken: [...document.images].filter((e) => e.complete && !e.naturalWidth).map((e) => e.src),
          cls: window.__cls,
          whitePanels: [...document.querySelectorAll('main *')].filter(
            (e) =>
              getComputedStyle(e).backgroundColor === 'rgb(255, 255, 255)' &&
              e.getBoundingClientRect().width > 100 &&
              e.getBoundingClientRect().height > 50
          ).length
        }));
        await page.screenshot({ path: `${out}/${locale}-${width}-${route.name}.png`, fullPage: true });
        let axe = [];
        if (width === 375 || width === 1440) {
          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .exclude('iframe')
            .analyze();
          axe = results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })).slice(0, 8)
          }));
        }
        report.push({ locale, width, ...route, status: response.status(), ...metrics, errors, axe });
        page.removeListener('pageerror', error);
        console.log(JSON.stringify(report.at(-1)));
        fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2));
      }
      await context.close();
    }
  }
  await browser.close();
  if (
    report.some(
      (r) =>
        r.status !== 200 ||
        r.h1 !== 1 ||
        r.scrollWidth > r.width ||
        r.clippedHeadings.length ||
        r.hidden ||
        r.broken.length ||
        r.whitePanels ||
        r.errors.length ||
        r.axe.length
    )
  )
    process.exitCode = 1;
})();
