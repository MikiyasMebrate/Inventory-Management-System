import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        isLoading: false,
        error: null
    }),

    getters: {
        getCategories: (state) => state.categories,
        searchCategories: (state) => (searchTerm) => state.categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase())),
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
        },
        filterCategories(searchTerm) {
            if (!searchTerm) {
                return this.categories; // Return all categories if search is empty
            }
            return this.categories.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    }
})