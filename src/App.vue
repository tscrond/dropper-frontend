<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from "vue";
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <Navbar  />
    <main class="flex-grow flex items-center justify-center">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
* {
  font-family: 'Atma';
}
</style>

