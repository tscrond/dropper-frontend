<template>
  <div
    @mouseleave="toggleSidebar"
    :class="[
      'fixed top-0 right-0 h-full w-1/2 bg-gray-800/40 text-white p-4 shadow-lg transition-transform duration-300 overflow-hidden',
      isvisible ? 'translate-x-0' : 'w-0 translate-x-full'
    ]"
  >
    <h2 class="text-xl mb-4">Uploaded Files</h2>

    <table class="w-full text-sm" v-if="files.length">
      <thead>
        <tr class="border-b">
          <th class="text-left p-2">File Name</th>
          <th class="text-left p-2">Type</th>
          <th class="text-left p-2">Size</th>
          <th class="text-left p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="file in files" :key="file.id">
          <td class="p-2">{{ file.file.name }}</td>
          <td class="p-2">{{ file.file.type }}</td>
          <td class="p-2">{{ formatSize(file.file.size) }}</td>
          <td class="p-2">
            <button @click="removeFile(file)" class="text-red-600 hover:bg-amber-50 text-xl">X</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center mt-4">
      <button class="bg-green-500 px-6 py-2 rounded-md">Upload to Server</button>
    </div>
  </div>
</template>

<script setup>
import useFileList from '@/compositions/file-list';

defineProps({
    isvisible: Boolean,
    files: Array,
});

const emit = defineEmits(["toggle"]);
const toggleSidebar = () => emit("toggle");

const { removeFile } = useFileList();

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
</script>
