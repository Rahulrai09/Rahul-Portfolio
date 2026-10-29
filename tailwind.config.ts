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
        ivory: { DEFAULT: "#F7F5F0", deep: "#EFEBE2" },
        paper: "#FFFFFF",
        ink: { DEFAULT: "#0B1628", soft: "#1C2A44" },
        navy: { DEFAULT: "#0E2350", deep: "#0A1A3D", light: "#16336F" },
        sapphire: { DEFAULT: "#2B57E8", soft: "#E8EEFD", light: "#8FAEFF" },
        emerald: { DEFAULT: "#0B7A62", soft: "#E3F2EC", light: "#6EDBB9" },
        muted: "#5A6476",
        line: "#E2DDD2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,22,40,0.04), 0 12px 32px -16px rgba(11,22,40,0.14)",
        deep: "0 2px 6px rgba(11,22,40,0.05), 0 40px 80px -32px rgba(14,35,80,0.35)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 45s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
