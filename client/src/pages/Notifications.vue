<template>
    <Breadcrumb name="Notification" />

    <!--Notification Lists-->
    <div class="mt-10">
        <ul role="list" class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <NotificationList v-for="item in notificationStore.notifications" :firstName="item.user.firstName"
                :lastName="item.user.lastName" :date="dateFormatter(item.createdAt)" :message="item.message" />
        </ul>
    </div>
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import NotificationList from '@/components/alert/NotificationList.vue'
import { useNotificationStore } from '@/store/notification';
import dateFormatter from '@/util/dateFormatter'
import { onMounted } from 'vue';

const notificationStore = useNotificationStore()

onMounted(async () => {
    await notificationStore.fetchNotifications()
})
</script>