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
        async updateCategory(category) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.put(`category/${category._id}`, category);
                const index = this.categories.findIndex(item => item._id === category._id);
                if (index !== -1) {
                    this.categories[index] = response.data;
                }
            } catch (error) {
                console.log('Error updating category:', error);
                this.error = error.response?.data?.message || 'Failed to update category';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },
        async deleteCategory(category) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.delete(`category/${category._id}`);
                const index = this.categories.filter(obj => obj._id !== category._id);
                if (index !== -1) {
                    this.categories = index
                }
            } catch (error) {
                console.log('Error deleting category:', error);
                this.error = error.response?.data?.message || 'Failed to delete category';
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
        },
        getById(id) {
            return this.categories.find(category => category._id === id);
        }


    }
})