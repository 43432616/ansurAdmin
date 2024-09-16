import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';
import App from './App.vue';
import Articulos from './views/Articulos/Index.vue';
import NuevoArticulo from './views/Articulos/Create.vue';
import EditarArticulo from './views/Articulos/Edit.vue';

import Categorias from './views/Categorias/Index.vue';
import NuevoCategoria from './views/Categorias/Create.vue';
import EditarCategoria from './views/Categorias/Edit.vue';
import Almacenes from './views/Almacen/Index.vue';
import NuevoAlmacen from './views/Almacen/Create.vue';
import EditarAlmacen from './views/Almacen/Edit.vue';
import Usuarios from './views/Usuarios/Index.vue';
import NuevoUsuario from './views/Usuarios/Create.vue';
import EditarUsuario from './views/Usuarios/Edit.vue';
const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard ,meta: { requiresAuth: true }},
    { path: '/articulos', component: Articulos,meta: { requiresAuth: true } },
    { path: '/articulos/create', component: NuevoArticulo,meta: { requiresAuth: true } },
    { path: '/articulos/edit/:id', component: EditarArticulo,meta: { requiresAuth: true } },
    { path: '/categorias', component: Categorias,meta: { requiresAuth: true } },
    { path: '/categorias/create', component: NuevoCategoria,meta: { requiresAuth: true } },
    { path: '/categorias/edit/:id', component: EditarCategoria,meta: { requiresAuth: true } },
    { path: '/almacenes', component: Almacenes,meta: { requiresAuth: true } },
    { path: '/almacenes/create', component: NuevoAlmacen,meta: { requiresAuth: true } },
    { path: '/almacenes/edit/:id', component: EditarAlmacen,meta: { requiresAuth: true } },
    { path: '/usuarios', component: Usuarios,meta: { requiresAuth: true } },
    { path: '/usuarios/create', component: NuevoUsuario,meta: { requiresAuth: true } },
    { path: '/usuarios/edit/:id', component: EditarUsuario,meta: { requiresAuth: true } },
   
];

export default routes;
