<template>
    <fwb-modal v-if="isShowModal" @close="emitClose"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

        <template #header>
            <div tabindex="-1" aria-hidden="true" class="flex items-center text-lg ">
                {{ title }}
            </div>
        </template>

        <template #body>
            <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-1">
                    <label>Name</label>
                    <p class="text-gray-500">{{ detail.name }}</p>
                </div>

                <div class="col-span-1">
                    <label>Available Quantity</label>
                    <p class="text-gray-500">{{ detail.quantityInStock || 0 }}</p>
                </div>

                <div class="col-span-1">
                    <img class="md:w-56" :src="detail.images[0]" alt="">
                </div>

                <div class="col-span-1">
                    <fwb-input v-model="model.quantity" type="number" label="Quantity" min="1"
                        placeholder="Product quantity" size="lg" />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <fwb-button @click="closeModal" color="blue">
                    Submit
                </fwb-button>
            </div>
        </template>
    </fwb-modal>
</template>


<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'
import { FwbInput, FwbTextarea, FwbSelect } from 'flowbite-vue'

const model = defineModel({ required: true })

const emit = defineEmits(['close']);

const props = defineProps({
    title: String,
    isShowModal: Boolean,
    entityType: String,
    detail: Object
});




function emitClose() {
    emit('close');
}

</script>