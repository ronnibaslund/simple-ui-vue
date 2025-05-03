<script setup lang="ts">
import type { ColorsBrand, ColorsState, Sizes } from '../../globals'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  color?: ColorsBrand | ColorsState | 'ghost'
  size?: Sizes
  outline?: boolean
}>(), {
  outline: false
})

const colorClass = computed(() => {
  if (!props.color) return '';
  
  const colorMap = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    neutral: 'badge-neutral',
    accent: 'badge-accent',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    ghost: 'badge-ghost'
  };
  
  return colorMap[props.color] || '';
})

const outlineClass = computed(() => (props.outline ? 'badge-outline' : ''))
const sizeClass = computed(() => {
  if (!props.size) return '';
  
  const sizeMap = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg'
  };
  
  return sizeMap[props.size] || '';
})

const classes = computed(() => {
  return [colorClass.value, outlineClass.value, sizeClass.value]
})
</script>

<template>
  <div class="badge" :class="classes"><slot></slot></div>
</template>
