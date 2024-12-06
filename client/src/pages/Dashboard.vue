<template>
    <!--Key Metrics (KPIs) Section-->
    <section class="grid grid-cols-1  gap-4 mb-4  md:grid-cols-2 lg:grid-cols-4 ">
        <DashboardCard v-for="item in dashboards.count" :name="item.name" :icon="item.icon" :number="item.number" />
    </section>

    <!--Trends and Visual Insights-->
    <section v-if="dashboards.topCategories" class="mt-10">
        <p class="text-gray-600 my-3">Trends and Visual Insights</p>
        <div class="">
            <!--Bar Chart-->
            <div class=" w-full rounded-lg shadow">
                <p class="p-6 text-gray-400">Top Categories</p>
                <apexchart width="100%" height="400" type="bar" :options="dashboards?.topCategories?.options"
                    :series="dashboards?.topCategories?.series">
                </apexchart>
            </div>

            <!--Table Latest product sold-->
            <div class=" gap-4  rounded-lg shadow mt-5">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <p class="p-6 text-gray-400">Top Products</p>
                    <fwb-table hoverable>
                        <fwb-table-head class="bg-indigo-900 text-white">
                            <fwb-table-head-cell>#</fwb-table-head-cell>
                            <fwb-table-head-cell>
                                <span>Product Name</span>
                            </fwb-table-head-cell>
                            <fwb-table-head-cell>
                                <span>Category</span>
                            </fwb-table-head-cell>
                            <fwb-table-head-cell>
                                <span>Price</span>
                            </fwb-table-head-cell>
                            <fwb-table-head-cell>
                                <span>Quantity</span>
                            </fwb-table-head-cell>
                        </fwb-table-head>
                        <fwb-table-body>
                            <fwb-table-row v-for="(item, index) in dashboardStore.getProduct" :key="item.productName">
                                <fwb-table-cell>{{ index + 1 }}</fwb-table-cell>
                                <fwb-table-cell>{{ item.productName }}</fwb-table-cell>
                                <fwb-table-cell>{{ item.category }}</fwb-table-cell>
                                <fwb-table-cell>{{ item.price }}</fwb-table-cell>
                                <fwb-table-cell>{{ item.totalSold }}</fwb-table-cell>
                            </fwb-table-row>
                        </fwb-table-body>
                    </fwb-table>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import DashboardCard from '@/components/ui/DashboardCard.vue';
import { useDashboardStore } from '@/store/dashboard';
import { ClipboardIcon, ArchiveBoxIcon, BuildingStorefrontIcon, UserIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted } from 'vue';
import {
    FwbSelect,
    FwbInput,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbPagination
} from 'flowbite-vue'

const dashboardStore = useDashboardStore();

// Fetch data when the component is mounted
onMounted(() => {
    dashboardStore.getData();
});

const dashboards = computed(() => {
    return {
        count: [{
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
        },],
        topCategories: {
            series: [{
                name: 'Products',
                data: dashboardStore.getTopCategories?.map((item) => item.productCount)
            }],
            options: {
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        columnWidth: '50%',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 0
                },
                grid: {
                    row: {
                        colors: ['#fff', '#f2f2f2']
                    }
                },
                xaxis: {
                    labels: {
                        rotate: -45
                    },
                    categories: dashboardStore.getTopCategories?.map((item) => item.name),

                },
                yaxis: {
                    title: {
                        text: 'Best categories of this month',
                    },
                },
                colors: ['#312E81'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                }
            }
        }
    }
}
);


</script>
