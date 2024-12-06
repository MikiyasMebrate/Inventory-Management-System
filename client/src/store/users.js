import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        isLoading: false,
        error: null,
        sortColumn: null,
        sortDirection: 1,
    }),
    actions: {
        async fetchUsers() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.get('user');
                this.users = response.data;
            } catch (error) {
                console.log('Error fetching users:', error);
                this.error = error.response?.data?.message || 'Failed to fetch users';
            } finally {
                this.isLoading = false;
            }
        },
        filterUsers(searchTerm) {
            if (!searchTerm) {
                return this.users; // Return all users if search is empty
            }
            return this.users.filter(user => {
                const search = searchTerm.toLowerCase(); // Convert search term to lowercase
                return (
                    user.firstName.toLowerCase().includes(search) || // Check firstname
                    user.lastName.toLowerCase().includes(search) || // Check lastname
                    user.role.toLowerCase().includes(search) || // Check role
                    user.email.toLowerCase().includes(search) // Check email
                );
            });
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
            if (col === 'firstName') {
                this.users.sort((a, b) => {
                    return this.sortDirection * a.firstName.localeCompare(b.firstName);
                });
            } else if (col === 'lastName') {
                this.users.sort((a, b) => {
                    return this.sortDirection * a.lastName.localeCompare(b.lastName);
                });
            } else if (col === 'role') {
                this.users.sort((a, b) => {
                    return this.sortDirection * a.role.localeCompare(b.role);
                });
            }
        },
    }
})