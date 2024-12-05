<template>
    <Breadcrumb name="Product" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">List</p>

        <!--Message-->
        <div class="w-full md:w-1/2 ">
            <Alert @close="clearMessage" v-if="message" :title="message" type="success" />
        </div>

        <!--Product Button-->
        <div class="flex justify-end my-3">
            <Button @click="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" title="Add Product"></Button>
        </div>


        <!--Table-->
        <fwb-table hoverable>
            <fwb-table-head>
                <fwb-table-head-cell>#</fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Name</p>
                        <ArrowsUpDownIcon @click="handleOnSort('name')" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Category</p>
                        <ArrowsUpDownIcon @click="handleOnSort('productCount')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Quantity</p>
                        <ArrowsUpDownIcon @click="handleOnSort('productCount')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Price</p>
                        <ArrowsUpDownIcon @click="handleOnSort('productCount')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Date</p>
                        <ArrowsUpDownIcon @click="handleOnSort('productCount')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <span class="sr-only">Edit</span>
                </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>
                <template v-if="!product.isLoading">
                    <fwb-table-row v-for="(item, index) in data" :key="item._id">
                        <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>

                        <fwb-table-cell>
                            <div class="flex ">
                                <!--Detail-->
                                <EyeIcon
                                    @click="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal, item._id, 'detail')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Edit-->
                                <PencilSquareIcon
                                    @click="toggleModal('isShowEditModal', !modalOptions.isShowDetailModal, item._id, 'edit')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Delete-->
                                <TrashIcon
                                    @click="toggleModal('isShowDeleteModal', !modalOptions.isShowDeleteModal, item._id, 'delete')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </div>
                        </fwb-table-cell>
                    </fwb-table-row>
                </template>


            </fwb-table-body>
        </fwb-table>

    </section>

    <!--Modal lists-->
    <!--Add Modal-->
    <AddEntityModal title="Add Product" :isShowAddModal="modalOptions.isShowAddModal" @submit="onSubmit('post')"
        @close="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" entityType="product" v-model="formData" />
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import Alert from '@/components/ui/Alert.vue';
import Button from '@/components/ui/Button.vue';
import AddEntityModal from '@/components/modal/AddEntityModal.vue';
import { ref } from 'vue';
import { useProductStore } from '@/store/product';
import { onMounted } from 'vue';
import { MagnifyingGlassIcon, ArrowsUpDownIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/vue/24/solid'
import {
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbPagination
} from 'flowbite-vue'

//product store
const product = useProductStore()
onMounted(async () => {
    await product.fetchProducts()
    getFilteredItem('')
})



const message = ref('')
const data = ref([]) //products data
const formData = ref({
    name: '',
    description: '',
    _id: ''
})

//control modal hide and show
const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal: false,
    isShowDetailModal: false,
    isShowDeleteModal: false,
})

/**
 * Clear the message.
 * This function is called when the user clicks on the close button on the alert message.
 */
const clearMessage = () => {
    message.value = ''
}

//control modal 
const toggleModal = (modelName, state, id = null, operation) => {
    modalOptions.value[modelName] = state
}

const onSubmit = async (type) => {
};

const getFilteredItem = (query) => {
    if (!query) {
        data.value = product.filterProduct('')
        return
    }
    data.value = product.filterProduct(query)
}

</script>