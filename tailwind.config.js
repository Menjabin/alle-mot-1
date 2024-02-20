/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      primary: '#c2e2af',
      secondary: '#4f2323',
      transparent: 'transparent',
      current: '#4f2323',
      black: colors.black,
      white: '#f6f2ef',
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
  },
  plugins: [],
}

