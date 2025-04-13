<script setup lang="ts">
import { reactive } from 'vue'
import SimpleToggle from './SimpleToggle.vue'
import { sizes, Sizes, colorsBrand, colorsState } from '../../globals'

const state = reactive({
  value: false,
  label: 'Toggle',
  disabled: false,
  size: 'md' as Sizes,
})

const colors = [...colorsBrand, ...colorsState] as const
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Default">
      <SimpleToggle v-model="state.value" />
    </Variant>

    <Variant title="Colors">
      <template v-for="color in colors" :key="color">
        <SimpleToggle v-model="state.value" :color="color" :label="color" />
      </template>
    </Variant>

    <Variant title="Sizes">
      <template v-for="size in sizes" :key="size">
        <SimpleToggle v-model="state.value" :size="size" :label="size" :disabled="state.disabled" />
      </template>
    </Variant>

    <template #controls>
      <HstCheckbox v-model="state.disabled" title="Disabled" />
      <HstSelect v-model="state.size" :options="sizes" title="Size" />
    </template>
  </Story>
</template>
