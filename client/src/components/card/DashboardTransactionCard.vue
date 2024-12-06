<template>
    <img class="w-1/2" :src="image" :alt="title">
    <p class="text-gray-400">{{ title }}</p>
    <h1 class="text-4xl  font-bold">{{ count }}</h1>
</template>

<script setup>
const { title, image, count } = defineProps(['title', 'image', 'count'])
</script>