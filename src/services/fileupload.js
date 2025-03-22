import axios from 'axios';

// const backendEndpoint = import.meta.env.VITE_BACKEND_URL;
const backendEndpoint = window.CONFIG.BACKEND_ENDPOINT || '__BACKEND_ENDPOINT__';
console.log("backend config check: ", backendEndpoint);

const uploadFilesToBackend = async (files) => {
  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      console.log("Backend endpoint: ", backendEndpoint);

      const uploadUrl = `${backendEndpoint}/upload`;

      const response = await axios.post(uploadUrl, formData); // ✅ No headers override!

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
