<template>
    <div class="carrito" :class="show ? 'show' : 'hide'">
        <button @click="close">X</button>
    </div>
</template>

<script>
import store from '@/store/store';

export default {
    name: 'carritoNav',
    props: {
        show: Boolean
    },
    data() {
        return {
            productos: []
        }
    },
    methods: {
        close() {
            this.$emit('close', false)
        },
        eliminarProducto(producto) {
            store.dispatch('productoEliminado', producto)
        },
    },
    computed: {
        localproductos() {
            return this.$store.state.listaProductos
        }
    },
    mounted(){
        this.localproductos.forEach(producto => {
            this.productos.push(producto)
        });
    }
}
</script>

<style scoped>
.carrito {
    position: absolute;
    z-index: 2;
    position: fixed;
    top: 0;
    right: 0;
    background: #FFF;
    height: 100vh;
    width: 50%;
    transition: 0.5s;
}

.hide {
    right: -50%;
}
</style>