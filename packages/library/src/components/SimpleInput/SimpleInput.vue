<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Sizes, ColorsBrand, ColorsState, IconSizes } from '../../globals'
import { icons } from '../../globals'
import SimpleIcon from '../SimpleIcon/SimpleIcon.vue'

type IconNames = (typeof icons)[number]

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
    icon?: IconNames
    iconSize?: IconSizes
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

// Track password visibility state
const passwordVisible = ref(false)

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
  const baseType = {
    text: 'text',
    email: 'email',
    password: 'password',
    number: 'number',
    date: 'date',
    time: 'time',
    url: 'url',
    tel: 'tel'
  }[props.type]
  
  // Override type when password is visible
  if (baseType === 'password' && passwordVisible.value) {
    return 'text'
  }
  
  return baseType
})

const isPassword = computed(() => props.type === 'password')

const iconClasses = computed(() => {
  const size = props.iconSize ? `size-${props.iconSize}` : 'size-6'
  return `${size} ${props.icon}`
})

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>

<template>
  <div class="relative" v-if="!fieldset">
    <label :class="[colorClasses, sizeClasses, 'input w-full']">
      <SimpleIcon
        v-if="icon"
        :icon="icon"
        :size="props.iconSize"
      />
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="inputPlaceholder"
        :disabled="inputDisabled"
        class="grow focus:outline-0"
      />
      
      <!-- Password visibility toggle using swap -->
      <label v-if="isPassword" class="swap btn btn-xs btn-ghost btn-circle text-base-content/60">
        <input 
          type="checkbox" 
          aria-label="Toggle password visibility" 
          v-model="passwordVisible"
        />
        <SimpleIcon class="swap-off" icon="eye" :size="2" />
        <SimpleIcon class="swap-on" icon="eye-off" :size="2" />
      </label>
    </label>
  </div>

  <fieldset class="fieldset" v-if="fieldset">
    <legend class="fieldset-legend" v-if="fieldsetLegend">{{ fieldsetLegend }}</legend>
    <label :class="[colorClasses, sizeClasses, 'input w-full']">
      <SimpleIcon
        v-if="icon"
        :icon="icon"
        :size="props.iconSize"
      />
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="inputPlaceholder"
        :disabled="inputDisabled"
        class="grow focus:outline-0"
      />
      
      <!-- Password visibility toggle using swap -->
      <label v-if="isPassword" class="swap btn btn-xs btn-ghost btn-circle text-base-content/60">
        <input 
          type="checkbox" 
          aria-label="Toggle password visibility" 
          v-model="passwordVisible"
        />
        <SimpleIcon class="swap-off" icon="eye" :size="2" />
        <SimpleIcon class="swap-on" icon="eye-off" :size="2" />
      </label>
    </label>
    <p class="fieldset-label" v-if="fieldsetLabel">{{ fieldsetLabel }}</p>
  </fieldset>
</template>
