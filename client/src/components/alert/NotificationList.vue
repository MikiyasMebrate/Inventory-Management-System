<template>
    <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                    <span class="capitalize">{{ firstName }} {{ lastName }}</span>

                    <span class="ms-3">{{ date }}</span>
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ message }}
                </p>
            </div>
        </div>
    </li>
</template>

<script setup>

const { firstName, lastName, date, message } = defineProps(['firstName', 'lastName', 'date', 'message'])
</script>