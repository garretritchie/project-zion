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
          bg: "#090b0d",
          panel: "#111417",
          panel2: "#171b1f",
          line: "#262d33",
          text: "#eef3f5",
          muted: "#9aa7ad",
          cyan: "#63e6d2",
          gold: "#e4bf6a"
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
