<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { iconSizes, icons } from '../../globals'
import type { IconSizes } from '../../globals'

type IconNames = (typeof icons)[number]

const props = withDefaults(
  defineProps<{
    icon: IconNames
    size?: IconSizes
    customSizeClass?: string
  }>(),
  {
    icon: 'user',
    size: 2,
    customSizeClass: undefined
  }
)

const iconSize = computed(() => {
  if (props.customSizeClass) {
    // If customSizeClass is a number string like "24", parse it
    const numericSize = parseInt(props.customSizeClass);
    if (!isNaN(numericSize)) {
      return numericSize;
    }
    // Otherwise try to extract number from Tailwind class like 'h-24'
    const match = props.customSizeClass.match(/h-(\d+)/);
    return match ? parseInt(match[1]) : 24; // default to 24 if no match
  }
  
  return ({
    1: 16, // 4 * 4
    2: 20, // 5 * 4
    3: 24, // 6 * 4
    4: 28, // 7 * 4
    5: 32, // 8 * 4
    6: 36, // 9 * 4
    7: 40, // 10 * 4
    8: 44, // 11 * 4
    9: 48, // 12 * 4
    10: 56, // 14 * 4
    11: 64, // 16 * 4
    12: 80, // 20 * 4
    14: 96, // 24 * 4
    16: 112, // 28 * 4
    18: 128, // 32 * 4
    20: 144, // 36 * 4
    24: 160, // 40 * 4
    28: 176, // 44 * 4
    32: 192, // 48 * 4
    36: 208, // 52 * 4
    40: 224, // 56 * 4
    44: 240, // 60 * 4
    48: 256, // 64 * 4
    52: 288, // 72 * 4
    56: 320, // 80 * 4
    60: 384, // 96 * 4
    64: 448, // 28rem * 16
    72: 512, // 32rem * 16
    80: 576, // 36rem * 16
    96: 640  // 40rem * 16
  } as Record<number, number>)[props.size] || props.size * 4
})

const iconName = computed(() => {
  return `lucide:${props.icon}`
})
</script>

<template>
  <Icon 
    :icon="iconName" 
    :width="iconSize"
    :height="iconSize"
    class="inline-block align-middle text-current" 
  />
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  background: transparent !important;
  background-color: transparent !important;
}
.iconify {
  display: inline-block;
  vertical-align: middle;
  background: transparent !important;
  background-color: transparent !important;
  width: auto;
  height: auto;
}
</style>