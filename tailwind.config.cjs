/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#E0156A",
        secondary: "#FDEE5C",
      },
      fontFamily: {
        QuickSand: "Quicksand, sans-serif",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#E0156A",
          secondary: "#FDEE5C",
          accent: "#1dcdbc",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
