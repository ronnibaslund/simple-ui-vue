<script setup lang="ts">
/*
  <SimpleInput
    type="text"
    placeholder="Type here"
    class="input"
    :color="'primary'"
    :size="'lg'"
    :disabled="false" />
*/

import { computed } from 'vue'
import type { Sizes, ColorsBrand, ColorsState } from '../../globals'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    type?: string
    placeholder?: string
    color?: ColorsBrand | ColorsState
    size?: Sizes
    disabled?: boolean
    fieldset?: boolean
    fieldsetLegend?: string
    fieldsetLabel?: string
  }>(),
  {
    type: 'text',
    size: 'md',
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const inputType = computed(() => {
  return props.type
})

const inputPlaceholder = computed(() => {
  return props.placeholder
})

const inputDisabled = computed(() => {
  return props.disabled
})

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
    xl: 'input-xl',
    lg: 'input-lg',
    md: 'input-md',
    sm: 'input-sm',
    xs: 'input-xs'
  }[props.size]
})
</script>

<template>
  <input
    v-if="!fieldset"
    v-model="inputValue"
    :type="inputType"
    :placeholder="inputPlaceholder"
    :disabled="inputDisabled"
    :class="[colorClasses, sizeClasses, 'input']"
  />

  <fieldset class="fieldset" v-if="fieldset">
    <legend class="fieldset-legend" v-if="fieldsetLegend">{{ fieldsetLegend }}</legend>
    <input
      v-model="inputValue"
      :type="inputType"
      :placeholder="inputPlaceholder"
      :disabled="inputDisabled"
      :class="[colorClasses, sizeClasses, 'input']"
    />
    <p class="fieldset-label" v-if="fieldsetLabel">{{ fieldsetLabel }}</p>
  </fieldset>
</template>
