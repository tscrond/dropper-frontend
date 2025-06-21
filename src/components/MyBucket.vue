<template>
    <div class="w-full h-full p-4">
    <div class="flex flex-col justify-center items-center overflow-x-auto">
        <!-- Table Wrapper 1 -->
        <h1 class="overline py-2 text-3xl mt-16">My Bucket</h1>

        <div class="h-full overflow-y-auto shadow p-2 border-4 border-dotted rounded-lg bg-gray-50 border-gray-300">
          <BucketTable :userId="`${userDataStore.userId}`" :objectsList="objectsList" />
        </div>

        <!-- Table Wrapper 2 -->
        <h1 class="overline py-2 text-3xl mt-32">Shared for Me</h1>
        <div class="h-full overflow-y-auto shadow p-2 border-4 border-dotted rounded-lg bg-gray-50 border-gray-300">
            <SharedForMe :userId="`${userDataStore.userId}`" :sharedObjectsList="sharedObjectsList" />
        </div>
    </div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBucketDataStore } from '@/stores/bucket'
import { useSharedDataStore } from '@/stores/shared'
import { useUserDataStore } from '@/stores/userdata'

import BucketTable from '@/components/bucket/BucketTable.vue'
import SharedTable from '@/components/sharing/SharedForMe.vue'
import SharedForMe from '@/components/sharing/SharedForMe.vue'

const userDataStore = useUserDataStore();
const bucketStore = useBucketDataStore();
const sharedStore = useSharedDataStore();

const { objectsList } = storeToRefs(bucketStore);
const { sharedObjectsList } = storeToRefs(sharedStore);

console.log("shared objects list: ",sharedObjectsList);
console.log("bucket objects list: ",objectsList);
console.log("user data obj: ", userDataStore.userId);

onMounted(async () => {
  await userDataStore.fetchUserData();

  await bucketStore.fetchBucketDataFromUser();
  await sharedStore.fetchSharedDataForUser();
 
  setInterval(async () => {
    await sharedStore.fetchSharedDataForUser();
  },10000);
//   console.log("bucket objects list: ",objectsList)
});

</script>
