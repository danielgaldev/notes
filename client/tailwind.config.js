module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'), 
    require('tailwindcss-break')(),
    require('tailwindcss-multi-column')()
  ]
}
