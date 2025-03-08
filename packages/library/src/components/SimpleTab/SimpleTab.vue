<script setup lang="ts">
import { inject, ref, computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const registerTab = inject('SimpleTabsComponentRegisterTab', (name: string) => {})
registerTab(props.name)

const tabsData = inject(
  'SimpleTabsData',
  ref({
    activeTab: ''
  })
)

const isActive = computed(() => tabsData.value.activeTab === props.name)
</script>

<template>
  <div
    class="tab-content border-base-300 bg-base-100 p-10"
    :class="{
      hidden: !isActive
    }"
  >
    test
    <slot></slot>
  </div>
</template>
