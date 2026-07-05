---
version: alpha
name: Bubble-warm-design
description: A warm, soft light interface for Bubble Studio. Anchors on a warm-neutral canvas (#F9F8F6) with near-black ink type, warm taupe surfaces, and a vibrant 8-color brand palette — orange, lavender, sky, lemon, peach, sea, mint, teal — used as saturated card surfaces and accents. The warm-neutral siblings (taupe card #E8E5E0, hairline #E1E0DE) and neutral-gray text give the system a softer, sun-warmed feel than the cool-lavender Light variant. Teal (deep teal-green) is the dark anchor for emphasis tiles and dark sections.

colors:
  primary: "#0a0a0a"
  primary-active: "#172026"
  primary-disabled: "#e1e0de"
  ink: "#0a0a0a"
  body: "#3a3a3a"
  body-strong: "#1a1a1a"
  muted: "#6a6a6a"
  muted-soft: "#9a9a9a"
  hairline: "#e1e0de"
  hairline-soft: "#eceae6"
  canvas: "#f9f8f6"
  surface-blank: "#f9f8f6"
  surface-soft: "#f9f8f6"
  surface-card: "#e8e5e0"
  surface-dark: "#172026"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "#9a9a9a"
  brand-orange: "#e5692e"
  brand-lavender: "#bd91c9"
  brand-sky: "#55cae8"
  brand-lemon: "#eec963"
  brand-peach: "#ecb8a7"
  brand-sea: "#488be1"
  brand-mint: "#8ec5d1"
  brand-teal: "#13585d"
  success: "#8ec5d1"
  warning: "#eec963"
  error: "#e5692e"

typography:
  display-xl:
    fontFamily: "Inter, sans-serif"
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -2.5px
  display-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -2px
  display-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1px
  display-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.5px
  title-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.3px
  title-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 1.5px
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

fonts:
  latin:
    family: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    use: "Latin text, numerals, UI, and all display headlines"
  cjk-zh:
    family: "AlibabaPuHuiTi, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    use: "Chinese glyphs — Simplified (zh) + Traditional (tw)"
    weights: "400 Regular(55) / 500 Medium(65) / 700 Bold(85) / 900 Black(115)"
    unicodeRange: "U+4E00-9FFF, U+3400-4DBF, U+F900-FAFF, U+20000-2A6DF, U+2A700-2B73F, U+2B740-2B81F, U+2B820-2CEAF, U+2F800-2FA1F"
    fontDisplay: swap
    source: "self-hosted woff2 via @font-face"
  cjk-ja:
    family: "'Noto Sans JP', AlibabaPuHuiTi, sans-serif"
    use: "Japanese kana + kanji — RESERVED, no ja locale active yet"
  cjk-ko:
    family: "'Noto Sans KR', AlibabaPuHuiTi, sans-serif"
    use: "Korean hangul — RESERVED, no ko locale active yet"
  body-stack:
    family: "Inter, AlibabaPuHuiTi, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    use: "Global default applied to body; Latin renders Inter, CJK falls to AlibabaPuHuiTi via unicode-range"

rounded:
  xs: 6px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-blank}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-on-color:
    backgroundColor: "{colors.surface-blank}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: 96px
  hero-illustration-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  feature-card-orange:
    backgroundColor: "{colors.brand-orange}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-lavender:
    backgroundColor: "{colors.brand-lavender}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-sky:
    backgroundColor: "{colors.brand-sky}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-lemon:
    backgroundColor: "{colors.brand-lemon}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-peach:
    backgroundColor: "{colors.brand-peach}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-sea:
    backgroundColor: "{colors.brand-sea}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-mint:
    backgroundColor: "{colors.brand-mint}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-teal:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-soft:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  product-mockup-card:
    backgroundColor: "{colors.surface-blank}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  testimonial-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  pricing-tier-card:
    backgroundColor: "{colors.surface-blank}"
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-tier-card-featured:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  text-input:
    backgroundColor: "{colors.surface-blank}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.surface-blank}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  category-tab-active:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
  badge-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  cta-band-illustrated:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: "{rounded.xl}"
    padding: 80px
  footer:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 80px
