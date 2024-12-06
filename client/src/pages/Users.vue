<template>
    <Breadcrumb name="Users" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">List</p>

        <!--Add user button-->
        <div v-if="userStore.userRole == 'admin'" class="flex justify-end my-3">
            <Button @click="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" title="Add User"></Button>
        </div>

        <!--Messages-->
        <div class="flex justify-center">
            <div class="w-full md:w-1/2 ">
                <Alert @close="clearMessage" v-if="message" :title="message" type="success" />
            </div>
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
                        <p>First Name</p>
                        <ArrowsUpDownIcon @click="handleOnSort('firstName')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Last Name</p>
                        <ArrowsUpDownIcon @click="handleOnSort('lastName')"
                            class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <span>Email</span>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Role</p>
                        <ArrowsUpDownIcon @click="handleOnSort('role')" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <span class="sr-only">Edit</span>
                </fwb-table-head-cell>
            </fwb-table-head>
            <fwb-table-body>
                <template v-if="!usersListStore.isLoading">
                    <fwb-table-row v-for="(item, index) in data" :key="item._id">
                        <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.firstName }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.lastName }}</fwb-table-cell>
                        <fwb-table-cell>{{ item.email }}</fwb-table-cell>
                        <fwb-table-cell :class="{
                            'text-blue-600 capitalize': item.role === 'admin',
                            'text-red-600 capitalize': item.role === 'storekeeper',
                            'text-green-600 capitalize': item.role === 'salesperson'
                        }">{{ item.role }}</fwb-table-cell>
                        <fwb-table-cell>
                            <div class="flex ">
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

        <!--Modals-->
        <!--Add Modal-->
        <AddEntityModal title="Add User" :isLoading="usersListStore.isLoading" :formError="usersListStore.error"
            :isShowAddModal="modalOptions.isShowAddModal" @submit="onSubmit('post')"
            @close="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" entityType="users" v-model="formData" />
        <DeleteEntityModal title="Delete User" v-model="formData" :isShowModal="modalOptions.isShowDeleteModal"
            @submit="onSubmit('delete')" @close="toggleModal('isShowDeleteModal', !modalOptions.isShowDeleteModal)" />
        <!--Edit Modal-->
        <EditEntityModal title="Edit User" :isLoading="usersListStore.isLoading" :formError="usersListStore.error"
            :isShowEditModal="modalOptions.isShowEditModal"
            @close="toggleModal('isShowEditModal', !modalOptions.isShowEditModal)" entityType="users" v-model="formData"
            @submit="onSubmit('put')" />


    </section>
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import Button from '@/components/ui/Button.vue';
import AddEntityModal from '@/components/modal/AddEntityModal.vue';
import DeleteEntityModal from '@/components/modal/DeleteEntityModal.vue';
import EditEntityModal from '@/components/modal/EditEntityModal.vue';
import Alert from '@/components/ui/Alert.vue';
import { ref, reactive, onMounted, watch } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useUsersStore } from '@/store/users';
import { MagnifyingGlassIcon, ArrowsUpDownIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/vue/24/solid'
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



const userStore = useAuthStore()
const usersListStore = useUsersStore()
onMounted(async () => {
    await usersListStore.fetchUsers()
    getFilteredItem('')
})


const data = ref([]) //users data
const pageLength = ref(10)
const searchQuery = reactive({
    query: ''
})
const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    _id: ''
})
const modalOptions = ref({
    isShowAddModal: false,
    isShowEditModal: false,
    isShowDeleteModal: false,
})
const message = ref('')

const lengths = [
    { value: 10, name: 10 },
    { value: 25, name: 25 },
    { value: 50, name: 50 },
    { value: 100, name: 100 }
]

watch(() => searchQuery.query, (query) => {
    getFilteredItem(query || null)
}
)


const getFilteredItem = (query) => {
    if (!query) {
        data.value = usersListStore.filterUsers('')
        return
    }
    data.value = usersListStore.filterUsers(query)
}

const handleOnSort = async (col) => {
    usersListStore.sort(col)
}

const onSubmit = async (type) => {
    let response = null
    if (type == 'post') {
        response = await usersListStore.addUser(formData.value)

        //hide add modal
        if (response) {
            modalOptions.value.isShowAddModal = false
            message.value = 'Successfully user added!'
        }
    } else if (type == 'delete') {
        response = await usersListStore.deleteUser(formData.value)

        //hide edit modal
        if (response) {
            modalOptions.value.isShowDeleteModal = false
            message.value = 'Successfully user removed!'
            getFilteredItem('')
        }
    } else if (type == 'put') {
        response = await usersListStore.updateUser({
            "_id": formData.value._id,
            "firstName": formData.value.firstName,
            "lastName": formData.value.lastName,
            "email": formData.value.email,
            "role": formData.value.role
        })

        //hide edit modal
        if (response) {
            modalOptions.value.isShowEditModal = false
            message.value = 'Successfully user updated!'
        }

    }
};

const toggleModal = (modelName, state, id = null, operation) => {
    modalOptions.value[modelName] = state

    if (id) {
        const { _id, ...userWithoutId } = usersListStore.getById(id)
        if (operation == 'delete' || operation == 'edit') {
            formData.value._id = _id
            formData.value.firstName = userWithoutId.firstName
            formData.value.lastName = userWithoutId.lastName
            formData.value.email = userWithoutId.email
            formData.value.role = userWithoutId.role
            formData.value.password = ''
        }
    } else {
        formData.value._id = ''
        formData.value.firstName = ''
        formData.value.lastName = ''
        formData.value.email = ''
        formData.value.role = ''
        formData.value.password = ''
    }
}

const clearMessage = () => {
    message.value = ''
}

</script>