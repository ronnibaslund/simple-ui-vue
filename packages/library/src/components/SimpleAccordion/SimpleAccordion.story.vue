<script setup lang="ts">
import { reactive } from 'vue'
import SimpleAccordion from './SimpleAccordion.vue'
import SimpleAccordionPanel from '../SimpleAccordionPanel/SimpleAccordionPanel.vue'

const state = reactive({})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Variant Title">
      <SimpleAccordion>
        <SimpleAccordionPanel title="Panel 1">
          <p>Panel 1 Content</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="Panel 2">
          <p>Panel 2 Content</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="Panel 3">
          <p>Panel 3 Content</p>
        </SimpleAccordionPanel>
      </SimpleAccordion>
    </Variant>

    <Variant title="Variant Title">
      <SimpleAccordion>
        <SimpleAccordionPanel title="Panel 1">
          <p>Panel 1 Content</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="Panel 2">
          <p>Panel 2 Content</p>
        </SimpleAccordionPanel>
        <SimpleAccordionPanel title="Panel 3">
          <p>Panel 3 Content</p>
        </SimpleAccordionPanel>
      </SimpleAccordion>
    </Variant>

    <template #controls></template>
  </Story>
</template>
