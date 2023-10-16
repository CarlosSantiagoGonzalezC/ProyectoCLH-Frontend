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
                beforeEnter: (to, from, next) => {
                    if (localStorage.token) {
                        next({ name: 'Inicio' })
                    } else {
                        next()
                    }
                },
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
                path: 'recuperar-password',
                name: 'RecuperarPassword',
                component: () => import(`@/modules/${rol()}/RecuperarPassword.vue`)
            },
            {
                path: 'registro/',
                component: () => import('@/modules/general/SimpleApp.vue'),
                beforeEnter: (to, from, next) => {
                    if (localStorage.token) {
                        next({ name: 'Inicio' })
                    } else {
                        next()
                    }
                },
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
                        next({ name: 'login' })
                    } else {
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
                        path: 'compra',
                        name: 'compra',
                        component: () => import('@/modules/comprador/RegistrarCompra.vue')
                    },
                ]
            },
            {
                path: 'vendedor/',
                component: () => import('@/modules/general/SimpleApp.vue'),
                beforeEnter: (to, from, next) => {
                    if (!localStorage.token) {
                        next({ name: 'login' })
                    } else {
                        if (localStorage.rol == "Vendedor") {
                            next()
                        } else {
                            next({ name: 'Inicio' })
                        }
                    }
                },
                children: [
                    {
                        path: 'agregar',
                        name: 'agregarProducto',
                        component: () => import('@/modules/vendedor/AgregarProducto.vue')
                    },
                    {
                        path: 'modificar',
                        name: 'modificarProducto',
                        component: () => import('@/modules/vendedor/ModificarProducto.vue')
                    },
                    {
                        path: 'pedidos',
                        name: 'PedidosApp',
                        component: () => import('@/modules/vendedor/PedidosApp.vue')
                    },
                    {
                        path: 'venta',
                        name: 'ConfirmarVenta',
                        component: () => import('@/modules/vendedor/ConfirmarVenta.vue')
                    },
                    {
                        path: 'actualizar',
                        name: 'actualizarVendedor',
                        component: () => import('@/modules/vendedor/ActualizarDatos.vue')
                    },
                    {
                        path: 'empresa',
                        name: 'empresa',
                        component: () => import('@/modules/vendedor/InfoEmpresa.vue')
                    },
                    {
                        path: 'newEmpresa',
                        name: 'newEmpresa',
                        component: () => import('@/modules/vendedor/EmpresaVendedor.vue')
                    },
                    {
                        path: 'historial',
                        name: 'historial',
                        component: () => import('@/modules/vendedor/HistorialGraficas.vue')
                    },
                ]
            },
        ]
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
            return 'vendedor/VendedorApp.vue'
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
            router.push({ name: 'Inicio' }).catch(() => { })
        }
    }
}

export default router