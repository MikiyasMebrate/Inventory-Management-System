import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/Login.vue')
    },
    {
        path: '/:pathName(.*)*',
        name: 'not-found',
        component: () => import('../Pages/NotFound.vue')
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
                component: () => import('@/pages/Users.vue'),
                meta: { requiresAuth: true, roles: ['admin'] },
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


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth) {
        if (authStore.isAuthenticated) {
            if (to.meta.roles && !to.meta.roles.includes(authStore.userRole)) {
                return next({ name: 'Login' }); // Redirect if role doesn't match
            }
            return next(); // Proceed if authenticated and role matches
        } else {
            return next({ name: 'login', query: { redirect: to.fullPath } });
        }
    }
    next();
});




export default router