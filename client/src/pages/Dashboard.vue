<template>

    <!--Key Metrics (KPIs) Section-->
    <section class="grid grid-cols-1  gap-4 mb-4  md:grid-cols-2 lg:grid-cols-4 ">
        <DashboardCard v-for="item in dashboards" :name="item.name" :icon="item.icon" :number="item.number"  />
    </section>

     <!--Trends and Visual Insights-->
     <section class="mt-10">
        <p class="text-gray-600 my-3">Trends and Visual Insights</p>
     </section>
</template>

<script setup>
import DashboardCard from '@/components/ui/DashboardCard.vue';
import { ClipboardIcon,ArchiveBoxIcon, BuildingStorefrontIcon  ,UserIcon } from '@heroicons/vue/24/solid'

const dashboards = [
    {
        name: 'Total Category',
        icon: ClipboardIcon,
        number : 10
    },
    {
        name: 'Total Product',
        icon: ArchiveBoxIcon,
        number : 342
    },
    {
        name: 'Product in Stock',
        icon: BuildingStorefrontIcon,
        number : 198
    },
    {
        name: 'Total Users',
        icon: UserIcon,
        number : 3
    },
]


</script>