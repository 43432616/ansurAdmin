<script setup>
import AppLayout from './../AppLayout.vue';
import { reactive, ref } from 'vue'
import * as yup from 'yup';
import { Form, Field } from 'vee-validate';
import { useDatosStore } from './../../stores/datosApp';
import axios from 'axios'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const rutas = useRouter(); // Obtener una referencia al enrutador
const store = useDatosStore()

// Definir el esquema de validación con yup
const schema = yup.object().shape({
    name: yup.string().required('El nombre del usuario es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre del usuario no debe tener mas de 200 caracteres'),
    email: yup.string().required('El email es requerido').min(5, 'El nombre debe tener al menos 5 caracteres'),
    dni: yup.string().matches(/^[0-9]+$/, 'El dni solo puede contener números').required('El dni es requerido').length(8, 'El dni debe tener al 9 digitos'),
    password: yup.string().required('La contraseña es requerida')
});


function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)

    axios.post(store.urlServidor + '/users', values, { headers: store.headers() })
        .then(() => {
            ElMessage({
                message: 'Datos actualizados satisfactoriamente',
                type: 'success',
                onClose: () => {
                    // Aquí puedes ejecutar la acción que deseas cuando se cierra el mensaje
                    rutas.push('/usuarios');
                },
            });

        })
        .catch(() => {
            alert('erorr')
        })
}

</script>

<template>
    <AppLayout titulo="Nuevo Usuario">
        <Form class="m-5  rounded p-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <label class=" font-bold text-sm" for="name">Nombres y Apellidos:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="name" type="text" :class="{ 'border-red-300 text-red-400': errors.name }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.name }}</p>
            <label class=" font-bold text-sm" for="name">DNI:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="dni" type="text" :class="{ 'border-red-300 text-red-400': errors.dni }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.dni }}</p>
            <label class=" font-bold text-sm" for="name">Email:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="email" type="text" :class="{ 'border-red-300 text-red-400': errors.email }" />
                <p class=" text-red-500 text-xs mt-2">{{ errors.email }}</p>
            <label class=" font-bold text-sm" for="name">Password:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="password" type="password" :class="{ 'border-red-300 text-red-400': errors.password }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.password }}</p>
            
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>
</AppLayout></template>

<style scoped></style>