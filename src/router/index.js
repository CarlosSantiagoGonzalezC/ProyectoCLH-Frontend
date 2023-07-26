import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'LoginApp',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/LoginApp.vue')
    },
    {
        path: '/login',
        name: 'LoginApp',
        component: () => import(/* webpackChunkName: "about" */ '../modules/general/LoginApp.vue')
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