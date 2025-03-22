import axios from 'axios';

const backendEndpoint = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env);
console.log("kurwa",backendEndpoint);

const uploadFilesToBackend = async (files) => {
  try {
    for (const file of files) {
      // Create FormData for each file and send it in a separate POST request
      const formData = new FormData();
      formData.append('file', file); // Append each file to the formData

      console.log("Backend endpoint: ",backendEndpoint);
      
      let uploadUrl = `${backendEndpoint}/upload`

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
