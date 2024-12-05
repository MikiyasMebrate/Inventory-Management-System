<template>
    <form @submit.prevent="emitSubmit">
        <fwb-modal v-if="isShowModal" @close="emitClose"
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

            <template #header>
                <div tabindex="-1" aria-hidden="true" class="flex items-center text-lg ">
                    {{ title }}
                </div>
            </template>

            <template #body>
                <fwb-alert class="text-center mb-5" v-if="formError" type="danger">
                    {{ formError }}
                </fwb-alert>

                <div v-if="title == 'Sale Product'" class="grid gap-4 mb-4 grid-cols-2">
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
                        Sale
                    </fwb-button>
                </div>
            </template>
        </fwb-modal>
    </form>
</template>


<script setup>
import { FwbInput, FwbAlert, FwbButton, FwbModal } from 'flowbite-vue'

const model = defineModel({ required: true })

const emit = defineEmits(['close', 'submit']);

const props = defineProps({
    title: String,
    isShowModal: Boolean,
    entityType: String,
    detail: Object,
    isLoading: Boolean,
    formError: Object
});

function emitClose() {
    emit('close');
}
function emitSubmit() {
    emit('submit')
}

</script>