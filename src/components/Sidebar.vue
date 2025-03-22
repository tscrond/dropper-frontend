<template>
  <div
    @mouseleave="toggleSidebar"
    :class="[
      'fixed top-0 right-0 h-full w-3/7 bg-gray-800/40 p-4 shadow-lg transition-transform duration-300 overflow-hidden',
      isvisible ? 'translate-x-0' : 'w-0 translate-x-full'
    ]"
  >
    <div class="text-xl">Uploaded Files</div>

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
      <button @click="uploadToServer" class="bg-green-500 px-6 py-2 rounded-md">Upload to Server</button>
    </div>
  </div>
</template>

<script setup>
import fileUploadService from '@/services/fileupload';
import { useFileList } from '@/compositions/file-list';

defineProps(['isvisible']);

const emit = defineEmits(["toggle"]);
const toggleSidebar = () => emit("toggle");

const { files, removeFile } = useFileList();

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const uploadToServer = async () => {
  if (!files.value.length) {
    console.error('No files to upload');
    return;
  }

  try {
    // Loop through the files and upload them one by one
    for (const file of files.value) {
      const response = await fileUploadService.uploadFilesToBackend([file.file]); // Each request only sends one file
      console.log(`File uploaded successfully: ${file.file.name}`, response);
    }

    // After all uploads are successful, clear the file list
    files.value = [];
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};
</script>
