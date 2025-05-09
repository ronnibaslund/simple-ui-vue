import { defineConfig } from 'vitepress'
// import { VueReplMdPlugin } from 'vitepress-plugin-vue-repl'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Simple UI for Vue',
  description: 'A Vue Component Library based on the Daisy UI CSS Library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components' },
      { text: 'Stories', link: '/story' }
    ],
    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Install (Recommended)', link: '/install-recommended' },
          { text: 'Install (Global Components)', link: '/install-global-components' },
          { text: 'Install (Nuxt)', link: '/install-nuxt' },
          { text: 'Colors', link: '/colors' },
          { text: 'Themes', link: '/themes' }
        ]
      },
      {
        text: 'Components',

        // leave trailing comma for hygen
        // prettier-ignore
        items: [
          { text: 'Loading', link: '/components/loading' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'Button', link: '/components/button' },
          { text: 'BrowserMockup', link: '/components/browsermockup' },
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'AccordionPanel', link: '/components/accordionpanel' },
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'AvatarGroup', link: '/components/avatargroup' },
          { text: 'ContextMenu', link: '/components/contextmenu' },
          { text: 'Alert', link: '/components/alert' },
          { text: 'DataTable', link: '/components/datatable' },
          { text: 'Rating', link: '/components/rating' },
          { text: 'Steps', link: '/components/steps' },
          { text: 'Toggle', link: '/components/toggle' },
          { text: 'Input', link: '/components/input' },
          { text: 'Icon', link: '/components/icon' },
          { text: 'Modal', link: '/components/modal' },
          { text: 'Select', link: '/components/select' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Range', link: '/components/range' },
          // do not remove - used by hygen
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/ronnibaslund/simple-ui-vue' }]
  },
  // markdown: {
  //   config: (md) => {
  //     md.use(VueReplMdPlugin)
  //   }
  // }
  head: [
    //['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.css' }],
  ]
})
