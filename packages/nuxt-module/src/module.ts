import { defineNuxtModule, addComponent, installModule } from '@nuxt/kit'

// @ts-ignore
import * as DaisyVueComponents from 'simple-ui-vue/js'
import daisyui from 'daisyui/src/index.js'
import defu from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-simple-ui-vue',
    configKey: 'simpleVue'
  },
  // Default configuration options of the Nuxt module
  defaults: {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setup(options, nuxt) {
    const nuxtOptions = nuxt.options as typeof nuxt.options & { tailwindcss: Record<string, any> }

    nuxtOptions.tailwindcss = nuxtOptions.tailwindcss || {}

    // @ts-ignore this works fine
    nuxtOptions.tailwindcss = defu(nuxtOptions.tailwindcss, {
      config: {
        content: [
          './node_modules/simple-ui-vue/src/{components,directives}/**/*.vue',
          './node_modules/nuxt-simple-ui-vue/node_modules/simple-ui-vue/src/{components,directives}/**/*.vue'
        ],
        plugins: [daisyui]
      }
    })

    // this must come after the tailwind config is set
    // otherwise our config will not be used
    await installModule('@nuxtjs/tailwindcss')

    for (const key in DaisyVueComponents) {
      if (key.startsWith('Simple')) {
        addComponent({
          name: key, // name of the component to be used in vue templates
          export: key,
          filePath: `simple-ui-vue`
        })
      }
    }
  }
})
