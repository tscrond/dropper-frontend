<template>
    <Drawer
    class="!w-full sm:!w-[800px]"
    :visible="visible"
    @update:visible="updateVisibility"
    header="Details & Preview"
    >
       <div class="flex flex-col">
            <!-- Image -->
            <img class="border-4 border-dotted" v-if="isImage(selectedObject.content_type)" :src="fileLinks[selectedObject.name]" alt="Image" />

            <!-- Video -->
            <video class="border-4 border-dotted" v-else-if="isVideo(selectedObject.content_type)" controls>
            <source :src="fileLinks[selectedObject.name]" :type="selectedObject.content_type" />
            Your browser does not support the video tag.
            </video>


            <!-- PDF -->
            <iframe
                v-else-if="isPdf(selectedObject.content_type)"
                :src="fileLinks[selectedObject.name]"
                class="w-full h-[600px] border"
            ></iframe>

            <!-- Audio -->
            <audio
                v-else-if="isAudio(selectedObject.content_type)"
                controls
                class="w-full border-4 border-dotted"
            >
                <source
                :src="fileLinks[selectedObject.name]"
                :type="selectedObject.content_type"
                />
                Your browser does not support the audio element.
            </audio>

            <!-- Unsupported -->
            <div v-else class="border-4 border-dotted">
            <p>Format {{ selectedObject.content_type }} is not available for preview.</p>
            </div>

        <div class="flex flex-row items-center justify-around w-full h-full">
        <Button
            v-if="fileLinks[selectedObject.name]"
            @click="downloadFile(`${fileLinks[selectedObject.name]}`)"
            download
            class="
                break-all whitespace-normal
                w-2/7
                h-[50px]
                sm:h-[50px]
                inline-flex
                justify-center
                items-center
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
                my-4"
                >
                <p style="font-size: small;" class="pi pi-download"></p>
                <p class="text-[10px] sm:text-sm">Download this file</p>
        </Button>

        <Button
            v-if="fileLinks[selectedObject.name]"
            @click="previewFullScreenFile(`${fileLinks[selectedObject.name]}`)"
            download
            severity="info"
            class="
                break-all whitespace-normal
                w-2/7
                h-[50px]
                sm:h-[50px]
                inline-flex
                justify-center
                items-center
                font-semibold 
                rounded-lg 
                border 
                border-transparent 
                focus:outline-hidden
                disabled:opacity-50 
                cursor-pointer
                my-4"
                >
                <p style="font-size: small;" class="pi pi-arrow-up-right-and-arrow-down-left-from-center"></p>
                <p class="text-[10px] sm:text-sm">Preview fullscreen</p>
        </Button>

        <Button
            v-if="mode === 'private'"
            @click="deleteObject(`${selectedObject.name}`)"
            download
            severity="danger"
            class="
                break-all whitespace-normal
                w-2/7
                h-[50px]
                sm:h-[50px]
                inline-flex
                justify-center
                items-center
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
                my-4"
                >
                <p style="font-size: small;" class="pi pi-trash"></p>
                <p class="text-[10px] sm:text-sm">Delete</p>
        </Button>

        </div>

        <div class="flex flex-row items-center justify-around w-full h-full">
          <Button
            :label="copied ? 'Copied!' : (mode === 'private' ? 'Copy Sharing Link (Private)' : 'Copy Sharing Link')"
            :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
            :severity="copied ? 'success' : 'contrast'"
            variant="outlined"
            class="w-full px-4"
            @click="copyLink(`${fileLinks[selectedObject.name]}?mode=inline`)"
          />
        </div>

        <div>
          <table class="my-4 min-w-full text-sm text-left border">
            <tbody>
              <tr class="border-b">
                <th class="px-4 py-2 font-medium">File Name</th>
                <td class="px-4 py-2">{{ selectedObject.name }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-medium">Content Type</th>
                <td class="px-4 py-2">{{ selectedObject.content_type }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-medium">MD5 Checksum</th>
                <td class="px-4 py-2">{{ selectedObject.md5 }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-medium">Size</th>
                <td class="px-4 py-2">{{ formatSize(selectedObject.size) }}</td>
              </tr>
              <tr class="border-b" v-if="selectedObject.date_created">
                <th class="px-4 py-2 font-medium">Date Created</th>
                <td class="px-4 py-2">{{ formatDateToShortString(selectedObject.date_created) }}</td>
              </tr>
              <tr class="border-b" v-if="selectedObject.shared_by">
                <th class="px-4 py-2 font-medium">Shared By</th>
                <td class="px-4 py-2">{{ selectedObject.shared_by }}</td>
              </tr>
              <tr class="border-b" v-if="selectedObject.shared_for">
                <th class="px-4 py-2 font-medium">Shared For</th>
                <td class="px-4 py-2">{{ selectedObject.shared_for }}</td>
              </tr>
              <tr class="border-b" v-if="selectedObject.expires_at">
                <th class="px-4 py-2 font-medium">Expires At</th>
                <td class="px-4 py-2">{{ formatDateToShortString(selectedObject.expires_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4"> -->
        <Form v-if="mode === 'private'" v-slot="$form" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <Editor v-model="editorContent" name="content" editorStyle="height: 320px" readonly/>
                <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{ $form.content.error?.message }}</Message>
            </div>
            <Button class="font-semibold" type="submit" severity="info" label="Submit">
              <p class="pi pi-check-circle"></p> Submit
            </Button>
        </Form>

      </div>
    </Drawer>
</template>

<script setup>
import axios from 'axios';

import { ref } from 'vue';
import { defineEmits } from 'vue';
import { formatSize,formatDateToShortString } from '@/utils/helpers'
import { Form } from '@primevue/forms';
import { Button } from 'primevue';
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';

import Drawer from 'primevue/drawer';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';   
import Editor from 'primevue/editor';
import Message from 'primevue/message';

const props = defineProps({
   selectedObject: null,
   fileLinks: null,
   mode: 'private',
   deleteObject: Function,
   visible: Boolean
});

const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);

const editorContent = ref('<h1>Editor for notes feature coming soon!</h1>');

const emit = defineEmits(['update:visible']);

const copied = ref(false);

const copyLink = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

function updateVisibility(value) {
    emit('update:visible', value);
}

// File type checks
function isImage(mimeType) {
  console.log("mimetype: ",mimeType);
  return mimeType.startsWith('image/');
}

function isVideo(mimeType) {
  return mimeType.startsWith('video/');
}

function isAudio(mimeType) {
    return mimeType.startsWith('audio/');
}

function isPdf(type) {
  return type === 'application/pdf';
}

function downloadFile(fileLink) {
  const link = document.createElement('a');
  link.href = `${fileLink}?mode=download`;
  link.download = '';
  link.click();
}

function previewFullScreenFile(fileLink) {
  const link = document.createElement('a');
  link.href = `${fileLink}?mode=inline`;
  link.click();
}

</script>

<style>
.copy-button {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
