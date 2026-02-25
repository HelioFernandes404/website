# Design Documentation - `index.html`

Source audited: `index.html` (Tailwind CDN config + inline `<style>` + utility classes)

## 1. Style Guide

### Color System

Primary accent and high-contrast neutral palette define the visual language.

| Role                        | Token Hint          | Value                   | Notes                                                    |
| --------------------------- | ------------------- | ----------------------- | -------------------------------------------------------- |
| Accent Primary              | `accent.primary`    | `#CCFF00`               | Main highlight color, CTA hovers, focus, decorative glow |
| Base Text Dark              | `neutral.950`       | `#0A0A0A`               | Main text/cursor color                                   |
| App Background              | `neutral.0`         | `#FFFFFF`               | Base page background                                     |
| Dark Surface                | `neutral.975`       | `#121212`               | Deep dark brand tone                                     |
| True Black                  | `neutral.black`     | `#000000`               | Dark buttons/strong contrast blocks                      |
| Muted Text                  | `neutral.500`       | `#6B7280`               | Secondary body text                                      |
| Muted Brand Gray            | `neutral.brandGray` | `#888888`               | Brand-specific subdued text                              |
| Subtle Surface              | `neutral.50`        | `#F9FAFB`               | Section and card backgrounds                             |
| Borders Soft                | `neutral.100`       | `#F3F4F6`               | Standard light border                                    |
| Borders Medium              | `neutral.200`       | `#E5E7EB`               | Inputs/dividers                                          |
| Gray Scale (used)           | `neutral.300-900`   | `#D1D5DB` ... `#111827` | Tailwind gray tokens actively used                       |
| Success                     | `success.500`       | `#22C55E`               | Status dot                                               |
| Success Soft                | `success.400`       | `#4ADE80`               | Status text                                              |
| Accent + Green Gradient End | `success.700`       | `#15803D`               | Accent text gradient end                                 |
| Terminal Surface            | `terminal.bg`       | `#1E1E1E`               | Decorative terminal block                                |
| Terminal Red                | `terminal.red`      | `#FF5F56`               | Window dot                                               |
| Terminal Yellow             | `terminal.yellow`   | `#FFBD2E`               | Window dot                                               |
| Terminal Green              | `terminal.green`    | `#27C93F`               | Window dot                                               |
| Dark Gradient Start         | `neutral.925`       | `#111111`               | Dark overlay gradient                                    |

#### Transparency and overlay values in use

- `rgba(0, 0, 0, 0.05)` grid dots
- `rgba(0, 0, 0, 0.3)` scanline banding
- `rgba(10, 10, 10, 0.2)` cursor outline border
- `rgba(204, 255, 0, 0.15)` accent hover halo
- `rgba(204,255,0,0.6)` accent glow shadow
- `rgba(255, 255, 255, 0)` transparent gradient stop
- Utility alpha variants heavily used: `/5`, `/10`, `/20`, `/30`, `/60`, `/80`

### Typography

#### Font families

- Sans body: `Inter` (`300, 400, 500, 600`)
- Display/headline: `Space Grotesk` (`500, 700`)
- Mono/technical UI: `JetBrains Mono` (`400, 500`)

#### Type scale used

| Class       |              Size | Typical Usage                     |
| ----------- | ----------------: | --------------------------------- |
| `text-xs`   |  `0.75rem` (12px) | Meta, tags, technical labels      |
| `text-sm`   | `0.875rem` (14px) | Nav, secondary text               |
| `text-base` |     `1rem` (16px) | Base copy/buttons                 |
| `text-lg`   | `1.125rem` (18px) | Small headings                    |
| `text-xl`   |  `1.25rem` (20px) | Lead/body emphasis                |
| `text-2xl`  |   `1.5rem` (24px) | Quotes/section emphasis           |
| `text-3xl`  | `1.875rem` (30px) | Section titles                    |
| `text-4xl`  |  `2.25rem` (36px) | Large section titles              |
| `text-5xl`  |     `3rem` (48px) | Hero/impact numbers               |
| `text-6xl`  |  `3.75rem` (60px) | Large responsive display headings |
| `text-7xl`  |   `4.5rem` (72px) | Largest hero heading scale        |

