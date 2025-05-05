<template>

<div class="w-full h-full p-4">
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-xl flex items-center justify-around w-full">
        <Background class="hidden sm:flex" :isSpinning="sidebarVisible" />
        <DropZone @files-dropped="addFilesAndShowSidebar" />
        <Background class="hidden sm:flex" :isSpinning="sidebarVisible" />
      </div>
    </div>

    <SidebarToggle :isvisible="sidebarVisible" @toggle="toggleSidebar" />
    <Sidebar :isvisible="sidebarVisible" :files="files" @toggle="toggleSidebar" />
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useFileList } from '@/compositions/file-list';
import Background from '@/components/layout/Background.vue';
import DropZone from '@/components/upload/DropZone.vue';
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import SidebarToggle from '@/components/upload/SidebarToggle.vue';
import Sidebar from '@/components/upload/Sidebar.vue';
import fileUploadService from '@/services/fileupload';

const { files, addFiles } = useFileList();
// State for the sidebar visibility
const sidebarVisible = ref(false);

// This function will add files, upload them, and open the sidebar
const addFilesAndShowSidebar = (newFiles) => {
  addFiles(newFiles);
  sidebarVisible.value = true; // Show sidebar when files are added
};

// Toggle sidebar visibility
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

</script>
