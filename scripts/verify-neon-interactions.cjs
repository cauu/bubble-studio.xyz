const { chromium } = require('playwright');
const fs = require('fs');
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:3100';
const out = process.env.QA_OUT || require('path').join(require('os').tmpdir(), 'pao-d5-qa');
fs.mkdirSync(out, { recursive: true });
const results = [];
const assert = (condition, label) => {
  if (!condition) throw Error(label);
  results.push(label);
  console.log('PASS', label);
};
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.QA_BROWSER_PATH || chromium.executablePath(),
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write']
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(origin + '/zh?intro', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4500);
  assert((await page.locator('.intro,.ghost').count()) === 0, 'intro removes overlay and clones');
  assert(!(await page.locator('html').getAttribute('class')).includes('intro-on'), 'intro releases page');
  assert((await page.evaluate(() => sessionStorage.getItem('pao-intro'))) === '1', 'intro records session');
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 200));
    }
  });
  await page.waitForTimeout(1500);
  assert((await page.locator('.reveal:not(.in)').count()) === 0, 'all home sections reveal while scrolling');
  await page.screenshot({ path: out + '/home-normal-motion.png', fullPage: true });
  await page.locator('.nav-links a[href="/zh/projects"]').click();
  await page.waitForURL('**/zh/projects');
  await page.waitForTimeout(1400);
  assert(await page.locator('.ph h1').isVisible(), 'client navigation renders works');
  await page.locator('.coil').hover();
  await page.waitForTimeout(700);
  assert(
    Number(await page.locator('.coil .awake').evaluate((e) => getComputedStyle(e).opacity)) === 1,
    'Coil wakes on hover'
  );
  await page.locator('.nav-links a[href="/zh/blogs"]').click();
  await page.waitForURL('**/zh/blogs');
  await page.getByRole('button', { name: /Cardano/ }).click();
  assert(
    await page
      .locator('.plist .c')
      .allTextContents()
      .then((a) => a.every((t) => t === 'Cardano')),
    'blog category filter'
  );
  await page.locator('.nav-links a[href="/zh/skills"]').click();
  await page.waitForURL('**/zh/skills');
  await page.locator('.cmd .copy').first().click();
  assert(
    (await page.evaluate(() => navigator.clipboard.readText())) ===
      'npx skills@latest add cauu/skills --skill immutable-spec',
    'skill command clipboard'
  );
  await page.goto(origin + '/zh/staking');
  await page.locator('details').nth(1).locator('summary').click();
  assert((await page.locator('details').nth(1).getAttribute('open')) !== null, 'FAQ opens');
  await page.goto(origin + '/zh/blogs/20260306-immutable-spec-zh');
  await page.locator('.toc a').nth(1).click();
  await page.waitForTimeout(1200);
  assert(
    (await page.locator('.toc a').nth(1).getAttribute('aria-current')) === 'location',
    'article toc tracks selected section'
  );
  await page.locator('.toc .copy').scrollIntoViewIfNeeded();
  await page.locator('.toc .copy').click();
  assert((await page.evaluate(() => navigator.clipboard.readText())).includes('/zh/blogs/'), 'article share clipboard');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(origin + '/zh');
  await page.locator('.nav-burger').click();
  assert(await page.locator('#mnav').isVisible(), 'mobile menu opens');
  await page.keyboard.press('Escape');
  assert(!(await page.locator('#mnav').isVisible()), 'mobile Escape closes menu');
  await page.locator('.nav-burger').click();
  await page.locator('#mnav a[href="/zh/projects"]').click();
  await page.waitForURL('**/zh/projects');
  assert(!(await page.locator('#mnav').isVisible()), 'mobile menu closes on navigation');
  await page.locator('.lang > button').click();
  await page.getByRole('menuitemradio', { name: 'English' }).click();
  await page.waitForURL('**/projects');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  assert((await page.locator('html').getAttribute('lang')) === 'en', 'language switch preserves route');
  await page.goto(origin + '/zh/blogs/20260306-immutable-spec-zh');
  await page.locator('.lang > button').click();
  await page.getByRole('menuitemradio', { name: 'English' }).click();
  await page.waitForURL('**/blogs/20260306-immutable-spec-en');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  assert(page.url().endsWith('-en'), 'article language switch uses translated slug');
  assert(errors.length === 0, 'no browser exceptions during interactions');
  await page.goto(origin + '/zh?intro', { waitUntil: 'domcontentloaded' });
  await page.locator('.intro-skip').waitFor();
  await page.locator('.intro-skip').click();
  await page.waitForTimeout(1200);
  assert((await page.locator('.intro,.ghost').count()) === 0, 'intro skip removes overlay');
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const plain = await nojs.newPage();
  for (const path of [
    '/zh',
    '/zh/projects',
    '/zh/blogs',
    '/zh/skills',
    '/zh/about',
    '/zh/staking',
    '/zh/governance',
    '/zh/blogs/20260306-immutable-spec-zh'
  ]) {
    await plain.goto(origin + path, { waitUntil: 'domcontentloaded' });
    assert(await plain.locator('h1').isVisible(), `no JS title ${path}`);
    assert(
      await plain.locator('.reveal').evaluateAll((es) => es.every((e) => getComputedStyle(e).opacity !== '0')),
      `no JS content ${path}`
    );
  }
  await context.close();
  await nojs.close();
  await browser.close();
  fs.writeFileSync(out + '/interactions.json', JSON.stringify(results, null, 2));
})();
