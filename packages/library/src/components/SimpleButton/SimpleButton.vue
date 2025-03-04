// SimpleButton.vue
<script setup lang="ts">
import { computed } from 'vue'
import type { Sizes, ColorsBrand, ColorsState } from '../../globals'
import { SimpleLoading } from '../components';

const props = withDefaults(
  defineProps<{
    color?: ColorsBrand | ColorsState | 'ghost' | 'link'
    size?: Sizes
    wide?: boolean
    outline?: boolean
    square?: boolean
    circle?: boolean
    loading?: boolean
    glass?: boolean
    active?: boolean
    dashed?: boolean
  }>(),
  {
    size: 'md',
    wide: false,
    outline: false
  }
)

const colorClasses = computed(() => {
  return {
    neutral: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    error: 'btn-error',
    warning: 'btn-warning',
    success: 'btn-success',
    info: 'btn-info',
    ghost: 'btn-ghost',
    link: 'btn-link'
  }[props.color]
})

const sizeClasses = computed(() => {
  return {
    lg: 'btn-lg',
    sm: 'btn-sm',
    xs: 'btn-xs'
  }[props.size]
})

const otherClasses = computed(() => {
  return {
    'btn-outline': props.outline,
    'btn-wide': props.wide,
    'btn-square': props.square,
    'btn-circle': props.circle,
    glass: props.glass,
    'btn-active': props.active,
    'btn-dash': props.dashed
  }
})
</script>
<template>
  <button class="btn" :class="[colorClasses, sizeClasses, otherClasses]">
    <SimpleLoading v-if="loading" :size="size" />
    <slot></slot>
  </button>
</template>