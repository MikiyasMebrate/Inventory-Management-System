<template>
    <div class="block md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div class="flex flex-row justify-between gap-2">
            <div class="w-100">
                <!--Name-->
                <h5 class="mb-2 text-xl  tracking-tight text-gray-400">{{name}}</h5>
                <!--Number-->
                <h1 class=" text-3xl font-bold">{{ number }}</h1>
            </div>
            <div class="w-100">
                
                <div class="bg-indigo-900 p-4  rounded  flex items-center justify-center text-white">
                    <!--Icon-->
                    <component  :is="icon" class="h-9 w-9" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { icon, name, number } = defineProps(['icon', 'name', 'number'])

</script>