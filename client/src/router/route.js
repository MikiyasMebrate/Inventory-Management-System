import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/Login.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layouts/Layout.vue'),
        redirect: '/dashboard',
        beforeEnter: (to, from, next) => {
            const userAuth = useAuthStore()
            if (userAuth.token) {
                next();
            } else {
                next({ name: 'login', query: { redirect: to.fullPath } });
            }

        },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/pages/Dashboard.vue')
            },
            {
                path: 'categories',
                name: 'categories',
                component: () => import('@/pages/Categories.vue')
            },
            {
                path: 'products',
                name: 'products',
                component: () => import('@/pages/Products.vue')
            },
            {
                path: 'notifications',
                name: 'notifications',
                component: () => import('@/pages/Notifications.vue')
            },
            {
                path: 'users',
                name: 'users',
                component: () => import('@/pages/Users.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/pages/Profile.vue')
            },
            {
                path: 'notification-preferences',
                name: 'notification-preferences',
                component: () => import('@/pages/NotificationPreference.vue')
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