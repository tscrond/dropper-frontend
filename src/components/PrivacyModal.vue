<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/40">
      <div class="flex justify-evenly flex-col bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <!-- <button @click="closeModal" class="text-gray-500 hover:text-gray-800">&times;</button> -->
          <button @click="closeModal" class="text-xl cursor-pointer font-bold text-gray-600 hover:text-black">
            X
          </button>
        </div>
        <slot></slot> <!-- Slot for modal content -->
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
