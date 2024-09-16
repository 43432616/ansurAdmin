<script  setup>
import AppLayout from './../AppLayout.vue'; 
import {reactive,ref,onMounted} from 'vue'
import { defineComponent } from 'vue';
import { useField,useForm } from 'vee-validate';
import { useDatosStore } from './../../stores/datosApp';
import axios from 'axios';
import {Check,Delete,Edit,Message,Search,Star,} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const categorias=reactive([])
const store = useDatosStore()


onMounted(()=>{
    
    axios.get(store.urlServidor + '/categorias',{headers:store.headers()})
    .then((response)=>{
        categorias.splice(0, categorias.length, ...response.data.data);
    }).catch(()=>{

    })
})
const eliminarcategoria=(categoria)=>{
    ElMessageBox.confirm(
    'Desea eliminar el categoria: ' + categoria.nombre + '?',
    'Advertencia',
    {
      confirmButtonText: 'Si Eliminar',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  )
    .then(() => {

        axios.delete(`${store.urlServidor}/categorias/${categoria.id}`,{headers:store.headers()})
          .then(response => {
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
            axios.get(store.urlServidor + '/categorias',{headers:store.headers()})
            .then((response)=>{
                categorias.splice(0, categorias.length, ...response.data.data);
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

</script>
<template>
    <AppLayout titulo="Categorias">
        <div class="p-4">
            <div class="py-2 flex flex-row-reverse">
                <router-link to="/categorias/create">
                    <el-button type="primary">Nuevo categoria</el-button>
                </router-link>
            </div>
            <table class="w-full  rounded-2xl shadow">
                <thead class="border">
                    <tr>
                        <th
                            class="px-5 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                            Estado
                        </th>
                      
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Acciones
                        </th>
                       
                    </tr>
                </thead>
                <tbody class="border">
                    <tr class="hover:bg-gray-200" v-for="categoria in categorias" :key="categoria.id">
                        <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm ">
                            {{ categoria.id }}
                        </td>
                    
                       
                        <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm ">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{ categoria.nombre }}
                            </p>
                        </td>
                        <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm ">
                            <p class="text-gray-900 whitespace-no-wrap">
                                {{ categoria.descripcion }}
                            </p>
                        </td>
                        
                        <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm ">
                            <span class="rounded p-1 font-bold px-3 text-xs" :class="[categoria.estado==0?'bg-red-200 text-red-800':'bg-green-200 text-green-800']" >{{categoria.estado==0?'Suspendido':'Activo'}}</span>
                        </td>
                        <td class="px-5 py-3 border-b border-gray-200 bg-white text-sm ">
                            <router-link class="mr-2" :to="`/categorias/edit/${categoria.id}`">
                                <el-button  type="warning" :icon="Edit" plain></el-button>
                            </router-link>
                            <el-button v-on:click="eliminarcategoria(categoria)" type="danger" :icon="Delete" plain></el-button>
                            

                        </td>
                    </tr>
                </tbody>
        </table>
        </div>
        
    </AppLayout>
</template>
<style scoped>
tr:hover td {
    background-color: #f1f5f9; /* Estilo de hover */
  }
</style>