<template>

    <!-- Navbar -->
    <!-- <Navbar/> -->

    <!-- Main Content Area -->
    <div class="flex-1 p-4">
       <div class="text-xl flex items-center justify-around h-full">
        <Background class="hidden sm:flex" :isSpinning="sidebarVisible" />
        <Background class="hidden sm:flex" :isSpinning="sidebarVisible" />
        <DropZone @files-dropped="addFilesAndShowSidebar"></DropZone>
        <Background class="hidden sm:flex" :isSpinning="sidebarVisible" />
        <Background class="hidden sm:flex" :isSpinning="sidebarVisible" />
      </div>
    </div>

    <!-- Footer -->
    <!-- <Footer></Footer> -->

    <!-- Sidebar -->
    <SidebarToggle :isvisible="sidebarVisible" @toggle="toggleSidebar"></SidebarToggle>
    <Sidebar :isvisible="sidebarVisible" :files="files" @toggle="toggleSidebar"></Sidebar>
    

</template>

<script setup>
import { ref } from 'vue';
import { useFileList } from '@/compositions/file-list';
import Background from '@/components/Background.vue';
import DropZone from './DropZone.vue';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import SidebarToggle from './SidebarToggle.vue';
import Sidebar from './Sidebar.vue';
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
