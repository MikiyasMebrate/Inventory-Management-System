<template>
    <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
            <fwb-input v-model="model._id" type="hidden" />
        </div>


        <div class="col-span-2">
            <fwb-input v-model="model.name" label="Name" placeholder="Category name" size="lg" />
        </div>

        <div class="col-span-2">
            <fwb-textarea v-model="model.description" :rows="10" label="Description" placeholder="Write Description..." />
        </div>
    </div>
</template>

<script setup>
import { FwbInput, FwbTextarea } from 'flowbite-vue'
const model = defineModel({ required: true })
</script>