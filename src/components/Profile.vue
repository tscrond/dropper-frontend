<template>
<div class="w-full h-full p-4">
    <div class="flex flex-col justify-center items-center overflow-x-auto">
        <div class="flex flex-col justify-around rounded-lg border-2 border-dashed w-64 h-96 sm:w-128 sm:h-96">
            <div class="flex flex-col justify-center items-center text-xl font-bold w-full h-2/7">
                <div class="flex justify-center items-center w-full">
                    <img :src="userDataStore.profPicture" alt="Circular Image" class="w-8 h-8 sm:w-16 sm:h-16 rounded-full">
                </div>
                <div class="flex justify-center items-center w-full">
                {{ userDataStore.userName }} 
                </div>
            </div>
            
            <hr>

            <div class="flex flex-col justify-around items-start text-xl w-full h-5/7">
                <div
                    v-for="(field, index) in userFields"
                    :key="index"
                    class="flex justify-center items-center w-full max-h-[50px] sm:max-h-[100px] overflow-clip break-all text-sm sm:text-lg"
                >
                    <div class="flex w-full justify-center items-center max-w-1/3">
                        <div class="flex justify-center font-bold">{{ field.label }}:</div>
                    </div>
                    <div class="flex w-full justify-center items-center max-w-2/3">
                        <div class="flex justify-center">{{ field.custom ? field.custom() : userDataStore[field.key] }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center items-center w-full h-full my-8 gap-4">
            <Button size="large" severity="danger" class="size-lg" @click="deleteAccount">
                Delete Account
            </Button>
            <div class="flex items-center self-center">
              <Checkbox
                binary
                v-model="isDataDeleted"
                inputId="deleteData"
                name="delete_data"
              />
              <label for="deleteData" class="p-2"> Delete all my data </label>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useUserDataStore } from '@/stores/userdata';
import { useConfigStore } from '@/stores/config';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";
import { Button } from 'primevue';
import Checkbox from 'primevue/checkbox';

const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);

const userDataStore = useUserDataStore();

const authStore = useAuthStore();

onMounted(async () => {
    await userDataStore.fetchUserData();
});

const userFields = [
  { label: 'User Email', key: 'userEmail' },
  { label: 'User Name', key: 'userName' },
  { label: 'User ID', key: 'userId' },
  {
    label: 'Full Name', custom: () => {
        const fullName = `${userDataStore.givenName ?? ''} ${userDataStore.familyName ?? ''}`.trim();
        return fullName;
    }
  },
  { label: 'Locale', key: 'locale' },
];

const router = useRouter();

const isDataDeleted = ref(false)

async function deleteAccount() {
    const deleteAccountUrl = `${backendUrl.value}/user/account/delete`;

    try {
        const response = await axios.delete(deleteAccountUrl, {
            data: {
                delete_user_data: isDataDeleted.value,  // Make sure you're accessing `.value` from `ref`
            },
            withCredentials: true
        });

        console.log("Account deleted successfully!", response.data)

        authStore.logout(router)

    } catch (error) {
        console.error("failed to delete account: ", error)
    }
}

</script>
