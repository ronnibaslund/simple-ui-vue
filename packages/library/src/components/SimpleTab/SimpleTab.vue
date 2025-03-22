<script setup lang="ts">
import { inject, ref, computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const emit = defineEmits(['update:activeTab'])
const registerTab = inject('SimpleTabsComponentRegisterTab', (name: string) => {})
// set the first tab as active
registerTab(props.name)

const setActiveTab = inject('SimpleTabsComponentRegisterSelectedTab', (name: string) => {})

const tabsData = inject(
  'SimpleTabsData',
  ref({
    activeTab: ''
  })
)


const isActive = computed(() => tabsData.value.activeTab === props.name)
</script>

<template>
  <a role="tab" class="tab" :class="{ 'tab-active': isActive }" @click="setActiveTab(name)">{{
    name
  }}</a>
  <div class="tab-content border-base-300 bg-base-100 p-10">
    <slot></slot>
  </div>
</template>
