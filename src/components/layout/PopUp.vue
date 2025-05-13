<template>
    <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="show"
            class="fixed bottom-25 left-1/2 transform -translate-x-1/2 text-black px-6 py-3 rounded-lg shadow-lg z-50"
            :class="[
                type === 'error' ? 'bg-red-400' :
                type === 'info' ? 'bg-blue-400' :
                type === 'warning' ? 'bg-amber-300' :
                type === 'success' ? 'bg-green-400' :
                'bg-gray-600'
            ]"
        >
            {{ message }}
        </div>
    </transition>
</template>

<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
    message: String,
    type: { type: String, default: 'error' },
    show: Boolean,
    duration: { type: Number, default: 2000 }
});

const emit = defineEmits(['hide']);
const timer = ref(null);

watch(() => props.show, (val) => {
  if (val) {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      emit('hide')
    }, props.duration)
  }
});
</script>
