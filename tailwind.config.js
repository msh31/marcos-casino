/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        casino: ['"Playwrite AU NSW"', 'cursive']
      },
      colors: {
        'casino-green': '#2E542A',
        'casino-dark': {
          DEFAULT: '#1A1A1A',
          secondary: '#2D1F1F'
        }
      }
    },
  },
  plugins: [],
};