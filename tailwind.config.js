/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      // "bgClr": "#efefef",
      "bgClr": "#f2f0ea",
      "cardClr" : "#f2f2f2",
      "btnClr" : "#141414"


    },
  },
};
export const plugins = [];
