<script setup lang="ts">
import { ref } from 'vue'
import SimpleToggle from './components/SimpleToggle/SimpleToggle.vue'

const test = ref(true)
</script>

<template>
  <div class="container">
    <section>
      <h2>SimpleButton</h2>
      <SimpleButton :color="'primary'">Click Me</SimpleButton>
    </section>

    <section>
      <h2>SimpleToggle</h2>
      <SimpleToggle v-model="test" color="error" />
      <SimpleToggle v-model="test" color="warning" />
      <SimpleToggle v-model="test" color="success" />
    </section>

    <section>
      <h2>SimpleInput</h2>
      <p>Icons: <a href="https://icon-sets.iconify.design/carbon/?keyword=carbon">https://icon-sets.iconify.design/carbon/?keyword=carbon</a></p>
      <br>
      
      <SimpleInput
        type="text"
        placeholder="Type here"
        :color="'primary'"
        :size="'md'"
        :disabled="false"
        icon="lucide--user"
      />

      <SimpleInput
        type="text"
        placeholder="Type here"
        :color="'primary'"
        :size="'lg'"
        :disabled="false"
        :fieldset="true"
        fieldsetLegend="This is a legend"
        fieldsetLabel="This is a helper text"
        icon="lucide--user"
      />
    </section>
  </div>
</template>

<style scoped>
.container {
  margin: 20px;
}
section {
  margin-bottom: 2rem;
}
h2 {
  margin-bottom: 1rem;

}
</style>
