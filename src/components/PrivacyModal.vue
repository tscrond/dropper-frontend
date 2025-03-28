<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/40">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <slot></slot> <!-- Slot for modal content -->
        <div class="mt-4 flex justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400">
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean, // Controls modal visibility
  title: String
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close"); // Emit event to close modal
};
</script>
