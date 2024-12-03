<template>
    <Breadcrumb name="Category" />

    <section class="mt-10">
        <p class="my-10 text-3xl font-bold">List</p>


        <!--Add category button-->
        <div class="flex justify-end my-4">
            <Button @click="showAddModal" title="Add Category"></Button>
        </div>

        <!--Add Modal-->
        <AddEntityModal title="Add Category" :isShowAddModal="modalOptions.isShowAddModal" @close="closeAddModal"
            entityType="category" v-model="formData" />

        <!--Page length option -->
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <fwb-select v-model="pageLength" :options="lengths"></fwb-select>
            <fwb-input class="w-80" v-model="searchQuery" placeholder="enter your search query">
                <template #prefix>
                    <MagnifyingGlassIcon class="h-5 w-5" />
                </template>
            </fwb-input>
        </div>


    </section>
</template>


<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import AddEntityModal from '@/components/modal/AddEntityModal.vue';
import Button from '@/components/ui/Button.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

import { ref } from 'vue'
import { FwbSelect, FwbInput } from 'flowbite-vue'

const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal: false
})

const pageLength = ref(10)
const searchQuery = ref('')
const formData = ref({
    name: '',
    description: ''
})

const lengths = [
    { value: 10, name: 10 },
    { value: 25, name: 25 },
    { value: 50, name: 50 },
    { value: 100, name: 100 }
]


function closeAddModal() {
    modalOptions.value
        .isShowAddModal = false
}
function showAddModal() {
    modalOptions.value
        .isShowAddModal = true
}



</script>