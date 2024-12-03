<template>
    <Breadcrumb name="Category" />

     <section class="mt-10">
        <p class="my-10 text-3xl font-bold">List</p>

        <div class="flex justify-end my-4">
            <Button @click="showAddModal" title="Add Category" ></Button>    
        </div>

        <CategoryAddModal :isShowAddModal="modalOptions.isShowAddModal" @close="closeAddModal"/>

        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <fwb-select v-model="pageLength"  :options="lengths" ></fwb-select>
        </div>

    

    
     </section>
</template>


<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import CategoryAddModal from '@/components/CategoryAddModal.vue';
import Button from '@/components/ui/Button.vue';

import { ref } from 'vue'
import { FwbSelect } from 'flowbite-vue'

const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal : false
})

const pageLength = ref(10)


const lengths = [
    { value: 10, name: 10 },
    { value: 25, name: 25 },
    { value: 50, name: 50 },
    { value: 100, name:100}
]


function closeAddModal () {
  modalOptions.value.isShowAddModal = false
}
function showAddModal () {
  modalOptions.value.isShowAddModal = true
}



</script>