#### Weight, tracking, and leading patterns

- Weights used: `300`, `500`, `600`, `700`
- Letter spacing: `tracking-tight`, `tracking-wide`, `tracking-wider`, `tracking-widest`
- Line-height styles: `leading-[0.95]`, `leading-tight`, `leading-normal`, `leading-relaxed`
- Visual style markers: `uppercase`, `italic`, monospace labels for system/technical tone

### Spacing

Base spatial rhythm follows Tailwind 4px increments with occasional half-steps.

| Token       |             Value |
| ----------- | ----------------: |
| `space.1`   |   `0.25rem` (4px) |
| `space.2`   |    `0.5rem` (8px) |
| `space.2_5` | `0.625rem` (10px) |
| `space.3`   |  `0.75rem` (12px) |
| `space.4`   |     `1rem` (16px) |
| `space.5`   |  `1.25rem` (20px) |
| `space.6`   |   `1.5rem` (24px) |
| `space.8`   |     `2rem` (32px) |
| `space.10`  |   `2.5rem` (40px) |
| `space.12`  |     `3rem` (48px) |
| `space.16`  |     `4rem` (64px) |
| `space.20`  |     `5rem` (80px) |
| `space.24`  |     `6rem` (96px) |
| `space.32`  |    `8rem` (128px) |

Common layout decisions:

- Section vertical rhythm: `py-24`
- Content gutters: `px-6`
- Standard card padding: `p-8`
- Container widths: `max-w-3xl`, `max-w-5xl`, `max-w-7xl`

### Radius

| Token                             |                     Value |
| --------------------------------- | ------------------------: |
| `radius.sm` (`rounded`)           |           `0.25rem` (4px) |
| `radius.md` (`rounded-lg`)        |            `0.5rem` (8px) |
| `radius.lg` (`rounded-xl`)        |          `0.75rem` (12px) |
| `radius.xl` (`rounded-2xl`)       |             `1rem` (16px) |
| `radius.2xl` (`rounded-3xl`)      |           `1.5rem` (24px) |
| `radius.full` (`rounded-full`)    |                  `9999px` |
| `radius.side.md` (`rounded-r-lg`) | Right side only, `0.5rem` |

### Shadows and Blur

| Token                | Value                                                                |
| -------------------- | -------------------------------------------------------------------- |
| `shadow.sm`          | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                      |
| `shadow.lg`          | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `shadow.2xl`         | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                                |
| `shadow.accent.glow` | `0 0 15px rgba(204,255,0,0.6)`                                       |
| `blur.lg`            | `16px`                                                               |
| `blur.2xl`           | `40px`                                                               |
| `blur.accent.halo`   | `100px`                                                              |
| `backdrop.md`        | `12px`                                                               |
| `backdrop.sm`        | `4px`                                                                |

### Visual Patterns

- Noise film layer: fixed full-viewport SVG turbulence texture at `opacity: 0.04`
- Dot grid background: `40px x 40px` radial pattern (`1px` dots)
- Scanline overlay: repeating 4px linear gradient bands
- Glass header: `bg-white/80` + `backdrop-blur-md` + dynamic border/shadow on scroll
- Accent glow halos: lime gradients + large blur on dark backgrounds
- Monochrome-to-color imagery: grayscale + opacity transitions on hover
- Technical UI cues: mono tags, terminal panel motif, small status LEDs
- Custom desktop cursor: dot + outline with hover expansion

### Motion and Interaction Language

- Entry animation: `fadeInUp` `0.8s cubic-bezier(0.16, 1, 0.3, 1)`
- Scroll reveal: `1s cubic-bezier(0.16, 1, 0.3, 1)`
- Pulse accent: `4s cubic-bezier(0.4, 0, 0.6, 1) infinite`
- Float motion: `6s ease-in-out infinite`
- Micro-interaction durations: `300ms`, `500ms`, `700ms`, `2s`
- Frequent hover transforms: translate, scale, slight rotate for depth

