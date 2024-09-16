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
const idUser = ref(route.params.id);
const schema = yup.object().shape({
    name: yup.string().required('El nombre es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre de user no debe tener mas de 200 caracteres'),
    email: yup.string().required('La direccion es requerida').min(5, 'El nombre debe tener al menos 5 caracteres'),
    dni: yup.string().matches(/^[0-9]+$/, 'El teléfono solo puede contener números').required('El telefono es requerido').length(8, 'El telefono debe tener al 9 digitos'),
    estado: yup.string().required('El estado es requerido')
});
let user = reactive({
    id: idUser.value,
    name: '',
    dni: '',
    email: '',
    estado: 0,
})
function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)
    let formData = new FormData()
    formData.append("_method", "PUT")
    formData.append('id', user.id)
    formData.append('name', user.name)
    formData.append('dni', user.dni)
    formData.append('email', user.email)
    formData.append('estado', user.estado)


    axios.post(`${store.urlServidor}/users/${user.id}`, formData, { headers: store.headers() })
        .then((response) => {
            if (response.status === 200) {
                ElMessage({
                    message: 'Datos actualizados satisfactoriamente',
                    type: 'success',
                    onClose: () => {
                        // Aquí puedes ejecutar la acción que deseas cuando se cierra el mensaje
                        rutas.push('/usuarios');
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

    axios.get(store.urlServidor + '/users/' + idUser.value, { headers: store.headers() })
        .then((response) => {
            let datos = response.data.data
            user.id = datos.id
            user.name = datos.name
            user.dni = datos.dni
            user.email = datos.email
            user.estado = datos.estado.toString()
        }).catch((error) => {
            console.log(error)
        })
})
</script>

<template>
    <AppLayout :titulo="'Editar user ' + idUser">

        <Form class="m-5  rounded p-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <label class=" font-bold text-sm" for="name">Nombres y Apellidos:</label>
            <Field v-model="user.name"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="name" type="text" :class="{ 'border-red-300 text-red-400': errors.name }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.name }}</p>
            <label class=" font-bold text-sm" for="name">DNI:</label>
            <Field v-model="user.dni"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="dni" type="text" :class="{ 'border-red-300 text-red-400': errors.dni }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.dni }}</p>
            <label class=" font-bold text-sm" for="name">Email:</label>
            <Field v-model="user.email"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="email" type="text" />
            <div class="flex items-center">
                <label class=" font-bold text-sm mr-3" for="name">Estado:</label>
                <Field v-model="user.estado"
                    class="mr-3 text-gray-600 border-2 p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                    name="estado" type="radio" value="1" :class="{ 'border-red-300 text-red-400': errors.estado }" />Activo
                <Field v-model="user.estado"
                    class="mx-3  text-gray-600 border-2  p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                    name="estado" type="radio" value="0" :class="{ 'border-red-300 text-red-400': errors.estado }" />
                Inactivo
        </div>
        
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>

</AppLayout></template>

<style scoped></style>