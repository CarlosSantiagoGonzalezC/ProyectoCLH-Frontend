<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="px-5">
        <v-card-text>
            <v-chip-group v-model="categoria">
                <v-chip class="ma-4" color="#7b5028" pill v-for="categoria in categorias" :key="categoria.id"
                    @click="obtenerProductosSegunCategoria(categoria.id)">
                    {{ categoria.catNombre }}
                </v-chip>
            </v-chip-group>
            <v-row>
                <template v-if="loading">
                    <div class="text-center mt-15 w-100">
                        <v-progress-circular class="text-center" :size="200" :width="20" color="brown"
                            indeterminate></v-progress-circular>
                        <h2 class="mt-12">Cargando productos...</h2>
                    </div>
                </template>
                <template v-else-if="categoria == null">
                    <v-col v-for="producto in productos" :key="producto.id">
                        <div class="center">
                            <v-card class="producto" max-width="400" width="100%" elevation="7">
                                <template slot="progress">
                                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                                </template>

                                <v-img height="250" :src="producto.proImagen"></v-img>

                                <v-card-title>{{ producto.proNombre }}</v-card-title>

                                <v-card-text>
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
                </template>
                <template v-else-if="productosCategoria.length != 0">
                    <v-col v-for="producto in productosCategoria" :key="producto.id">
                        <div class="center">
                            <v-card class="producto" max-width="400" width="100%" elevation="7">
                                <template slot="progress">
                                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                                </template>

                                <v-img height="250" :src="producto.proImagen"></v-img>

                                <v-card-title>{{ producto.proNombre }}</v-card-title>

                                <v-card-text>
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
                </template>
                <template v-else>
                    <div class="nohay">
                        <h1>No se encuentra ningun producto de esta categoria por el momento</h1>
                    </div>
                </template>
            </v-row>
        </v-card-text>
    </v-card>
</template>
  
<script>
import tiendaService from '@/services/tiendaService';

export default {
    name: 'CategoriasProductos',

    components: {
    },

    data: () => ({
        productos: null,
        productosCategoria: [],
        categorias: null,
        categoria: null,
        loading: true
    }),
    methods: {
        async obtenerProductos() {
            let products = await tiendaService.getProducts();
            this.productos = products.data;
            this.loading = false
            console.log(this.productos);
        },
        async obtenerCategorias() {
            let categories = await tiendaService.getCategories();
            this.categorias = categories.data;
            console.log(this.categorias);
        },
        async obtenerProductosSegunCategoria(id) {
            let products = await tiendaService.getProductsCategory(id);
            this.productosCategoria = products.data;
            console.log(this.productosCategoria);
        },
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
        },
    },
    mounted() {
        this.obtenerProductos();
        this.obtenerCategorias();
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

.nohay {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 500px;
}

.nohay h1 {
    font-size: xx-large;
    font-weight: 700;
    letter-spacing: 5px;
    line-height: 40px;
    width: 60%;
}

.w-100 {
    width: 100%;
}

.center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>