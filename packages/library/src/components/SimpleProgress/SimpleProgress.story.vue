<script setup lang="ts">
import { reactive } from 'vue'
import SimpleProgress from './SimpleProgress.vue'

const state = reactive({
  value: 70,
  max: 100
})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Default">
      <SimpleProgress :value="state.value" :max="state.max"></SimpleProgress>
    </Variant>

    <Variant title="Primary">
      <SimpleProgress :value="state.value" :max="state.max" color="primary"></SimpleProgress>
    </Variant>

    <Variant title="Secondary">
      <SimpleProgress :value="state.value" :max="state.max" color="secondary"></SimpleProgress>
    </Variant>

    <Variant title="Accent">
      <SimpleProgress :value="state.value" :max="state.max" color="accent"></SimpleProgress>
    </Variant>

    <Variant title="Info">
      <SimpleProgress :value="state.value" :max="state.max" color="info"></SimpleProgress>
    </Variant>

    <Variant title="Success">
      <SimpleProgress :value="state.value" :max="state.max" color="success"></SimpleProgress>
    </Variant>

    <Variant title="Warning">
      <SimpleProgress :value="state.value" :max="state.max" color="warning"></SimpleProgress>
    </Variant>

    <Variant title="Error">
      <SimpleProgress :value="state.value" :max="state.max" color="error"></SimpleProgress>
    </Variant>

    <Variant title="Different Values">
      <div class="flex flex-col gap-4">
        <SimpleProgress :value="0" :max="state.max"></SimpleProgress>
        <SimpleProgress :value="10" :max="state.max"></SimpleProgress>
        <SimpleProgress :value="40" :max="state.max"></SimpleProgress>
        <SimpleProgress :value="70" :max="state.max"></SimpleProgress>
        <SimpleProgress :value="100" :max="state.max"></SimpleProgress>
      </div>
    </Variant>

    <Variant title="Indeterminate">
      <SimpleProgress></SimpleProgress>
    </Variant>

    <template #controls>
      <HstNumber v-model="state.value" title="Value" />
      <HstNumber v-model="state.max" title="Max" />
    </template>
  </Story>
</template>
