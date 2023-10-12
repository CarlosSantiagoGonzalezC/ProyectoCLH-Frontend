<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="px-5">
        <v-card-text>
            <h1>PRODUCTOS</h1>
            <v-row v-if="productos">
                <v-col v-for="producto in productos" :key="producto.id">
                    <div class="center">
                        <v-card class="producto" max-width="300" elevation="7">
                            <template slot="progress">
                                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                            </template>

                            <v-img height="250" :src="producto.proImagen"></v-img>

                            <v-card-title>{{ producto.proNombre }}</v-card-title>

                            <v-card-text>
                                <v-row class="mx-0">
                                    <v-rating :value="4.5" color="amber" dense half-increments readonly
                                        size="14"></v-rating>

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
                        </v-card>
                    </div>
                </v-col>
            </v-row>

            <div class="text-center mt-15" v-else>
                <v-progress-circular class="text-center" :size="200" :width="20" color="brown"
                    indeterminate></v-progress-circular>
                <h2 class="mt-12">Cargando productos...</h2>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import tiendaService from '@/services/tiendaService';

export default {
    name: 'ProductosApp',

    components: {
    },

    data: () => ({
        productos: null,
    }),
    methods: {
        async obtenerProductos() {
            let products = await tiendaService.getProducts();
            this.productos = products.data;
            console.log(this.productos);
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
    transform: scale(102%);
}

h1 {
    text-align: center;
}
</style>