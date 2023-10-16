<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="pa-5">

        <h1>PRODUCTOS</h1>
        <v-row v-if="productos">
            <v-col v-for="producto in productos" :key="producto.id">
                <div class="center">
                    <v-card class="producto" max-width="400" width="100%" elevation="7">
                        <template slot="progress">
                            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                        </template>

                        <v-img class="imgProducto" :src="producto.proImagen"></v-img>
                        <v-card-title>{{ producto.proNombre }}</v-card-title>

                        <v-card-text>
                            <v-row align="center" class="mx-0">
                                <v-rating :value="4.5" color="warning" dense half-increments readonly size="18"></v-rating>

                                <div class="grey--text ms-4">
                                    4.5
                                </div>
                            </v-row>

                            <div class="my-4 text-subtitle-1 text-left">
                                $ {{ comaEnMiles(producto.proPrecio) }} COP
                            </div>

                            <div>{{ producto.proDescripcion }}
                            </div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-title>Cantidad disponible</v-card-title>
                        <v-card-text class="text-left">
                            <v-chip>{{ producto.proCantDisponible }} {{ producto.proCantDisponible > 1 ?
                                'disponibles' : 'disponible' }}</v-chip>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="#331b05" v-if="producto.proCantDisponible > 0" class="rounded-pill"
                                @click="añadirCarrito(producto.id)">
                                <v-icon>mdi-cart-plus</v-icon>
                            </v-btn>
                            <v-btn color="#331b05" class="rounded-pill" @click="obtnerIds(producto.id, producto.user_id)">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-col>
        </v-row>

        <div class="text-center mt-15" v-else>
            <v-progress-circular class="text-center" :size="200" :width="20" color="brown"
                indeterminate></v-progress-circular>
            <h2 class="mt-12">Cargando productos...</h2>
        </div>
    </v-card>
</template>
  
<script>
import store from '@/store/store';
import tiendaService from '@/services/tiendaService';
// import axios from 'axios';


export default {
    name: 'ProductosApp',

    components: {
    },

    data: () => ({
        productos: null,
        productoCarrito: null
    }),
    methods: {
        async obtenerProductos() {
            let products = await tiendaService.getProducts();
            this.productos = products.data;
        },
        obtnerIds(idProducto, idUsuario) {
            localStorage.idProducto = idProducto;
            localStorage.idUser = idUsuario;
            this.$router.push({ name: 'producto' });
        },
        async añadirCarrito(idProducto) {
            let product = await tiendaService.getProductId(idProducto);
            this.productoCarrito = product.data;
            this.localproductos.includes
            this.$set(this.productoCarrito, 'cantidad', 1)
            store.dispatch('productoAñadido', this.productoCarrito);
        },
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
        },
    },
    computed: {
        localproductos() {
            return this.$store.state.listaProductos
        }
    },
    mounted() {
        this.obtenerProductos()
    },
};
</script>
  
<style scoped>
.producto {
    background: #7b5028;
    transition: all 0.5s;
}

.producto:hover {
    transform: scale(102%);
}

h1 {
    text-align: center;
}

.center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>