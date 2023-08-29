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
        path: '/registro-vendedor',
        name: 'RegistroVendedor',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/RegistroVendedor.vue')
    },
    {
        path: '/agregar-producto',
        name: 'AgregarProducto',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/AgregarProducto.vue')
    },
    {
        path: '/modificar-producto',
        name: 'ModificarProducto',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/ModificarProducto.vue')
    },
    {
        path: '/desactivar-producto',
        name: 'DesactivarProducto',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/DesactivarProducto.vue')
    },
    {
        path: '/finca-empresa',
        name: 'EmpresaVendedor',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/EmpresaVendedor.vue')
    },
    {
        path: '/info-empresa',
        name: 'InfoEmpresa',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/InfoEmpresa.vue')
    },
    {
        path: '/productos',
        name: 'ProductosApp',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/ProductosApp.vue')
    },
    {
        path: '/detalle-producto',
        name: 'DetalleProducto',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/DetalleProducto.vue')
    },
    {
        path: '/categorias',
        name: 'CategoriasProductos',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/CategoriasProductos.vue')
    },
    {
        path: '/otros-productos',
        name: 'OtrosProductos',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/OtrosProductos.vue')
    },
    {
        path: '*',
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