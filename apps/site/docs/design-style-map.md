# Design Style Map

Reference extracted from the legacy static homepage (`index.html`) during Astro migration.

## Token Groups

### Colors
- Brand: `#0a0a0a`, `#121212`, `#888888`, `#ccff00`.
- Core neutrals in use: white/black + gray scale utilities (`gray-50` to `gray-900`) and `neutral-800`.
- UI accents: terminal chips (`#ff5f56`, `#ffbd2e`, `#27c93f`) and status green (`green-500`).
- Overlay tones: low alpha black/white/lime for noise, glass, glows and hover overlays.

### Typography
- Sans/body: `Inter`.
- Display/headings: `Space Grotesk`.
- Mono/system labels: `JetBrains Mono`.

### Spacing, Radius, Shadows
- Repeated spacing anchors: `px-6`, `p-8`, `gap-2`, `gap-12`, `py-24`.
- Radius anchors: `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`.
- Shadow anchors: `shadow-sm`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, plus lime glow shadow.

### Motion
- Primary easing: `cubic-bezier(0.16, 1, 0.3, 1)` for reveal/entrance.
- Common durations: `100ms`, `200ms`, `300ms`, `400ms`, `500ms`, `700ms`, `0.8s`, `1s`.
- Semantic animations: `float`, `pulse-slow`, `fadeInUp`, `typeLine`.

## Reusable UI Patterns

### Header
- Fixed glass header (`bg-white/80`, `backdrop-blur-md`) with border/shadow on scroll.
- Desktop nav uses mono labels with lime underline sweep on hover.
- Mobile menu is absolute dropdown with fade-in-up entrance and bold display typography.

### Hero
- Split grid layout with large display headline, highlighted lime underline accent, and mono availability badge.
- Primary CTA is black button with lime reveal overlay; secondary CTA is outlined neutral button.
- Background combines radial tech grid + soft lime glow blob.

### Cards
- Services cards: white/dark card variants, icon tile, top border divider, and lift-on-hover.
- Project cards: dark media frame, scanline overlay, grayscale-to-color hover transition, and stat HUD reveal.
- Testimonial block: centered quote card with rounded large container and dot navigation.

### Badges
- Status badge in hero with pulsing green dot.
- Tech tags in projects as pill badges (`rounded-full`, mono, bordered translucent fill).
- "Coming Soon" badge with lime glow shadow and pulse animation.

### CTA Patterns
- Filled CTA: black base switching to lime on hover.
- Outline CTA: neutral border with subtle background shift.
- Footer/back-to-top CTA: circular icon button with black-to-lime hover inversion.

### Footer
- Light neutral surface with thin top border.
- Brand lockup left, utility action right, centered stack on mobile.

## Interaction Patterns

### Native Cursor
- Browser-native cursor is preserved.
- Interaction feedback is expressed through existing hover transitions, color shifts, and motion.

### Reveal on Scroll
- `reveal-on-scroll` starts at `opacity: 0` + `translateY(40px)`.
- IntersectionObserver toggles `is-visible` for entrance transitions.

### Hover States
- Shared hover language: lift (`-translate-y-*`), scale (`scale-105`, `scale-110`), border tint to lime, text tint to black/lime.
- Group-based hover choreography drives overlays, icon recolors and metric panel transitions.
