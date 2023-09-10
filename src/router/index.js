import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        component: () => import(`@/modules/${rolInicial()}`),
        children: [
            {
                path: '',
                name: 'Inicio',
                component: () => import(`@/modules/general/InicioApp.vue`)
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/modules/general/LoginApp.vue')
            },
            {
                path: 'productos',
                name: 'Productos',
                component: () => import(`@/modules/${rol()}/ProductosApp.vue`)
            },
            {
                path: 'categorias',
                name: 'Categorias',
                component: () => import(`@/modules/${rol()}/CategoriasProductos.vue`)
            },
            {
                path: 'otros',
                name: 'Otros',
                component: () => import(`@/modules/${rol()}/OtrosProductos.vue`)
            },
            {
                path: 'registro/',
                component: () => import('@/modules/general/SimpleApp.vue'),
                children: [
                    {
                        path: 'usuario',
                        name: 'RegistroComprador',
                        component: () => import('@/modules/comprador/RegistroComprador.vue')
                    },
                    {
                        path: 'vendedor',
                        name: 'RegistroVendedor',
                        component: () => import('@/modules/vendedor/RegistroVendedor.vue')
                    },
                ]
            },
            {
                path: '/',
                component: () => import('@/modules/general/SimpleApp.vue'),
                beforeEnter: (to, from, next) => {
                    if (!localStorage.token) {
                        next({name: 'login'})
                    }else{
                        next()
                    }
                },
                children: [
                    {
                        path: 'actualizar',
                        name: 'actualizarUser',
                        component: () => import('@/modules/comprador/ActualizarDatos.vue')
                    },
                    {
                        path: 'producto',
                        name: 'producto',
                        component: () => import('@/modules/comprador/DetalleProducto.vue')
                    },
                    {
                        path: 'carrito',
                        name: 'carrito',
                        component: () => import('@/modules/comprador/CarritoApp.vue')
                    },
                ]
            },
        ]
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
        path: '/comprador/',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/CompradorApp.vue'),
        children: [
            {
                path: '',
                name: 'InicioComprador',
                component: () => import('../modules/comprador/InicioComprador.vue')
            },
            {
                path: 'productos',
                name: 'Productos',
                component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/ProductosApp.vue')
            }
        ]
    },
    // {
    //     path: '/registro-comprador',
    //     name: 'RegistroComprador',
    //     component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/RegistroComprador.vue')
    // },
    // {
    //     path: '/registro-vendedor',
    //     name: 'RegistroVendedor',
    //     component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/RegistroVendedor.vue')
    // },
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
        path: '/actualizar-datos',
        name: 'ActualizarDatos',
        component: () => import(/* webpackChunkName: "about" */ '../modules/comprador/ActualizarDatos.vue')
    },
    {
        path: '/productos-inicio',
        name: 'ProductosApp',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/ProductosApp.vue')
    },
    {
        path: '/categorias-inicio',
        name: 'CategoriasProductos',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/CategoriasProductos.vue')
    },
    {
        path: '/otros-productos-inicio',
        name: 'OtrosProductos',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/OtrosProductos.vue')
    },
    {
        path: '/actualizar-datos-vendedor',
        name: 'ActualizarDatos',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/ActualizarDatos.vue')
    },
    {
        path: '/historial',
        name: 'HistorialGraficas',
        component: () => import(/* webpackChunkName: "about" */ '../modules/vendedor/HistorialGraficas.vue')
    },
    {
        path: '*',
        name: '',
        redirect: { name: 'Inicio' }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function rolInicial() {
    if (!localStorage.token) {
        return 'general/GeneralApp.vue'
    } else {
        if (localStorage.rol == "Comprador") {
            return 'comprador/CompradorApp.vue'
        } else {
            return 'vendedor/InicioVendedor.vue'
        }
    }
}

function rol() {
    if (!localStorage.token) {
        return 'general'
    } else {
        if (localStorage.rol == "Comprador") {
            return 'comprador'
        } else {
            router.push({ name: 'Inicio' })
        }
    }
}

export default router