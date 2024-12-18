<template>
    <Breadcrumb name="Category" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">List</p>

        <!--Messages-->
        <div class="flex justify-center">
            <div class="w-full md:w-1/2 ">
                <Alert @close="clearMessage" v-if="message" :title="message" type="success" />
            </div>
        </div>

        <!--Add category button-->
        <div v-if="userStore.userRole == 'admin'" class="flex justify-end my-3">
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
                        <ArrowsUpDownIcon @click="handleOnSort('name')" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Products</p>
                        <ArrowsUpDownIcon @click="handleOnSort('productCount')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <span class="sr-only">Edit</span>
                </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>
                <template v-if="!category.isLoading">
                    <fwb-table-row v-for="(item, index) in data" :key="item._id">
                        <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.name }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.productCount }}</fwb-table-cell>
                        <fwb-table-cell>
                            <div class="flex ">
                                <!--Detail-->
                                <EyeIcon
                                    @click="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal, item._id, 'detail')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Edit-->
                                <PencilSquareIcon v-if="userStore.userRole == 'admin'"
                                    @click="toggleModal('isShowEditModal', !modalOptions.isShowDetailModal, item._id, 'edit')"
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                <!--Delete-->
                                <TrashIcon v-if="userStore.userRole == 'admin'"
                                    @click="toggleModal('isShowDeleteModal', !modalOptions.isShowDeleteModal, item._id, 'delete')"
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
            :isShowAddModal="modalOptions.isShowAddModal" @submit="onSubmit('post')"
            @close="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" entityType="category" v-model="formData" />
        <!--Detail Modal-->
        <DetailEntityModal title="Category detail" :detail="selectedCategory" :isShowModal="modalOptions.isShowDetailModal"
            @close="toggleModal('isShowDetailModal', !modalOptions.isShowDetailModal)" />
        <!--Edit Modal-->
        <EditEntityModal title="Edit Category" :isLoading="category.isLoading" :formError="category.error"
            :isShowEditModal="modalOptions.isShowEditModal"
            @close="toggleModal('isShowEditModal', !modalOptions.isShowEditModal)" entityType="category" v-model="formData"
            @submit="onSubmit('put')" />
        <DeleteEntityModal title="Delete Category" v-model="formData" :isShowModal="modalOptions.isShowDeleteModal"
            @submit="onSubmit('delete')" @close="toggleModal('isShowDeleteModal', !modalOptions.isShowDeleteModal)" />

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
import Alert from '@/components/ui/Alert.vue';
import {
    FwbSelect,
    FwbInput,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbPagination
} from 'flowbite-vue'
import { useAuthStore } from '@/store/auth';
import { useNotificationStore } from '@/store/notification';


//Category Store
const category = useCategoryStore()
onMounted(async () => {
    await category.fetchCategories()
    getFilteredItem('')
})

const notificationStore = useNotificationStore()

const data = ref([]) //categories data
const pageLength = ref(10)
const pagination = ref(1)
const selectedCategory = ref({})
const formData = ref({
    name: '',
    description: '',
    _id: ''
})
const searchQuery = reactive({
    query: ''
})
const message = ref('')

const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal: false,
    isShowDetailModal: false,
    isShowDeleteModal: false,
})
const userStore = useAuthStore()

watch(() => searchQuery.query, (query) => {
    getFilteredItem(query || null)
}
)



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
const toggleModal = (modelName, state, id = null, operation) => {
    modalOptions.value[modelName] = state
    if (id) {
        const { _id, ...categoryWithoutId } = category.getById(id)
        if (operation == 'detail') {
            selectedCategory.value = categoryWithoutId
        } else if (operation == 'edit' || operation == 'delete') {
            formData.value.name = categoryWithoutId.name
            formData.value.description = categoryWithoutId.description
            formData.value._id = _id
        }
    } else {
        formData.value.name = ''
        formData.value.description = ''
        formData.value._id = ''
    }
}


const onSubmit = async (type) => {
    let response = null
    if (type == 'post') {
        response = await category.addCategory(formData.value)

        //hide add modal
        if (response) {
            modalOptions.value.isShowAddModal = false
            message.value = 'Successfully category added!'
        }

    } else if (type == 'put') {
        response = await category.updateCategory(formData.value)

        //hide edit modal
        if (response) {
            modalOptions.value.isShowEditModal = false
            message.value = 'Successfully category updated!'
        }

    } else if (type == 'delete') {
        response = await category.deleteCategory(formData.value)

        //hide edit modal
        if (response) {
            modalOptions.value.isShowDeleteModal = false
            message.value = 'Successfully category deleted!'
            getFilteredItem('')
        }
    }

    if (response) {
        formData.value.name = ''
        formData.value.description = ''
        await notificationStore.fetchNotifications()
    }



};

const getFilteredItem = (query) => {
    if (!query) {
        data.value = category.filterCategories('')
        return
    }
    data.value = category.filterCategories(query)
}

const handleOnSort = async (col) => {
    category.sort(col)
}

const clearMessage = () => {
    message.value = ''
}

</script>