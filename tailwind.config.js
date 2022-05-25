/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        f9: '#F9F9F9',
        primary: '#2B2B2B',
        secondary: '#E3B04B',
        lighter: '#ffd154',
        whiteish: '#fefff3',
        inputbg: '#E7E7E7',
        inputfg: '#B5B3B1',
      },

      screens: {
        lg: '1080px',
        xs: '400px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
