# Portfolio Website — Agent Context File

## Project Overview
- **Type**: Personal portfolio for a professional video editor
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4 + custom CSS (App.css)
- **Animations**: framer-motion
- **Icons**: lucide-react
- **Domain**: siyamsaifullah.com
- **GitHub**: https://github.com/Siyam-Saifullah/Portfolio.git

## Design Preferences
- **Theme**: Dark minimal (black/near-black backgrounds)
- **Colors**:
  - `--bg-main: #0A0A0A` (main background)
  - `--bg-surface: #111111` (card/section backgrounds)
  - `--text-main: #F5F5F5` (primary text — LIGHT, must be visible on dark bg)
  - `--text-muted: #A1A1AA` (secondary text)
  - `--accent: #4F46E5` (indigo accent)
- **Typography**: Inter (headings/body), IBM Plex Mono (code/monospace)
- **Border radius**: `--radius: 24px`
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (custom expo ease)

## Critical Fixes Applied (DO NOT REGRESS)

### 1. Text Visibility (Black text on black background)
- **Root Cause**: Missing `postcss.config.js` — Tailwind v4's `@apply` directives in `index.css` never processed, so body never received background/text colors
- **Fix**: Created `postcss.config.js` with `@tailwindcss/postcss` plugin. Added explicit CSS fallbacks in `index.css`:
  ```css
  body {
    background-color: #0A0A0A;  /* Plain CSS fallback */
    color: #F5F5F5;             /* Plain CSS fallback */
  }
  ```
- **Lesson**: Every `h1-h4`, `.cta-title`, `.result-card h3`, `.service-card h3`, `.process-item h3`, `.video-label h3` must have explicit `color: var(--text-main)` or `color: #F5F5F5`

### 2. Video Aspect Ratio
- **Problem**: Hero video container had `aspect-ratio: 4/5` (portrait) but Vimeo embed is 16:9 landscape → video looked squished/cropped
- **Fix**: Changed to `aspect-ratio: 16/10` with `max-height: 80vh`

### 3. YouTube Captions
- **Status**: YouTube captions may still show despite aggressive removal attempts. The IFrame Player API has no 100% reliable way to force-disable captions when the uploader has them set as default.
- **Attempted Fixes**:
  - `cc_load_policy=0` URL parameter (doesn't always work)
  - `iv_load_policy=3` URL parameter (hides annotations)
  - Custom `YouTubePlayer` component using IFrame Player API with aggressive multi-approach:
    - `unloadModule('captions')` — removes captions module entirely
    - `setOption('captions', 'track', {})` — clears caption track
    - `unloadModule('CC')` — alternative module name
    - Retry at 500ms and 1500ms after player loads
    - Retry on every `onStateChange` event (when video starts playing)
    - URL params: `hl: 'none'`, `cc_lang_pref: 'none'`
- **Videos all have their own baked-in subtitles** — user does NOT want YouTube's auto-generated captions overlaid on top
- **Note**: The user's videos have their OWN subtitles baked into the video file itself (hardcoded), so YouTube captions are redundant and visually distracting

### 4. Build Error with Tailwind v4
- **Problem**: `ease-[cubic-bezier(0.16, 1, 0.3, 1)]` syntax in `@apply` causes comma-parsing error
- **Fix**: Replaced with plain CSS:
  ```css
  .smooth-transition {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  ```

## Project Architecture

### Key Files
| File | Purpose |
|---|---|
| `src/App.jsx` | Main component — all sections (Loader, Navbar, Hero, SocialProof, ClientReview, FeaturedWork, Results, Process, Services, CTA, Footer) |
| `src/App.css` | Component-level styles — all section layouts, cards, buttons, animations |
| `src/index.css` | Global styles — CSS variables, Tailwind config, body defaults, scrollbar, keyframes |
| `src/YouTubePlayer.jsx` | Custom YouTube embed using IFrame Player API (attempts to remove captions) |
| `src/main.jsx` | React entry point |
| `index.html` | HTML entry — SEO meta tags, Open Graph, schema.org JSON-LD, font preconnects |
| `postcss.config.js` | **REQUIRED** for Tailwind v4 to process CSS |
| `vite.config.js` | Vite config with React plugin |

### Page Sections (in order)
1. **Loader** — Animated progress bar, hides after 1.1s
2. **Navbar** — Fixed, glass morphism on scroll, mobile hamburger menu
3. **Hero** — Full-screen split layout: text left, Vimeo showreel right. Animated entrance with framer-motion
4. **SocialProof** — Stats grid: 10M+ views, 500+ videos, 30+ clients, 48h turnaround
5. **ClientReview** — YouTube testimonial embed (currently uses YouTubePlayer component)
6. **FeaturedWork** — 4 short-form (9:16) + 3 long-form (16:9) project cards with click-to-play YouTube embeds
7. **Results** — 2-column: Better Retention, Faster Turnaround
8. **Process** — 4-step workflow grid
9. **Services** — 3 service cards: Shorts Editing, Talking Heads, AI Visuals
10. **CTA** — Contact section with email links
11. **Footer** — Logo, copyright, social links (Instagram, X/Twitter)

### Smart Features
- **Intersection Observer** auto-plays/pauses Vimeo & YouTube videos on scroll
- **Lazy loading** on project thumbnails
- **Framer-motion**: fade-up on scroll, stagger children, spring hover on cards, AnimatePresence for loader

## URLs & Videos
- **Hero Video**: `wWWMIZr4sgw` (YouTube)
- **Client Review**: `xvLJ-11R-dU` (YouTube)
- **Portfolio Videos** (YouTube):
  - `a7saLfE73_Y` (Educational Short)
  - `ZKJ36Pu3o78` (Tech Review Reel)
  - `KxLkb1rH0Qg` (Podcast Clip)
  - `5OrsIIRBWxQ` (Vlog Highlight)
  - `QPII7XWo4dU` (Featured Documentary)
  - `Jford3iFSTA` (Talking Head Showcase)
  - `gNZN6h7EBTM` (Brand Documentary)
  - `nvk7W27hkkg` (Talking Head Series)
  - `XWvZdVAXV8I` (Siyam Saifullah Workflow)

## Preferences & Style Choices
- All text must be visibly light-colored on dark backgrounds (never black-on-black)
- Videos should display at natural aspect ratio (no squishing)
- User's videos already have baked-in subtitles — don't overlay YouTube captions
- Dark minimal aesthetic throughout
- Smooth scroll animations with fade-up effect
- Cards lift on hover with subtle glow
- Buttons have clean hover effects (lift + shadow)