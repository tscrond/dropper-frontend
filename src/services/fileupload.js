import axios from 'axios';

// const backendEndpoint = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env);

let backendEndpoint = '';

if (import.meta.env.DEV) {
  backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT
} else {
  backendEndpoint = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
}

console.log("backend endpoint config check: ", backendEndpoint);

const uploadFilesToBackend = async (files, onProgress = () => {}) => {
  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      console.log("Backend endpoint: ", backendEndpoint);

      const uploadUrl = `${backendEndpoint}/upload`;

      return axios.post(uploadUrl, formData, {
        withCredentials: true,
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      });

      console.log(`File uploaded successfully: ${file.name}`, response.data);
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
