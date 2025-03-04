# Installation (Nuxt Module)

DaisyVue comes with a Nuxt module that auto imports all components in a tree-shakable fashion.

## Step 1. Install the Module

::: code-group

```bash [npm]
npm install nuxt-simple-ui-vue
```

```bash [pnpm]
pnpm add nuxt-simple-ui-vue
```

```bash [yarn]
yarn add nuxt-simple-ui-vue
```

:::

## Step 2. Regiser the Module in nuxt.config.ts

:::code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-simple-ui-vue']
  //...
})
```

:::

## Step 4. Start Using the Components

:::code-group

```vue [App.vue]
<script setup lang="ts">
// no need to import anything
</script>

<template>
  <DaisyAlert type="success"> Great! You've Successfully Installed DaisyVue </DaisyAlert>
</template>
```

:::
