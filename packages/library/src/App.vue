<script setup lang="ts">
import { ref } from 'vue'
import SimpleToggle from './components/SimpleToggle/SimpleToggle.vue'

const test = ref(true)
</script>

<template>
  <SimpleButton :color="'primary'">Click Me</SimpleButton>
  <SimpleToggle v-model="test" color="warning" />

  <input type="checkbox" checked="checked" class="toggle toggle-primary" />
  <input type="checkbox" checked="checked" class="toggle toggle-secondary" />
  <input type="checkbox" checked="checked" class="toggle toggle-accent" />
  <input type="checkbox" checked="checked" class="toggle toggle-neutral" />

  <input type="checkbox" checked="checked" class="toggle toggle-info" />
  <input type="checkbox" checked="checked" class="toggle toggle-success" />
  <input type="checkbox" checked="checked" class="toggle toggle-warning" />
  <input type="checkbox" checked="checked" class="toggle toggle-error" />
</template>
