import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useNotificationPreferenceStore = defineStore('notificationPreference', {
    state: () => ({
        preferences: '',
        isLoading: false,
        error: null
    }),
    getters: {
        hasPreferences: (state) => state.preferences ?? true
    },

    actions: {
        async fetchPreferences() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.get('notifications/preference');
                this.preferences = response.data;
            } catch (error) {
                console.log('Error fetching preferences:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to fetch preferences';
            } finally {
                this.isLoading = false;
            }
        },
        async createNotificationPreference(preference) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.post('notifications/preference', preference);
                this.preferences = response.data
            } catch (error) {
                console.log('Error creating notification preference:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to create notification preference';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        },
        async updatePreference(preference) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.put(`notifications/preference`, preference);
                this.preferences = response.data;
            } catch (error) {
                console.log('Error updating preference:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to update preference';
            } finally {
                this.isLoading = false;
            }

            if (!this.error) {
                return true
            }
            return false
        }
    },

})