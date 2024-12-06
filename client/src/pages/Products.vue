<template>
    <Breadcrumb name="Product" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">List </p>

        <!--Messages-->
        <div class="flex justify-center mb-5">
            <div class="w-full md:w-1/2 ">
                <Alert @close="clearMessage" v-if="message" :title="message" type="success" />
            </div>
        </div>


        <!--Product Button-->
        <div v-if="user.userRole == 'admin' || user.userRole == 'storekeeper'" class="flex justify-end my-3">
            <Button @click="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" title="Add Product"></Button>
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
                        <ArrowsUpDownIcon @click="handleOnSort('category')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Quantity</p>
                        <ArrowsUpDownIcon @click="handleOnSort('quantity')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Price</p>
                        <ArrowsUpDownIcon @click="handleOnSort('price')"
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
                        <fwb-table-cell><img class="md:w-10" :src="item?.images[0]" alt="" srcset=""></fwb-table-cell>
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
                                <!--Sale-->
                                <TagIcon v-if="user.userRole == 'salesperson'"
                                    @click="toggleModal('isShowTransactionModal', !modalOptions.isShowTransactionModal, item._id, 'sale')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Return-->
                                <ArrowUturnLeftIcon v-if="user.userRole == 'salesperson'"
                                    @click="toggleModal('isShowTransactionModal', !modalOptions.isShowTransactionModal, item._id, 'return')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Restock-->
                                <ArchiveBoxArrowDownIcon v-if="user.userRole == 'storekeeper'"
                                    @click="toggleModal('isShowTransactionModal', !modalOptions.isShowTransactionModal, item._id, 'restock')"
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
    <EditEntityModal title="Edit Product" :isLoading="product.isLoading" :formError="product.error"
        :isShowEditModal="modalOptions.isShowEditModal"
        @close="toggleModal('isShowEditModal', !modalOptions.isShowEditModal)" entityType="product" v-model="formData"
        @submit="onSubmit('put')" />
    <!--Delete Modal-->
    <DeleteEntityModal title="Delete product" v-model="formData" :isShowModal="modalOptions.isShowDeleteModal"
        @submit="onSubmit('delete')" @close="toggleModal('isShowDeleteModal', !modalOptions.isShowDeleteModal)" />

    <!--Transaction Modal-->
    <TransactionModal :title="transactionForm.requestType" :isLoading="product.isLoading" :formError="product.error"
        :detail="selectedProduct" :isShowModal="modalOptions.isShowTransactionModal"
        @submit="onSubmit(transactionForm.requestType)"
        @close="toggleModal('isShowTransactionModal', !modalOptions.isShowTransactionModal)" v-model="transactionForm" />
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import Alert from '@/components/ui/Alert.vue';
import Button from '@/components/ui/Button.vue';
import AddEntityModal from '@/components/modal/AddEntityModal.vue';
import DetailEntityModal from '@/components/modal/DetailEntityModal.vue';
import EditEntityModal from '@/components/modal/EditEntityModal.vue';
import DeleteEntityModal from '@/components/modal/DeleteEntityModal.vue';
import TransactionModal from '@/components/modal/TransactionModal.vue';
import { useNotificationStore } from '@/store/notification';
import { ref, reactive, watch } from 'vue';
import { useProductStore } from '@/store/product';
import { onMounted } from 'vue';
import {
    MagnifyingGlassIcon,
    ArrowsUpDownIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    TagIcon,
    ArchiveBoxArrowDownIcon,
    ArrowUturnLeftIcon
} from '@heroicons/vue/24/solid'
import {
    FwbSelect,
    FwbInput,
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
const notificationStore = useNotificationStore()

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
const pageLength = ref(10)
const searchQuery = reactive({
    query: ''
})
const formData = ref({
    _id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    images: '',
    quantity: 0,

})

const transactionForm = ref({
    quantity: 1,
    priceAtTransaction: 0,
    requestType: '',  // sale, restock, return 
})

//control modal hide and show
const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal: false,
    isShowDetailModal: false,
    isShowDeleteModal: false,
    isShowTransactionModal: false,
    isShowRestockModal: false,
})

const lengths = [
    { value: 10, name: 10 },
    { value: 25, name: 25 },
    { value: 50, name: 50 },
    { value: 100, name: 100 }
]

/**
 * Clear the message.
 * This function is called when the user clicks on the close button on the alert message.
 */
const clearMessage = () => {
    message.value = ''
}

watch(() => searchQuery.query, (query) => {
    getFilteredItem(query || null)
}
)

//control modal 
const toggleModal = (modelName, state, id = null, operation) => {
    modalOptions.value[modelName] = state

    if (id) {
        const { _id, isActive, __v, images, category: { name: categoryName }, ...productWithoutId } = product.getById(id)
        if (operation == 'detail') {
            selectedProduct.value = { categoryName, ...productWithoutId }
        } else if (operation == 'sale' || operation == 'restock' || operation == 'return') {
            selectedProduct.value = product.getById(id)
            transactionForm.value.priceAtTransaction = selectedProduct.value.price
            transactionForm.value.requestType = operation == 'sale' ? 'Sale Product' : (operation == 'restock' ? 'Restock Product' : 'Return Product')
        }
        else if (operation == 'edit' || operation == 'delete') {

            const selectedProductItem = product.getById(id)

            formData.value._id = selectedProductItem._id
            formData.value.name = selectedProductItem.name
            formData.value.description = selectedProductItem.description
            formData.value.price = selectedProductItem.price
            formData.value.category = selectedProductItem.category._id
            formData.value.images = selectedProductItem.images[0]
            formData.value.quantity = selectedProductItem.quantityInStock
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
            message.value = 'Successfully product updated!'
        }
    } else if (type == 'delete') {
        response = await product.deleteProduct(formData.value)

        //hide edit modal
        if (response) {
            modalOptions.value.isShowDeleteModal = false
            message.value = 'Successfully category deleted!'
            getFilteredItem('')
        }
    } else if (type == 'Sale Product') {
        response = await product.saleProduct({
            "product": selectedProduct.value._id,
            "actionType": "sale",
            "quantity": transactionForm.value.quantity
        })

        //hide edit modal
        if (response) {
            modalOptions.value.isShowTransactionModal = false
            message.value = 'Successfully product sold!'
        }
    } else if (type == 'Restock Product') {
        response = await product.saleProduct({
            "product": selectedProduct.value._id,
            "actionType": "restock",
            "quantity": transactionForm.value.quantity,
            "priceAtTransaction": transactionForm.value.priceAtTransaction,
        })

        //hide edit modal
        if (response) {
            modalOptions.value.isShowTransactionModal = false
            message.value = 'Successfully product restocked!'
        }
    } else if (type == 'Return Product') {
        response = await product.saleProduct({
            "product": selectedProduct.value._id,
            "actionType": "return",
            "quantity": transactionForm.value.quantity,
        })

        //hide edit modal
        if (response) {
            modalOptions.value.isShowTransactionModal = false
            message.value = 'Successfully product returned!'
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
        transactionForm.value.quantity = 1
        transactionForm.value.priceAtTransaction = 0
        await notificationStore.fetchNotifications()
    }

};

const getFilteredItem = (query) => {
    if (!query) {
        data.value = product.filterProduct('')
        return
    }
    data.value = product.filterProduct(query)
}

const handleOnSort = async (col) => {
    product.sort(col)
}

</script>