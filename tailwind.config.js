/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4a449',
          light: '#f4c670',
          dark: '#a87a2a',
        },
        cream: '#f4e8d0',
        wine: '#8b2a26',
        ink: {
          DEFAULT: '#14100a',
          lighter: '#241c12',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
