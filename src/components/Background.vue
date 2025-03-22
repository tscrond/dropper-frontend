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
@keyframes spin-y {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

.flower-spin {
  animation: spin-y 5s linear infinite;
  transform-style: preserve-3d;
  will-change: transform;
}

.relative {
  position: relative;
  perspective: 1000px; /* Adding perspective directly here */
}
</style>
  