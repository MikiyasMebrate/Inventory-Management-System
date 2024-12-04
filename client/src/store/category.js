import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        isLoading: false,
        error: null
    }),

    getters: {
        getCategories: (state) => state.categories
    },

    actions: {
        async fetchCategories() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.get('category');
                this.categories = response.data;
            } catch (error) {
                console.log('Error fetching categories:', error);
                this.error = error.response?.data?.message || 'Failed to fetch categories';
            } finally {
                this.isLoading = false;
            }
        }
    }
})