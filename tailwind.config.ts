import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: 'var(--color-accent-primary)',
        },
        neutral: {
          0: 'var(--color-neutral-0)',
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          925: 'var(--color-neutral-925)',
          950: 'var(--color-neutral-950)',
          975: 'var(--color-neutral-975)',
          black: 'var(--color-neutral-black)',
        },
        success: {
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
          700: 'var(--color-success-700)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
        display: ['var(--font-family-display)'],
        mono: ['var(--font-family-mono)'],
      },
      boxShadow: {
        'accent-glow': '0 0 15px rgba(204, 255, 0, 0.6)',
      },
      backgroundImage: {
        'accent-halo': 'radial-gradient(circle, var(--color-accent-primary-a20), transparent 65%)',
      },
      borderRadius: {
        '2xl': 'var(--radius-xl)',
        '3xl': 'var(--radius-2xl)',
      },
    },
  },
  plugins: [],
};

export default config;
