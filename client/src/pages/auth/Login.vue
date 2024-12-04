<template>
    <div class="w-full flex flex-col md:flex-row items-center justify-center h-screen">
        <div class="flex  flex-col md:flex-row w-11/12 md:w-3/5 bg-blue-50 p-20 rounded-2xl">

            <!--Vector animation start-->
            <div class="hidden md:block md:w-1/2 ">
                <img :src="loginSVG" alt="" srcset="">
            </div>

            <!--Vector animation end-->

            <div class=" md:w-1/2  ">
                <div>
                    <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>

                    <!-- Login Form -->
                    <Form @submit="onSubmit">
                        <div class="mb-4">
                            <fwb-input class="mb-2" type="email" v-model="formData.email" label="Email"
                                placeholder="Enter your Email" size="lg" />
                            <fwb-input type="password" v-model="formData.password" label="Password"
                                placeholder="Enter your Password" size="lg" />
                        </div>

                        <div class="mb-6">

                        </div>

                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <input type="checkbox" id="remember" name="remember"
                                    class="h-4 w-4 text-indigo-700 border-gray-300 rounded" />
                                <label for="remember" class="text-sm text-gray-600">Remember
                                    me</label>
                            </div>
                            <a href="#" class="text-sm text-indigo-700 hover:text-indigo-700">Forgot
                                password?</a>
                        </div>


                        <button type="submit"
                            class="w-full block text-center bg-indigo-900 text-white p-3 rounded-lg font-semibold hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Login
                        </button>


                    </Form>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import loginSVG from '@/assets/utility/Computer login-bro.svg'
import { FwbInput } from 'flowbite-vue'
import { reactive } from 'vue';
import { useAuthStore } from '@/store/auth'
import { Form } from 'vee-validate';


//Form data
const formData = reactive({
    email: '',
    password: ''
})

const authStore = useAuthStore();

const onSubmit = () => {
    console.log('form submitted')
}



</script>