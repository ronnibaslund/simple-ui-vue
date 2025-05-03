// https://vitepress.dev/guide/custom-theme
import { h, defineComponent, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import { initThemeSwitcher } from './theme-switcher-support'

import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import all components from the library
import * as SimpleComponents from 'simple-daisy-vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register all components globally
    Object.entries(SimpleComponents).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
  Layout: () => {
    return h(
      defineComponent({
        setup() {
          onMounted(() => {
            initThemeSwitcher()
          })
          return () =>
            h(DefaultTheme.Layout, null, {
              // https://vitepress.dev/guide/extending-default-theme#layout-slots
            })
        }
      })
    )
  }
} satisfies Theme
