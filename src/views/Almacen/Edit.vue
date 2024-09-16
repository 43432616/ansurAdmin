<script setup>
import AppLayout from '../AppLayout.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { useDatosStore } from './../../stores/datosApp';
import axios from 'axios'
import { ElMessage } from 'element-plus'

const store = useDatosStore()
const route = useRoute();
const rutas = useRouter()
const idAlmacen = ref(route.params.id);
const schema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre de almacen no debe tener mas de 200 caracteres'),
    direccion: yup.string().required('La direccion es requerida').min(5, 'El nombre debe tener al menos 5 caracteres'),
    telefono: yup.string().matches(/^[0-9]+$/, 'El teléfono solo puede contener números').required('El telefono es requerido').length(9, 'El telefono debe tener al 9 digitos'),
    estado: yup.string().required('El estado es requerido')
});
let almacen = reactive({
    id: idAlmacen.value,
    nombre: '',
    direccion: '',
    descripcion: '',
    telefono: '',
    estado: 0,
})
function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)

    let formData = new FormData()
    formData.append("_method", "PUT")
    formData.append('id', almacen.id)
    formData.append('nombre', almacen.nombre)
    formData.append('direccion', almacen.direccion)
    formData.append('descripcion', almacen.descripcion)
    formData.append('telefono', almacen.telefono)
    formData.append('estado', almacen.estado)


    axios.post(`${store.urlServidor}/almacens/${almacen.id}`, formData, { headers: store.headers() })
        .then((response) => {
            if (response.status === 200) {
                ElMessage({
                    message: 'Datos actualizados satisfactoriamente',
                    type: 'success',
                    onClose: () => {
                        // Aquí puedes ejecutar la acción que deseas cuando se cierra el mensaje
                        rutas.push('/almacenes');
                    },
                });
            }
        }).catch((error) => {
            ElMessage({
                    message: 'Error Inesperado ',
                    type: 'warning',
                });
        })
}
onMounted(() => {

    axios.get(store.urlServidor + '/almacens/' + idAlmacen.value, { headers: store.headers() })
        .then((response) => {
            let datos = response.data.data
            almacen.id = datos.id
            almacen.nombre = datos.nombre
            almacen.direccion = datos.direccion
            almacen.descripcion = datos.descripcion
            almacen.telefono = datos.telefono
            almacen.estado = datos.estado.toString()
        }).catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <AppLayout :titulo="'Editar Almacen ' + idAlmacen">

        <Form class="m-5  rounded p-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <label class=" font-bold text-sm" for="name">Nombre:</label>
            <Field v-model="almacen.nombre"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="nombre" type="text" :class="{ 'border-red-300 text-red-400': errors.nombre }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.nombre }}</p>
            <label class=" font-bold text-sm" for="name">Direccion:</label>
            <Field v-model="almacen.direccion"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="direccion" type="text" :class="{ 'border-red-300 text-red-400': errors.direccion }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.direccion }}</p>
            <label class=" font-bold text-sm" for="name">Descripcion:</label>
            <Field v-model="almacen.descripcion"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="descripcion" type="text" />
            <label class=" font-bold text-sm" for="name">Telefono:</label>
            <Field v-model="almacen.telefono"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="telefono" type="text" :class="{ 'border-red-300 text-red-400': errors.telefono }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.telefono }}</p>
            <div class="flex items-center">
                <label class=" font-bold text-sm mr-3" for="name">Estado:</label>
                <Field v-model="almacen.estado"
                    class="mr-3 text-gray-600 border-2 p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                    name="estado" type="radio" value="1" :class="{ 'border-red-300 text-red-400': errors.estado }" />Activo
                <Field v-model="almacen.estado"
                    class="mx-3  text-gray-600 border-2  p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                    name="estado" type="radio" value="0" :class="{ 'border-red-300 text-red-400': errors.estado }" />
                Inactivo
        </div>
        <p class=" text-red-500 text-xs mt-2">{{ errors.estado }}</p>
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>

</AppLayout></template>

<style scoped></style>