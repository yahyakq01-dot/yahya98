import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          base: "#0A0613",
          surface: "#13101E",
          elevated: "#1A1525",
        },
        brand: {
          primary: "#7C3AED",
          light: "#A78BFA",
          glow: "#C4B5FD",
        },
        ink: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
        success: "#22C55E",
        gold: "#FBBF24",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 58, 237, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
