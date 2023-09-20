import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';

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
            let item = state.listaProductos.find((item) => {
                return item.id == productoRecibido.id
            })
            if (!item) {
                state.listaProductos.push(productoRecibido);
                Swal.fire(
                    '¡Producto añadido!',
                    'Se ha agregado el producto al carrito de compras',
                    'success'
                )
            } else {
                Swal.fire(
                    '¡ERROR AL AGREGAR!',
                    'El producto ya se encuentra en el carrito',
                    'error'
                )
            }
        },
        cantidadProducto(state, object) {
            state.listaProductos.find((item, index) => {
                if (item.id == object.id) {
                    state.listaProductos[index].cantidad = object.cantidad
                }
                return item.id == object.id
            })
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
        productoSetCantidad(context, object) {
            context.commit('cantidadProducto', object);

            localStorage.setItem('listaProductos', JSON.stringify(context.state.listaProductos));
        },
        productoEliminado(context, producto) {
            context.commit('mutandoProductoEliminado', producto);

            // Actualiza la lista en localStorage después de eliminar
            localStorage.setItem('listaProductos', JSON.stringify(context.state.listaProductos));
        },
    },
})