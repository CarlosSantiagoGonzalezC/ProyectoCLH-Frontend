<template>
    <div class="carritocontainer" :class="show ? 'show' : 'hide'">
        <div class="buttoncontainer">
            <v-btn icon plain @click="close"><v-icon>mdi-close-box</v-icon></v-btn>
        </div>
        <div class="carrito elevation-10">
            <productoCarrito v-for="(p) in localproductos" :key="p.id" :object="p"></productoCarrito>
        </div>
    </div>
</template>

<script>
import store from '@/store/store';
import ProductoCarrito from './ProductoCarrito.vue';

export default {
    name: 'carritoNav',
    props: {
        show: Boolean
    },
    components: {
        ProductoCarrito
    },
    data() {
        return {
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
    mounted() {
    }
}
</script>

<style scoped>
.carritocontainer {
    position: absolute;
    z-index: 2;
    position: fixed;
    top: 0;
    right: 0;
    background: #FFF;
    height: 100vh;
    width: 40%;
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.hide {
    right: -40%;
}

.carrito {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: 80%;
    width: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px 0px;
    border-radius: 5px;
    background: #ece8e5;
}

.carrito::-webkit-scrollbar {
    -webkit-appearance: none;
}

.carrito::-webkit-scrollbar:vertical {
    width:10px;
}

.carrito::-webkit-scrollbar-button:increment,.carrito::-webkit-scrollbar-button {
    display: none;
} 

.carrito::-webkit-scrollbar:horizontal {
    height: 10px;
}

.carrito::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
}

.carrito::-webkit-scrollbar-track {
    border-radius: 10px;  
}

.buttoncontainer {
    display: flex;
    min-width: 80%;
    min-height: 40px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>