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
        'casino-gold-hover': '#c4a030',
        'casino-gold-light': '#f4cf47',
        'table-green': '#1a472a',
        'table-green-light': '#2d5a3c',
        'casino-red': '#dc2626',
        'casino-black': '#1a1a1a',
        'casino-gray': '#2d1f1f',
        'bgaccent': 'rgba(45, 31, 31, 0.95)'
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        casino: {
          "primary": "#d4af37",
          "secondary": "#c4a030",
          "accent": "#2d5a3c",
          "neutral": "#1a1a1a",
          "base-100": "#1a472a",
          "base-200": "#2d5a3c",
          "base-300": "#1a1a1a",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
};
