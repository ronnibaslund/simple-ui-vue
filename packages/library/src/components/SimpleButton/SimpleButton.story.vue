// SimpleButton.story.vue
<script setup lang="ts">
import { reactive } from 'vue'
import SimpleButton from './SimpleButton.vue'
import { sizes, Sizes, colorsBrand, colorsState } from '../../globals'

const state = reactive({
  content: 'Click Me',
  disabled: false,
  wide: false,
  size: 'md' as Sizes,
  circle: false,
  square: false,
  loading: false,
  outline: false,
  glass: false,
  active: false,
  dashed: false
})

const colors = [...colorsBrand, ...colorsState, 'ghost', 'link'] as const
</script>
<template>
  <Story :layout="{ type: 'grid', width: '50%' }">
    <Variant title="No Color">
      <SimpleButton v-bind="state">{{ state.content }}</SimpleButton>
    </Variant>
    <Variant v-for="color in colors" :key="color" :title="color">
      <SimpleButton :color="color" v-bind="state">{{ state.content }}</SimpleButton>
    </Variant>

    <template #controls>
      <HstText v-model="state.content" title="Content" />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
      <HstCheckbox v-model="state.active" title="Active" />
      <HstCheckbox v-model="state.circle" title="Circle" />
      <HstCheckbox v-model="state.square" title="Square" />
      <HstCheckbox v-model="state.wide" title="Wide" />
      <HstCheckbox v-model="state.loading" title="Loading" />
      <HstCheckbox v-model="state.outline" title="Outline" />
      <HstCheckbox v-model="state.glass" title="Glass" />
      <HstCheckbox v-model="state.dashed" title="Dashed" />
      <HstSelect v-model="state.size" :options="sizes" title="Size" />
    </template>
  </Story>
</template>
