<template>
    <Breadcrumb name="Product" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">List</p>

        <!--Messages-->
        <div class="flex justify-center">
            <div class="w-full md:w-1/2 ">
                <Alert @close="clearMessage" v-if="message" :title="message" type="success" />
            </div>
        </div>


        <!--Product Button-->
        <div class="flex justify-end my-3">
            <Button @click="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" title="Add Product"></Button>
        </div>


        <!--Table-->
        <fwb-table hoverable>
            <fwb-table-head>
                <fwb-table-head-cell>#</fwb-table-head-cell>
                <fwb-table-head-cell></fwb-table-head-cell>
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
                    <span class="sr-only">Edit</span>
                </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>
                <template v-if="!product.isLoading">
                    <fwb-table-row v-for="(item, index) in data" :key="item._id">
                        <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                        <fwb-table-cell><img class="w-10" :src="item?.images[0]" alt="" srcset=""></fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>
                        <fwb-table-cell> <span><fwb-badge type="indigo">{{ item.category.name }}</fwb-badge></span>
                        </fwb-table-cell>
                        <fwb-table-cell> <fwb-badge :type="item.quantityInStock <= 10 ? 'red' : 'green'">{{
                            item.quantityInStock }}</fwb-badge> </fwb-table-cell>
                        <fwb-table-cell class="font-bold">${{ item.price }}</fwb-table-cell>

                        <fwb-table-cell>
                            <div class="flex ">
                                <!--Detail-->
                                <EyeIcon
                                    @click="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal, item._id, 'detail')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Edit-->
                                <PencilSquareIcon v-if="user.userRole == 'admin' || user.userRole == 'storekeeper'"
                                    @click="toggleModal('isShowEditModal', !modalOptions.isShowDetailModal, item._id, 'edit')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Delete-->
                                <TrashIcon v-if="user.userRole == 'admin'"
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
    <AddEntityModal title="Add Product" :isLoading="product.isLoading" :formError="product.error"
        :isShowAddModal="modalOptions.isShowAddModal" @submit="onSubmit('post')"
        @close="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" entityType="product" v-model="formData" />
    <!--Detail Modal-->
    <DetailEntityModal title="Product detail" :detail="selectedProduct" :isShowModal="modalOptions.isShowDetailModal"
        @close="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal)" />
    <!--Edit Modal-->
    <EditEntityModal title="Edit Product" :isShowEditModal="modalOptions.isShowEditModal"
        @close="toggleModal('isShowEditModal', !modalOptions.isShowEditModal)" entityType="product" v-model="formData"
        @submit="onSubmit('put')" />
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import Alert from '@/components/ui/Alert.vue';
import Button from '@/components/ui/Button.vue';
import AddEntityModal from '@/components/modal/AddEntityModal.vue';
import DetailEntityModal from '@/components/modal/DetailEntityModal.vue';
import EditEntityModal from '@/components/modal/EditEntityModal.vue';
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
    FwbBadge,
    FwbPagination
} from 'flowbite-vue'
import { useAuthStore } from '@/store/auth';
import { useCategoryStore } from '@/store/category';

//user store
const user = useAuthStore()

//category
const categoryList = useCategoryStore()
//product store
const product = useProductStore()
onMounted(async () => {
    await product.fetchProducts()
    await categoryList.fetchCategories()
    getFilteredItem('')
})



const message = ref('')
const data = ref([]) //products data
const selectedProduct = ref({})
const formData = ref({
    _id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    images: '',
    quantity: 0,

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

    if (id) {
        const { _id, isActive, __v, images, category: { name: categoryName }, ...productWithoutId } = product.getById(id)
        if (operation == 'detail') {
            selectedProduct.value = { categoryName, ...productWithoutId }
        } else if (operation == 'edit' || operation == 'delete') {
            // formData.value._id = _id
            // formData.value.name = productWithoutId.name
            // formData.value.description = productWithoutId.description
            // formData.value.price = productWithoutId.price
            // formData.value.category = productWithoutId.category
            // //formData.value.images = productWithoutId?.images[0] || null
            // formData.value.quantity = productWithoutId.quantity
        } else {
            formData.value._id = ''
            formData.value.name = ''
            formData.value.description = ''
            formData.value.price = ''
            formData.value.category = ''
            formData.value.images = ''
            formData.value.quantity = 0
        }
    }
}

const onSubmit = async (type) => {
    let response = null
    if (type == 'post') {
        response = await product.addProduct(formData.value)

        //hide add modal
        if (response) {
            modalOptions.value.isShowAddModal = false
            message.value = 'Successfully product added!'
        }
    } else if (type == 'put') {
        response = await product.updateProduct(formData.value)

        //hide edit modal
        if (response) {
            modalOptions.value.isShowEditModal = false
            message.value = 'Successfully category updated!'
        }
    }

    if (response) {
        formData.value._id = ''
        formData.value.name = ''
        formData.value.description = ''
        formData.value.price = ''
        formData.value.category = ''
        formData.value.images = ''
        formData.value.quantity = 0
    }

};

const getFilteredItem = (query) => {
    if (!query) {
        data.value = product.filterProduct('')
        return
    }
    data.value = product.filterProduct(query)
}

</script>