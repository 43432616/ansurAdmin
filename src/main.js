import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import es from 'element-plus/dist/locale/es.mjs'
import { createPinia } from 'pinia'
import { useDatosStore } from './stores/datosApp';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */

//Rutas
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
const pinia = createPinia()
const authStore = useDatosStore(pinia)

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!authStore.isLogin) {
        next('/');
      } else {
        next();
      }
    } else {
      next();
    }
  });


createApp(App).use(ElementPlus,{
    locale:es
}).component('font-awesome-icon', FontAwesomeIcon).use(router).use(pinia).mount('#app')

