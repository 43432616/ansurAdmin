<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import {reactive} from 'vue'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ElMessage } from 'element-plus'
import { useDatosStore } from './../stores/datosApp';
import axios from 'axios';
library.add(faArrowRight)

import { useRouter } from 'vue-router'; // Importar el enrutador
const store = useDatosStore()

const router = useRouter(); // Obtener una referencia al enrutador
let loginData = reactive({
    email: '',
    password: '',
})
const login=()=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    axios.post(store.urlServidor + '/login',loginData)
    .then((response)=>{
        store.isLoginOk()
        store.guardarData(response.data.user,response.data.authorisation)
        //console.log(response.data)
        router.push('/dashboard');
    }).catch((error)=>{
        if (error.response.status === 401) {
            ElMessage.error('Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña.')
        } else {
            ElMessage.error('Ha ocurrido un error en el inicio de sesión.')
        }
        
    })
}
</script>
<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 z-0 ">

    <div class="relative flex flex-col  ">
    <div class="absolute border bg-red-500  -rotate-[5deg]  w-full left-0 h-full rounded-3xl top-0 z-10"></div>
    <div class="bg-white drop-shadow-lg shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-2 rounded-3xl w-50 max-w-md relative z-30">
        <img class="h-[120px] mx-auto" src="./../assets/logo.jpg" />
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
        Ingresar sus credencias para acceder al sistema.
        </div>
        <div class="mt-6">
        <form v-on:submit.prevent="login()">
            <div class="flex flex-col mb-5 text-slate-700">
            <label for="email" class="font-bold mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Correo
                Electronico:</label>
            <input v-model="loginData.email" type="text" class="shadow border-2 rounded-md border-gray-200 p-2 focus:outline-none focus:border-red-500 hover:border-2 focus:border-2"
                placeholder="example@correo.com">

            <div class="relative">
                <div class=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <i class="fas fa-at text-blue-500"></i>
                </div>
            </div>
            </div>
            <div class="flex flex-col mb-6">
            <label for="password" class="font-bold mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Contraseña:</label>
            <input v-model="loginData.password" type="password" class="shadow border-2 rounded-md border-gray-200 p-2 focus:outline-none focus:border-red-500 hover:border-2 focus:border-2"
                placeholder="********">

            <div class="relative mx-auto">
                <button class="mt-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded-md px-4">
                Ingresar 
                <div class=" items-center inline-flex justify-center relative  w-8 text-white">
                <span>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </span>
                </div>
            </button>
            </div>
            </div>
        </form>
        </div>
    </div>


    </div>
    <div class="flex justify-center items-center mt-6">
    <button v-on:click="login()" class=" inline-flex items-center text-gray-700 font-medium text-xs text-center">
        <span class="ml-2">Grupo 2 - 2023 -IC</span>

    </button>
    </div>
    </div>    
</template>
<style scoped>

</style>