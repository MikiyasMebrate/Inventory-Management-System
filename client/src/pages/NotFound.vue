<script setup>
import pageNotFound from '@/assets/utility/404 Error-cuate.svg';
</script>
<template>
    <div class="w-full flex flex-col md:flex-row items-center justify-center h-screen">
        <div class="flex flex-col md:flex-row w-11/12 md:w-3/5 bg-blue-50 p-20 rounded-2xl">
            <!--Vector animation start-->
            <div class="hidden md:block md:w-full">
                <img :src=pageNotFound alt="">
            </div>
            <!--Vector animation end-->

        </div>
    </div>
</template>