---
version: alpha
name: Bubble-light-design
description: A clean, airy light interface for Bubble Studio. Anchors on a soft warm-neutral canvas (#F9F8F6) with near-black ink type, restrained cool-lavender surfaces, and a vibrant 8-color brand palette — orange, lavender, sky, lemon, grass, sea, mint, incana — used as saturated card surfaces and accents. The voltage is bright-but-light: solid color cards float on a quiet neutral floor with generous rounding and no heavy shadows. Incana (deep teal) is the dark anchor for emphasis tiles and dark sections.

colors:
  primary: "#0a0a0a"
  primary-active: "#172026"
  primary-disabled: "#d1d2d8"
  ink: "#0a0a0a"
  body: "#44454e"
  body-strong: "#172026"
  muted: "#6d6e76"
  muted-soft: "#909198"
  hairline: "#d1d2d8"
  hairline-soft: "#ebebf4"
  canvas: "#f9f8f6"
  surface-blank: "#f9f8f6"
  surface-soft: "#ebebf4"
  surface-card: "#e7e8f4"
  surface-dark: "#172026"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "#909198"
  brand-orange: "#e5692e"
  brand-lavender: "#bd91c9"
  brand-sky: "#55cae8"
  brand-lemon: "#eec963"
  brand-grass: "#a1cd5a"
  brand-sea: "#488be1"
  brand-mint: "#8ec5d1"
  brand-incana: "#13585d"
  success: "#a1cd5a"
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
    backgroundColor: "{colors.surface-soft}"
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
  feature-card-grass:
    backgroundColor: "{colors.brand-grass}"
    textColor: "{colors.on-primary}"
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
  feature-card-incana:
    backgroundColor: "{colors.brand-incana}"
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
    backgroundColor: "{colors.brand-incana}"
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
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: "{rounded.xl}"
    padding: 80px
  footer:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 80px
---

## Overview

Bubble Studio runs a **clean, light, bubble-bright** interface. The base atmosphere is a **soft warm-neutral canvas** (`{colors.canvas}` — #F9F8F6) holding near-black ink type and quiet cool-lavender surfaces. Brand voltage comes from a **vibrant 8-color palette** dropped in as saturated solid-color cards and accents that float on the quiet neutral floor. The mood is airy and playful but disciplined — bright color does the work, not shadow or texture.

Type voice runs **Inter** across the board — clean grotesque, bold at display sizes with negative letter-spacing, regular for body. There is no separate display face; weight and size carry the hierarchy. Display headlines sit at weight 700 with tight tracking; body stays at 400.

Component voltage comes from **saturated single-color cards** in an 8-color palette: orange, lavender, sky, lemon, grass, sea, mint, and incana (deep teal). Incana doubles as the dark anchor for featured tiles and emphasis sections. The colored card IS the primary visual element on long-scroll pages; everything else stays neutral so the color reads loud.

**Key Characteristics:**
- Soft warm-neutral canvas (`{colors.canvas}` — #F9F8F6). Not pure white, not cream — a quiet off-white that lets bright cards pop.
- Near-black primary CTAs (`{colors.primary}` — #0A0A0A); active state deepens to incana-black `{colors.primary-active}` (#172026). Buttons rounded `{rounded.md}` (12px).
- 8-color saturated palette: `{colors.brand-orange}`, `{colors.brand-lavender}`, `{colors.brand-sky}`, `{colors.brand-lemon}`, `{colors.brand-grass}`, `{colors.brand-sea}`, `{colors.brand-mint}`, `{colors.brand-incana}`.
- Cool-lavender neutral surfaces: `{colors.surface-soft}` (#EBEBF4) and `{colors.surface-card}` (#E7E8F4) — the only non-brand surfaces beyond canvas.
- Inter at weight 700 with -1 to -2.5px letter-spacing for display; weight 400 for body.
- Generous rounding: `{rounded.md}` (12px) for buttons + inputs, `{rounded.lg}` (16px) for content cards, `{rounded.xl}` (24px) for feature cards.
- No heavy shadows. Depth comes from the saturated color contrast between neutral canvas and bright cards.
- Section rhythm `{spacing.section}` (96px) between major bands.
- Incana (`{colors.brand-incana}` — #13585D) is the single dark anchor — featured pricing, dark CTA tiles, emphasis blocks.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #0A0A0A): All primary CTAs, h1/h2 ink type. Near-black.
- **Brand Orange** (`{colors.brand-orange}` — #E5692E): Warm orange card surface and accent. Highest-energy brand color.
- **Brand Lavender** (`{colors.brand-lavender}` — #BD91C9): Soft purple card surface.
- **Brand Sky** (`{colors.brand-sky}` — #55CAE8): Bright cyan card surface.
- **Brand Lemon** (`{colors.brand-lemon}` — #EEC963): Warm yellow card — takes dark text.
- **Brand Grass** (`{colors.brand-grass}` — #A1CD5A): Fresh green card surface; doubles as success.
- **Brand Sea** (`{colors.brand-sea}` — #488BE1): Saturated blue card surface.
- **Brand Mint** (`{colors.brand-mint}` — #8EC5D1): Pale teal card — takes dark text.
- **Brand Incana** (`{colors.brand-incana}` — #13585D): Deep teal. The dark anchor for featured tiles and emphasis sections.

### Surface
- **Canvas** (`{colors.canvas}` — #F9F8F6): The default page floor. Soft warm-neutral off-white.
- **Blank** (`{colors.surface-blank}` — #F9F8F6): Card/input base surface; reads as the clean "paper" layer on top of canvas.
- **Surface Soft** (`{colors.surface-soft}` — #EBEBF4): Footer, CTA-band, and hero-artifact background. Cool lavender tint.
- **Surface Card** (`{colors.surface-card}` — #E7E8F4): Neutral card surface, testimonial cards, active tabs and badges.
- **Surface Dark** (`{colors.surface-dark}` — #172026): Near-black for occasional dark sections; also the primary-active value.
- **Hairline** (`{colors.hairline}` — #D1D2D8): 1px borders on cards and inputs.
- **Hairline Soft** (`{colors.hairline-soft}` — #EBEBF4): Faint dividers inside light groupings.

### Text
- **Ink** (`{colors.ink}` — #0A0A0A): Headlines and primary text.
- **Body Strong** (`{colors.body-strong}` — #172026): Emphasized body, lead paragraphs.
- **Body** (`{colors.body}` — #44454E): Default running-text.
- **Muted** (`{colors.muted}` — #6D6E76): Sub-headings, breadcrumbs, footer body.
- **Muted Soft** (`{colors.muted-soft}` — #909198): Captions, fine-print.
- **On Primary / On Dark** (`{colors.on-primary}` — #FFFFFF): Text on primary buttons and dark/saturated cards (orange, lavender, sky, grass, sea, incana).

### Semantic
- **Success** (`{colors.success}` — #A1CD5A): Reuses brand grass for success states.
- **Warning** (`{colors.warning}` — #EEC963): Reuses brand lemon for warnings.
- **Error** (`{colors.error}` — #E5692E): Reuses brand orange for validation errors.

## Typography

### Font Family
For **Latin text** the system runs **Inter** (`{fonts.latin}`) — headlines, body, navigation, numerals, and UI. Hierarchy is carried by size and weight, not by a second Latin face.

CJK text uses a separate face and is wired so the two never collide: the CJK font is scoped by `unicode-range`, so Latin characters always render in Inter and only CJK codepoints pull the CJK face. The global `body` declaration is the `{fonts.body-stack}` — `Inter, AlibabaPuHuiTi, …system…` — and the browser picks per-glyph.

### Multilingual & CJK Typography

| Script / Locale | Face | Token | Status |
|---|---|---|---|
| Latin (en) | Inter + system fallback | `{fonts.latin}` | Active |
| Chinese — Simplified (zh) | AlibabaPuHuiTi (阿里巴巴普惠体) | `{fonts.cjk-zh}` | Active |
| Chinese — Traditional (tw) | AlibabaPuHuiTi | `{fonts.cjk-zh}` | Active |
| Japanese (ja) | Noto Sans JP → AlibabaPuHuiTi | `{fonts.cjk-ja}` | Reserved (no locale) |
| Korean (ko) | Noto Sans KR → AlibabaPuHuiTi | `{fonts.cjk-ko}` | Reserved (no locale) |

**AlibabaPuHuiTi** is self-hosted as `woff2` via `@font-face` in four weights that map onto the same scale as Inter: **400** Regular (PuHuiTi 55), **500** Medium (65), **700** Bold (85), **900** Black (115). All four use `font-display: swap` and a CJK-only `unicode-range` (`{fonts.cjk-zh}` → `unicodeRange`), so they load only when a CJK glyph is on screen — Latin pages pay no download cost.

**Weight mapping across scripts.** A `{typography.display-xl}` headline (weight 700) renders Inter Bold for Latin and PuHuiTi Bold (85) for CJK — the perceived weight stays matched. Because Inter and PuHuiTi do not expose identical optical weights, avoid weight 900 for Latin display (Inter has no Black in the loaded set); 900 is reserved for CJK emphasis where PuHuiTi Black (115) is available.

**Letter-spacing caveat.** The negative tracking on display tokens (-1 to -2.5px) is tuned for Latin. CJK glyphs are monospaced-square and should NOT inherit negative letter-spacing — set `letter-spacing: 0` (or `normal`) on CJK display headings to avoid glyphs colliding.

**Extending to ja / ko.** When a Japanese or Korean locale is added, register **Noto Sans JP** / **Noto Sans KR** ahead of AlibabaPuHuiTi (PuHuiTi covers Han ideographs but not kana or hangul), each scoped by its own `unicode-range`, weights mapped 400/500/700, `font-display: swap`. No other token changes are required.

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

### Principles
Inter at weight 700 with negative letter-spacing IS the display voice. Body stays at 400; intermediate UI labels at 500–600. Mixing in a second display face is a system violation — the whole brand reads on one type family, kept clean by tight tracking at large sizes.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) between major editorial bands.
- **Card internal padding:** `{spacing.xl}` (32px) for feature cards and pricing tiers; `{spacing.lg}` (24px) for testimonial and product mockup cards.

### Grid & Container
- **Max content width:** ~1280px centered.
- **Editorial body:** Single 12-column grid; hero often uses a 7/5 split (h1 left, artifact right).
- **Feature card grids:** 3-up or 5-up at desktop (the palette swatch grid is 5-up), 2-up at tablet, 1-up at mobile.
- **Pricing grid:** 3–4 up at desktop, 1-up at mobile.

### Whitespace Philosophy
Generous whitespace around big bold headlines and saturated cards. The neutral canvas + bright color cards create a light, playful warmth without clutter or shadow.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, top nav, hero |
| Soft hairline | 1px `{colors.hairline}` border | Inputs, small content cards |
| Saturated card | Brand color fill — no shadow | Feature cards |
| Neutral card | `{colors.surface-card}` fill — no shadow | Testimonial, secondary cards |
| Subtle drop shadow | Faint shadow at low alpha | Hover-elevated states (rare) |

The system uses no heavy shadows. Depth comes from saturated color contrast between the neutral canvas and bright cards, plus the slim `{colors.hairline}` (#D1D2D8) outlines on neutral surfaces.

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

**`button-primary`** — Background `{colors.primary}` (#0A0A0A), text `{colors.on-primary}` (white), type `{typography.button}` (Inter 14px / 600), padding 12px × 20px, height 44px, rounded `{rounded.md}` (12px). Active state deepens to `{colors.primary-active}` (#172026).

**`button-secondary`** — Light button with hairline outline. Background `{colors.surface-blank}`, text `{colors.ink}`, 1px `{colors.hairline}` border.

**`button-on-color`** — White button used over saturated brand-color cards. Background `{colors.surface-blank}`, ink text.

**`button-text-link`** — Inline text button, no background. Used for "Sign in" and inline link CTAs.

**`text-link`** — Inline body links in `{colors.ink}` with underline.

### Cards & Containers

**`hero-band`** — Light-canvas hero with a 7-5 grid: h1 + sub-headline + button row on the left, artifact on the right. Vertical padding `{spacing.section}` (96px).

**`hero-illustration-card`** — Right-side artifact card. Background `{colors.surface-soft}` (#EBEBF4), rounded `{rounded.xl}` (24px).

**`feature-card-orange`** / **`-lavender`** / **`-sky`** / **`-lemon`** / **`-grass`** / **`-sea`** / **`-mint`** / **`-incana`** — Saturated single-color feature cards. Background varies per variant; rounded `{rounded.xl}` (24px); padding `{spacing.xl}` (32px). Each carries an h3 in `{typography.title-md}`, a body description, and product UI fragment or icon. Text flips to `{colors.on-primary}` (white) on the darker saturations — orange, lavender, sky, grass, sea, incana — and stays `{colors.ink}` (dark) on the lighter lemon and mint, which have enough contrast for dark text. (This mirrors the palette swatches, where white labels sit on the saturated cards.)

**`feature-card-soft`** — Lower-key card variant on `{colors.surface-card}` (#E7E8F4). For features that don't warrant a saturated color.

**`product-mockup-card`** — Card showing product UI. Background `{colors.surface-blank}` with `{colors.hairline}` border, rounded `{rounded.lg}`, padding `{spacing.lg}` (24px).

**`testimonial-card`** — Customer quote cards. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding `{spacing.lg}` (24px). Avatar + name + role row above the quote in `{typography.body-md}`.

**`pricing-tier-card`** — Standard tier card. Background `{colors.surface-blank}` with hairline, rounded `{rounded.lg}`, padding `{spacing.xl}` (32px).

**`pricing-tier-card-featured`** — The featured tier flips to `{colors.brand-incana}` (deep teal). The incana surface IS the featured signal.

### Inputs & Forms

**`text-input`** — Background `{colors.surface-blank}`, text `{colors.ink}`, type `{typography.body-md}`, rounded `{rounded.md}` (12px), padding 12px × 16px, height 44px. 1px `{colors.hairline}` border.

**`text-input-focused`** — Border thickens to ink for emphasis.

### Tabs / Badges

**`category-tab`** + **`category-tab-active`** — Pill-shaped sub-nav tabs. Inactive: transparent + muted text. Active: `{colors.surface-card}` background + ink text. Padding 8px × 16px.

**`badge-pill`** — Small neutral-fill pill labels in `{typography.caption}` (13px / 500), `{colors.surface-card}` background, rounded `{rounded.pill}`.

### CTA / Footer

**`cta-band-illustrated`** — Pre-footer CTA band. Background `{colors.surface-soft}`, rounded `{rounded.xl}`, padding 80px. Carries an h2 in `{typography.display-md}`, a sub-line, and a `{component.button-primary}`. A saturated brand-color or incana tile can anchor this band for extra voltage.

**`footer`** — Light footer on `{colors.surface-soft}` (#EBEBF4), text `{colors.body}`. 4-column link list. Vertical padding 80px. Stays light — no dark footer.

## Do's and Don'ts

### Do
- Anchor every page on the neutral canvas (`{colors.canvas}` — #F9F8F6) so bright cards read loud.
- Cycle saturated cards across the page so no two adjacent cards share a color.
- Reserve incana (`{colors.brand-incana}` — #13585D) as the single dark anchor — featured pricing, dark CTA tiles, emphasis blocks.
- Put white text on the darker saturations (orange, lavender, sky, grass, sea, incana) and dark ink on the lighter ones (lemon, mint), matching contrast.
- Keep everything in Inter; let weight and size carry hierarchy.
- Use the cool-lavender neutrals (`{colors.surface-soft}`, `{colors.surface-card}`) for all non-brand surfaces.
- Anchor each band with `{spacing.section}` (96px) vertical rhythm.

### Don't
- Don't use pure white as the canvas — the #F9F8F6 warm-neutral floor is the contract.
- Don't add a 9th brand color. The 8-color palette is full.
- Don't add a second typeface. Inter carries the whole system.
- Don't put white text on lemon or mint — contrast fails. Use ink.
- Don't lean on heavy shadows for depth; depth is color contrast + slim hairlines.
- Don't use a dark footer; close pages on the light surface-soft band.
- Don't document hover styling beyond what the system encodes.

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

1. Focus on ONE component at a time. Reference its YAML key (`{component.feature-card-sky}`, `{component.pricing-tier-card-featured}`).
2. Pick the right brand-color card for the feature; keep adjacent cards on different colors.
3. Variants of an existing component (`-active`, `-disabled`) live as separate entries.
4. Use `{token.refs}` everywhere — never inline hex.
5. Never document hover.
6. Display headlines stay Inter 700 with negative letter-spacing. Body stays Inter 400.
7. The light-throughout palette is a system contract — no dark footer, no pure-white canvas.

## Known Gaps

- "Blank" surface and "Canvas" share the same hex (#F9F8F6) in the source palette; they're treated as the same layer here, with Blank read as the clean card/input base.
- Brand-on-color text rules (white vs. ink) are derived from the palette swatches' label colors; per-component contrast should be confirmed against WCAG for body-size text.
- Semantic colors reuse brand grass/lemon/orange; dedicated semantic tints are not defined.
- Animation and transition timings are out of scope.
- Form validation states beyond `{component.text-input-focused}` are not extracted.
- Illustration/iconography style for cards is not formalized as tokens.
