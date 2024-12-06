import api from "@/plugins/axios";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        data: [],
        isLoading: false,
        error: null
    }),
    getters: {
        getDashboard: (state) => state.data.dashboard,
        getTopCategories: (state) => state.data.topCategories,
        getProduct: (state) => state.data.topProducts,
        getSummaryTransactions: (state) => state.data.summaryTransactions

    },
    actions: {
        async getData() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await api.get('dashboard');
                this.data = response.data;
            } catch (error) {
                console.log('Error getting data:', error);
                this.error = error.response?.data?.errors.map((err) => err.msg).join(",") || 'Failed to get data';
            } finally {
                this.isLoading = false;
            }
        }
    }
})