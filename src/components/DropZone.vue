<template>
  <div
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
    id="fileLoader"
    @click="triggerFileInput"
    class="cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-200 hover:border-blue-500"
  >
    <div
      class="text-center p-28 border-4 border-dashed rounded-lg transition-all duration-300 ease-in-out"
      :class="active ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-300'"
    >
      <p v-if="active">Drop files here...</p>
      <p v-else>Drag & drop files here or click to upload</p>
    </div>
  </div>

  <!-- Hidden file input -->
  <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['files-dropped']);

let active = ref(false);
let inActiveTimeout = null;

const fileInput = ref(null);

// File drop handlers
function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout);
}

function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop(e) {
  setInactive();
  const droppedFiles = [...e.dataTransfer.files];
  emit('files-dropped', droppedFiles); // Emit dropped files
}

function handleFileChange(event) {
  const files = event.target.files;
  if (files.length > 0) {
    emit('files-dropped', [...files]); // Emit selected files
  }
}

function triggerFileInput() {
  fileInput.value.click();
}
</script>
