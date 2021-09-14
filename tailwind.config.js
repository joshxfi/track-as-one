module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'bgwhite': '#F9F9F9',
        'primary': '#2B2B2B',
        'secondary': '#E3B04B' 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
