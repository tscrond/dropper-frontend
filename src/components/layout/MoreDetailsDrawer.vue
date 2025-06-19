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
            <source :src="`${fileLinks[selectedObject.name]}?mode=inline`" :type="selectedObject.content_type" />
            Your browser does not support the video tag.
            </video>


            <!-- PDF -->
            <iframe
                v-else-if="isPdf(selectedObject.content_type)"
                :src="`${fileLinks[selectedObject.name]}?mode=inline`"
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

        <div class="flex flex-col items-center justify-around w-full h-full space-y-2">
          <div class="flex flex-row w-full space-x-2">
            <Button
              :label="copied ? 'Copied!' : 'Copy Sharing Link'"
              :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
              :severity="copied ? 'success' : 'contrast'"
              variant="outlined"
              class="w-full px-4"
              @click="copyLinkHandler"
            />
            <div class="flex items-center self-center">
              <Checkbox
                binary
                v-model="isPublicLink"
                :inputId="selectedObject.name"
                :name="selectedObject.name"
              />
              <label :for="selectedObject.name" class="p-2"> Make this link public </label>
            </div>
          </div>

          <Select
            v-if="isPublicLink"
            v-model="selectedDuration"
            :options="duration"
            optionLabel="name"
            placeholder="Select duration"
            class="w-full"
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
                <Editor v-model="currentEditorContent" name="content" editorStyle="height: 320px"/>
                <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{ $form.content.error?.message }}</Message>
            </div>
            <Button class="font-semibold" type="submit" severity="info" label="Submit" @click="submitNotes">
              <p class="pi pi-check-circle"></p> Submit
            </Button>
        </Form>

      </div>
      <PopUp 
          :message="popupMessage"
          :type="popupType"
          :show="popupVisible"
          :duration="500"
          @hide="popupVisible = false"
      />
    </Drawer>
</template>

<script setup>
import axios, { HttpStatusCode } from 'axios';

import { ref } from 'vue';
import { defineEmits } from 'vue';
import { formatSize,formatDateToShortString } from '@/utils/helpers'
import { Form } from '@primevue/forms';
import { Button } from 'primevue';
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';
import { reactive, watch, computed } from 'vue';

import Drawer from 'primevue/drawer';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';   
import Editor from 'primevue/editor';
import Message from 'primevue/message';
import Checkbox from 'primevue/checkbox';
import Select from 'primevue/select';

import DOMPurify from 'dompurify';
import PopUp from './PopUp.vue';

const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);

const props = defineProps({
   selectedObject: null,
   fileLinks: null,
   mode: 'private',
   deleteObject: Function,
   visible: Boolean,
   userId: String
});

// popup vars
const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref('success');

// manipulate visibility
const emit = defineEmits(['update:visible']);

function updateVisibility(value) {
  emit('update:visible', value);
}

// copy to clipboard handling
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

// editor handling
const editorContent = reactive({});

// Fetch the HTML content when the selected object changes
watch(
  () => props.selectedObject,
  async (newValue) => {
    if (newValue && newValue.md5) {
      await fetchEditorContent(newValue.md5);
    }
  },
  { immediate: true }
);

async function fetchEditorContent(md5checksum) {
  try {
    const response = await axios.get(`${backendUrl.value}/files/${md5checksum}/note`, {
      withCredentials: true,
    });

    // Sanitize and set the content for the specific file (keyed by md5checksum)
    const sanitizedContent = DOMPurify.sanitize(response.data.response.content);
    editorContent[md5checksum] = sanitizedContent;
  } catch (error) {
    console.error('Failed to fetch editor content: ', error);
  }
}


const currentEditorContent = computed({
  get() {
    // Use the md5 of the selectedObject as the key
    return editorContent[props.selectedObject?.md5] || '';
  },
  set(value) {
    // Update the content for the selectedObject's md5 checksum
    editorContent[props.selectedObject?.md5] = value;
  },
});

// Submit notes for the selected file
const submitNotes = async () => {
  const fileName = props.selectedObject?.name || '';
  const md5checksum = props.selectedObject?.md5;
  const rawContent = editorContent[md5checksum] || '';
  const sanitized = DOMPurify.sanitize(rawContent);

  try {
    const response = await axios.put(
      `${backendUrl.value}/files/${md5checksum}/note`,
      { content: sanitized },
      { withCredentials: true }
    );

    if (response.status === HttpStatusCode.Ok) {
      popupMessage.value = 'Submitted Note!';
      popupType.value = 'success';
    }
  } catch (error) {
    console.error('Failed to save notes: ', error);

    if (error.response.status === HttpStatusCode.Forbidden && error.response.data?.response?.msg === 'too_many_characters') {
      popupMessage.value = 'Too Many Characters (max 500)';
      popupType.value = 'warning';
    } else {
      popupMessage.value = 'Failed to save notes';
      popupType.value = 'error';
    }

  }
  popupVisible.value = true;
};

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

const duration = ref([
    { name: '30 minutes', code: '30m' },
    { name: '2 hours', code: '2h' },
    { name: '1 day', code: '1d' },
    { name: '1 week', code: '7d' },
    { name: '1 month', code: '1mo'}
]);


const isPublicLink = ref(false)
const selectedDuration = ref('24h')

async function copyLinkHandler() {
  let linkToCopy = ''

  if (isPublicLink.value) {
    try {
      const res = await axios.post(`${backendUrl.value}/files/share`, {
        email: 'unspecified',
        objects: [props.selectedObject.name],
        duration: selectedDuration.value.code,
        send_email: false
      },
      { withCredentials: true }
      )
      console.log(res)
      linkToCopy = `${res.data.response.sharing_info[0].sharing_link}?mode=inline`
      console.log(linkToCopy)
    } catch (err) {
      console.error('Failed to generate public link', err)
      return
    }
  } else {
    linkToCopy = `${props.fileLinks[props.selectedObject.name]}?mode=inline`
  }

  try {
    await copyLink(linkToCopy)
  } catch (error) {
    console.log('Failed to copy link: ', error)
  }
}
</script>

<style>
.copy-button {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
