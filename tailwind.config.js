const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': 'rgba(20, 25, 32, 0.64)',
      },
      fontFamily: {
        sans: ['"Satoshi"', ...defaultTheme.fontFamily.sans],
        hoves: ['"TT Hoves"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        spread: '0px 8px 48px rgba(20, 25, 32, 0.08)',
      },
    },
  },
  plugins: [],
}
