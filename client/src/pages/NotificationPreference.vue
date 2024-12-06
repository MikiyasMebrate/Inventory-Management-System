<template>
    <Breadcrumb name="Notification Preference" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">Preferences</p>
        <form @submit.prevent="onSubmit">
            <ul
                class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <BorderedCheckBox v-model="formData.receiveSaleNotifications" label="Sale" />
                <BorderedCheckBox v-model="formData.receiveRestockNotifications" label="Restock" />
                <BorderedCheckBox v-model="formData.receiveReturnNotifications" label="Return" />
                <BorderedCheckBox v-model="formData.receiveCategoryNotifications" label="Category" />
            </ul>
            <div class="flex justify-end mt-5">
                <Button type="submit" title="Update Preference"></Button>
            </div>
        </form>
    </section>
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import BorderedCheckBox from '@/components/ui/BorderedCheckBox.vue';
import Button from '@/components/ui/Button.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useNotificationPreferenceStore } from '@/store/notificationPreference';

const preferenceStore = useNotificationPreferenceStore()

const formData = ref({
    receiveSaleNotifications: false,
    receiveRestockNotifications: false,
    receiveReturnNotifications: false,
    receiveCategoryNotifications: false,
    receiveProductNotifications: false
})


onMounted(() => {
    preferenceStore.fetchPreferences()

    formData.value.receiveSaleNotifications = preferenceStore.preferences.receiveSaleNotifications
    formData.value.receiveRestockNotifications = preferenceStore.preferences.receiveRestockNotifications
    formData.value.receiveReturnNotifications = preferenceStore.preferences.receiveReturnNotifications
    formData.value.receiveCategoryNotifications = preferenceStore.preferences.receiveCategoryNotifications
})

const onSubmit = () => {
    console.log("form submitted")
}
</script>