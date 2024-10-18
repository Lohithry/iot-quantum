/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          600: '#25c2a0',
          700: '#1fa588',
        },
      },
    },
  },
  plugins: [],
};