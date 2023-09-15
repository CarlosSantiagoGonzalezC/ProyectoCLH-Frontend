import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listaProductos: [],
    },
    getters: {
        enviarProducto(state) {
            return state.listaProductos;
        }
    },
    mutations: {
        mutandoProductoAñadido(state, productoRecibido) {
            state.listaProductos.push(productoRecibido);
        },
        mutandoProductoEliminado(state, producto) {
            let item = state.listaProductos.find(i => i.id === producto.id);

            if (item) {
                /* eslint-disable */
                state.listaProductos = state.listaProductos.filter(i => i.id !== producto.id)
            }
        },
        inicializarListaProductos(state) {
            const listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
            if (listaProductos) {
                this.state.listaProductos = listaProductos
            }
        },
    },
    actions: {
        productoAñadido(context, productoRecibido) {
            context.commit('mutandoProductoAñadido', productoRecibido);

            // Guarda la lista actualizada en localStorage
            localStorage.setItem('listaProductos', JSON.stringify(context.state.listaProductos));
        },
        productoEliminado(context, producto) {
            context.commit('mutandoProductoEliminado', producto);

            // Actualiza la lista en localStorage después de eliminar
            localStorage.setItem('listaProductos', JSON.stringify(context.state.listaProductos));
        },
    },
})