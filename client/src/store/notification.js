import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [],
        isLoading: false,
        error: null
    }),
    actions: {
        async fetchNotifications() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.get('notifications');
                this.notifications = response.data;
            } catch (error) {
                console.log('Error fetching notifications:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || error.response?.data?.message || 'Failed to fetch notifications';
            } finally {
                this.isLoading = false;
            }
        }
    }
})