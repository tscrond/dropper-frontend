import { ref } from 'vue';

const files = ref([]);

function addFiles(newFiles) {
    let newUploadableFiles = [...newFiles]
        .map((file) => new UploadableFile(file))
        .filter((file) => !fileExists(file.id));

    files.value = [...files.value, ...newUploadableFiles];
}

function fileExists(otherId) {
    return files.value.some(({ id }) => id === otherId);
}

function removeFile(file) {
    const index = files.value.findIndex(f => f.id === file.id);
    if (index > -1) {
        file.url && URL.revokeObjectURL(file.url);
        files.value.splice(index, 1);
    }
}

class UploadableFile {
    constructor(file) {
        this.file = file;
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
        this.url = URL.createObjectURL(file);
        this.status = null;
    }
}

export const useFileList = () => {
    return { files, addFiles, removeFile };
};