---

## Overview

Bubble Studio's **warm** theme runs a **soft, sun-warmed light** interface. The base atmosphere is a **warm-neutral canvas** (`{colors.canvas}` — #F9F8F6) holding near-black ink type and warm taupe surfaces. Brand voltage comes from the same **vibrant 8-color palette** dropped in as saturated solid-color cards and accents — but the neutral siblings are warm taupe (`{colors.surface-card}` — #E8E5E0, `{colors.hairline}` — #E1E0DE) and the text scale is neutral gray, giving the whole system a softer, warmer feel than the cool-lavender **Light** variant.

The brand set swaps **grass for peach** (`{colors.brand-peach}` — #ECB8A7): a warm rosy pastel that pulls the palette toward the warm end. **Teal** (`{colors.brand-teal}` — #13585D) is the dark anchor for featured tiles and emphasis sections.

Type voice runs **Inter** for Latin and **AlibabaPuHuiTi (阿里巴巴普惠体)** for CJK — same standard as the Light variant. Weight and size carry the hierarchy; display headlines sit at weight 700 with tight tracking; body stays at 400.

**Key Characteristics:**
- Warm-neutral canvas (`{colors.canvas}` — #F9F8F6). The warm neutrals around it (taupe card + hairline) are what distinguish this from the cool-lavender Light theme.
- Near-black primary CTAs (`{colors.primary}` — #0A0A0A); active deepens to `{colors.primary-active}` (#172026). Buttons rounded `{rounded.md}` (12px).
- 8-color saturated palette: `{colors.brand-orange}`, `{colors.brand-lavender}`, `{colors.brand-sky}`, `{colors.brand-lemon}`, `{colors.brand-peach}`, `{colors.brand-sea}`, `{colors.brand-mint}`, `{colors.brand-teal}`.
- Warm taupe neutral surface: `{colors.surface-card}` (#E8E5E0) — the single elevated neutral layer. The light surfaces (canvas / blank / soft) all sit at #F9F8F6, so contrast comes from the taupe card and the brand colors, not from layered light grays.
- Warm hairline `{colors.hairline}` (#E1E0DE) on cards and inputs.
- Neutral-gray text scale: ink #0A0A0A, body #3A3A3A, muted #6A6A6A, muted-soft #9A9A9A.
- Inter (Latin) + AlibabaPuHuiTi (CJK) — weight 700 display, weight 400 body.
- Generous rounding: `{rounded.md}` (12px) buttons/inputs, `{rounded.lg}` (16px) content cards, `{rounded.xl}` (24px) feature cards.
- No heavy shadows; depth is color contrast + warm hairlines.
- Section rhythm `{spacing.section}` (96px) between major bands.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #0A0A0A): All primary CTAs, h1/h2 ink type. Near-black.
- **Brand Orange** (`{colors.brand-orange}` — #E5692E): Warm orange card surface and accent. Highest-energy brand color.
- **Brand Lavender** (`{colors.brand-lavender}` — #BD91C9): Soft purple card surface.
- **Brand Sky** (`{colors.brand-sky}` — #55CAE8): Bright cyan card surface.
- **Brand Lemon** (`{colors.brand-lemon}` — #EEC963): Warm yellow card — takes dark text.
- **Brand Peach** (`{colors.brand-peach}` — #ECB8A7): Warm rosy pastel card — takes dark text. The warm variant's signature color (replaces grass).
- **Brand Sea** (`{colors.brand-sea}` — #488BE1): Saturated blue card surface.
- **Brand Mint** (`{colors.brand-mint}` — #8EC5D1): Pale teal card — takes dark text.
- **Brand Teal** (`{colors.brand-teal}` — #13585D): Deep teal-green. The dark anchor for featured tiles and emphasis sections.

### Surface
- **Canvas** (`{colors.canvas}` — #F9F8F6): The default page floor. Warm-neutral off-white.
- **Blank** (`{colors.surface-blank}` — #F9F8F6): Card/input base surface; the clean "paper" layer.
- **Surface Soft** (`{colors.surface-soft}` — #F9F8F6): Same value as canvas in this theme — the warm palette collapses the lightest three surfaces onto one tone. Reach for `{colors.surface-card}` when you need a visible elevated band.
- **Surface Card** (`{colors.surface-card}` — #E8E5E0): Warm taupe. The one elevated neutral surface — testimonial cards, footer, CTA band, active tabs and badges.
- **Surface Dark** (`{colors.surface-dark}` — #172026): Near-black for occasional dark sections; also the primary-active value.
- **Hairline** (`{colors.hairline}` — #E1E0DE): Warm 1px borders on cards and inputs.
- **Hairline Soft** (`{colors.hairline-soft}` — #ECEAE6): Faint warm divider inside light groupings (derived).

### Text
- **Ink** (`{colors.ink}` — #0A0A0A): Headlines and primary text.
- **Body Strong** (`{colors.body-strong}` — #1A1A1A): Emphasized body, lead paragraphs (derived between ink and body).
- **Body** (`{colors.body}` — #3A3A3A): Default running-text.
- **Muted** (`{colors.muted}` — #6A6A6A): Sub-headings, breadcrumbs, footer body.
- **Muted Soft** (`{colors.muted-soft}` — #9A9A9A): Captions, fine-print.
- **On Primary / On Dark** (`{colors.on-primary}` — #FFFFFF): Text on primary buttons and dark/saturated cards (orange, lavender, sky, sea, teal).

### Semantic
- **Success** (`{colors.success}` — #8EC5D1): Reuses brand mint for success states.
- **Warning** (`{colors.warning}` — #EEC963): Reuses brand lemon for warnings.
- **Error** (`{colors.error}` — #E5692E): Reuses brand orange for validation errors.

## Typography

### Font Family
For **Latin text** the system runs **Inter** (`{fonts.latin}`) — headlines, body, navigation, numerals, and UI. Hierarchy is carried by size and weight, not by a second Latin face.

CJK text uses a separate face and is wired so the two never collide: the CJK font is scoped by `unicode-range`, so Latin characters always render in Inter and only CJK codepoints pull the CJK face. The global `body` declaration is the `{fonts.body-stack}` — `Inter, AlibabaPuHuiTi, …system…` — and the browser picks per-glyph.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 72px | 700 | 1.0 | -2.5px | Homepage h1 |
| `{typography.display-lg}` | 56px | 700 | 1.05 | -2px | Section heads |
| `{typography.display-md}` | 40px | 700 | 1.1 | -1px | Sub-section heads, product names |
| `{typography.display-sm}` | 32px | 700 | 1.15 | -0.5px | CTA-band heads, feature card titles |
| `{typography.title-lg}` | 24px | 600 | 1.3 | -0.3px | Pricing plan names, larger feature titles |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | Card titles, intro paragraphs |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | Small card titles, list labels |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Default running-text |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Footer body, fine-print |
| `{typography.caption}` | 13px | 500 | 1.4 | 0 | Badge labels, captions |
| `{typography.caption-uppercase}` | 12px | 600 | 1.4 | 1.5px | Section labels (e.g. "COLOR PALETTE"), badges |
| `{typography.button}` | 14px | 600 | 1.0 | 0 | Standard button labels |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Top-nav menu items |

### Multilingual & CJK Typography

| Script / Locale | Face | Token | Status |
|---|---|---|---|
| Latin (en) | Inter + system fallback | `{fonts.latin}` | Active |
| Chinese — Simplified (zh) | AlibabaPuHuiTi (阿里巴巴普惠体) | `{fonts.cjk-zh}` | Active |
| Chinese — Traditional (tw) | AlibabaPuHuiTi | `{fonts.cjk-zh}` | Active |
| Japanese (ja) | Noto Sans JP → AlibabaPuHuiTi | `{fonts.cjk-ja}` | Reserved (no locale) |
| Korean (ko) | Noto Sans KR → AlibabaPuHuiTi | `{fonts.cjk-ko}` | Reserved (no locale) |

**AlibabaPuHuiTi** is self-hosted as `woff2` via `@font-face` in four weights that map onto the same scale as Inter: **400** Regular (PuHuiTi 55), **500** Medium (65), **700** Bold (85), **900** Black (115). All four use `font-display: swap` and a CJK-only `unicode-range` (`{fonts.cjk-zh}` → `unicodeRange`), so they load only when a CJK glyph is on screen — Latin pages pay no download cost.

**Weight mapping across scripts.** A `{typography.display-xl}` headline (weight 700) renders Inter Bold for Latin and PuHuiTi Bold (85) for CJK — perceived weight stays matched. Avoid weight 900 for Latin display (Inter has no Black in the loaded set); 900 is reserved for CJK emphasis where PuHuiTi Black (115) is available.

**Letter-spacing caveat.** The negative tracking on display tokens (-1 to -2.5px) is tuned for Latin. CJK glyphs are monospaced-square and should NOT inherit negative letter-spacing — set `letter-spacing: 0` (or `normal`) on CJK display headings.

**Extending to ja / ko.** When a Japanese or Korean locale is added, register **Noto Sans JP** / **Noto Sans KR** ahead of AlibabaPuHuiTi (PuHuiTi covers Han ideographs but not kana or hangul), each scoped by its own `unicode-range`, weights mapped 400/500/700, `font-display: swap`. No other token changes are required.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) between major editorial bands.
- **Card internal padding:** `{spacing.xl}` (32px) for feature cards and pricing tiers; `{spacing.lg}` (24px) for testimonial and product mockup cards.

### Grid & Container
- **Max content width:** ~1280px centered.
- **Editorial body:** Single 12-column grid; hero often uses a 7/5 split (h1 left, artifact right).
- **Feature card grids:** 3-up or 5-up at desktop, 2-up at tablet, 1-up at mobile.
- **Pricing grid:** 3–4 up at desktop, 1-up at mobile.

### Whitespace Philosophy
Generous whitespace around big bold headlines and saturated cards. The warm-neutral canvas + bright color cards + warm taupe surfaces create a soft, sun-warmed feel without clutter or shadow.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, top nav, hero |
| Soft hairline | 1px `{colors.hairline}` (#E1E0DE) border | Inputs, small content cards |
| Saturated card | Brand color fill — no shadow | Feature cards |
| Warm neutral card | `{colors.surface-card}` (#E8E5E0) fill — no shadow | Testimonial, secondary cards, footer |
| Subtle drop shadow | Faint shadow at low alpha | Hover-elevated states (rare) |

The system uses no heavy shadows. Because the three lightest surfaces share one value, the warm taupe `{colors.surface-card}` carries all neutral elevation; everything else is brand-color contrast and warm hairlines.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 6px | Small badges, dropdown items |
| `{rounded.sm}` | 8px | Small buttons, hairline-border accent |
| `{rounded.md}` | 12px | Standard CTA buttons, text inputs |
| `{rounded.lg}` | 16px | Content cards, testimonial cards, pricing tiers |
| `{rounded.xl}` | 24px | Feature cards (the saturated brand-color cards) |
| `{rounded.pill}` | 9999px | Category tabs, badge pills |
| `{rounded.full}` | 9999px / 50% | Avatars, icon buttons |

## Components

### Top Navigation

**`top-nav`** — Light nav bar pinned to top. 64px tall, `{colors.canvas}` background. Logo + wordmark at left, primary horizontal menu center, right-side cluster with "Sign in" + a primary `{component.button-primary}`. Menu items in `{typography.nav-link}` (Inter 14px / 500).

### Buttons

**`button-primary`** — Background `{colors.primary}` (#0A0A0A), text `{colors.on-primary}` (white), type `{typography.button}` (Inter 14px / 600), padding 12px × 20px, height 44px, rounded `{rounded.md}` (12px). Active deepens to `{colors.primary-active}` (#172026).

**`button-secondary`** — Light button with warm hairline outline. Background `{colors.surface-blank}`, text `{colors.ink}`, 1px `{colors.hairline}` border.

**`button-on-color`** — White button used over saturated brand-color cards. Background `{colors.surface-blank}`, ink text.

**`button-text-link`** — Inline text button, no background. Used for "Sign in" and inline link CTAs.

**`text-link`** — Inline body links in `{colors.ink}` with underline.

### Cards & Containers

**`hero-band`** — Light-canvas hero with a 7-5 grid: h1 + sub-headline + button row left, artifact right. Vertical padding `{spacing.section}` (96px).

**`hero-illustration-card`** — Right-side artifact card. Background `{colors.surface-card}` (warm taupe #E8E5E0 — the only neutral with contrast against canvas in this theme), rounded `{rounded.xl}` (24px).

**`feature-card-orange`** / **`-lavender`** / **`-sky`** / **`-lemon`** / **`-peach`** / **`-sea`** / **`-mint`** / **`-teal`** — Saturated single-color feature cards. Background varies per variant; rounded `{rounded.xl}` (24px); padding `{spacing.xl}` (32px). Each carries an h3 in `{typography.title-md}`, body description, and product UI fragment or icon. Text flips to `{colors.on-primary}` (white) on the darker saturations — orange, lavender, sky, sea, teal — and stays `{colors.ink}` (dark) on the lighter lemon, peach, and mint, which have enough contrast for dark text.

**`feature-card-soft`** — Lower-key card variant on `{colors.surface-card}` (#E8E5E0). For features that don't warrant a saturated color.

**`product-mockup-card`** — Card showing product UI. Background `{colors.surface-blank}` with `{colors.hairline}` border, rounded `{rounded.lg}`, padding `{spacing.lg}` (24px).

**`testimonial-card`** — Customer quote cards. Background `{colors.surface-card}` (warm taupe), rounded `{rounded.lg}`, padding `{spacing.lg}` (24px). Avatar + name + role row above the quote in `{typography.body-md}`.

**`pricing-tier-card`** — Standard tier card. Background `{colors.surface-blank}` with warm hairline, rounded `{rounded.lg}`, padding `{spacing.xl}` (32px).

**`pricing-tier-card-featured`** — The featured tier flips to `{colors.brand-teal}` (deep teal). The teal surface IS the featured signal.

### Inputs & Forms

**`text-input`** — Background `{colors.surface-blank}`, text `{colors.ink}`, type `{typography.body-md}`, rounded `{rounded.md}` (12px), padding 12px × 16px, height 44px. 1px `{colors.hairline}` border.

**`text-input-focused`** — Border thickens to ink for emphasis.

### Tabs / Badges

**`category-tab`** + **`category-tab-active`** — Pill-shaped sub-nav tabs. Inactive: transparent + muted text. Active: `{colors.surface-card}` background + ink text. Padding 8px × 16px.

**`badge-pill`** — Small warm-taupe-fill pill labels in `{typography.caption}` (13px / 500), `{colors.surface-card}` background, rounded `{rounded.pill}`.

### CTA / Footer

**`cta-band-illustrated`** — Pre-footer CTA band. Background `{colors.surface-card}` (warm taupe), rounded `{rounded.xl}`, padding 80px. Carries an h2 in `{typography.display-md}`, a sub-line, and a `{component.button-primary}`. A saturated brand-color or teal tile can anchor this band for extra voltage.

**`footer`** — Warm-taupe footer on `{colors.surface-card}` (#E8E5E0), text `{colors.body}`. 4-column link list. Vertical padding 80px. Stays light/warm — no dark footer. (Uses surface-card rather than surface-soft because soft equals canvas in this theme and would give the footer no separation.)

## Do's and Don'ts

### Do
- Anchor every page on the warm-neutral canvas (`{colors.canvas}` — #F9F8F6) so bright cards read loud.
- Use the warm taupe `{colors.surface-card}` (#E8E5E0) for every neutral elevated surface — it's the only neutral that separates from canvas here.
- Cycle saturated cards across the page so no two adjacent cards share a color.
- Reserve teal (`{colors.brand-teal}` — #13585D) as the single dark anchor — featured pricing, dark CTA tiles, emphasis blocks.
- Put white text on the darker saturations (orange, lavender, sky, sea, teal) and dark ink on the lighter ones (lemon, peach, mint).
- Keep Latin in Inter and CJK in AlibabaPuHuiTi; let weight and size carry hierarchy.
- Anchor each band with `{spacing.section}` (96px) vertical rhythm.

### Don't
- Don't use pure white as the canvas — the #F9F8F6 warm-neutral floor is the contract.
- Don't rely on surface-soft for contrast — it equals canvas here; use surface-card instead.
- Don't add a 9th brand color. The 8-color palette is full.
- Don't add a second Latin typeface; Inter carries Latin, AlibabaPuHuiTi carries CJK.
- Don't put white text on lemon, peach, or mint — contrast fails. Use ink.
- Don't apply negative letter-spacing to CJK display headings.
- Don't use a dark footer; close pages on the warm surface-card band.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero h1 72→36px; hero artifact stacks below; feature grids 1-up; pricing 1-up |
| Tablet | 768–1024px | Top nav tightens; feature cards 2-up; pricing 2-up |
| Desktop | 1024–1440px | Full top-nav; 3–5 up feature cards; 3-up pricing tiers |
| Wide | > 1440px | Same as desktop with more breathing room; max content 1280px |

### Touch Targets
- `{component.button-primary}` at minimum 44 × 44px.
- `{component.text-input}` height is 44px.

### Collapsing Strategy
- Top nav collapses to hamburger at < 768px.
- Hero 7-5 grid → single-column on mobile.
- Feature card grids reduce columns rather than scaling.
- Saturated cards retain their colored fill at every breakpoint.
- Pricing tier cards collapse 4 → 2 → 1.

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key (`{component.feature-card-peach}`, `{component.pricing-tier-card-featured}`).
2. Pick the right brand-color card for the feature; keep adjacent cards on different colors.
3. Variants of an existing component (`-active`, `-disabled`) live as separate entries.
4. Use `{token.refs}` everywhere — never inline hex.
5. Never document hover.
6. Display headlines stay Inter 700 with negative letter-spacing (Latin only). Body stays Inter 400.
7. The warm-throughout palette is a system contract — no dark footer, no pure-white canvas; neutral elevation comes from surface-card.

## Known Gaps

- The three lightest surfaces (Canvas, Blank, Soft) share #F9F8F6 in the source palette; all neutral elevation is delegated to `{colors.surface-card}` (#E8E5E0).
- `{colors.body-strong}` (#1A1A1A) and `{colors.hairline-soft}` (#ECEAE6) are derived, not given in the source swatches.
- Brand-on-color text rules (white vs. ink) are derived from contrast, not the swatch labels (which render white); confirm against WCAG for body-size text.
- Semantic colors reuse brand mint/lemon/orange; dedicated semantic tints are not defined.
- This warm theme differs from the Light theme only in the neutral surface/text scale and peach-for-grass; brand hues, type, spacing, radius, and components are otherwise shared.
- Animation/transition timings, form-validation states beyond focus, and card iconography style are out of scope.
