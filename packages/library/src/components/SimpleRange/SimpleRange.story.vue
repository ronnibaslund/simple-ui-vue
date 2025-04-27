<script setup lang="ts">
import { reactive } from 'vue'
import SimpleRange from './SimpleRange.vue'

const state = reactive({
  value: 40,
  min: 0,
  max: 100,
  step: 1,
  disabled: false
})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Default">
      <div class="max-w-md">
        <SimpleRange v-model="state.value" :min="state.min" :max="state.max" :step="state.step" :disabled="state.disabled" />
        <div class="mt-2 text-sm">Value: {{ state.value }}</div>
      </div>
    </Variant>

    <Variant title="With Steps and Measure">
      <div class="w-full max-w-xs">
        <SimpleRange v-model="state.value" :min="0" :max="100" :step="25" />
        <div class="flex justify-between px-2.5 mt-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
        <div class="flex justify-between px-2.5 mt-2 text-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </Variant>

    <Variant title="Colors">
      <div class="flex flex-col gap-4 max-w-md">
        <div>Default <SimpleRange v-model="state.value" /></div>
        <div>Neutral <SimpleRange v-model="state.value" color="neutral" /></div>
        <div>Primary <SimpleRange v-model="state.value" color="primary" /></div>
        <div>Secondary <SimpleRange v-model="state.value" color="secondary" /></div>
        <div>Accent <SimpleRange v-model="state.value" color="accent" /></div>
        <div>Info <SimpleRange v-model="state.value" color="info" /></div>
        <div>Success <SimpleRange v-model="state.value" color="success" /></div>
        <div>Warning <SimpleRange v-model="state.value" color="warning" /></div>
        <div>Error <SimpleRange v-model="state.value" color="error" /></div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="flex flex-col gap-4 max-w-md">
        <div>XS <SimpleRange v-model="state.value" size="xs" /></div>
        <div>SM <SimpleRange v-model="state.value" size="sm" /></div>
        <div>MD (default) <SimpleRange v-model="state.value" /></div>
        <div>LG <SimpleRange v-model="state.value" size="lg" /></div>
        <div>XL <SimpleRange v-model="state.value" size="xl" /></div>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="max-w-md">
        <SimpleRange v-model="state.value" disabled />
      </div>
    </Variant>

    <template #controls>
      <HstNumber v-model="state.value" title="Value" />
      <HstNumber v-model="state.min" title="Min" />
      <HstNumber v-model="state.max" title="Max" />
      <HstNumber v-model="state.step" title="Step" />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
    </template>
  </Story>
</template>
