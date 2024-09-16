<script setup>
import { ref, withModifiers } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faStore, faGauge,faBoxOpen,faList,faUsers,faKey,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useDatosStore } from './../stores/datosApp';
const myProps=defineProps({
    titulo:{
        default:'Mi titulo'
    }
})

library.add(faBars, faStore, faUser, faGauge,faBoxOpen,faList,faUsers,faKey,faRightFromBracket)

const store = useDatosStore()

const showOptions =ref(true);

const toggleShow = () => {
  store.toogleMenu();
};

const handleClick = () => {
  toggleShow();
};


</script>
<template>
    <div class="h-screen flex flex-col overflow-x-hidden">
        <header class=" w-full flex shadow bg-red-700 text-white">
            <div class=" flex relative items-center py-2  bg-red-900" :class="[store.showMenu? 'min-w-[60px]':'min-w-[210px]']" >
                <font-awesome-icon class="mx-1"  fixed-width :icon="['fas', 'store']" />
                <div class=" overflow-hidden">
                    <p class="transition-all 	mr-2  " :class="[store.showMenu ? ' -ml-32' : '']">Ansur Peru 2023</p>
                </div>
            </div>
                
            <div class=" flex-1 flex justify-between items-strech ">
                <div class="flex items-center">
                    <button v-on:click="toggleShow()" class="ml-3 py-2 border-transparent hover:border px-2 rounded hover:border-red-200  text-xl">
                        <font-awesome-icon :icon="['fas', 'bars']" />
                    </button>
                </div>
                
                <div class="px-3 relative ">
                    <div v-on:click="showOptions=!showOptions" class="flex items-center hover:bg-slate-900 h-full py-3 px-4 hover:bg-opacity-25 cursor-pointer">
                        <div>
                            <p class="text-slate-50 text-md  mr-2">{{store.datosApi.user.name}}</p>
                            <p class="text-slate-50 text-xs  mr-2">{{store.datosApi.user.email}}</p>
                        </div>
                        <font-awesome-icon class="hover:cursor-pointer border p-3 rounded-full" :icon="['far', 'user']" />
                    </div>                    
                    <div class="transition-all  border right-0  py-2 absolute w-full mt-2 top-full  bg-white rounded-xl shadow text-slate-500 flex flex-col text-sm"
                    :class="[showOptions ? '-mr-64 ' : 'mr-4']">
                        <a class="p-2 mr-2  rounded-r my-1 hover:bg-slate-600 hover:text-white" href="#"><font-awesome-icon class="mr-2" :icon="['fas', 'key']" />Cambiar Contraseña</a>
                        <a @click="store.logout()" class="p-2 mr-2  rounded-r my-1 hover:bg-slate-600 hover:text-white" href="#"><font-awesome-icon class="mr-2" :icon="['fas', 'right-from-bracket']" />Cerrar Sesion</a>
                    </div>
                </div>
            </div>
        </header>
        <main class="flex-1 b w-full flex bg-slate-300 ">
            <aside class="items-center relative bg-slate-50 shadow-sm" :class="[store.showMenu? 'min-w-[60px]':'min-w-[210px]']">
                <p v-if="!store.showMenu" class="text-sm my-4 font-medium text-slate-400 text-center relative">
                   MENU PRINCIPAL 
                </p>
                <nav class="flex flex-col gap-2 text-slate-600 pl-2 box-border mt-5">
                    <router-link class="flex items-center hover:bg-slate-500 rounded-l-lg hover:text-white" to="/dashboard" exact-active-class="bg-slate-500 text-white">
                        <font-awesome-icon class="m-3"  fixed-width :icon="['fas', 'gauge']" />
                        <div class=" overflow-hidden">
                            <p class="transition-all 	mr-2  " :class="[store.showMenu ? '-ml-32' : '']">Tablero </p>
                        </div>
                    </router-link>

                    <router-link class="flex items-center hover:bg-slate-500 rounded-l-lg hover:text-white" to="/articulos" exact-active-class="bg-slate-500 text-white">
                        <font-awesome-icon class="m-3"  fixed-width :icon="['fas', 'box-open']" />
                        <div class=" overflow-hidden">
                            <p class="transition-all 	mr-2  " :class="[store.showMenu ? '-ml-32' : '']">Articulos</p>
                        </div>
                    </router-link>
                    <router-link class="flex items-center hover:bg-slate-500 rounded-l-lg hover:text-white" to="/categorias" exact-active-class="bg-slate-500 text-white">
                        <font-awesome-icon class="m-3"  fixed-width :icon="['fas', 'list']" />
                        <div class=" overflow-hidden">
                            <p class="transition-all 	mr-2  " :class="[store.showMenu ? '-ml-32' : '']">Categorias</p>
                        </div>
                    </router-link>
                    <router-link class="flex items-center hover:bg-slate-500 rounded-l-lg hover:text-white" to="/usuarios" exact-active-class="bg-slate-500 text-white">
                        <font-awesome-icon class="m-3"  fixed-width :icon="['fas', 'users']" />
                        <div class=" overflow-hidden">
                            <p class="transition-all 	mr-2  " :class="[store.showMenu ? '-ml-32' : '']">Usuarios</p>
                        </div>
                    </router-link>
                    <router-link class="flex items-center hover:bg-slate-500 rounded-l-lg hover:text-white" :to="{ path: '/almacenes' }"  :class="{ 'bg-slate-500 text-white': $route.path.startsWith('/almacenes') }">
                        <font-awesome-icon class="m-3"  fixed-width :icon="['fas', 'store']" />
                        <div class=" overflow-hidden">
                            <p class="transition-all 	mr-2  " :class="[store.showMenu ? '-ml-32' : '']">Almacen</p>
                        </div>
                    </router-link>
                </nav>
            </aside>
            <section class="mx-5 my-3 w-full flex flex-col">
                <h1 class="text-lg uppercase font-semibold my-2 text-slate-600">{{titulo}}</h1>
                <div class="w-full bg-white shadow-xl rounded-xl flex-1 " >
                    <slot />
                </div>
                
            </section>
        </main>
    </div>
</template>

<style scoped>

.aumentar {
    animation: aumentarAncho 1s forwards;
   

}

.reducir {
    animation: reducirAncho 1s forwards;
    

}

@keyframes aumentarAncho {
    from {
        transform: translate(-200px);
    }

    to {
        transform: translate(0);
    }
}

@keyframes reducirAncho {
    from {
        display: block;
    }

    to {
        display: none;
    }
}
.activo {
  background-color: blue;
  color: white;
  /* Agrega otros estilos activos aquí */
}
</style>