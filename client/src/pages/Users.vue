<template>
    <Breadcrumb name="Users" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">List</p>

        <!--Add user button-->
        <div v-if="userStore.userRole == 'admin'" class="flex justify-end my-3">
            <Button @click="toggleModal('isShowAddModal', !modalOptions.isShowAddModal)" title="Add User"></Button>
        </div>

        <!--Table-->
        <fwb-table hoverable>
            <fwb-table-head>
                <fwb-table-head-cell>#</fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>First Name</p>
                        <ArrowsUpDownIcon @click="handleOnSort('name')" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Last Name</p>
                        <ArrowsUpDownIcon @click="handleOnSort('name')" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </div>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <span>Email</span>
                </fwb-table-head-cell>
                <fwb-table-head-cell>
                    <div class="flex justify-between">
                        <p>Role</p>
                        <ArrowsUpDownIcon @click="handleOnSort('name')" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
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

    </section>
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import Button from '@/components/ui/Button.vue';
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
import { ref } from 'vue';
import { onMounted } from 'vue';

const userStore = useAuthStore()
const usersListStore = useUsersStore()
onMounted(async () => {
    await usersListStore.fetchUsers()
    getFilteredItem('')
})

const data = ref([]) //users data


const getFilteredItem = (query) => {
    if (!query) {
        data.value = usersListStore.filterUsers('')
        return
    }
    data.value = usersListStore.filterUsers(query)
}

</script>