---

## 2. Design Tokens

### Naming Convention

Use one semantic model across platforms:

- CSS custom properties: `--{category}-{role}-{scale}`
- JS/TS object access: `{category}.{role}.{scale}`

Example mapping:

- CSS: `--color-neutral-100`
- JS/TS: `tokens.color.neutral[100]`

### Token Set (CSS Custom Properties)

```css
:root {
  /* Colors */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  --color-neutral-925: #111111;
  --color-neutral-950: #0a0a0a;
  --color-neutral-975: #121212;
  --color-neutral-black: #000000;
  --color-neutral-brand-gray: #888888;

  --color-accent-primary: #ccff00;
  --color-accent-primary-a10: rgba(204, 255, 0, 0.1);
  --color-accent-primary-a15: rgba(204, 255, 0, 0.15);
  --color-accent-primary-a20: rgba(204, 255, 0, 0.2);
  --color-accent-primary-a30: rgba(204, 255, 0, 0.3);
  --color-accent-primary-a80: rgba(204, 255, 0, 0.8);

  --color-success-400: #4ade80;
  --color-success-500: #22c55e;
  --color-success-700: #15803d;

  --color-terminal-bg: #1e1e1e;
  --color-terminal-red: #ff5f56;
  --color-terminal-yellow: #ffbd2e;
  --color-terminal-green: #27c93f;

  --color-overlay-black-a05: rgba(0, 0, 0, 0.05);
  --color-overlay-black-a20: rgba(10, 10, 10, 0.2);
  --color-overlay-black-a30: rgba(0, 0, 0, 0.3);
  --color-overlay-black-a60: rgba(0, 0, 0, 0.6);
  --color-overlay-white-a00: rgba(255, 255, 255, 0);
  --color-overlay-white-a05: rgba(255, 255, 255, 0.05);
  --color-overlay-white-a10: rgba(255, 255, 255, 0.1);
  --color-overlay-white-a80: rgba(255, 255, 255, 0.8);

  /* Typography */
  --font-family-sans: 'Inter', sans-serif;
  --font-family-display: 'Space Grotesk', sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  --font-weight-light: 300;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  --font-size-7xl: 4.5rem;

  --line-height-tight-display: 0.95;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  --letter-spacing-tight: -0.025em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-2-5: 0.625rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* Elevation */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-accent-glow: 0 0 15px rgba(204, 255, 0, 0.6);

  /* Effects */
  --blur-lg: 16px;
  --blur-2xl: 40px;
  --blur-accent-halo: 100px;
  --backdrop-blur-sm: 4px;
  --backdrop-blur-md: 12px;

  /* Motion */
  --duration-fast: 300ms;
  --duration-base: 500ms;
  --duration-slow: 700ms;
  --duration-slower: 2000ms;

  --easing-standard: cubic-bezier(0.16, 1, 0.3, 1);
  --easing-emphasis: cubic-bezier(0.4, 0, 0.6, 1);

  --z-base: 10;
  --z-floating: 50;
  --z-overlay: 9999;
}
```

### Token Set (JS/TS Shape)

