<template>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center ps-3">
            <input v-model="model" :id="model" type="checkbox" value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label :for="model" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                label }}</label>
        </div>
    </li>
</template>

<script setup>
const { label } = defineProps(['label'])
const model = defineModel({ required: true })
</script>