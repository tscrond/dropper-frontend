<template>
    <div class="flex flex-col w-full h-full overflow-x-auto">

        <div class="h-full w-full">
            <div class="flex flex-col sm:flex-row sm:justify-evenly items-center justify-around h-full w-full">
                <p class="text-2xl overline sm:text-2xl">Share the file(s)</p>
                <div class="flex flex-col sm:flex-col justify-evenly items-center">
                    <MultiSelect v-model="selectedFiles" :options="objectsList" optionLabel="name" filter placeholder="Select File(s)"
                    :maxSelectedLabels="3" size="medium" class="w-80 sm:w-full" />
                    <p class="text-xl sm:text-2xl">to user</p>

                    <FloatLabel>
                        <InputText size="large" id="email" v-model="emailAddress" />
                        <label for="email">Email</label>
                    </FloatLabel>

                    <p class="text-xl sm:text-2xl">for</p>

                    <InputNumber v-model="timeNumber" size="small" showButtons buttonLayout="vertical" class="w-12" :min="0" :max="365">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>

                    <Select v-model="selectedDuration" size="large" :options="duration" optionLabel="name" placeholder="Select a duration" class="w-full md:w-56" />
                    <Button label="Share" icon="pi pi-check" iconPos="right" @click="shareFiles" />

                </div>
            </div>

            <div class="sm:flex flex-col sm:flex-row sm:justify-evenly items-center justify-around h-full w-full overflow-y-scroll sm:visible">
                <h1 class="flex justify-center overline py-2 text-3xl">Shared By Me</h1>
                <div class="flex h-full overflow-y-auto shadow p-2">
                    <SharedByMe :sharedObjectsList="sharedObjectsByUserList" />
                </div>
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

    console.log("selected files:", selectedFiles);

    // Ensure selectedFiles is an array before calling map
    if (!Array.isArray(selectedFiles.value)) {
        console.error('selectedFiles is not an array');
        return;
    }

    const fetchPromises = selectedFiles.value.map(async (file) => {
        try {
            const response = await axios.post(
                shareUrl,
                {}, // empty body (since you're sending data in query params)
                {
                    withCredentials: true,
                    params: {
                        email: emailAddress.value,
                        object: file.name,
                        duration: `${timeNumber.value}${selectedDuration.value.code}`,
                    },
                }
            );

            console.log("response status", file.name, response.status);
        } catch (e) {
            console.error(`Error sharing file ${file.name}:`, e.message);
        }
    });

    await Promise.all(fetchPromises);
    sharedStore.fetchSharedDataByUser();

    selectedFiles.value = [];
    emailAddress.value = '';
    timeNumber.value = 0;
    selectedDuration.value = null;
}

</script>
