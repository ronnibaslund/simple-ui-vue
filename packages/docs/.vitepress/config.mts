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
      { text: 'Stories', link: 'https://daisy-vue-stories.netlify.app/' }
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
          // do not remove - used by hygen
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
  // markdown: {
  //   config: (md) => {
  //     md.use(VueReplMdPlugin)
  //   }
  // }
})
