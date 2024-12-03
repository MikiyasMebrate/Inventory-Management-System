import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/pages/auth/Login.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/components/layouts/Layout.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/components/pages/Dashboard.vue')
            },
            {
                path: 'categories',
                name: 'categories',
                component: () => import('@/components/pages/Categories.vue')
            },
            {
                path: 'products',
                name: 'products',
                component: () => import('@/components/pages/Products.vue')
            },
            {
                path: 'notifications',
                name: 'notifications',
                component: () => import('@/components/pages/Notifications.vue')
            },
            {
                path: 'users',
                name: 'users',
                component: () => import('@/components/pages/Users.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/components/pages/Profile.vue')
            },
            {
                path: 'notification-preferences',
                name: 'notification-preferences',
                component: () => import('@/components/pages/NotificationPreference.vue')
            }

        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'bg-indigo-700 text-white'
})

export default router