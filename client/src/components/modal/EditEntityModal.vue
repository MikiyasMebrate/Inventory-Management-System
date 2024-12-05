<template>
  <form @submit.prevent="emitSubmit" class="p-4 md:p-5">
    <fwb-modal v-if="isShowEditModal" @close="emitClose"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

      <template #header>
        <div tabindex="-1" aria-hidden="true" class="flex items-center text-lg ">
          {{ title }}
        </div>
      </template>

      <template #body>
        <CategoryForm v-if="entityType === 'category'" v-model="model" />
        <AddProductForm v-if="entityType === 'product'" v-model="model" />

      </template>
      <template #footer>
        <div class="flex justify-end">
          <fwb-button @click="closeModal" color="blue">
            Submit
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </form>
</template>


<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'
import CategoryForm from '@/components/forms/CategoryForm.vue'
import AddProductForm from '../forms/AddProductForm.vue';


// const { isShowEditModal, entityType, title } = defineProps(['isShowEditModal', 'entityType', 'title'])

const emit = defineEmits(['close', 'submit']);

const props = defineProps({
  title: String,
  isShowEditModal: Boolean,
  entityType: String,
});

const model = defineModel({ required: true }) //form data

function emitClose() {
  emit('close');
}
function emitSubmit() {
  emit('submit')
}


</script>