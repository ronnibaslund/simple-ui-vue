import { defineConfig } from 'histoire'
import { HstVue, defineSetupVue3 } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  theme: {
    title: 'Daisy Vue',
  },
  setupFile: '/src/histoire-setup.js',
  storyMatch: [
    '**/*.story.vue',
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
  ],
})
