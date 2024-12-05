import api from '@/plugins/axios'
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('accessToken') || null,
        isLoading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => {
            if (state.token) {
                return jwtDecode(state.token)?.user || null;
            }
            return null
        },
        getError: (state) => state.error,
        userRole: (state) => {
            if (state.token) {
                return jwtDecode(state.token)?.user?.role || null;
            }
            return null
        }
    },

    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('accessToken', token);
        },

        clearToken() {
            this.token = null;
            localStorage.removeItem('accessToken');
        },

        isTokenValid() {
            if (!this.token) return false;

            const { exp } = jwtDecode(this.token);
            return exp * 1000 > Date.now();
        },
        async login(credentials) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.post('user/login', credentials);
                this.setToken(response.data.accessToken);
                this.user = jwtDecode(this.token);

            } catch (error) {
                console.error('Login error:', error);
                this.error = error.response?.data?.message || 'Login failed';
            } finally {
                this.isLoading = false;
            }

            if (this.user) {
                return true
            }
            return false

        },

        logout() {
            this.clearToken();
            this.user = null;
        },
    }

})