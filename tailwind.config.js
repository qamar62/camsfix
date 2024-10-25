/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5a189a',
          light: '#9d4edd',
          dark: '#3a0c64'
        }
      }
    },
  },
  plugins: [],
};