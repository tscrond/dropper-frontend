<template>
<table class="divide-y divide-neutral-700 min-w-full table-auto">
    <thead>
    <tr>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">File Name</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">Content Type</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">MD5 Checksum</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 md:table-cell">Shared By</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">Expires At</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 md:table-cell">Status</th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Actions</th>
    </tr>
    </thead>
    <tbody v-for="(object, i) in sharedObjectsList" :key="object.name" class="divide-y divide-neutral-700 overflow-scroll">
        <tr>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm font-medium">{{ object.file_name }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ object.file_type }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ object.md5_checksum }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm md:table-cell">{{ object.shared_by }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ formatDateToShortString(object.expires_at) }}</td>
            <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm md:table-cell"
                :class="[isExpired(object.expires_at) ? 'text-red-500' : 'text-green-500']"
            >
                
                <p class="pi pi-circle-fill" style="font-size: 10px;"></p>
                <p class="hidden sm:flex">{{ isExpired(object.expires_at) ? "Expired" : "Active" }}</p>
            </td>

            <td class="px-2 py-2 sm:px-6 sm:py-4">
                <div class="flex items-center justify-between gap-x-4 w-full">
                    <a
                        :href="`${backendUrl}/d/${object.sharing_token}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="
                        break-all whitespace-normal
                        max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] 
                        items-center 
                        gap-x-2 
                        text-sm 
                        font-semibold 
                        rounded-lg 
                        border 
                        border-transparent 
                        text-blue-600 
                        hover:text-blue-800 
                        focus:outline-hidden 
                        focus:text-blue-800 
                        disabled:opacity-50 
                        cursor-pointer
                        "
                    >
                        <p class="pi pi-download"></p>
                    </a>


                    <button class="
                        pi pi-link
                        break-all whitespace-normal
                        max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] 
                        items-center 
                        gap-x-2 
                        text-sm 
                        font-semibold 
                        rounded-lg 
                        border 
                        border-transparent 
                        text-white-600
                        hover:text-blue-400 
                        focus:outline-hidden 
                        focus:text-blue-800 
                        disabled:opacity-50 
                        cursor-pointer" 
                        @click="copyToClipboard(fileLinks[object.file_name])"
                    ></button>
                    <button @click="openPreview(object)" class="pi pi-arrow-up-right-and-arrow-down-left-from-center text-lg text-gray-500 hover:text-gray-700 cursor-pointer" style="font-size: 10px;"></button>
                </div>
            </td>
        </tr>
    </tbody>
    <MoreDetailsDrawer
      v-if="selectedObject"
      :fileLinks="fileLinks"
      :selectedObject="convertToBucketTableFormat(selectedObject)"
      :mode="`shared`"
      :userId="userId"
      v-model:visible="previewVisible"
    />
</table>

<PopUp
    :message="popupMessage"
    :type="popupType"
    :show="popupVisible"
    :duration="1000"
    @hide="popupVisible = false"
/>
</template>

<script setup>
import { ref, watch } from 'vue';  // Make sure to import `watch`
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';
import { formatDateToShortString, isExpired } from '@/utils/helpers';

import PopUp from '@/components/layout/PopUp.vue';
import MoreDetailsDrawer from '@/components/layout/MoreDetailsDrawer.vue';

const previewVisible = ref(false);
const selectedObject = ref(null);

const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);

const props = defineProps({
    sharedObjectsList: {
        type: Array,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

const textRef = ref(null);
const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref('success');

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        popupMessage.value = 'Copied to clipboard!';
        popupType.value = 'success';
    } catch (err) {
        popupMessage.value = 'Failed to copy';
        popupType.value = 'error';
    }
    popupVisible.value = true;
}

function openPreview(object) {
    selectedObject.value = object;
    previewVisible.value = true;
}

const fileLinks = ref({});

const localSharedObjectsList = ref([...props.sharedObjectsList]);

async function fetchLinksForAllFiles() {
    const links = {};

    for (const object of props.sharedObjectsList) {
        try {
            links[object.file_name] = `${backendUrl.value}/d/${object.sharing_token}`;
        } catch (e) {
            console.error(`Error constructing file link for ${object.file_name}`, e);
        }
    }

    fileLinks.value = links;
}

function convertToBucketTableFormat(object) {
    if (!object) return null;

    return {
        name: object.file_name,
        content_type: object.file_type,
        md5: object.md5_checksum,
        expires_at: object.expires_at,
        owner_google_id: object.owner_google_id,
        shared_by: object.shared_by,
        shared_for: object.shared_for,
        sharing_token: object.sharing_token,
        size: object.size
    };
}

watch(() => props.sharedObjectsList, (newList) => {
  localSharedObjectsList.value = [...newList];
  fetchLinksForAllFiles();
}, { immediate: true });
</script>
