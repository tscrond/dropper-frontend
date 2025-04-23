<template>
    <div class="flex flex-col items-center justify-center py-4">

        <hr class="w-full border-1">

        <div class="flex flex-row w-full justify-evenly m-1 p-1">
            <div class="flex justify-center items-center w-full h-16 sm:h-16"> 
                <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 transition-all duration-300">
                    <a href="/">
                        <h1 class="text-2xl sm:text-4xl">Dropper</h1>
                    </a>
                </button>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <form :action="`${backendUrl}/auth/oauth`">
                    <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300">Log in</button>
                </form>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300">
                    <a href="https://github.com/bobak-labs">About</a>
                </button>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300">
                    <a href="https://github.com/bobak-labs">Tech</a>
                </button>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300">
                    <a href="https://github.com/bobak-labs">Functionality</a>
                </button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center justify-center w-full">
                <button @click="logout" class="text-lg sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300">Log out</button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center justify-center w-full">
                <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300"><a href="/bucket">My Bucket</a></button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center justify-center w-full">
                <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300"><a href="/">Upload</a></button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center justify-center w-full">
                <button class="text-[15px] sm:text-xl cursor-pointer hover:text-blue-400 hover:text-2xl transition-all duration-300"><a href="/">Share</a></button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex justify-center w-full">
                <button class="w-full text-[15px] sm:text-xl cursor-pointer hover:text-blue-400">
                    <a class="flex flex-col justify-center items-center" href="/profile">
                        <div>
                            <img :src="userDataStore.profPicture" alt="Circular Image" class="w-8 h-8 sm:w-12 sm:h-12 rounded-full">
                        </div>
                        <div class="font-bold text-[10px] sm:text-xl hover:text-2xl transition-all duration-300">
                            Hi {{ userDataStore.givenName }}!
                        </div>
                    </a>
                </button>
            </div>
        </div>
        <hr class="w-full border-1">
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";
import { useUserDataStore } from "@/stores/userdata";
import { useConfigStore } from "@/stores/config";
import { storeToRefs } from 'pinia';

const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);

const router = useRouter();
const authStore = useAuthStore();
const userDataStore = useUserDataStore();

onMounted(async () => {
    await authStore.checkAuth();
    await userDataStore.fetchUserData();
});

const logout = () => {
    authStore.logout(router);
};
</script>
