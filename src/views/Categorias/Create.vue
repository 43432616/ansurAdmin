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
    nombre: yup.string().required('El nombre del usuario es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre del usuario no debe tener mas de 200 caracteres'),
    descripcion: yup.string().required('El email es requerido').min(5, 'El nombre debe tener al menos 5 caracteres'),

});


function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)

    axios.post(store.urlServidor + '/categorias', values, { headers: store.headers() })
        .then(() => {
            ElMessage({
                message: 'Datos actualizados satisfactoriamente',
                type: 'success',
                onClose: () => {
                    // Aquí puedes ejecutar la acción que deseas cuando se cierra el mensaje
                    rutas.push('/categorias');
                },
            });

        })
        .catch(() => {
            alert('erorr')
        })
}

</script>

<template>
    <AppLayout titulo="Nueva Categoria">
        <Form class="m-5  rounded p-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <label class=" font-bold text-sm" for="name">Nombre:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="nombre" type="text" :class="{ 'border-red-300 text-red-400': errors.nombre }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.nombre }}</p>
            <label class=" font-bold text-sm" for="name">Descripcion:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="descripcion" type="text" :class="{ 'border-red-300 text-red-400': errors.descripcion }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.descripcion }}</p>
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>
</AppLayout></template>

<style scoped></style>