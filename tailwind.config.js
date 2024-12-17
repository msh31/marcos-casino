module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html",
    "./select.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["dark"],
  },
};