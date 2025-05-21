<template>
  <div class="flex flex-col w-full h-full p-6 space-y-10 bg-white text-black">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-center">Share Files</h1>

    <!-- File Sharing Form -->
    <div class="bg-white border border-gray-300 rounded-lg shadow p-6 max-w-3xl mx-auto w-full space-y-6">
      <!-- File Select -->
      <div>
        <label class="block text-base font-medium mb-2">Select File(s)</label>
        <MultiSelect
          v-model="selectedFiles"
          :options="objectsList"
          optionLabel="name"
          filter
          placeholder="Choose files"
          :maxSelectedLabels="3"
          class="w-full"
        />
      </div>

      <!-- Email Input -->
      <div>
        <label class="block text-base font-medium mb-2">Recipient Email</label>
        <FloatLabel>
          <InputText id="email" v-model="emailAddress" class="w-full" />
          <label for="email">Email</label>
        </FloatLabel>
      </div>


    <!-- Time + Duration -->
    <div>

    <label class="block text-base font-medium mb-2">Share Duration</label>
    <div class="flex flex-row items-center space-x-4">
        <div class="flex items-center space-x-2">
        <InputNumber
            v-model="timeNumber"
            showButtons
            buttonLayout="vertical"
            class="w-20"
            :min="0"
            :max="365"
        >
            <template #incrementbuttonicon>
            <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
            <span class="pi pi-minus" />
            </template>
        </InputNumber>
        </div>

        <div class="flex-1">
        <Select
            v-model="selectedDuration"
            :options="duration"
            optionLabel="name"
            placeholder="Select duration unit"
            class="w-full"
        />
        </div>
    </div>

    </div>
      <!-- Share Button -->
      <div class="text-right">
        <Button label="Share" icon="pi pi-check" iconPos="right" @click="shareFiles" />
      </div>
    </div>

    <!-- Shared Files -->
    <div class="max-w-5xl mx-auto w-full">
      <h2 class="text-2xl font-semibold mb-4 text-center">Shared By Me</h2>
      <div class="border border-gray-200 rounded-md shadow p-4 max-h-96 overflow-y-auto">
        <SharedByMe :sharedObjectsList="sharedObjectsByUserList" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';

import { useSharedDataStore } from '@/stores/shared';
import { useBucketDataStore } from '@/stores/bucket';
import { useConfigStore } from '@/stores/config';
import SharedByMe from '@/components/sharing/SharedByMe.vue';

import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';

const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);

const sharedStore = useSharedDataStore();
const { sharedObjectsByUserList } = storeToRefs(sharedStore);

const bucketStore = useBucketDataStore();
const { objectsList } = storeToRefs(bucketStore);


onMounted(() => {
    sharedStore.fetchSharedDataByUser();
    bucketStore.fetchBucketDataFromUser();

    setInterval(() => {
        bucketStore.fetchBucketDataFromUser();
        sharedStore.fetchSharedDataByUser();
    },10000);
})

const selectedFiles = ref([]);
const emailAddress = ref('');
const timeNumber = ref(0);
const selectedDuration = ref(null); 

const duration = ref([
    { name: 'seconds', code: 's' },
    { name: 'minutes', code: 'm' },
    { name: 'hours', code: 'h' },
    { name: 'days', code: 'd' },
    { name: 'months', code: 'mo' },
    { name: 'years', code: 'y'}
]);

async function shareFiles() {
    const shareUrl = `${backendUrl.value}/files/share`;

    // Validate input
    if (!Array.isArray(selectedFiles.value) || selectedFiles.value.length === 0) {
        console.error('No files selected to share');
        return;
    }

    const fileNames = selectedFiles.value.map(file => file.name);

    try {
        const response = await axios.post(
            shareUrl,
            {
                email: emailAddress.value,
                objects: fileNames,
                duration: `${timeNumber.value}${selectedDuration.value.code}`, // e.g. "24h"
            },
            {
                withCredentials: true,
            }
        );

        console.log("Share response:", response.data);
    } catch (e) {
        console.error("Error sharing files:", e.message);
    }

    // Refresh shared data and clear inputs
    await sharedStore.fetchSharedDataByUser();
    selectedFiles.value = [];
    emailAddress.value = '';
    timeNumber.value = 0;
    selectedDuration.value = null;
}

</script>
