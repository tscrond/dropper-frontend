<template>
  <div class="flex justify-center p-4">
    <div class="flex flex-col items-center text-center justify-around text-xl w-64 h-64 border-4 border-dotted rounded-lg sm:w-128">
      <p class="text-3xl">Log in to Dropper</p>
      <div class="flex flex-col justify-around text-sm sm:w-full">
        <p>Use your Google Account to log in.</p>
        <p>Dropper uses an OAuth2 flow to identify users within the service.</p>
        <button @click="openModal" class="underline decoration-wavy hover:decoration-sky-500 hover:text-[21px] text-xl transition-all cursor-pointer">
          We don't store your credentials!
        </button>
        <PrivacyModal :isOpen="showModal" title="Privacy" @close="closeModal">
          <!-- <div class="space-y-2"> -->
          <div class="flex flex-col m-4 p-4">
            <!-- Make the trigger a peer and place it in its own block -->
            <span>
              After logging You in, we only store
              <span class="text-xl inline">*</span>
              <span class="peer hover:decoration-green-500 hover:cursor-pointer hover:text-xl underline decoration-2 transition-all duration-300">
                just enough information
              </span>
              that lets you use Dropper and be identified within the scope of the application.
              <p>We use Google's official OAuth2 login flow, meaning your credentials never touch our servers — everything is handled securely through Google.</p>
              <p>So no worries about password leaks! 😉</p>

              <p class="text-blue-600 text-sm my-4">
                <a href="https://auth0.com/intro-to-iam/what-is-oauth-2">Learn more about OAuth2</a>
              </p>

              <!-- This element reacts to hover on the peer -->
              <p class="text-[12px] text-right transition-all duration-300 peer-hover:text-[18px] peer-hover:text-green-500 my-4">
                <span class="text-xl inline">*</span>
                Your Google User ID, Google Username, and Email Address
              </p>
            </span>
          </div>
        <!-- </div> -->
        </PrivacyModal>
      </div>
      <form :action="`${backendUrl}/auth/oauth`" method="get">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-400 transition">
          Sign in with Google
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import PrivacyModal from '@/components/PrivacyModal.vue';
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';

const configStore = useConfigStore();
const { backendUrl } = storeToRefs(configStore);

const showModal = ref(false);

const openModal = () => {
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
}
</script>
