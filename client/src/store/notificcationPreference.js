import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useNotificationPreferenceStore = defineStore('notificationPreference', {
    state: () => ({
        preferences: [],
        isLoading: false,
        error: null
    }),

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
        }
    }

})