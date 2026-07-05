# Design System: YouMind

## 1. Visual Theme & Atmosphere

YouMind's website is a warm, illustration-driven AI creation studio that feels like opening a creative journal where every page encourages you to start making something. The design operates on a foundation of warm off-white/cream surfaces with playful hand-drawn illustrations as the signature visual language — not stock photos, not cold tech aesthetics, but whimsical character art that echoes the brand's "learning meets creation" philosophy. The result is an approachable, human canvas where custom illustrations, soft gradients, and warm typography do the emotional heavy-lifting.

The typography uses a modern geometric sans-serif system — likely Inter or a similar clean variable font — at comfortable reading weights. Headlines are bold (700) and generously sized, body text is regular (400) at readable 16px+, and the overall feeling is "friendly productivity tool" rather than "enterprise dashboard." The font operates in a clean weight range: 400 for body, 500 for UI emphasis, 600 for sub-headings, and 700 for primary headings.

What distinguishes YouMind is its illustration-first identity: custom watercolor-style character art (a cute man character, a snail mascot), sticker-like community cards, and hand-drawn decorative elements that give the site a distinctly personal, zine-like quality. Combined with generous whitespace, large rounded corners (12px–24px), soft single-layer shadows, and a muted warm color palette, the interface feels like a creative workshop — designed for thinking and making, not for dashboards or data.

**Key Characteristics:**

* Warm cream/off-white canvas (`#faf9f7` to `#ffffff`) with soft warm tones
* Illustration-first identity — custom hand-drawn character art as hero content
* Sticker/collage aesthetic for community & social proof sections
* Black primary text (`#1a1a1a` to `#222222`) — warm, readable
* Muted brand accent — warm orange/amber tones for CTAs and highlights
* Generous border-radius: 12px buttons, 16px–24px cards, pill-shaped nav elements
* Soft, single-layer shadows — no aggressive depth, just gentle lift
* Magazine-style vertical rhythm with generous section spacing
* No harsh gradients or neon — everything stays within a warm, muted palette

## 2. Color Palette & Roles

### Primary Brand

* **Warm Black** (`#1a1a1a`): Primary text, headings, strong UI elements
* **Brand Accent** (`#e8703a` approx.): CTA buttons, highlight moments — a warm burnt orange
* **Accent Hover** (`#d45f2e`): Darker pressed state for primary actions

### Text Scale

* **Primary Text** (`#1a1a1a`): Headings and body — warm near-black
* **Secondary Text** (`#6b6b6b`): Descriptions, meta text, testimonial roles
* **Tertiary Text** (`#999999`): Placeholders, disabled states, timestamps
* **White Text** (`#ffffff`): On dark buttons and overlays

### Surfaces & Backgrounds

* **Page Background** (`#faf9f7`): Warm cream, the dominant canvas color
* **Card White** (`#ffffff`): Testimonial cards, feature panels
* **Section Tint** (`#f5f3f0`): Alternating section backgrounds for visual separation
* **Illustration Background** (`#f0ede8`): Behind feature screenshots and character art
* **Dark Footer** (`#1a1a1a`): Footer area with inverted text

### Interactive & Feedback

* **Link Blue** (`#2563eb`): Inline text links (subtle, not dominant)
* **Success Green** (`#22c55e`): Confirmation states
* **Border Light** (`#e5e2dd`): Card borders, dividers — warm gray, not cold
* **Focus Ring** (`rgba(232,112,58,0.3)`): Warm accent-tinted focus indicator

### Sticker / Community Colors

* **Discord Purple** (`#5865f2`): Discord community card accent
* **X/Twitter Dark** (`#1a1a1a`): X social card
* **Mail Warm** (`#e8703a`): Email contact card — matches brand accent
* **Sticker Shadow** (`rgba(0,0,0,0.06) 0px 2px 8px`): Soft lift on community sticker cards

## 3. Typography Rules

### Font Family

