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
    nombre: yup.string().required('El nombre es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre de almacen no debe tener mas de 200 caracteres'),
    direccion: yup.string().required('La direccion es requerida').min(5, 'El nombre debe tener al menos 5 caracteres'),
    telefono: yup.string().matches(/^[0-9]+$/, 'El teléfono solo puede contener números').required('El telefono es requerido').length(9, 'El telefono debe tener al 9 digitos'),
    estado: yup.string().required('El estado es requerido')
});


function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)

    axios.post(store.urlServidor + '/almacens', values, { headers: store.headers() })
        .then(() => {
            ElMessage({
                message: 'Datos actualizados satisfactoriamente',
                type: 'success',
                onClose: () => {
                    // Aquí puedes ejecutar la acción que deseas cuando se cierra el mensaje
                    rutas.push('/almacenes');
                },
            });

        })
        .catch(() => {
            alert('erorr')
        })
}

</script>

<template>
    <AppLayout titulo="Nueva Almacen">
        <Form class="m-5  rounded p-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <label class=" font-bold text-sm" for="name">Nombre de Almacen:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="nombre" type="text" :class="{ 'border-red-300 text-red-400': errors.nombre }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.nombre }}</p>
            <label class=" font-bold text-sm" for="name">Direccion:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="direccion" type="text" :class="{ 'border-red-300 text-red-400': errors.direccion }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.direccion }}</p>
            <label class=" font-bold text-sm" for="name">Descripcion:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="descripcion" type="text" />
            <label class=" font-bold text-sm" for="name">Telefono:</label>
            <Field
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="telefono" type="text" :class="{ 'border-red-300 text-red-400': errors.telefono }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.telefono }}</p>
            <div class="flex items-center">
                <label class=" font-bold text-sm mr-3" for="name">Estado:</label>
                <Field
                    class="mr-3 text-gray-600 border-2 p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                    name="estado" type="radio" value="1" :class="{ 'border-red-300 text-red-400': errors.estado }" />Activo
            <Field
                class="mx-3  text-gray-600 border-2  p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="estado" type="radio" value="0" :class="{ 'border-red-300 text-red-400': errors.estado }" />
            Inactivo
        </div>
        <p class=" text-red-500 text-xs mt-2">{{ errors.estado }}</p>
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>
</AppLayout></template>

<style scoped></style>