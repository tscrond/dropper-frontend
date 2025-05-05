<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from "vue";
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';

</script>

<template>
  <div class="h-screen flex flex-col">
    <Navbar  />
    <main class="flex-grow overflow-y-auto overflow-x-hidden">
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

