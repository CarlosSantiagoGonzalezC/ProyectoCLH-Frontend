import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'InicioApp',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/InicioApp.vue')
    },
    {
        path: '/inicio',
        name: 'InicioApp',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/InicioApp.vue')
    },
    {
        path: '/inicio-vendedor',
        name: 'InicioVendedor',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/InicioVendedor.vue')
    },
    {
        path: '/inicio-comprador',
        name: 'InicioComprador',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/InicioComprador.vue')
    },
    {
        path: '/login',
        name: 'LoginApp',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/LoginApp.vue')
    },
    {
        path: '/registro-comprador',
        name: 'RegistroComprador',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/RegistroComprador.vue')
    },
    {
        path: '**',
        name: '',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/LoginApp.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router