```ts
export const tokens = {
  color: {
    neutral: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      925: '#111111',
      950: '#0a0a0a',
      975: '#121212',
      black: '#000000',
      brandGray: '#888888',
    },
    accent: { primary: '#ccff00' },
    success: { 400: '#4ade80', 500: '#22c55e', 700: '#15803d' },
    terminal: {
      bg: '#1e1e1e',
      red: '#ff5f56',
      yellow: '#ffbd2e',
      green: '#27c93f',
    },
    overlay: {
      blackA05: 'rgba(0,0,0,0.05)',
      blackA20: 'rgba(10,10,10,0.20)',
      blackA30: 'rgba(0,0,0,0.30)',
      blackA60: 'rgba(0,0,0,0.60)',
      whiteA00: 'rgba(255,255,255,0)',
      whiteA05: 'rgba(255,255,255,0.05)',
      whiteA10: 'rgba(255,255,255,0.10)',
      whiteA80: 'rgba(255,255,255,0.80)',
      accentA15: 'rgba(204,255,0,0.15)',
      accentGlow: 'rgba(204,255,0,0.6)',
    },
  },
  typography: {
    fontFamily: {
      sans: '"Inter", sans-serif',
      display: '"Space Grotesk", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontWeight: { light: 300, medium: 500, semibold: 600, bold: 700 },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    lineHeight: {
      tightDisplay: 0.95,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
    },
    letterSpacing: {
      tight: '-0.025em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  space: {
    1: '0.25rem',
    2: '0.5rem',
    '2_5': '0.625rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    accentGlow: '0 0 15px rgba(204,255,0,0.6)',
  },
  blur: { lg: '16px', '2xl': '40px', accentHalo: '100px' },
  motion: {
    duration: {
      fast: '300ms',
      base: '500ms',
      slow: '700ms',
      slower: '2000ms',
    },
    easing: {
      standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
      emphasis: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
} as const;
```

---

## 3. Theme Configuration

### Tailwind CSS (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#ccff00',
        },
        neutral: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          925: '#111111',
          950: '#0a0a0a',
          975: '#121212',
          black: '#000000',
          brandGray: '#888888',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          700: '#15803d',
        },
        terminal: {
          bg: '#1e1e1e',
          red: '#ff5f56',
          yellow: '#ffbd2e',
          green: '#27c93f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '2.5': '0.625rem',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        accentGlow: '0 0 15px rgba(204,255,0,0.6)',
      },
      blur: {
        accent: '100px',
      },
      backdropBlur: {
        sm: '4px',
        md: '12px',
      },
      transitionDuration: {
        300: '300ms',
        500: '500ms',
        700: '700ms',
        2000: '2000ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
        emphasis: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeInUp: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      zIndex: {
        overlay: '9999',
      },
      maxWidth: {
        content: '80rem' /* matches 7xl */,
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### Chakra UI (`theme.ts`)

```ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    accent: { primary: '#ccff00' },
    neutral: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      925: '#111111',
      950: '#0a0a0a',
      975: '#121212',
    },
    success: {
      400: '#4ade80',
      500: '#22c55e',
      700: '#15803d',
    },
    terminal: {
      bg: '#1e1e1e',
      red: '#ff5f56',
      yellow: '#ffbd2e',
      green: '#27c93f',
    },
  },
  semanticTokens: {
    colors: {
      'bg.canvas': { default: 'neutral.0' },
      'bg.subtle': { default: 'neutral.50' },
      'bg.inverted': { default: 'neutral.950' },
      'text.default': { default: 'neutral.950' },
      'text.muted': { default: 'neutral.500' },
      'text.inverted': { default: 'white' },
      'border.subtle': { default: 'neutral.100' },
      'border.default': { default: 'neutral.200' },
      'accent.default': { default: 'accent.primary' },
    },
  },
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  fontWeights: {
    light: 300,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  lineHeights: {
    tightDisplay: '0.95',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacings: {
    tight: '-0.025em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  space: {
    1: '0.25rem',
    2: '0.5rem',
    '2_5': '0.625rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    accentGlow: '0 0 15px rgba(204,255,0,0.6)',
  },
  styles: {
    global: {
      body: {
        bg: 'bg.canvas',
        color: 'text.default',
      },
      '::selection': {
        background: 'accent.primary',
        color: 'black',
      },
    },
  },
});

export default theme;
```

---

### Reuse Notes (Agency-wide)

- Keep `accent.primary` swappable per client brand while preserving the neutral scale.
- Preserve the three-font hierarchy (`sans`, `display`, `mono`) for consistent content tone.
- Motion/effect tokens are reusable and intentionally separated from component names.
- Semantic tokens (`bg.canvas`, `text.default`, `border.subtle`) should be the primary integration layer in new projects.
