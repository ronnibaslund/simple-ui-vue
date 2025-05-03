/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');

module.exports = {
  content: [
    './**/*.md', 
    '.vitepress/theme/*.{js,ts,vue}',
    './node_modules/simple-daisy-vue/src/{components,directives}/**/*.{vue,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: true,
  }
}
