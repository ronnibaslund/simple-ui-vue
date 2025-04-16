<script setup lang="ts">
import { reactive } from 'vue'
import SimpleInput from './SimpleInput.vue'

const state = reactive({})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Variant Title">
      <SimpleInput></SimpleInput>
    </Variant>

    <template #controls></template>
  </Story>
</template>
