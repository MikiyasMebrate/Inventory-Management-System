<template>
    <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
            <fwb-input v-model="model._id" type="hidden" />
        </div>

        <div class="col-span-2">
            <fwb-input v-model="model.name" label="Name" placeholder="Product name" size="lg" />
        </div>

        <div class="col-span-1">
            <fwb-input v-model="model.price" type="number" step="0.1" min="1" label="Price" placeholder="Product price"
                size="lg" />
        </div>

        <div class="col-span-1">
            <fwb-input v-model="model.quantity" label="Quantity" min="1" placeholder="Product quantity" size="lg" />
        </div>

        <div class="col-span-2">
            <fwb-select v-model="selected" :options="category.getCategoryOptions" label="Select category" />
        </div>


        <div class="col-span-2">
            <fwb-textarea v-model="model.description" :rows="10" label="Description" placeholder="Write Description..." />
        </div>



    </div>
</template>

<script setup>
import { useCategoryStore } from '@/store/category';
import { FwbInput, FwbTextarea, FwbSelect } from 'flowbite-vue'

const category = useCategoryStore()
const model = defineModel({ required: true })
</script>