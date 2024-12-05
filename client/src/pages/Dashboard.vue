<template>
    <!--Key Metrics (KPIs) Section-->
    <section class="grid grid-cols-1  gap-4 mb-4  md:grid-cols-2 lg:grid-cols-4 ">
        <DashboardCard v-for="item in dashboards" :name="item.name" :icon="item.icon" :number="item.number" />
    </section>

    <!--Trends and Visual Insights-->
    <section class="mt-10">
        <p class="text-gray-600 my-3">Trends and Visual Insights</p>
    </section>
</template>

<script setup>
import DashboardCard from '@/components/ui/DashboardCard.vue';
import { useDashboardStore } from '@/store/dashboard';
import { ClipboardIcon, ArchiveBoxIcon, BuildingStorefrontIcon, UserIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted } from 'vue';

const dashboardStore = useDashboardStore();

// Fetch data when the component is mounted
onMounted(() => {
    dashboardStore.getData();
});

const dashboards = computed(() => [
    {
        name: 'Total Category',
        icon: ClipboardIcon,
        number: dashboardStore.getDashboard?.categoryCount || 0,
    },
    {
        name: 'Total Product',
        icon: ArchiveBoxIcon,
        number: dashboardStore.getDashboard?.productCount || 0,
    },
    {
        name: 'Total Quantity',
        icon: BuildingStorefrontIcon,
        number: dashboardStore.getDashboard?.totalQuantity[0].totalQuantity || 0,
    },
    {
        name: 'Total Users',
        icon: UserIcon,
        number: dashboardStore.getDashboard?.userCount || 0,
    },
]);
</script>
