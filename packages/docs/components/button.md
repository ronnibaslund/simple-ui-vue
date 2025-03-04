<script setup lang="ts">
import {SimpleButton, SimpleTabs, SimpleTab} from 'simple-ui-vue'
import { colorsBrand, colorsState } from 'simple-ui-vue/globals'
</script>

# Button Component

## Without any props

<SimpleTabs type="boxed">
  <SimpleTab name="Preview">
    <SimpleButton>Click Me</SimpleButton>
  </SimpleTab>
  <SimpleTab name="Code">

```vue
<SimpleButton>Click Me</SimpleButton>
```

  </SimpleTab>
</SimpleTabs>

## Brand colors

<SimpleTabs type="boxed">
  <SimpleTab name="Preview">
    <SimpleButton v-for="color in [...colorsBrand, 'glass', 'link']" :key="color" :color="color">{{ color }}</SimpleButton>
  </SimpleTab>
  <SimpleTab name="Code">

<template v-for="color in [...colorsBrand, 'glass', 'link']" :key="color">

```vue-vue
<SimpleButton color="{{ color }}">{{ color }}</SimpleButton>
```

</template>

  </SimpleTab>
</SimpleTabs>

## State colors

<SimpleTabs type="boxed">
  <SimpleTab name="Preview">
    <SimpleButton v-for="color in [...colorsState]" :key="color" :color="color">{{ color }}</SimpleButton>
  </SimpleTab>
  <SimpleTab name="Code">

<template v-for="color in [...colorsState]" :key="color">

```vue-vue
<SimpleButton color="{{ color }}">{{ color }}</SimpleButton>
```

</template>

  </SimpleTab>
</SimpleTabs>

