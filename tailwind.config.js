/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald': '#1ab188',
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'open-sans': ['Open Sans', 'sans-serif'],
    }
  },
  plugins: [],
}
