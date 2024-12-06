<template>
    <Breadcrumb name="Notification Preference" />

    <section class="mt-5">
        <p class="my-5 text-3xl font-bold">Preferences</p>
        <form>
            <ul
                class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <BorderedCheckBox label="Sale" />
                <BorderedCheckBox label="Restock" />
                <BorderedCheckBox label="Return" />
                <BorderedCheckBox label="Category" />
            </ul>
            <div class="flex justify-end mt-5">
                <Button title="Update Preference"></Button>
            </div>
        </form>
    </section>
</template>

<script setup>
import Breadcrumb from '@/components/ui/Breadcrumb.vue';
import BorderedCheckBox from '@/components/ui/BorderedCheckBox.vue';
import Button from '@/components/ui/Button.vue';
</script>