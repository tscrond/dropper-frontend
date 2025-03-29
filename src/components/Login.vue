<template>
    <div class="h-screen flex flex-col">
        <Navbar></Navbar>

        <div class="flex-1 flex p-4 items-center justify-center">
            <div class="flex flex-col items-center text-center justify-around text-xl w-64 h-64 border-4 border-dotted rounded-lg sm:w-96 sm:h-64">
                <p>Log in to Dropper</p>
                <div class="text-sm sm:w-64">
                    <p>Use your Google Account to log in.</p>
                    <p>Dropper uses a OAuth2 flow to identify users within the service.</p>
                    <button @click="openModal" class="text-lg transition-all cursor-pointer hover:text-teal-600">
                        We don't store your credentials!
                    </button>
                    <PrivacyModal :isOpen="showModal" title="Privacy" @close="closeModal">
                        <p>To identify you, we only store active/valid OAuth2 Tokens that contain only the necessary information (ex. your service ID, user name) to get you started and let you use the service!</p>
                        <p class="text-blue-600 text-sm"><a href="https://auth0.com/intro-to-iam/what-is-oauth-2">Learn more about OAuth2</a></p>
                    </PrivacyModal>
                </div>
                <form :action="`${backendUrl}/auth/oauth`" method="get">
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-400 transition">
                    Sign in with Google
                    </button>
                </form>
            </div>
        </div>        

        <Footer></Footer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import PrivacyModal from '@/components/PrivacyModal.vue';

const backendUrl = ref('');

if (import.meta.env.DEV) {
    backendUrl.value = import.meta.env.VITE_BACKEND_ENDPOINT || '';
} else {
    backendUrl.value = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
}

const showModal = ref(false);

const openModal = () => {
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
}
</script>