* **Primary**: `Inter`, fallbacks: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
* **Monospace** (code/technical): `"SF Mono", "Fira Code", Consolas, monospace`

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
| --- | --- | --- | --- | --- | --- |
| Hero Heading | 48px–56px (3rem–3.5rem) | 700 | 1.15 | -0.5px | "Learn smarter. Create bolder." centered |
| Section Heading | 32px–36px (2rem–2.25rem) | 700 | 1.25 | -0.3px | Section titles like "How people are using YouMind" |
| Feature Heading | 24px (1.5rem) | 600 | 1.33 | -0.2px | Feature card titles like "Save anything from anywhere" |
| Card Heading | 20px (1.25rem) | 600 | 1.3 | normal | Testimonial titles, blog card titles |
| Body Large | 18px (1.125rem) | 400 | 1.6 | normal | Hero subtitle, feature descriptions |
| Body | 16px (1rem) | 400 | 1.6 | normal | Standard body text, testimonials |
| Body Medium | 16px (1rem) | 500 | 1.5 | normal | Nav items, emphasized inline text |
| Small / Meta | 14px (0.875rem) | 400 | 1.43 | normal | Testimonial roles, dates, captions |
| Tag / Badge | 12px (0.75rem) | 600 | 1.33 | 0.5px | Labels, category tags, `text-transform: uppercase` |
| Footer Small | 13px (0.8125rem) | 400 | 1.5 | normal | Footer links, legal text |

### Principles

* **Clean weight range**: 400–700. No ultra-light or ultra-bold weights — the type system feels steady and approachable, never loud or whispy.
* **Generous line-height for body**: 1.6 line-height on body text creates a leisurely, journal-like reading rhythm. The site is content-heavy (long blog posts), so readability is paramount.
* **Tight heading tracking**: Slight negative letter-spacing (-0.2px to -0.5px) on headings creates a confident, modern feel without being cold.
* **Centered hero, left-aligned sections**: The hero headline is centered and dramatic; all subsequent content is left-aligned with generous margins.

## 4. Component Stylings

### Buttons

**Primary CTA**

* Background: warm black (`#1a1a1a`) or brand accent (`#e8703a`)
* Text: `#ffffff`
* Padding: 12px 28px
* Radius: 12px (generous, not pill-shaped)
* Font: 16px weight 500
* Hover: subtle brightness increase or shadow lift
* Transition: `all 0.2s ease`

**Secondary / Ghost**

* Background: transparent
* Border: 1px solid `#e5e2dd`
* Text: `#1a1a1a`
* Radius: 12px
* Hover: background tint `#f5f3f0`

**Platform Download Buttons**

* Pill-shaped (border-radius ~20px)
* Icon (Chrome/Apple) + two-line text layout
* Subtle border, white background
* Used for browser extension and iOS app CTAs

### Cards & Containers

**Testimonial Card**

* Background: `#ffffff`
* Radius: 16px
* Padding: 24px
* Shadow: `rgba(0,0,0,0.04) 0px 1px 3px, rgba(0,0,0,0.06) 0px 4px 12px` (two-layer soft)
* Avatar: 48px circle (border-radius 50%)
* Quote text: 16px weight 400
* Author name: 14px weight 600
* Author role: 14px weight 400, secondary color

**Feature Card**

* Large screenshot/illustration as hero area
* Title: 24px weight 600
* Description: 16px weight 400, secondary text
* Optional: rounded container with subtle background tint

**Blog Preview Card**

* Full-width cover image on top (16:9 ratio approx.)
* Title: 20px weight 600 below image
* Excerpt: 14px–16px weight 400, muted
* Radius: 16px on container, 12px on image

**Community Sticker Card**

* Playful tilted/rotated appearance (CSS transform: rotate)
* Sticker-like shadow with soft edges
* Icon/logo for platform (Discord, X, Mail)
* Background varies per card — uses platform accent color as tint

### Inputs

* Border: 1px solid `#e5e2dd`
* Radius: 12px
* Padding: 12px 16px
* Font: 16px weight 400
* Focus: warm accent ring (`rgba(232,112,58,0.3)`) + border darkens

### Navigation

