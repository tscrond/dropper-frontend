<template>
    <!-- pierdolnik: {{ objectsList }} -->
    <div class="w-full h-full p-4">
    <div class="flex flex-col justify-center items-center overflow-x-auto">
        <!-- Table Wrapper 1 -->
        <h1 class="overline py-2 text-3xl mt-16">My Bucket</h1>
            <div class="h-full overflow-y-auto shadow p-2">
            <BucketTable :objectsList="objectsList" />
        </div>

        <!-- Table Wrapper 2 -->
        <h1 class="overline py-2 text-3xl mt-32">Shared for Me</h1>
        <div class="h-full overflow-y-auto shadow p-2">
            <SharedForMe :sharedObjectsList="sharedObjectsList" />
        </div>
    </div>
    </div>

</template>

<script setup>
import BucketTable from './BucketTable.vue'
import SharedTable from './SharedForMe.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBucketDataStore } from '@/stores/bucket'
import { useSharedDataStore } from '@/stores/shared'
import SharedForMe from './SharedForMe.vue'


const bucketStore = useBucketDataStore()
const sharedStore = useSharedDataStore()

const { objectsList } = storeToRefs(bucketStore)
const { sharedObjectsList } = storeToRefs(sharedStore)


onMounted(() => {
  bucketStore.fetchBucketDataFromUser()
  sharedStore.fetchSharedDataForUser()
  
  setInterval(() => {
    sharedStore.fetchSharedDataForUser()
  },10000)
//   console.log("bucket objects list: ",objectsList)
  console.log("shared objects list: ",sharedObjectsList)
})

</script>
