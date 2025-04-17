<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { iconSizes, icons } from '@/globals'
import type { IconSizes } from '@/globals'

type IconNames = (typeof icons)[number]

const props = withDefaults(
  defineProps<{
    icon: IconNames
    size?: IconSizes
  }>(),
  {
    icon: 'user',
    size: 6,
  }
)

const iconSizeClass = computed(() => {
  return ({
    1: 'size-1',
    2: 'size-2',
    3: 'size-3',
    4: 'size-4',
    5: 'size-5',
    6: 'size-6',
    7: 'size-7',
    8: 'size-8',
    9: 'size-9',
    10: 'size-10',
    11: 'size-11',
    12: 'size-12',
    14: 'size-14',
    16: 'size-16',
    18: 'size-18',
    20: 'size-20',
    24: 'size-24',
    28: 'size-28',
    32: 'size-32',
    36: 'size-36',
    40: 'size-40',
    44: 'size-44',
    48: 'size-48',
    52: 'size-52',
    56: 'size-56',
    60: 'size-60',
    64: 'size-64',
    72: 'size-72',
    80: 'size-80',
    96: 'size-96'
  } as Record<number, string>)[props.size] || `size-${props.size}`
})

const iconName = computed(() => {
  return `lucide:${props.icon}`
})
</script>

<template>
  <Icon :icon="iconName" :class="iconSizeClass" class="text-base-content/60" />
</template>