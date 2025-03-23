<template>

  <footer class="h-1/7 w-full flex items-center justify-between">

    <div class="w-1/3 flex justify-start items-center">
        <Github class="scale-25 sm:scale-30"></Github>
        <Linkedin class="scale-25 sm:scale-40"></Linkedin>
        <Web class="scale-25 sm:scale-40"></Web>
    </div>

    <div class="hidden sm:flex w-1/3 justify-center">
        <p class="sm:text-xl">© Bobak Labs™. All Rights Reserved.</p>
    </div>

    <div class="w-1/3 flex justify-end">
          <Bobak class="scale-25 sm:scale-40"></Bobak>
    </div>

  </footer>
</template>

<script setup>
import Github from './icons/Github.vue';
import Linkedin from './icons/Linkedin.vue';
import Web from './icons/Web.vue';
import Bobak from './icons/Bobak.vue';
</script>

<style>
#svgs {
  vertical-align: middle;
}
</style>
