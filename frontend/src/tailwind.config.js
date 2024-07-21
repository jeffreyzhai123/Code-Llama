/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './lib/**/*.{js,jsx,ts,tsx}'],           
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