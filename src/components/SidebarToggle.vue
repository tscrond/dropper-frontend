<template>
    <div
      v-if="!isvisible"
      @click="toggleSidebar"
      @mouseenter="toggleSidebar"
      class="fixed w-8 h-128 top-1/2 right-0 transform -translate-y-1/2 bg-blue-700/20 text-white py-10 px-2 cursor-pointer transition-all duration-300 shadow-lg"
    >

    <span class="rotate-90 block whitespace-nowrap text-2xl">Uploaded Files</span>
    </div>
  </template>
  
<script setup>
defineProps({
isvisible: Boolean,
});

const emit = defineEmits(["toggle"]);
const toggleSidebar = () => emit("toggle");
</script>
  