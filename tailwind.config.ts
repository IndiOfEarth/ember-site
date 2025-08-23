import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/pages/**/*.{ts,tsx,mdx}",   // (only if you also use Pages Router)
  ],
  theme: {
    extend: {
      container: { center: true, padding: { DEFAULT: "1rem", lg: "2rem" } },
      colors: {
        ember: {
          50:"#fff6ef",100:"#ffe8d6",200:"#ffd0ad",300:"#ffb079",
          400:"#ff8940",500:"#ff6a1a",600:"#e04d0d",700:"#b53c0a",
          800:"#8a2e08",900:"#5b1f05",
        },
      },
      boxShadow: { glow: "0 0 0 3px rgb(255 106 26 / 25%)" },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
