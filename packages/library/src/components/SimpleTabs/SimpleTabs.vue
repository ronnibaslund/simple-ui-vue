<script setup lang="ts">
import { ref, watch, provide, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type: 'bordered' | 'boxed' | 'lifted'
  }>(),
  {
    type: 'lifted'
  }
)

const tabs = ref([])
function registerTab(label: string) {
  if (tabs.value.includes(label)) return
  tabs.value.push(label)
  if (!_activeTab.value) _activeTab.value = label
}
provide('SimpleTabsComponentRegisterTab', registerTab)

const activeTab = defineModel('activeTab')
const _activeTab = ref(activeTab.value)
watch(_activeTab, () => (activeTab.value = _activeTab.value))

// set the active tab from the outside
provide('SimpleTabsComponentRegisterSelectedTab', (name) => (_activeTab.value = name))

const tabsData = computed(() => {
  return {
    activeTab: _activeTab.value
  }
})
provide('SimpleTabsData', tabsData)

const classes = computed(() => {
  return {
    bordered: 'tabs-border',
    boxed: 'tabs-box',
    lifted: 'tabs-lift'
  }[props.type]
})
</script>

<template>
  <div :data-type="type">
    <div role="tablist" class="tabs" :class="classes">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
