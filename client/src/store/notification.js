import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [],
        isLoading: false,
        error: null
    })
})