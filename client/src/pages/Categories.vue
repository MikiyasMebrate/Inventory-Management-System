<template>
    <Breadcrumb name="Category" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">List</p>

        <!--Add category button-->
        <div class="flex justify-end my-3">
            <Button @click="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" title="Add Category"></Button>
        </div>

        <!--Page length option -->
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <fwb-select class="w-20" v-model="pageLength" :options="lengths"></fwb-select>
            <fwb-input class="w-full md:w-80" v-model="searchQuery.query" placeholder="enter your search query">
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
                <template v-if="!category.isLoading">
                    <fwb-table-row v-for="(item, index) in data" :key="item.id">
                        <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.productCount }}</fwb-table-cell>
                        <fwb-table-cell>
                            <div class="flex ">
                                <!--Detail-->
                                <EyeIcon @click="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal)"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Edit-->
                                <PencilSquareIcon @click="toggleModal('isShowEditModal', !modalOptions.isShowDetailModal)"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Delete-->
                                <TrashIcon @click="toggleModal('isShowDeleteModal', !modalOptions.isShowDeleteModal)"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </div>
                        </fwb-table-cell>
                    </fwb-table-row>
                </template>


            </fwb-table-body>
        </fwb-table>

        <!--Pagination-->
        <div class="flex items-end justify-end mt-5">
            <fwb-pagination v-model="pagination" :total-pages="100" show-icons :large="true"></fwb-pagination>
        </div>


        <!--Modals-->
        <!--Add Modal-->
        <AddEntityModal title="Add Category" :isLoading="category.isLoading" :formError="category.error"
            :isShowAddModal="modalOptions.isShowAddModal" @submit="onSubmit"
            @close="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" entityType="category" v-model="formData" />
        <!--Detail Modal-->
        <DetailEntityModal title="Category detail" :detail="selected" :isShowModal="modalOptions.isShowDetailModal"
            @close="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal)" />
        <!--Edit Modal-->
        <EditEntityModal title="Edit Category" :isShowEditModal="modalOptions.isShowEditModal"
            @close="toggleModal('isShowEditModal', !modalOptions.isShowEditModal)" entityType="category"
            v-model="formData" />
        <DeleteEntityModal title="Delete Category" :detail="selected" :isShowModal="modalOptions.isShowDeleteModal"
            @close="toggleModal('isShowDeleteModal', !modalOptions.isShowDeleteModal)" />


    </section>
</template>


<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import AddEntityModal from '@/components/modal/AddEntityModal.vue';
import DetailEntityModal from '@/components/modal/DetailEntityModal.vue';
import EditEntityModal from '@/components/modal/EditEntityModal.vue';
import DeleteEntityModal from '@/components/modal/DeleteEntityModal.vue';
import Button from '@/components/ui/Button.vue';
import { MagnifyingGlassIcon, ArrowsUpDownIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted, watch, reactive } from 'vue'
import { useCategoryStore } from '@/store/category';
import {
    FwbSelect, FwbInput,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbPagination
} from 'flowbite-vue'

const data = ref([]) //categories data
const pageLength = ref(10)
const searchQuery = reactive({
    query: ''
})

const pagination = ref(1)
const formData = ref({
    name: '',
    description: ''
})


const category = useCategoryStore()
onMounted(async () => {
    await category.fetchCategories()
    getFilteredItem('')
})


const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal: false,
    isShowDetailModal: false,
    isShowDeleteModal: false,
})


watch(() => searchQuery.query, (query) => {
    getFilteredItem(query || null)
}
)

const getFilteredItem = (query) => {
    if (!query) {
        data.value = category.filterCategories('')
        return
    }
    data.value = category.filterCategories(query)
}

const lengths = [
    { value: 10, name: 10 },
    { value: 25, name: 25 },
    { value: 50, name: 50 },
    { value: 100, name: 100 }
]


/**
 * Toggle the state of a modal.
 *
 * @param {string} modelName - The name of the model to toggle.
 * @param {boolean} state - The state to toggle to.
 */
const toggleModal = (modelName, state) => {
    modalOptions.value[modelName] = state
}

const selected = {
    name: 'Apple MacBook Pro 17',
    description: 'Electronics is a scientific and engineering discipline that studies and applies the principles of physics to design, create, and operate devices.'
}



const onSubmit = async () => {
    let response = await category.addCategory(formData.value)

    if (response) {
        formData.value.name = ''
        formData.value.description = ''
        modalOptions.value.isShowAddModal = false
    }

};


</script>