<template>
    <div class="grid gap-4 mb-4 grid-cols-2">
        <div class="col-span-2">
            <fwb-input v-model="model._id" type="hidden" />
        </div>

        <div class="col-span-1">
            <fwb-input autocomplete="off" v-model="model.firstName" label="First Name" placeholder="First Name" size="lg" />
        </div>

        <div class="col-span-1">
            <fwb-input autocomplete="off" v-model="model.lastName" label="Last Name" placeholder="Last Name" size="lg" />
        </div>

        <div class="col-span-2">
            <fwb-input type="email" autocomplete="off" v-model="model.email" label="Email" placeholder="Your Email"
                size="lg" />
        </div>


        <div class="col-span-2">
            <fwb-select autocomplete="off" v-model="model.role" :options="roles" label="Select Role" size="lg" />
        </div>


    </div>
</template>

<script setup>
import { FwbInput, FwbTextarea, FwbSelect } from 'flowbite-vue'

const model = defineModel({ required: true })
const roles = [
    { value: 'admin', name: "Admin" },
    { value: 'storekeeper', name: "Storekeeper" },
    { value: 'salesperson', name: "Sales" },
]

</script>