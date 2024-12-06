<template>
  <Navbar />
  <div class="p-4 sm:ml-64">
    <div class="p-4 rounded-lg mt-10">
      <!--main content start-->
      <router-view></router-view>
      <!--main content end-->
    </div>
  </div>
  <Sidebar />
</template>

<script setup>
import Navbar from "@/layouts/common/Navbar.vue";
import Sidebar from "@/layouts/common/Sidebar.vue";

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'



onMounted(() => {
  initFlowbite();
})
</script>
