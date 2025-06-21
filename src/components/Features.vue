<template>
  <div class="p-6 max-w-5xl mx-auto">
    <Card class="mb-5">
      <template #title>
        <div class="text-3xl font-bold text-center">Welcome to Dropper</div>
      </template>
      <template #content>
        <p class="text-lg text-center mb-4">
          Dropper is your secure and convenient tool for storing, managing, and sharing files in the cloud.
        </p>
      </template>
    </Card>

    <div class="grid md:grid-cols-2 gap-4">
      <FeatureItem
        icon="pi pi-cloud-upload"
        title="Upload to Cloud Storage"
        description="Seamlessly upload your files to cloud storage and keep them safe, accessible, and organized."
      />
      <FeatureItem
        icon="pi pi-info-circle"
        title="File Metadata Viewer"
        description="View detailed metadata for each uploaded or received file to better understand and manage your data."
      />
      <FeatureItem
        icon="pi pi-share-alt"
        title="File Sharing"
        description="Send files via email or generate private and public shareable links to easily collaborate with others."
      />
      <FeatureItem
        icon="pi pi-eye"
        title="File Preview"
        description="Preview images, videos, audio files, and PDFs directly in your browser — no downloads needed."
      />
      <FeatureItem
        icon="pi pi-file"
        title="Notes on Files"
        description="Attach notes to your files for better organization and contextual tracking."
      />
      <!-- <FeatureItem
        icon="pi pi-at"
        title="Chat"
        description="Chat with others and comment files to collaborate witho others more efficiently"
      /> -->
    </div>
  </div>
</template>

<script setup>
import { Card } from 'primevue';
import FeatureItem from '@/components/features/FeatureItem.vue';
</script>
