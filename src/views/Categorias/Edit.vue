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
const idCategoria = ref(route.params.id);
const schema = yup.object().shape({
    nombre: yup.string().required('El nombre es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre de categoria no debe tener mas de 200 caracteres'),
    descripcion: yup.string().required('La descripcion es requerida').min(5, 'El nombre debe tener al menos 5 caracteres'),
    estado: yup.string().required('El estado es requerido')
});
let categoria = reactive({
    id: idCategoria.value,
    nombre: '',
    descripcion: '',
    estado: 0,
})
function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)

    let formData = new FormData()
    formData.append("_method", "PUT")
    formData.append('id', categoria.id)
    formData.append('nombre', categoria.nombre)
    formData.append('descripcion', categoria.descripcion)
    formData.append('estado', categoria.estado)


    axios.post(`${store.urlServidor}/categorias/${categoria.id}`, formData, { headers: store.headers() })
        .then((response) => {
            if (response.status === 200) {
                ElMessage({
                    message: 'Datos actualizados satisfactoriamente',
                    type: 'success',
                    onClose: () => {
                        // Aquí puedes ejecutar la acción que deseas cuando se cierra el mensaje
                        rutas.push('/categorias');
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

    axios.get(store.urlServidor + '/categorias/' + idCategoria.value, { headers: store.headers() })
        .then((response) => {
            let datos = response.data.data
            categoria.id = datos.id
            categoria.nombre = datos.nombre
            categoria.descripcion = datos.descripcion
            categoria.estado = datos.estado.toString()
        }).catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <AppLayout :titulo="'Editar Categoria ' + idCategoria">

        <Form class="m-5  rounded p-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <label class=" font-bold text-sm" for="name">Nombre:</label>
            <Field v-model="categoria.nombre"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="nombre" type="text" :class="{ 'border-red-300 text-red-400': errors.nombre }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.nombre }}</p>
            <label class=" font-bold text-sm" for="name">descripcion:</label>
            <Field v-model="categoria.descripcion"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="descripcion" type="text" :class="{ 'border-red-300 text-red-400': errors.descripcion }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.descripcion }}</p>
            <div class="flex items-center">
                <label class=" font-bold text-sm mr-3" for="name">Estado:</label>
                <Field v-model="categoria.estado"
                    class="mr-3 text-gray-600 border-2 p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                    name="estado" type="radio" value="1" :class="{ 'border-red-300 text-red-400': errors.estado }" />Activo
                <Field v-model="categoria.estado"
                    class="mx-3  text-gray-600 border-2  p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                    name="estado" type="radio" value="0" :class="{ 'border-red-300 text-red-400': errors.estado }" />
                Inactivo
        </div>
        <p class=" text-red-500 text-xs mt-2">{{ errors.estado }}</p>
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>

</AppLayout></template>

<style scoped></style>