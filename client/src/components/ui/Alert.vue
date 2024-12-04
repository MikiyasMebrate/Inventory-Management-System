<template>
    <fwb-alert closable icon :type="type">
        {{ title }}
    </fwb-alert>
</template>

<script setup>
import { FwbAlert } from 'flowbite-vue'
const { title, type } = defineProps(['title', 'type'])
</script>