<template>
    <Breadcrumb name="Profile" />

    <section class="mt-10">
        <div class="p-10  overflow-x-auto shadow sm:rounded-lg">
            <!--Edit-->
            <div class="flex justify-end my-4">
                <Button title="Edit Profile"></Button>
            </div>

            <section>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-1">
                            <label for="first-name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                Name</label>
                            <span class="text-gray-500 capitalize">{{ userStore.getUser.firstName }}</span>
                        </div>
                        <div class="col-span-1">
                            <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                Name</label>
                            <span class="text-gray-500 capitalize">{{ userStore.getUser.lastName }}</span>
                        </div>
                        <div class="col-span-1 ">
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <span class="text-gray-500 capitalize">{{ userStore.getUser.email }}</span>
                        </div>
                        <div class="col-span-1">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <span class="text-gray-500 capitalize">{{ userStore.getUser.role }}</span>
                        </div>

                    </div>
                </form>
            </section>

        </div>
    </section>
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import Button from '@/components/ui/Button.vue';
import { useAuthStore } from '@/store/auth'

const userStore = useAuthStore()

</script>