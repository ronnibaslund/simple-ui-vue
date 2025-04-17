<script setup lang="ts">
import { reactive } from 'vue'
import SimpleIcon from './SimpleIcon.vue'
import { icons, iconSizes } from '@/globals'
import type { IconSizes } from '@/globals'

type IconNames = (typeof icons)[number]

const state = reactive<{
  icon: IconNames
  size: IconSizes
}>({
  icon: 'archive',
  size: 6
})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    
    <Variant title="Variant Title">
      <SimpleIcon :icon="state.icon" :size="state.size" />
    </Variant>

    <template #controls>
      <HstSelect v-model="state.icon" :options="icons" title="Icons" />
      <HstSelect v-model="state.size" :options="iconSizes" title="Size" />
    </template>
  </Story>
</template>
