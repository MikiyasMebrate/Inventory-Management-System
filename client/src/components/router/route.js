import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/pages/auth/Login.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/components/layouts/Layout.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router