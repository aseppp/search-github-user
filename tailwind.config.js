/* eslint-env node */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        box: '40rem',
      },
      colors: {
        dark: '#1d1d1d',
        dark1: '#18181d',
        blue1: '#5773ff',
      },
    },
  },
  plugins: [],
};
