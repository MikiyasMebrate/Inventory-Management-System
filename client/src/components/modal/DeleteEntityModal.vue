<template>
    <fwb-modal v-if="isShowModal" @close="emitClose"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

        <template #header>
            <div tabindex="-1" aria-hidden="true" class="flex items-center text-lg ">
                {{ title }}
            </div>
        </template>

        <template #body>
            <div class="mb-2" v-for="(value, key) in detail" :key="key">
                <div class="font-bold mb-2 capitalize">{{ key }}</div>
                <div>{{ value }}</div>
            </div>
        </template>
    </fwb-modal>
</template>


<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'


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