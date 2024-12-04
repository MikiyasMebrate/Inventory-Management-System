<script setup>
import loginSVG from '@/assets/utility/Computer login-bro.svg';
import { FwbInput } from 'flowbite-vue';
import { useAuthStore } from '@/store/auth';
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
const validationSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })
)

const { handleSubmit, errors } = useForm({
    validationSchema
})

const { value: email } = useField('email')
const { value: password } = useField('password')


// Auth store (optional functionality)
const authStore = useAuthStore();

// Submit handler
const onSubmit = handleSubmit((value) => {
    authStore.login({
        email: value.email,
        password: value.password
    })
});
</script>


<template>
    <div class="w-full flex flex-col md:flex-row items-center justify-center h-screen">
        <div class="flex flex-col md:flex-row w-11/12 md:w-3/5 bg-blue-50 p-20 rounded-2xl">
            <!--Vector animation start-->
            <div class="hidden md:block md:w-1/2">
                <img :src="loginSVG" alt="Login SVG" />
            </div>
            <!--Vector animation end-->

            <div class="md:w-1/2">
                <div>
                    <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>

                    <!-- Login Form -->
                    <form @submit="onSubmit">
                        <div class="mb-4">
                            <!-- Email Input -->
                            <fwb-input v-model="email" type="email" validation-status="'success'" label="Email"
                                placeholder="Enter your Email" size="lg" />
                            <span class="text-red-600">{{ errors.email }}</span>


                            <!-- Password Input -->
                            <fwb-input v-model="password" type="password" label="Password" placeholder="Enter your Password"
                                size="lg" />
                            <span class="text-red-600">{{ errors.password }}</span>

                        </div>

                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <input type="checkbox" id="remember" name="remember"
                                    class="h-4 w-4 text-indigo-700 border-gray-300 rounded" />
                                <label for="remember" class="text-sm text-gray-600">Remember me</label>
                            </div>
                            <a href="#" class="text-sm text-indigo-700 hover:text-indigo-700">Forgot password?</a>
                        </div>

                        <button type="submit"
                            class="submit-btn w-full block text-center bg-indigo-900 text-white p-3 rounded-lg font-semibold hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>




