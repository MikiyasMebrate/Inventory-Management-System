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
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to fetch products';
            } finally {
                this.isLoading = false;
            }
        },
        async addProduct(product) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.post('product', {
                    "category": product.category,
                    "name": product.description,
                    "price": product.price,
                    "quantityInStock": product.quantity,
                    "images": [product.images]
                });
                this.products.push(response.data);
            } catch (error) {
                console.log('Error adding product:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to add product';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },
        async updateProduct(product) {
            this.isLoading = true;
            this.error = null;


            try {
                const response = await api.put(`product/${product._id}`, {
                    "category": product.category,
                    "name": product.name,
                    "price": product.price,
                    "quantityInStock": product.quantity,
                    "description": product.description,
                    "images": [product.images]
                });
                const index = this.products.findIndex(item => item._id === product._id);
                if (index !== -1) {
                    this.products[index] = response.data;
                }
            } catch (error) {
                console.log('Error updating product:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to update product';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },

        async deleteProduct(product) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.delete(`product/${product._id}`);
                const index = this.products.filter(obj => obj._id !== product._id);
                if (index !== -1) {
                    this.products = index
                }
            } catch (error) {
                console.log('Error deleting product:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to delete product';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },

        async saleProduct(product) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.post(`inventory-transactions`, product);

                const index = this.products.findIndex(item => item._id === product.product);

                if (index !== -1) {
                    this.products[index] = response.data.updatedProduct;
                }

            } catch (error) {
                console.log('Error sale product:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to sale product';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },
        async restockProduct(product) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.post(`inventory-transactions`, product);

                const index = this.products.findIndex(item => item._id === product.product);

                if (index !== -1) {
                    this.products[index] = response.data.updatedProduct;
                }

            } catch (error) {
                console.log('Error restock product:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to restock product';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },
        async returnProduct(product) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.post(`inventory-transactions`, product);

                const index = this.products.findIndex(item => item._id === product.product);

                if (index !== -1) {
                    this.products[index] = response.data.updatedProduct;
                }

            } catch (error) {
                console.log('Error return product:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to return product';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },
        filterProduct(searchTerm) {
            if (!searchTerm) {
                return this.products; // Return all categories if search is empty
            }
            return this.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
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
                this.products.sort((a, b) => {
                    return this.sortDirection * a.name.localeCompare(b.name);
                });
            } else if (col === 'quantity') {
                this.products.sort((a, b) => {
                    return this.sortDirection * (a.quantityInStock - b.quantityInStock);
                });
            } else if (col === 'price') {
                this.products.sort((a, b) => {
                    return this.sortDirection * (a.price - b.price);
                });
            } else if (col === 'category') {
                this.products.sort((a, b) => {
                    return this.sortDirection * a.category.name.localeCompare(b.category.name);
                });
            }
        },
        getById(id) {
            return this.products.find(product => product._id === id);
        },

    }
})

