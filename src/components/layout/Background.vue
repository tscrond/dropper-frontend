<template>
  <Flower
    class="flower-spin w-[500px] h-[500px] opacity-20 ml-[-100px] mt-[-100px]"
    :style="{
      animationPlayState: isSpinning ? 'running' : 'paused',
      transition: isSpinning ? '' : 'transform 1s ease-out'
    }"
  />
</template>

<script setup>
import Flower from '@/components/icons/Flower.vue';
import { defineProps } from 'vue';

const props = defineProps({
  isSpinning: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
@keyframes spin-z {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.flower-spin {
  animation: spin-z 5s linear infinite;
  will-change: transform;
}
</style>
