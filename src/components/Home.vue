<template>
  <div class="h-screen flex flex-col">

    <!-- Navbar -->
    <Navbar/>

    <!-- Main Content Area -->
    <div class="flex-1 p-4">
      <div class="text-xl flex items-center justify-center h-full">
        <DropZone @files-dropped="addFiles"></DropZone>
      </div>
    </div>

    <!-- Footer -->
    <Footer></Footer>

    <SidebarToggle :isvisible="sidebarVisible" @toggle="toggleSidebar"></SidebarToggle>
    <Sidebar :isvisible="sidebarVisible" :files="files" @toggle="toggleSidebar"></Sidebar>
    
  </div>
</template>

  
<script setup>
import { ref } from 'vue';
import DropZone from './DropZone.vue';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import SidebarToggle from './SidebarToggle.vue';
import Sidebar from './Sidebar.vue';
import useFileList from '@/compositions/file-list';

const { files, addFiles, removeFile } = useFileList();

const sidebarVisible = ref(false);
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>
