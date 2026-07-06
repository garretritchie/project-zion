import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        zion: {
          bg: "#f4f8fa",
          panel: "#ffffff",
          panel2: "#eef5f7",
          line: "#d7e4e8",
          text: "#15242b",
          muted: "#637781",
          cyan: "#0ba7a0",
          gold: "#b8852f"
        }
      },
      boxShadow: {
        command: "0 24px 80px rgba(21, 36, 43, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
