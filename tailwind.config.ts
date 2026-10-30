import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#E5E4E0", deep: "#D6D5D0" },
        sheet: "#F4F2ED",
        ink: { DEFAULT: "#111111", soft: "#2A2A2A" },
        night: { DEFAULT: "#0B0B0C", card: "#1A1A1C" },
        muted: "#6D6A63",
        cobalt: { DEFAULT: "#1F3FB0", bright: "#3B5BF0", ice: "#DCE5FF", glow: "#7FA0FF" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        lift: "0 30px 60px -28px rgba(20,16,10,0.45)",
        card: "0 1px 2px rgba(0,0,0,0.04), 0 14px 40px -20px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
