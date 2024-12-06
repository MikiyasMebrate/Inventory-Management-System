<template>
    <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex-1 min-w-0">
                <p class="text-sm capitalize font-semibold text-gray-900 truncate dark:text-white">
                    {{ firstName }} {{ lastName }}
                    <span>{{ date }}</span>
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ message }}
                </p>
            </div>
            <span v-if="!isRead"
                class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                new
            </span>
        </div>
    </li>
</template>

<script setup>

const { firstName, lastName, date, message, isRead } = defineProps(['firstName', 'lastName', 'date', 'message', 'isRead'])
</script>