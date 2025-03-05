<script setup lang="ts">
import { reactive } from 'vue'
import SimpleContextMenu from './SimpleContextMenu.vue'

const state = reactive({})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Variant Title">
      <SimpleContextMenu
        :items="[
          {
            label: 'Item 1',
            action: () => {
              console.log('Item 1 clicked')
            }
          },
          {
            label: 'Item 2',
            action: () => {
              console.log('Item 2 clicked')
            },
            children: [
              {
                label: 'Item 2.1',
                action: () => {
                  console.log('Item 2.1 clicked')
                }
              },
              {
                label: 'Item 2.2',
                action: () => {
                  console.log('Item 2.2 clicked')
                }
              }
            ]
          },
          {
            label: 'Item 3',
            action: () => {
              console.log('Item 3 clicked')
            }
          }
        ]"
      >
        <div>Some stuff going on here that needs a custom context menu.</div>
        <div>Right click me to see context menu</div>
      </SimpleContextMenu>
    </Variant>

    <template #controls></template>
  </Story>
</template>
