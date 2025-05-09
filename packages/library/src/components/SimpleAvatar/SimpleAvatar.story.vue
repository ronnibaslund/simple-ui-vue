<script setup lang="ts">
import { reactive } from 'vue'
import SimpleAvatar from './SimpleAvatar.vue'
import SimpleBadge from '../SimpleBadge/SimpleBadge.vue'
import { sizes, masks, Masks } from '../../globals'

const state = reactive({
  mask: 'circle' as Masks
})
</script>
<template>
  <Story :layout="{ type: 'grid', width: '25%' }">
    <Variant :title="`With Image - ${size}`" v-for="size in sizes" :key="size">
      <SimpleAvatar :mask="state.mask" :size="size" :src="`https://i.pravatar.cc/300?u=2`" />
    </Variant>

    <Variant :title="`With Placeholder - ${size}`" v-for="size in sizes" :key="size">
      <SimpleAvatar :mask="state.mask" :size="size" placeholder="DK" class="bg-red-500" />
    </Variant>

    <Variant :title="`Custom BG Color ${size}`" v-for="size in sizes" :key="size">
      <SimpleAvatar
        :mask="state.mask"
        :size="size"
        placeholder="DK"
        :class="
          {
            xs: 'bg-red-500',
            sm: 'bg-blue-500',
            md: 'bg-green-500',
            lg: 'bg-yellow-500'
          }[size]
        "
      />
    </Variant>

    <Variant :title="`With Empty Badge - ${size}`" v-for="size in sizes" :key="size">
      <div class="relative inline-block">
        <SimpleBadge class="absolute top-0 right-0 z-10" color="success" :size="size"></SimpleBadge>
        <SimpleAvatar :mask="state.mask" :size="size" :src="`https://i.pravatar.cc/300?u=2`" />
      </div>
    </Variant>

    <Variant :title="`With Badge - ${size}`" v-for="size in sizes" :key="size">
      <div class="relative inline-block">
        <SimpleBadge
          class="absolute top-0 z-10 left-full translate-x-[-15px]"
          color="success"
          :size="size"
          >99+</SimpleBadge
        >
        <SimpleAvatar :mask="state.mask" :size="size" :src="`https://i.pravatar.cc/300?u=2`" />
      </div>
    </Variant>

    <Variant title="With placeholder backup when image not loaded">
      <SimpleAvatar
        v-bind="state"
        size="md"
        class="bg-green-500"
        :src="`https://i.pravatar.cc/150?img=1000000`"
        placeholder="DK"
      />
    </Variant>

    <template #controls>
      <HstSelect v-model="state.mask" :options="masks" title="Mask" />
    </template>
  </Story>
</template>