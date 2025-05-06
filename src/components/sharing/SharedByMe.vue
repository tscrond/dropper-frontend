<template>
    <table class="divide-y divide-neutral-700 min-w-full table-auto">
        <thead>
        <tr>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">File Name</th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">Content Type</th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">MD5 Checksum</th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 md:table-cell">Shared For</th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 md:table-cell">Expires At</th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 hidden md:table-cell">Status</th>
            <!-- <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Download link</th> -->
        </tr>
        </thead>
        <tbody v-for="(object, i) in sharedObjectsList" :key="object.name"class="divide-y divide-neutral-700 overflow-scroll">
            <tr>
                <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm font-medium">{{ object.file_name }}</td>
                <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ object.file_type }}</td>
                <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell">{{ object.md5_checksum }}</td>
                <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm md:table-cell">{{ object.shared_for }}</td>
                <td class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm md:table-cell">{{ formatDateToShortString(object.expires_at) }}</td>
                <td 
                    class="text-center px-2 py-2 sm:px-6 sm:py-4 break-all whitespace-normal max-w-[40px] max-h-[30px] sm:max-w-full sm:max-h-[100px] text-sm hidden md:table-cell" 
                    :class="[isExpired(object.expires_at) ? 'text-red-500' : 'text-green-500']"
                >
                    {{ isExpired(object.expires_at) ? "Expired" : "Active" }}
                </td>
            </tr>
        </tbody>
    </table>
    </template>
    
    <script setup>
    import { useConfigStore } from '@/stores/config';
    import { storeToRefs } from 'pinia';
    import { formatDateToShortString, isExpired } from '@/utils/helpers';
    
    const configStore = useConfigStore();
    const { backendUrl } = storeToRefs(configStore);
    
    defineProps({
        sharedObjectsList: {
            type: Array,
            required: true,
        }
    })
    
    </script>
    