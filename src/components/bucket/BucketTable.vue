<template>
<table class="divide-y divide-neutral-700 min-w-full table-auto">
    <thead>
    <tr>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">File Name</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">Content Type</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">MD5 Checksum</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 md:table-cell">Size</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">Date Created</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Actions</th>
        <!-- <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"></th> -->
    </tr>
    </thead>
    <tbody v-for="(object, i) in localObjectsList" :key="object.name" class="divide-y divide-neutral-700 overflow-scroll">
        <tr>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm font-medium">{{ object.name }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ object.content_type }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ object.md5 }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm md:table-cell">{{ formatSize(object.size) }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ formatDateToShortString(object.date_created) }}</td>
            
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm">
              <div class="flex items-center justify-between gap-x-4 w-full">
                <button type="button" 
                @click="deleteObject(object.name)"
                class="
                break-all whitespace-normal
                max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] 
                inline-flex 
                items-center 
                gap-x-2 
                text-[13px]
                sm:text-sm 
                font-semibold 
                rounded-lg 
                border 
                border-transparent 
                text-red-600 
                hover:text-red-800 
                focus:outline-hidden 
                focus:text-red-800
                disabled:opacity-50 
                cursor-pointer
                ">
                  <p class="pi pi-trash"></p>
                </button>

                <a
                  v-if="fileLinks[object.name]"
                  :href="`${fileLinks[object.name]}`"
                  download
                  class="
                    break-all whitespace-normal
                    inline-flex 
                    items-center 
                    text-[13px]
                    sm:text-sm 
                    font-semibold 
                    rounded-lg 
                    border 
                    border-transparent 
                    text-blue-600 
                    hover:text-blue-800 
                    focus:outline-hidden 
                    focus:text-blue-800 
                    disabled:opacity-50 
                    cursor-pointer"
                >
                  <p class="pi pi-download"></p>
                </a>

                <span v-else class="text-gray-400">
                  <ProgressSpinner style="width: 30px; height: 30px;"></ProgressSpinner>
                </span>

                <button @click="openPreview(object)" class="pi pi-arrow-up-right-and-arrow-down-left-from-center text-lg text-gray-500 hover:text-gray-700 cursor-pointer" style="font-size: 10px;"></button>
              </div>
            </td>
        </tr>
    </tbody>
    <MoreDetailsDrawer
      v-if="selectedObject"
      :fileLinks="fileLinks"
      :selectedObject="selectedObject"
      :deleteObject="deleteObject"
      v-model:visible="visible"
      :mode="`private`"
    />
</table>


</template>


<script setup>
import { ref, watch } from 'vue';
import { usePrivateLinkStore } from '@/stores/privatelink';
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';
import { formatSize,formatDateToShortString } from '@/utils/helpers';
import axios from 'axios';

import ProgressSpinner from 'primevue/progressspinner';

import MoreDetailsDrawer from '@/components/layout/MoreDetailsDrawer.vue'
// Stores
const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);
const privateLinkStore = usePrivateLinkStore();


// Props
const props = defineProps({
  objectsList: {
    type: Array,
    required: true,
  },
});

// drawer
const visible = ref(false);
// selected object for drawer
const selectedObject = ref(null);

// Preview handling
function openPreview(object) {
  selectedObject.value = object;
  visible.value = true;
}

// Reactive fileLinks
const fileLinks = ref({});

// Reactive local objects list
const localObjectsList = ref([...props.objectsList]);

// Fetch private links for all files
async function fetchLinksForAllFiles() {
  fileLinks.value = {}; // Reset

  const fetchPromises = props.objectsList.map( async (object) => {
    try {
      await privateLinkStore.fetchPrivateLink(object.name);
      const token = privateLinkStore.getPrivateLink(object.name); // This should now be specific per file
      console.log(`Token for ${object.name}:`, token);
      fileLinks.value[object.name] = `${backendUrl.value}/d/private/${token}`;
    } catch (e) {
      console.error(`Error fetching for ${object.name}:`, e);
      fileLinks.value[object.name] = null;
    }
  })

  await Promise.all(fetchPromises);

  // console.log("Final fileLinks.value:", fileLinks.value);
}

async function deleteObject(objectName) {
  const deleteUrl = `${backendUrl.value}/files/delete`;
  try {
    visible.value = false;
    const response = await axios.delete(deleteUrl,{
      params: {
        file: objectName
      },
      withCredentials: true
    });

    // Remove the deleted object from localObjectsList
    localObjectsList.value = localObjectsList.value.filter(obj => obj.name !== objectName);

    // Optionally refresh the file links (if needed)
    await fetchLinksForAllFiles();

  } catch (e) {
    console.error('Error deleting object', e.response?.data || e.message); // <- not 'error.message', should be 'e.message'
  }
}

// Watch for prop changes
watch(() => props.objectsList, (newList) => {
  localObjectsList.value = [...newList];
  fetchLinksForAllFiles();
}, { immediate: true });
</script>
