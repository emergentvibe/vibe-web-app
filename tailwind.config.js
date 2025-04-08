/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#053a4b',
        'accent': '#6366f1',
        'accent-glow': '#8183ff',
        'primary-light': '#0a4d5e',
      },
    },
  },
  plugins: [],
} 