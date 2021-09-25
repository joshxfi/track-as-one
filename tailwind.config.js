module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'f9': '#F9F9F9',
        'primary': '#2B2B2B',
        'secondary': '#E3B04B',
        'inputbg': '#E7E7E7',
        'inputfg': '#B5B3B1'
      },

      screens: {
        'lg': '1080px' 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
