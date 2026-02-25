/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          dark: "#121212",
          gray: "#888888",
          lime: "#ccff00",
        },
        neutral: {
          white: "#ffffff",
          black: "#000000",
          800: "#262626",
          950: "#111111",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        terminal: {
          background: "#1e1e1e",
          red: "#ff5f56",
          yellow: "#ffbd2e",
          green: "#27c93f",
        },
        overlay: {
          black05: "rgba(0, 0, 0, 0.05)",
          black30: "rgba(0, 0, 0, 0.3)",
          brand15: "rgba(204, 255, 0, 0.15)",
          brand60: "rgba(204, 255, 0, 0.6)",
          ink20: "rgba(10, 10, 10, 0.2)",
          white00: "rgba(255, 255, 255, 0)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "typing-line": "typeLine 0.5s steps(40) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typeLine: {
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
