<script setup>
import { useAuthStore } from '@/store/auth';

const userStore = useAuthStore()
</script>

<template>
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-50 border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-blue-50 ">
            <ul class="space-y-2 font-medium">
                <li>
                    <router-link :to="{ name: 'dashboard' }"
                        class="flex items-center p-2   text-indigo-900 rounded-lg hover:bg-indigo-700 hover:text-white group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                            <path
                                d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778zM8.5.015V7.5h7.485A8 8 0 0 0 8.5.015" />
                        </svg>
                        <span class="ms-3">Dashboard</span>
                    </router-link>
                </li>

                <li>

                    <router-link :to="{ name: 'categories' }"
                        class="flex items-center p-2  text-indigo-900 rounded-lg hover:bg-indigo-700 hover:text-white group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-backpack4-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 0a2 2 0 0 0-2 2H3.5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4v.5a.5.5 0 0 0 1 0V7h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H10a2 2 0 0 0-2-2m1 2a1 1 0 0 0-2 0zm-4 9v2h6v-2h-1v.5a.5.5 0 0 1-1 0V11z" />
                            <path
                                d="M14 7.599A3 3 0 0 1 12.5 8H9.415a1.5 1.5 0 0 1-2.83 0H3.5A3 3 0 0 1 2 7.599V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Category</span>
                    </router-link>
                </li>

                <li>
                    <router-link :to="{ name: 'products' }"
                        class="flex items-center p-2  text-indigo-900 rounded-lg hover:bg-indigo-700 hover:text-white group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-bag-dash-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6 9.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
                    </router-link>
                </li>


                <li>
                    <router-link :to="{ name: 'notifications' }"
                        class="flex items-center p-2  text-indigo-900 rounded-lg hover:bg-indigo-700 hover:text-white group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-bell-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Notification</span>
                        <span
                            class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium rounded-full bg-indigo-900 text-white">3</span>
                    </router-link>
                </li>

                <li>
                    <router-link v-if="userStore.userRole == 'admin'" :to="{ name: 'users' }"
                        class="flex items-center p-2  text-indigo-900 rounded-lg hover:bg-indigo-700 hover:text-white group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-people-fill" viewBox="0 0 16 16">
                            <path
                                d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                    </router-link>
                </li>

                <li>
                    <router-link :to="{ name: 'profile' }"
                        class="flex items-center p-2  text-indigo-900 rounded-lg hover:bg-indigo-700 hover:text-white group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>

                        <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
                    </router-link>
                </li>



            </ul>
        </div>
    </aside>
</template>