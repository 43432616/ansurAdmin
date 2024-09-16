import { defineStore } from "pinia";
import {reactive, ref} from "vue";
export const useDatosStore =defineStore('datos',()=>{
    const showMenu = ref(false)
    const isLogin = ref(false)
    const urlServidor = ref('http://127.0.0.1:8095/api')
    
    const datosApi=reactive({
        user:null,
        tokenJWT:localStorage.getItem('token') || null
    })
    function toogleMenu() {
        showMenu.value=!showMenu.value
    }
    function isLoginOk(){
        isLogin.value=true
    }
    function logout(){
        isLogin.value=false
    }
    function guardarData(user,token){
        datosApi.user=user
        datosApi.tokenJWT=token
        localStorage.setItem('token', token);
    }
    function headers(){
        return {
            Authorization: `Bearer ${datosApi.tokenJWT.token}`
        }
    }
        // Fin de sistema de notificaciones
  return { showMenu,toogleMenu,isLogin,isLoginOk,logout,urlServidor,guardarData,datosApi,headers}
})