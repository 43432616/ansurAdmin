<script setup>
import AppLayout from './../AppLayout.vue';
import { reactive, ref,onMounted } from 'vue'
import * as yup from 'yup';
import { Form, Field } from 'vee-validate';
import { useDatosStore } from './../../stores/datosApp';
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
const rutas = useRouter(); // Obtener una referencia al enrutador
const store = useDatosStore()

const route = useRoute();
const idArticulo = ref(route.params.id);
const categorias=reactive([])
const almacenes=reactive([])

let articulo = reactive({
  
    nombre: '',
    descripcion: '',
    precio:'',
    stock:'',
    categoria:'0',
    almacen:'0'
})
// Definir el esquema de validación con yup
const schema = yup.object().shape({
    nombre: yup.string().required('El nombre del articulo es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre del articulo no debe tener mas de 200 caracteres'),
    descripcion: yup.string().required('La descripcion es requerido').min(5, 'El nombre debe tener al menos 5 caracteres'),
    precio: yup.string().required('El precio es requerido').min(1, 'El nombre debe tener al menos 5 caracteres'),
    stock: yup.string().required('El stock es requerido').min(1, 'El nombre debe tener al menos 5 caracteres'),

});

onMounted(()=>{
    axios.get(store.urlServidor + '/categorias',{headers:store.headers()})
    .then((response)=>{
        categorias.splice(0, categorias.length, ...response.data.data);
    }).catch(()=>{

    })

    axios.get(store.urlServidor + '/almacens',{headers:store.headers()})
    .then((response)=>{
        almacenes.splice(0, almacenes.length, ...response.data.data);
    }).catch(()=>{

    })

    axios.get(store.urlServidor + '/articulos/' + idArticulo.value, { headers: store.headers() })
        .then((response) => {
            let datos = response.data.data
            articulo.id = datos.id
            articulo.nombre = datos.nombre
            articulo.descripcion = datos.descripcion
            articulo.precio = datos.precio
            articulo.stock = datos.cantidad_stock
            articulo.categoria = datos.categoria_id
            articulo.almacen = datos.almacen_id
        }).catch((error) => {
            console.log(error)
        })
})
function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)
    let formData = new FormData()
        formData.append("_method", "PUT")
        formData.append('nombre', articulo.nombre)
        formData.append('descripcion', articulo.descripcion)
        formData.append('precio', articulo.precio)
        formData.append('url', 'none')
        formData.append('cantidad_stock', articulo.stock)
        formData.append('categoria_id', articulo.categoria)
        formData.append('almacen_id', articulo.almacen)
    axios.post(`${store.urlServidor}/articulos/${articulo.id}`, formData, { headers: store.headers() })
        .then(() => {
            ElMessage({
                message: 'Datos actualizados satisfactoriamente',
                type: 'success',
                onClose: () => {
                    // Aquí puedes ejecutar la acción que deseas cuando se cierra el mensaje
                    rutas.push('/articulos');
                },
            });

        })
        .catch(() => {
            alert('erorr')
        })
        console.log(articulo)
}

</script>

<template>
    <AppLayout :titulo="'Editar Articulo ' + idArticulo">
        <Form class="m-5  rounded p-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <label class=" font-bold text-sm" for="name">Nombre:</label>
            <Field v-model="articulo.nombre"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="nombre" type="text" :class="{ 'border-red-300 text-red-400': errors.nombre }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.nombre }}</p>
            <label class=" font-bold text-sm" for="name">Descripcion:</label>
            <Field v-model="articulo.descripcion"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="descripcion" type="text" :class="{ 'border-red-300 text-red-400': errors.descripcion }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.descripcion }}</p>
            <label class=" font-bold text-sm" for="name">Precio:</label>
            <Field v-model="articulo.precio"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="precio" type="text" :class="{ 'border-red-300 text-red-400': errors.precio }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.precio }}</p>
            <label class=" font-bold text-sm" for="name">Stock Minimo:</label>
            <Field v-model="articulo.stock"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="stock" type="text" :class="{ 'border-red-300 text-red-400': errors.stock }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.stock }}</p>
            <label class=" font-bold text-sm" for="name">Categoria:</label>
            <el-select  v-model="articulo.categoria" name="categoria" class="m-2 w-full" placeholder="Select" size="large">
                <el-option  label="Seleccione Categoria" value="0" />
                <el-option v-for="categoria in categorias" :key="categoria.id" :label="categoria.nombre" :value="categoria.id" />
            </el-select>
            <label class=" font-bold text-sm" for="name">Almacen:</label>
            <el-select v-model="articulo.almacen" name="almacen"  class="m-2 w-full" placeholder="Select" size="large">
                <el-option  label="Seleccione Almacen" value="0" />
                <el-option v-for="almacen in almacenes" :key="almacen.id" :label="almacen.nombre" :value="almacen.id" />
            </el-select>
            <div></div>
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>
</AppLayout></template>

<style scoped></style>