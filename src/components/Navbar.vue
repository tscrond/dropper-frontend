<template>
    <div class="flex flex-col items-center justify-center py-4">

        <hr class="w-full border-1">

        <div class="flex flex-row w-full justify-evenly m-1 p-1">
            <div class="flex justify-center items-center w-full h-16 sm:h-16"> 
                <h1 class="text-2xl sm:text-4xl">Dropper</h1>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <form :action="`${backendUrl}/auth/oauth`">
                    <button class="text-lg sm:text-xl cursor-pointer hover:text-blue-400">Log in</button>
                </form>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <button class="text-lg sm:text-xl cursor-pointer hover:text-blue-400">
                    <a href="https://github.com/bobak-labs">About</a>
                </button>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <button class="text-lg sm:text-xl cursor-pointer hover:text-blue-400">
                    <a href="https://github.com/bobak-labs">Tech</a>
                </button>
            </div>

            <div v-if="!authStore.isAuthenticated "class="flex items-center justify-center w-full">
                <button class="text-lg sm:text-xl cursor-pointer hover:text-blue-400">
                    <a href="https://github.com/bobak-labs">Functionality</a>
                </button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center justify-center w-full">
                <button @click="logout" class="text-lg sm:text-xl cursor-pointer hover:text-blue-400">Log out</button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center justify-center w-full">
                <button class="text-lg sm:text-xl cursor-pointer hover:text-blue-400"><a href="/">Your Bucket</a></button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center justify-center w-full">
                <button class="text-lg sm:text-xl cursor-pointer hover:text-blue-400"><a href="/">Share Files</a></button>
            </div>

            <div v-if="authStore.isAuthenticated" class="flex justify-center w-full">
                <button class="w-full text-lg sm:text-xl cursor-pointer hover:text-blue-400">
                    <a class="flex flex-col justify-center items-center" href="/">
                        <div>
                            <img src="https://i.kym-cdn.com/photos/images/newsfeed/002/055/000/00a.jpg" alt="Circular Image" class="w-8 h-8 sm:w-12 sm:h-12 rounded-full">
                        </div>
                        <div class="font-bold text-[10px] sm:text-xl">
                            Profile
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

const backendUrl = ref('');

if (import.meta.env.DEV) {
    backendUrl.value = import.meta.env.VITE_BACKEND_ENDPOINT || '';
} else {
    backendUrl.value = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
}

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
    await authStore.checkAuth();
});

const logout = () => {
    authStore.logout(router);
};
</script>
