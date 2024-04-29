/* eslint-disable @typescript-eslint/no-var-requires */
// const { plugin } = require('postcss')
// const plugins = require('tailwindcss/plugin')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [   
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [
    // plugin(function ({ addComponents }) {
    //   addComponents({
    //     '.container': {
    //       maxWidth:  theme('columns.7xl'),
    //       marginLeft: 'auto',
    //       marginRight: 'auto',
    //       paddingLeft: theme('spacing.4'),
    //       paddingRight: theme('spacing.4'),

    //     }
    //   })
    // })
  ],
}

