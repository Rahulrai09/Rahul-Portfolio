import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F7FB",
        surface: "#FFFFFF",
        ink: "#0E1030",
        muted: "#5B6080",
        line: "#E7E8F2",
        violet: { DEFAULT: "#5B4BFF", soft: "#EEECFF", deep: "#3B2EDB" },
        sky: { DEFAULT: "#0896D6", soft: "#E3F6FE" },
        mint: { DEFAULT: "#0A9A72", soft: "#E1F7EF" },
        rose: { DEFAULT: "#F0468C", soft: "#FDE7F1" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,16,48,0.04), 0 8px 24px -12px rgba(14,16,48,0.10)",
        lift: "0 2px 4px rgba(14,16,48,0.04), 0 24px 48px -20px rgba(59,46,219,0.28)",
        glow: "0 12px 32px -10px rgba(91,75,255,0.55)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
