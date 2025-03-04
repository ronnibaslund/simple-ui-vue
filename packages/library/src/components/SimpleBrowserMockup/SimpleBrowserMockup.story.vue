<script setup lang="ts">
import { reactive } from 'vue'
import SimpleBrowserMockup from './SimpleBrowserMockup.vue'

const state = reactive({})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Variant Title">
      <SimpleBrowserMockup url="https://github.com/ronnibaslund/simple-ui-vue">Hello!</SimpleBrowserMockup>
    </Variant>

    <template #controls></template>
  </Story>
</template>
