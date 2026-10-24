# S0006 D5 implementation acceptance

Checked 2026-10-24 against `docs/redesign-v2/final/DESIGN-neon-d5.md` and the D5 page prototypes. This report covers the production build before publishing; the deployment result is recorded by GitHub Actions.

## Scope and result

- Home, works, blog index, article, Skills, About, Staking, governance and proposal detail use the D5 system. Products retains its redirect to Projects.
- English, Simplified Chinese and Traditional Chinese at 375×812, 768×900 and 1440×900: **81 page/viewport cases passed**.
- Every case returned 200, had one H1, no document overflow, clipped headings, hidden reveal content, broken images, legacy white panels or browser exceptions.
- axe WCAG 2 A/AA and 2.1 AA checks at 375 and 1440 across all three languages: **54 cases, zero reported violations**. The separately hosted Giscus iframe is excluded from axe checks.
- Manual screenshot review covered page headers, section transitions, work cards, blog rows, article typography/code, member cards, forms of navigation and footers. Six contact sheets are committed alongside the raw measurements. Full screenshots remain in `/tmp/pao-d5-final` on the implementation machine.
- Normal-motion interactions and eight representative no-JS pages passed; results are in `interactions.json`.

## Defects corrected during walkthrough

- Old white panels with near-white text, including blog filters and featured cards.
- Mobile language-label wrapping; Escape now closes the mobile menu and returns focus.
- Mobile About geometry overlapping copy with reduced motion enabled.
- Low contrast filter counts and TOC numbers; ambiguous breadcrumb links.
- Keyboard-inaccessible scrolling code blocks.
- Reveals missed during rapid scrolling or streamed route updates.
- TOC highlight mismatch caused by adding both sticky-header padding and heading offsets.
- Article locale switching retained the previous language's slug.
- Intro skip-button class collided with the global skip-to-content class; forced replay used an incorrectly serialized regex boundary.
- Governance shipped its entire multilingual source dataset to the browser; only the current language's card summaries are now passed to the client.
- Repeated Koios reads across routes/locales; shared five-minute caching now limits requests. Unavailable metrics on Staking show an em dash instead of the old fallback example numbers. Governance remains explicitly labeled as the existing 2025-05-15 data snapshot.

## Build and regression

All passed:

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm exec prettier --check src messages scripts/verify-neon-*.cjs scripts/verify-staking-hub.mjs
git diff --check
node scripts/verify-seo.mjs http://127.0.0.1:3100
node scripts/verify-content-network.mjs http://127.0.0.1:3100
node scripts/verify-entity-authority.mjs http://127.0.0.1:3100
node scripts/verify-staking-hub.mjs http://127.0.0.1:3100
```

The Staking verifier now checks D5 layout instead of the superseded light-palette containers. Its facts, FAQ, section IDs, sources, sitemap, low-exposure links and no-cloaking checks remain. Its Projects check is scoped to `<main>` so the approved shared footer description is not misclassified as a pool project card.

Build retains Next's advisory warnings for ordinary `<img>` elements. No new animation or application runtime dependency was added.

The first production deployment stopped before build because the Vercel project still selected discontinued Node 20. `package.json` now pins Node 22, matching the runtime used for the local build and acceptance checks and overriding the stale project setting.

## Local performance sample

A separate production build of pre-redesign commit `8eb0cc8` was run on port 3101. The final build ran on port 3100, in the same Chromium installation with normal motion. `performance.json` contains the observations.

| Page | Width | Baseline CLS | D5 CLS | Baseline LCP | D5 LCP |
| --- | --- | --- | --- | --- | --- |
| Home | 375 | 0 | 0 | 6428 ms | 3580 ms |
| Home | 1440 | 0 | 0 | 3848 ms | 3592 ms |
| Blog | 375 | 0 | 0 | 816 ms | 564 ms |
| Blog | 1440 | 0 | 0 | 796 ms | 596 ms |

These are unthrottled local observations, not field Core Web Vitals. The intentional first-session intro contributes to Home LCP. Governance first-load JavaScript dropped from 999 kB in the initial port to 147 kB; Home is 116 kB.

## Reproduce the browser checks

The browser tooling is kept outside application dependencies:

```sh
npm install --prefix /tmp/pao-visual-qa playwright @axe-core/playwright
NODE_PATH=/tmp/pao-visual-qa/node_modules node /tmp/pao-visual-qa/node_modules/playwright/cli.js install chromium
# Run against pnpm build + pnpm start --port 3100, without a concurrent dev server.
NODE_PATH=/tmp/pao-visual-qa/node_modules node scripts/verify-neon-visual.cjs
NODE_PATH=/tmp/pao-visual-qa/node_modules node scripts/verify-neon-interactions.cjs
```

Optional variables: `QA_ORIGIN`, `QA_OUT`, `QA_BROWSER_PATH`; the visual checker also supports comma-separated `QA_LOCALES` and `QA_WIDTHS`. The implementation run used the installed Chromium 1243 binary. The visual checker uses reduced motion for deterministic screenshots; the interaction checker exercises normal motion, intro replay/skip, hover, filters, clipboard, anchors, mobile menu, locale navigation and no-JS content.
