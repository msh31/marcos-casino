/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        casino: ['Playwrite AU NSW', 'cursive']
      },
      colors: {
        'casino-gold': '#d4af37',
        'casino-gold-hover': '#f4cf47',
        'table-green': '#1a472a',
        'table-green-light': '#2d5a3c'
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
};