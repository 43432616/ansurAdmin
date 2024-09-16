<script setup>
import AppLayout from './../AppLayout.vue';
import { reactive, ref,onMounted } from 'vue'
import * as yup from 'yup';
import { Form, Field } from 'vee-validate';
import { useDatosStore } from './../../stores/datosApp';
import axios from 'axios'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const rutas = useRouter(); // Obtener una referencia al enrutador
const store = useDatosStore()
const categorias=reactive([])
const almacenes=reactive([])
const fileInput = ref(null);
let imagenBase=ref('data:image/png;base64,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')

let articulo = reactive({
  
    nombre: '',
    descripcion: '',
    precio:'',
    oferta:'0',
    stock:'',
    categoria:'0',
    almacen:'0',
    imagen:imagenBase.value
})

const seleccionaImagen = () => {
      if (fileInput.value.files.length > 0) {
        articulo.imagen = fileInput.value.files[0]
        //nombreArchivo.value = fileInput.value.files[0].name;
      } else {
        //nombreArchivo.value = '';
      }
      const file = fileInput.value.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        imagenBase.value = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };
// Definir el esquema de validación con yup
const schema = yup.object().shape({
    nombre: yup.string().required('El nombre del articulo es requerido').min(5, 'El nombre debe tener al menos 5 caracteres').max(200, 'El nombre del articulo no debe tener mas de 200 caracteres'),
    descripcion: yup.string().required('La descripcion es requerido').min(5, 'La descripcion debe tener al menos 5 caracteres'),
    precio: yup.string().required('El precio es requerido').min(1, 'El precio debe tener al menos 5 caracteres'),
    oferta: yup.string().min(1, 'La oferta debe tener al menos 1 caracteres'),
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
})
function onSubmit(values) {
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
    //console.log(values)
    // Obtén el token JWT desde tu fuente de datos (por ejemplo, localStorage, Vuex, etc.)
    let formData = new FormData()
        formData.append('nombre', articulo.nombre)
        formData.append('descripcion', articulo.descripcion)
        formData.append('precio', articulo.precio)
        formData.append('oferta', articulo.oferta)
        formData.append('url', 'none')
        formData.append('cantidad_stock', articulo.stock)
        formData.append('categoria_id', articulo.categoria)
        formData.append('almacen_id', articulo.almacen)
        formData.append('image', articulo.imagen)
    axios.post(store.urlServidor + '/articulos', formData, { headers: store.headers() })
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
    <AppLayout titulo="Nuevo Articulo">
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
                <label class=" font-bold text-sm" for="name">Oferta:</label>
            <Field v-model="articulo.oferta"
                class="text-gray-600 border-2 w-full p-1 pl-3 rounded-lg hover:border-blue-600 outline-none active:border-2"
                name="oferta" type="text" :class="{ 'border-red-300 text-red-400': errors.oferta }" />
            <p class=" text-red-500 text-xs mt-2">{{ errors.oferta }}</p>
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
            <div>
                <div>
                <label for="dropzone-file"
                    class=" bg-blue-600 cursor-pointer px-2 justify-center text-xs my-2 mx-auto items-center  p-2 rounded-lg text-white hover:bg-blue-500">
                    <i class="fa-solid fa-plus"> Elegir imagen</i>
                    
                </label>
                <input ref="fileInput" @change="seleccionaImagen" @input="configuracion.url = $event.target.files[0]" class="hidden" id="dropzone-file"
                    type="file" accept="image/*" />
                <img class="mt-3 block  max-h-[300px] border-2 border-slate-400 p-2 shadow-lg " :src="imagenBase"/>
            </div>
            </div>
        <button class="bg-blue-600 p-2 mt-2  rounded text-white px-6 text-md" type="submit">Enviar</button>
    </Form>
</AppLayout></template>

<style scoped></style>