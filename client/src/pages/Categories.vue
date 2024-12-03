<template>
    <Breadcrumb name="Category" />

    <section class="mt-10">
        <p class="my-10 text-3xl font-bold">List</p>


        <!--Add category button-->
        <div class="flex justify-end my-4">
            <Button @click="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" title="Add Category"></Button>
        </div>

        <!--Add Modal-->
        <AddEntityModal title="Add Category" :isShowAddModal="modalOptions.isShowAddModal"
            @close="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" entityType="category" v-model="formData" />

        <!--Detail Modal-->
        <DetailEntityModal title="Category detail" :detail="selected" :isShowModal="modalOptions.isShowDetailModal"
            @close="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal)" />

        <!--Page length option -->
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <fwb-select class="w-20" v-model="pageLength" :options="lengths"></fwb-select>
            <fwb-input class="w-full md:w-80" v-model="searchQuery" placeholder="enter your search query">
                <template #prefix>
                    <MagnifyingGlassIcon class="h-5 w-5" />
                </template>
            </fwb-input>
        </div>

        <!--Table-->

        <fwb-table hoverable>
            <fwb-table-head>
                <fwb-table-head-cell>#</fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Name</p>
                        <ArrowsUpDownIcon class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Products</p>
                        <ArrowsUpDownIcon class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <span class="sr-only">Edit</span>
                </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>

                <fwb-table-row v-for="i in 10">
                    <fwb-table-cell>{{ i }}</fwb-table-cell>
                    <fwb-table-cell>Apple MacBook Pro 17</fwb-table-cell>
                    <fwb-table-cell>99</fwb-table-cell>
                    <fwb-table-cell>
                        <div class="flex ">
                            <EyeIcon @click="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal)"
                                class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            <PencilSquareIcon class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            <TrashIcon class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </div>
                    </fwb-table-cell>
                </fwb-table-row>


            </fwb-table-body>
        </fwb-table>



    </section>
</template>


<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import AddEntityModal from '@/components/modal/AddEntityModal.vue';
import DetailEntityModal from '@/components/modal/DetailEntityModal.vue';
import Button from '@/components/ui/Button.vue';
import { MagnifyingGlassIcon, ArrowsUpDownIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/vue/24/solid'

import { ref } from 'vue'
import {
    FwbSelect, FwbInput,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
} from 'flowbite-vue'

const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal: false,
    isShowDetailModal: false,
    isShowDeleteModal: false,
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


const toggleModal = (modelName, state) => {
    modalOptions.value[modelName] = state
}

const selected = {
    name: 'Apple MacBook Pro 17',
    description: 'Electronics is a scientific and engineering discipline that studies and applies the principles of physics to design, create, and operate devices.'
}

</script>