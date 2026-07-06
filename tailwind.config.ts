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
          bg: "#f4f7f9",
          panel: "#ffffff",
          panel2: "#eef4f6",
          line: "#dbe5e8",
          text: "#162126",
          muted: "#65757c",
          cyan: "#0ba7a0",
          gold: "#b8842d"
        }
      },
      boxShadow: {
        command: "0 24px 80px rgba(28, 44, 52, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
