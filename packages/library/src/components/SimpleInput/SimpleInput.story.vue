<script setup lang="ts">
import { reactive } from 'vue'
import SimpleInput from './SimpleInput.vue'
import type { ColorsBrand, ColorsState } from '../../globals/colors'
import { colorsBrand, colorsState } from '../../globals/colors'

type SimpleInputColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
type SimpleInputSize = 'xs' | 'sm' | 'md' | 'lg'

const SimpleInputType = ['text','password','email','number','date','datetime-local','week','month','tel','url','search','time'] as const

const state = reactive({
  modelValue: '',
  type: 'text',
  placeholder: 'Placeholder',
  color: 'primary' as SimpleInputColor,
  size: 'md' as SimpleInputSize,
  disabled: false,
  fieldset: true,
  fieldsetLegend: 'Label',
  fieldsetLabel: 'Helper text',
  icon: 'carbon:error',
  iconPosition: 'left'
})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }" title="SimpleInput">
    <Variant title="Default">
      <SimpleInput placeholder="Placeholder" color="error" :type="state.type" icon="lucide:user" />
    </Variant>

    <Variant title="Variant Title" description="Variant description">
      <SimpleInput
        :type="state.type"
        icon="lucide:user"
        :fieldset="true"
        :fieldset-legend="state.fieldsetLegend"
        :fieldset-label="state.fieldsetLabel"
        :placeholder="state.placeholder"
        :color="state.color"
        :size="state.size"
        :disabled="false"
      ></SimpleInput>
    </Variant>

    <template #controls>
      <HstSelect v-model="state.color" :options="[...colorsBrand, ...colorsState]" title="Color" />
      <HstSelect v-model="state.type" :options="SimpleInputType" title="Input type" />
    </template>
  </Story>
</template>
