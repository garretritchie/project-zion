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
          bg: "#050b10",
          panel: "#0d1720",
          panel2: "#13212c",
          line: "#22323f",
          text: "#e9f1f4",
          muted: "#8ea0aa",
          cyan: "#59e6de",
          gold: "#d6b45f"
        }
      },
      boxShadow: {
        command: "0 24px 80px rgba(0, 0, 0, 0.42)"
      }
    }
  },
  plugins: []
};

export default config;
