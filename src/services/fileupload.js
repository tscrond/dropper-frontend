import axios from 'axios';

// const backendEndpoint = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env);

import { useConfigStore } from '@/stores/config';

const uploadFilesToBackend = async (files, onProgress = () => { }) => {
  const configStore = useConfigStore();
  const backendEndpoint = configStore.backendUrl;
  console.log("backend endpoint config check: ", backendEndpoint);
  
  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      console.log("Backend endpoint: ", backendEndpoint);

      const uploadUrl = `${backendEndpoint}/files/upload`;

      return axios.post(uploadUrl, formData, {
        withCredentials: true,
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      });

    }

    return 'All files uploaded successfully';
  } catch (error) {
    console.error('Error uploading files', error);
    throw new Error('File upload failed');
  }
};

export default {
  uploadFilesToBackend,
};
