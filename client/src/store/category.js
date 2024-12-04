import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        isLoading: false,
        error: null,
        sortColumn: null,
        sortDirection: 1,

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
        },
        async addCategory(category) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.post('category', category);
                this.categories.push(response.data);
            } catch (error) {
                console.log('Error adding category:', error);
                this.error = error.response?.data?.message || 'Failed to add category';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },
        sort(col) {
            if (this.sortColumn === col) {
                // Reverse the sort direction
                this.sortDirection *= -1;
            } else {
                // Set new column and default to ascending
                this.sortColumn = col;
                this.sortDirection = 1;
            }

            // Sort based on column and direction
            if (col === 'name') {
                this.categories.sort((a, b) => {
                    return this.sortDirection * a.name.localeCompare(b.name);
                });
            } else if (col === 'productCount') {
                this.categories.sort((a, b) => {
                    return this.sortDirection * (a.productCount - b.productCount);
                });
            }
        }

    }
})