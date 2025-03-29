<template>
  <transition name="sidebar-transition" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div
      v-if="isvisible"
      :class="[
        'fixed top-0 right-0 h-full w-full bg-gray-800/80 p-4 shadow-lg overflow-hidden text-gray-300',
        isvisible ? 'translate-x-0' : 'translate-x-full' 
      ]"
    >
      <div class="flex justify-between">
        <div class="text-xl">Uploaded Files</div>
        <button @click="toggleSidebar" class="w-12 h-12 text-3xl cursor-pointer transition-all duration-500 rounded-full hover:bg-black">
          X
        </button>
      </div>

      <div class="overflow-x-auto max-h-[60vh] overflow-y-auto mt-4">
        <table class="border-collapse w-full text-sm" v-if="files.length">
          <thead>
            <tr class="border-b">
              <th class="text-left p-2">File Name</th>
              <th class="text-left p-2">Type</th>
              <th class="text-left p-2">Size</th>
              <th class="text-left p-2">Delete?</th>
              <th class="text-left p-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="file in files" :key="file.id">
              <td class="p-2 break-all whitespace-normal max-w-[200px]">{{ file.file.name }}</td>
              <td class="p-2">{{ file.file.type }}</td>
              <td class="p-2">{{ formatSize(file.file.size) }}</td>
              <td class="p-2">
                <button @click="removeFile(file)" class="w-8 h-8 text-red-600 cursor-pointer transition-all duration-500 rounded-full hover:bg-amber-50 text-xl">
                  X
                </button>
              </td>
              <td class="p-2 w-40">
                <div class="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                    <div
                      class="bg-blue-500 h-3 transition-all duration-300"
                      :style="{ width: file.progress + '%'}"
                    >

                    </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center mt-4">
        <button
          @click="handleUploadClick"
          @hide="popup.show = false"
          :show="popup.show"
          :type="popup.type"
          :message="popup.message"
          class="cursor-pointer text-black bg-green-500 px-6 py-2 rounded-md transition-all duration-500 hover:bg-green-300"
          >
            Upload to Server
          </button>

          <Popup :show="popup.show" :message="popup.message" :type="popup.type" @hide="popup.show = false"></Popup>
      </div>
    </div>
  </transition>
</template>

<script setup>
import fileUploadService from '@/services/fileupload';
import { useFileList } from '@/compositions/file-list';
import { reactive } from 'vue';
import Popup from '@/components/PopUp.vue';

const NO_FILES_TO_UPLOAD = 'No files to upload!';
const UPLOAD_FAILED = 'Upload failed. Please try again.';
const UPLOAD_SUCCESSFUL = 'All files uploaded successfully';

const props = defineProps(['isvisible']);

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
    return { success: false, message: NO_FILES_TO_UPLOAD };
  }

  try {
    // Loop through the files and upload them one by one    
    for (const file of files.value) {
      file.progress = 0;
      const response = await fileUploadService.uploadFilesToBackend([file.file], (percent) => {
        file.progress = percent;
      });
      console.log(`File uploaded successfully: ${file.file.name}`, response);
      file.progress = 100;
    }

    // After all uploads are successful, clear the file list
    files.value = [];
    return { success: true, message: UPLOAD_SUCCESSFUL };
  } catch (error) {
    console.error('Error uploading files:', error);
    return { success: false, message: UPLOAD_FAILED };
  }
};

const popup = reactive({
  show: false,
  message: '',
  type: 'error'
});

const triggerPopup = (message, type = 'info', duration = 1000) => {
  switch (type) {
    case 'error':
      message = `Error: ${message}`;
      break;
    case 'info':
      message = `Info: ${message}`; 
      break;
    case 'warning':
      message = `Warning: ${message}`;
      break;
    case 'success':
      message = `Success: ${message}`;
      break;
    default:
      break;
  }
  popup.message = message;
  popup.type = type;
  popup.show = 'true';

  setTimeout(() => {
    popup.show = false
  }, duration);
}

const handleUploadClick = async () => {
  const result = await uploadToServer();

  if (result.message == NO_FILES_TO_UPLOAD) {
    triggerPopup(result.message, 'info');
  }
  if (result.message == UPLOAD_FAILED) {
    triggerPopup(result.message, 'error');
  }
  if (result.message == UPLOAD_SUCCESSFUL) {
    triggerPopup(result.message, 'success');
  }
}

// Transition hooks
const beforeEnter = (el) => {
  el.style.transform = 'translateX(100%)';
};

const enter = (el, done) => {
  el.offsetHeight; // trigger reflow
  el.style.transition = 'transform 0.3s ease';
  el.style.transform = 'translateX(0)';
  done();
};

const leave = (el, done) => {
  el.style.transition = 'transform 0.3s ease';
  el.style.transform = 'translateX(100%)';

  const onTransitionEnd = () => {
    el.removeEventListener('transitionend', onTransitionEnd);
    done();
  };

  el.addEventListener('transitionend', onTransitionEnd);
};
</script>

<style scoped>
/* Add custom transition class */
.sidebar-transition-enter-active, .sidebar-transition-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-transition-enter, .sidebar-transition-leave-to /* .sidebar-transition-leave-active in <2.1.8 */ {
  transform: translateX(100%);
}
</style>
