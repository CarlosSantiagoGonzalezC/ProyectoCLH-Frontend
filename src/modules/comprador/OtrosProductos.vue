<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="pl-16 pr-16">
        <v-card-text>
            <h1>OTROS PRODUCTOS</h1>
            <v-row v-if="productos">
                <v-card class="producto mx-auto my-12" max-width="374" v-for="producto in productos"
                    :key="producto.id" elevation="7">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-img height="250" :src="producto.proImagen"></v-img>

                    <v-card-title>{{ producto.proNombre }}</v-card-title>

                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

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

                    <v-card-actions v-if="producto.proCantDisponible > 0">
                        <v-btn color="#331b05" class="rounded-pill" @click="añadirCarrito(producto.id)">
                            <v-icon>mdi-cart-plus</v-icon>
                        </v-btn>
                        <v-btn color="#331b05" class="rounded-pill" @click="obtnerIds(producto.id, producto.user_id)">
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>

            <div class="text-center mt-15" v-else>
                <v-progress-circular class="text-center" :size="200" :width="20" color="brown" indeterminate></v-progress-circular>
                <h2 class="mt-12">Cargando productos...</h2>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import tiendaService from '@/services/tiendaService';
import store from '@/store/store';
// import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'OtrosProductos',

    components: {
    },

    data: () => ({
        productos: null,
        productoCarrito: null
    }),
    methods: {
        async obtenerProductos() {
            let products = await tiendaService.getOthersProducts();
            this.productos = products.data;
            console.log(this.productos);
        },
        obtnerIds(idProducto, idUsuario) {
            localStorage.idProducto = idProducto;
            localStorage.idUser = idUsuario;
            this.$router.push({ name: 'producto' });
        },
        async añadirCarrito(idProducto) {
            let product = await tiendaService.getProductId(idProducto);
            this.productoCarrito = product.data;
            this.$set(this.productoCarrito, 'cantidad', 1)
            store.dispatch('productoAñadido', this.productoCarrito);
            console.log(store.state.listaProductos);
            Swal.fire(
                '¡Producto añadido!',
                'Se ha agregado el producto al carrito de compras',
                'success'
            )
        },
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
        },
    },
    mounted() {
        this.obtenerProductos()
    },
};
</script>
  
<style scoped>
.producto {
    background: #7b5028;
    margin: 10px;
    transition: all 0.5s;
}

.producto:hover {
    transform: scale(105%);
}

h1 {
    text-align: center;
}
</style>