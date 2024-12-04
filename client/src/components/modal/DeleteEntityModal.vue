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

                <fwb-input v-model="model._id" type="hidden" />

                Are you sure you want to delete <span class="font-bold">{{ model.name }}</span> ?
            </template>
            <template #footer>
                <div class="flex justify-end gap-x-4">
                    <fwb-button @click="emitClose" color="alternative">
                        Decline
                    </fwb-button>
                    <fwb-button type="submit" color="red">
                        Delete
                    </fwb-button>
                </div>
            </template>
        </fwb-modal>
    </form>
</template>


<script setup>
import { FwbModal, FwbInput, FwbButton } from 'flowbite-vue'


const emit = defineEmits(['close', 'submit']);
const model = defineModel({ required: true })

const props = defineProps({
    title: String,
    isShowModal: Boolean,
    entityType: String,
});

function emitSubmit() {
    emit('submit')
}




function emitClose() {
    emit('close');
}

</script>