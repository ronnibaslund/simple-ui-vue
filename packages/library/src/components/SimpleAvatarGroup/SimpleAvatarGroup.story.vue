<script setup lang="ts">
import { reactive } from 'vue'
import SimpleAvatar from '../SimpleAvatar/SimpleAvatar.vue'
import SimpleAvatarGroup from './SimpleAvatarGroup.vue'
import { sizes, masks, Masks, Sizes } from '../../globals'

const state = reactive({
  size: 'sm' as Sizes,
  mask: 'circle' as Masks
})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Simple Avatar Group">
      <SimpleAvatarGroup :mask="state.mask" :size="state.size">
        <SimpleAvatar src="https://i.pravatar.cc/300?u=8"></SimpleAvatar>
        <SimpleAvatar placeholder="DK" class="bg-red-600"></SimpleAvatar>
        <SimpleAvatar src="https://i.pravatar.cc/300?u=10"></SimpleAvatar>
        <SimpleAvatar src="https://i.pravatar.cc/300?u=40"></SimpleAvatar>
        <SimpleAvatar placeholder="99+" class="bg-gray-500"></SimpleAvatar>
      </SimpleAvatarGroup>
    </Variant>

    <template #controls>
      <HstSelect v-model="state.size" :options="sizes" title="Size"></HstSelect>
      <HstSelect v-model="state.mask" :options="masks" title="Mask"></HstSelect>
    </template>
  </Story>
</template>