* Transparent/white sticky header on scroll
* YouMind wordmark logo left-aligned (minimal, text-based)
* Nav links: 16px weight 500, `#1a1a1a` text
* Dropdown menus for "Prompts" section
* "Sign in" button right-aligned — ghost/outlined style
* Mobile: hamburger menu

### Image Treatment

* Custom illustrations as hero elements — hand-drawn watercolor/cartoon style
* Product screenshots with soft rounded borders (12px–16px)
* Testimonial avatars: 48px circles
* Blog covers: full-bleed within card, top-aligned
* Illustrations carry the brand identity more than photography

## 5. Layout Principles

### Spacing System

* Base unit: 8px
* Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

### Grid & Container

* Max content width: ~1200px centered
* Hero section: full-width with centered text
* Feature sections: alternating image/text or stacked vertically
* Testimonials: horizontal scrolling carousel
* Blog previews: 3-column grid on desktop
* Community cards: 3-column with playful offsets/rotations

### Whitespace Philosophy

* **Creative-journal spacing**: Very generous vertical padding between sections (96px–128px) creates a relaxed, contemplative browsing pace — you're meant to explore ideas, not skim features.
* **Illustration breathing room**: Custom character art gets ample surrounding space, treating each illustration as a mini-hero moment.
* **Asymmetric playfulness**: Community sticker cards and some decorative elements use slight rotations and offsets, breaking the grid to feel hand-assembled.
* **Content-dense blog section**: Blog cards are tighter-spaced, inviting deeper reading.

### Border Radius Scale

* Subtle (4px): Small inline elements, tags
* Standard (12px): Buttons, inputs, small cards
* Card (16px): Feature cards, testimonial cards, blog cards
* Large (20px–24px): Download buttons, hero containers
* Circle (50%): Avatars, icon containers

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Flat (Level 0) | No shadow | Page background, section backgrounds |
| Subtle (Level 1) | `rgba(0,0,0,0.04) 0px 1px 3px` | Resting cards, nav on scroll |
| Card (Level 2) | `rgba(0,0,0,0.04) 0px 1px 3px, rgba(0,0,0,0.06) 0px 4px 12px` | Testimonial cards, feature panels |
| Sticker (Level 3) | `rgba(0,0,0,0.06) 0px 2px 8px` + slight rotation | Community sticker cards |
| Hover (Level 4) | `rgba(0,0,0,0.08) 0px 6px 20px` | Interactive card hover, button lift |

**Shadow Philosophy**: YouMind's shadow system is intentionally restrained and warm. Shadows are soft, low-opacity, and never harsh — they create a gentle "paper on desk" lift rather than a dramatic "floating in space" effect. The sticker cards add playful rotation transforms that work with the soft shadows to create a collage/bulletin-board feeling.

## 7. Do's and Don'ts

### Do

* Use warm off-white (`#faf9f7`) as the primary canvas — never cold gray or pure white for page backgrounds
* Apply custom illustrations as hero content — the hand-drawn character art IS the brand identity
* Use `#1a1a1a` (warm near-black) for text — never pure `#000000`
* Keep shadows soft and warm (max ~0.08 opacity) — the depth should feel like paper, not glass
* Use generous border-radius: 12px for buttons, 16px for cards — the rounding is friendly, not clinical
* Apply sticker-like rotations and playful offsets on community/social elements
* Use generous section spacing (96px+) to create a relaxed, creative-journal pace
* Center hero content; left-align everything else
* Let illustrations carry the visual personality — use product screenshots sparingly and always rounded

### Don't

* Don't use cold grays (`#f5f5f5`, `#e0e0e0`) — always keep surfaces warm-toned
* Don't use sharp corners (0–4px) on any card or container — the warmth comes from generous rounding
* Don't use stock photography as hero content — custom illustration is the brand's visual signature
* Don't use heavy shadows (>0.1 opacity) — keep everything light and paper-like
* Don't use neon or saturated accent colors — the palette is deliberately muted and warm
* Don't over-use the brand accent orange — it's for CTAs and key highlights only
* Don't use dark mode aesthetics or void-black backgrounds (except footer)
* Don't compress section spacing — the generous vertical rhythm is intentional and core to the experience
* Don't use harsh borders — prefer shadow lift or very subtle warm-gray borders (`#e5e2dd`)

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
| --- | --- | --- |
| Mobile | <640px | Single column, stacked features, compact nav |
| Tablet | 640–1024px | 2-column layouts, adjusted illustration sizing |
| Desktop | 1024–1440px | Full 3-column blog grid, side-by-side features |
| Large Desktop | >1440px | Max-width container, generous margins |

