<template>
  <div
    v-if="!isvisible"
    @click="onClose"
    @mouseenter="onHover"
    class="fixed top-1/2 right-0 transform -translate-y-1/2 border-2 rounded-s-xl bg-amber-200 py-10 px-2 cursor-pointer transition-all duration-300 shadow-lg w-8 h-64"
  >
    <span class="rotate-90 block whitespace-nowrap text-xl">> > Uploaded Files</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define props to receive the `isvisible` state
defineProps({
  isvisible: Boolean,
});

const emit = defineEmits(["toggle"]);

// Flag to ignore hover for a short period after closing
const ignoreHover = ref(false);

// Method to toggle sidebar visibility
const toggleSidebar = () => emit("toggle");

// Method triggered by hover, only if ignoreHover is not active
const onHover = () => {
  if (!ignoreHover.value) {
    toggleSidebar();  // Toggle sidebar on hover
  }
};

// Method to handle closing the sidebar (via X button)
const onClose = () => {
  toggleSidebar();  // Close the sidebar
  ignoreHover.value = true;  // Ignore hover for a short duration after close
  setTimeout(() => {
    ignoreHover.value = false;  // Allow hover behavior after a short delay
  }, 500);  // Reset ignoreHover after 500ms
};
</script>
