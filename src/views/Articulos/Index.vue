<script setup>
import AppLayout from './../AppLayout.vue';
import { reactive, ref,onMounted,watch } from 'vue'
import axios from 'axios'
import { useDatosStore } from './../../stores/datosApp';
import {Check,Delete,Edit,Message,Search,Star,} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useDatosStore()
const articulos =ref({})
const categorias=reactive([])
const almacenes=reactive([])
let idcategoria = ref('0')
let idalmacen = ref('0')

watch([idcategoria,idalmacen],()=>{
    axios.get(store.urlServidor + '/articulos',{
        params: {
          categoria: idcategoria.value,
          almacen: idalmacen.value,
        },
        headers:store.headers()
  })
    .then((response) => {
        articulos.value=response.data.data
    })
})


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
    axios.get(store.urlServidor + '/articulos',{headers:store.headers()})
    .then((response)=>{
        console.log(response.data.data)
        //articulos.splice(0, articulos.length)
        articulos.value=response.data.data
    }).catch(()=>{

    })

})

const eliminarArticulo=(articulo)=>{
    ElMessageBox.confirm(
    'Desea eliminar el articulo: ' + articulo.nombre + '?',
    'Advertencia',
    {
      confirmButtonText: 'Si Eliminar',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  )
    .then(() => {

        axios.delete(`${store.urlServidor}/articulos/${articulo.id}`,{headers:store.headers()})
          .then(response => {
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
            axios.get(store.urlServidor + '/articulos',{headers:store.headers()})
            .then((response)=>{
                articulos.splice(0, articulos.length, ...response.data.data);
            }).catch(()=>{

            })
          })
          .catch(error => {
            console.log(error)
          })
      
    })
    .catch(() => {
      
    })
}
const verArticulos=(url)=>{
   
    axios.get(url,{
            params: {
            categoria: idcategoria.value,
            almacen: idalmacen.value,
            },
            headers:store.headers()
    })
        .then((response) => {
            articulos.value=response.data.data
        })
}
</script>
<template>
    <AppLayout titulo="Articulos">
        <div class="p-4">
            Categoria
            <el-select v-model="idcategoria" class="m-2" placeholder="Select" size="large">
                <el-option  label="Seleccione Categoria" value="0" />
                <el-option v-for="categoria in categorias" :key="categoria.id" :label="categoria.nombre" :value="categoria.id" />
            </el-select>
            Almacen
            <el-select v-model="idalmacen" class="m-2" placeholder="Select" size="large">
                <el-option  label="Seleccione Almacen" value="0" />
                <el-option v-for="almacen in almacenes" :key="almacen.id" :label="almacen.nombre" :value="almacen.id" />
            </el-select>
           

            <div class="py-2 flex flex-row-reverse">
                <router-link to="/articulos/create">
                    <el-button type="primary">Nuevo Articulo</el-button>
                </router-link>
            </div>
            <table class="w-full border">
                <thead>
                    <tr>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Descripcion
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Precio
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Stock Minimo
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Categoria
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Almacen
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="articulo in articulos.data" :key="articulo.id">
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {{ articulo.id }}
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap"> {{ articulo.nombre }}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{ articulo.descripcion }}
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{ articulo.precio }}
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{ articulo.cantidad_stock }}
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{categorias.find(ele=>ele.id==articulo.categoria_id).nombre }}
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{ almacenes.find(ele=>ele.id==articulo.almacen_id).nombre }}
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <router-link class="mr-2" :to="`/articulos/edit/${articulo.id}`">
                                <el-button  type="warning" :icon="Edit" plain></el-button>
                            </router-link>
                            <el-button v-on:click="eliminarArticulo(articulo)" type="danger" :icon="Delete" plain></el-button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="paginacion mt-3 flex justify-center text-sm">
                    <template v-for="(link) in articulos.links">
                        
                        <button   v-on:click="verArticulos(link.url)" class=" bg-blue-300 text-white mx-1 p-2 rounded hover:bg-blue-500" :class="link.active?'bg-blue-900':''">{{link.label.includes('Next')?'Siguiente':link.label.includes('Previous')?'Anterior':link.label }}</button>
                            
                     
                        
                    </template>
                </div>
        </div>
    </AppLayout>
</template>