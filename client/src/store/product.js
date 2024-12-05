import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        isLoading: false,
        error: null,
        sortColumn: null,
        sortDirection: 1,
    }),

    actions: {
        async fetchProducts() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.get('product');
                this.products = response.data;
            } catch (error) {
                console.log('Error fetching products:', error);
                this.error = error.response?.data?.message || 'Failed to fetch products';
            } finally {
                this.isLoading = false;
            }
        },
        filterProduct(searchTerm) {
            if (!searchTerm) {
                return this.products; // Return all categories if search is empty
            }
            return this.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        },
    }
})

