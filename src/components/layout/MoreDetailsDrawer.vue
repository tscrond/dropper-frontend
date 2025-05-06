<template>
    <Drawer
    class="!w-full md:!w-80 lg:!w-[30rem]"
    :visible="visible"
    @update:visible="updateVisibility"
    header="Details & Image Preview"
    >
       <div class="flex flex-col">
        <!-- Image -->
        <img v-if="isImage(selectedObject.content_type)" :src="fileLinks[selectedObject.name]" alt="Image" />

        <!-- Video -->
        <video v-else-if="isVideo(selectedObject.content_type)" controls>
          <source :src="fileLinks[selectedObject.name]" :type="selectedObject.content_type" />
          Your browser does not support the video tag.
        </video>

        <!-- Unsupported -->
        <div v-else>
          <p>Format {{ selectedObject.content_type }} is not available for preview.</p>
        </div>

        <Button
            v-if="fileLinks[selectedObject.name]"
            @click="downloadFile(`${fileLinks[selectedObject.name]}`)"
            download
            class="
                break-all whitespace-normal
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
                cursor-pointer"
                >
                Download this file
        </Button>

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
              <tr>
                <th class="px-4 py-2 font-medium">Date Created</th>
                <td class="px-4 py-2">{{ formatDateToShortString(selectedObject.date_created) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <Editor v-model="editorContent" name="content" editorStyle="height: 320px" readonly/>
                <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{ $form.content.error?.message }}</Message>
            </div>
            <Button type="submit" severity="info" label="Submit" />
        </Form>

      </div>
    </Drawer>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { formatSize,formatDateToShortString } from '@/utils/helpers'
import { Form } from '@primevue/forms';
import { Button } from 'primevue';

import Drawer from 'primevue/drawer';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';   
import Editor from 'primevue/editor';

const props = defineProps({
   selectedObject: null,
   fileLinks: null,
   visible: Boolean
});

const editorContent = ref('<h1>Editor for notes feature coming soon!</h1>');

const emit = defineEmits(['update:visible']);

function updateVisibility(value) {
    emit('update:visible', value);
}

// File type checks
function isImage(mimeType) {
  return mimeType.startsWith('image/');
}

function isVideo(mimeType) {
  return mimeType.startsWith('video/');
}

function downloadFile(fileLink) {
  const link = document.createElement('a');
  link.href = fileLink;
  link.download = '';
  link.click();
}
</script>
