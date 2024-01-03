// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   darkMode : 'class',
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// export default config

// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ...
        'color': {
          Cyan: '#01c1d2',
          Green: '#019706',
          Red: '#ff4155',
          Yellow: '#ffb534',
          Primary: '#3471ff',
          Gray : '#636363',
          Light : '#efefef'
        },
        // ...
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