### Touch Targets

* CTA buttons: generous padding (12px 28px minimum)
* Nav links: adequate spacing for mobile tap
* Testimonial carousel: horizontal swipe on mobile
* Download buttons: full-width on mobile with large tap areas

### Collapsing Strategy

* Blog grid: 3 → 2 → 1 columns
* Feature sections: side-by-side → stacked
* Testimonials: multi-card row → single-card horizontal scroll
* Community stickers: 3-column → stacked, rotation reduced
* Navigation: full horizontal → hamburger menu
* Hero: same centered layout, font scales down proportionally

### Illustration Behavior

* Hero illustrations scale proportionally, may reposition on mobile
* Character art maintains aspect ratio and centered alignment
* Product screenshots responsive within rounded containers
* Sticker cards reduce rotation on smaller screens for readability

## 9. Agent Prompt Guide

### Quick Color Reference

* Page Background: Warm Cream (`#faf9f7`)
* Card Background: Pure White (`#ffffff`)
* Section Tint: Muted Warm (`#f5f3f0`)
* Primary Text: Warm Black (`#1a1a1a`)
* Secondary Text: Warm Gray (`#6b6b6b`)
* Brand Accent: Burnt Orange (`#e8703a`)
* Border: Warm Light Gray (`#e5e2dd`)
* Card Shadow: `rgba(0,0,0,0.04) 0px 1px 3px, rgba(0,0,0,0.06) 0px 4px 12px`
* Footer: Dark (`#1a1a1a`)

### Example Component Prompts

* "Create a testimonial card: white background, 16px radius. Two-layer shadow: rgba(0,0,0,0.04) 0px 1px 3px, rgba(0,0,0,0.06) 0px 4px 12px. 48px circular avatar left-aligned, quote text at 16px weight 400 in #1a1a1a, author name at 14px weight 600, role at 14px weight 400 in #6b6b6b."
* "Design a CTA button: #1a1a1a background, white text, 12px radius, 16px font weight 500, 12px 28px padding. Hover: slight shadow lift rgba(0,0,0,0.08) 0px 6px 20px. Transition all 0.2s ease."
* "Build a feature section: #faf9f7 background, large rounded product screenshot (16px radius) on one side, title at 24px weight 600 + description at 16px weight 400 on the other. 96px vertical padding between sections."
* "Create a community sticker card: platform icon + name, subtle background tint matching platform color. Radius 16px, soft shadow rgba(0,0,0,0.06) 0px 2px 8px. Apply CSS transform: rotate(-2deg) for playful tilt."
* "Design the navigation: white/transparent sticky header, YouMind wordmark left, nav links at 16px weight 500 in #1a1a1a, ghost 'Sign in' button right-aligned with 1px #e5e2dd border and 12px radius."

### Iteration Guide

1. Start with warm cream (`#faf9f7`) — never cold white or gray. The warmth is the foundation.
2. Illustrations are the hero — if you don't have custom art, use warm-toned abstract shapes or gentle gradients as placeholder, never stock photos.
3. Brand accent orange (`#e8703a`) is used sparingly — CTAs and key highlight moments only.
4. Soft two-layer shadows create a gentle paper lift — always keep opacity below 0.08 for the primary layer.
5. Generous radius: 12px buttons, 16px cards — everything should feel rounded and friendly.
6. Body text at 1.6 line-height — the reading experience should feel like a well-typeset journal.
7. Section spacing at 96px+ — don't compress the vertical rhythm; the spaciousness is intentional.
8. Playful touches: sticker rotations, hand-drawn elements, warm tones — the site should feel human-made, not template-generated.
