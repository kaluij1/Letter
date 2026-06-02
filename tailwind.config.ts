import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: "#fdf6ee",
          DEFAULT: "#e8d9c4",
          dark: "#c9b99a",
        },
        wax: "#8b2223",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-lora)", "Georgia", "serif"],
      },
      screens: {
        mobile: { max: "699px" },
      },
    },
  },
  plugins: [],
};

export default config;
