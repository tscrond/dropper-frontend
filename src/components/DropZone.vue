<template>
    <div :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop">
        <div class="p-28 border-4 border-dashed rounded-lg"
                :class="active ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50'">
                <p v-if="active">Drop files here...</p>
                <p v-else>Drag & drop files here or click to upload</p>
        </div>
    </div>
</template>
    
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['files-dropped']);

let active = ref(false);
let inActiveTimeout = null;

function setActive() {
    active.value = true;
    clearTimeout(inActiveTimeout);
}

function setInactive() {
    inActiveTimeout = setTimeout(() => {
        active.value = false
    }, 50);
}

function onDrop(e) {
    setInactive();
    const droppedFiles = [...e.dataTransfer.files];
    console.log("🔥 DropZone received files:", droppedFiles);  // ✅ Check this
    emit('files-dropped', droppedFiles);
}

function preventDefaults(e) {
    e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    });
});

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>
