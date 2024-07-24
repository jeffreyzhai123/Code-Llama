/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    theme: [
      "light",
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")]
};