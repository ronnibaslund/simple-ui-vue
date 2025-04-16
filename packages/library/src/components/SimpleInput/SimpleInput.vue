<script setup lang="ts">
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
    icon?: string
    iconSize?: number
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

const inputPlaceholder = computed(() => {
  return props.placeholder
})

const inputDisabled = computed(() => {
  return props.disabled
})

const colorClasses = computed(() => {
  return {
    neutral: 'input-neutral',
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    error: 'input-error',
    warning: 'input-warning',
    success: 'input-success',
    info: 'input-info',
    ghost: 'input-ghost',
    link: 'input-link'
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

const type = computed(() => {
  return {
    text: 'text',
    email: 'email',
    password: 'password',
    number: 'number',
    date: 'date',
    time: 'time',
    url: 'url',
    tel: 'tel'
  }[props.type]
})

const iconClasses = computed(() => {
  const size = props.iconSize ? `text-${props.iconSize}` : 'size-5.5'
  return `${size} ${props.icon}` 
})
</script>

<template>
  
  <label :class="[colorClasses, sizeClasses, 'input']" v-if="!fieldset">
    <span class="iconify text-base-content/60" :class="iconClasses"></span>
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="inputPlaceholder"
      :disabled="inputDisabled"
    />
  </label>

  <fieldset class="fieldset" v-if="fieldset">
    <legend class="fieldset-legend" v-if="fieldsetLegend">{{ fieldsetLegend }}</legend>
    <label :class="[colorClasses, sizeClasses, 'input']">
      <span class="iconify text-base-content/60" :class="iconClasses"></span>
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="inputPlaceholder"
        :disabled="inputDisabled"
      />
    </label>
    <p class="fieldset-label" v-if="fieldsetLabel">{{ fieldsetLabel }}</p>
  </fieldset>
</template>
