<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-3">
        <i :class="icon + ' text-xl text-primary'"></i>
        <span class="font-semibold text-lg">{{ title }}</span>
      </div>
    </template>
    <template #content>
      <p class="text-color-secondary">{{ description }}</p>
    </template>
  </Card>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  description: String,
})

import Card from 'primevue/card'
</script>
