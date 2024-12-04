<template>
  <form @submit.prevent="emitSubmit" v-if="entityType == 'category'" class="p-4 md:p-5">
    <fwb-modal v-if="isShowAddModal" @close="emitClose"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

      <template #header>
        <div tabindex="-1" aria-hidden="true" class="flex items-center text-lg ">
          {{ title }}
        </div>
      </template>

      <template #body>

        <fwb-alert class="text-center" v-if="formError" type="danger">
          {{ formError }}
        </fwb-alert>


        <CategoryForm v-if="entityType === 'category'" v-model="model" />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <fwb-button @click="closeModal" color="blue" :disabled="isLoading" :loading="isLoading">
            {{ isLoading ? 'Submitting' : 'Submit' }}
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </form>
</template>


<script setup>
import { FwbButton, FwbModal, FwbAlert } from 'flowbite-vue'
import CategoryForm from '@/components/forms/CategoryForm.vue'


// const { isShowAddModal, entityType, title } = defineProps(['isShowAddModal', 'entityType', 'title'])

const emit = defineEmits(['close', 'submit']);

const props = defineProps({
  title: String,
  isShowAddModal: Boolean,
  entityType: String,
  isLoading: Boolean,
  formError: Object
});

const model = defineModel({ required: true }) //form data

function emitClose() {
  emit('close');
}

function emitSubmit() {
  emit('submit')
}

</script>