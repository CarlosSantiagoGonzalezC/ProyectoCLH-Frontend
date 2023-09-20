<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="pl-16 pr-16">
        <v-card-text>
            <h1>CATEGORIAS</h1>
            <v-chip-group v-model="categoria">
                <v-chip class="ma-4" color="primary" pill v-for="categoria in categorias" :key="categoria.id"
                    @click="obtenerProductosSegunCategoria(categoria.id)">
                    {{ categoria.catNombre }}
                </v-chip>
            </v-chip-group>
            <v-row>

                <template v-if="categoria == null">
                    <v-card :loading="loading" class="producto mx-auto my-12" max-width="374" v-for="producto in productos"
                        :key="producto.id" elevation="7">
                        <template slot="progress">
                            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                        </template>

                        <v-img height="250" :src="producto.proImagen"></v-img>

                        <v-card-title>{{ producto.proNombre }}</v-card-title>

                        <v-card-text>
                            <v-row class="mx-0">
                                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                                <div class="grey--text ms-4">
                                    4.5
                                </div>
                            </v-row>

                            <div class="my-4 text-subtitle-1 text-left">
                                $ • {{ producto.proPrecio }} COP
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
                </template>
                <template v-else-if="productosCategoria.length != 0">
                    <v-card :loading="loading" class="producto mx-auto my-12" max-width="374"
                        v-for="produ in productosCategoria" :key="produ.id" elevation="7">
                        <template slot="progress">
                            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                        </template>

                        <v-img height="250" :src="produ.proImagen"></v-img>

                        <v-card-title>{{ produ.proNombre }}</v-card-title>

                        <v-card-text>
                            <v-row class="mx-0">
                                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                                <div class="grey--text ms-4">
                                    4.5
                                </div>
                            </v-row>

                            <div class="my-4 text-subtitle-1 text-left">
                                $ • {{ produ.proPrecio }} COP
                            </div>

                            <div>{{ produ.proDescripcion }}
                            </div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-title>Cantidad disponible</v-card-title>

                        <v-card-text class="text-left">
                            <v-chip>{{ produ.proCantDisponible }} {{ produ.proCantDisponible > 1 ?
                                'disponibles' : 'disponible' }}</v-chip>
                        </v-card-text>
                    </v-card>
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
    }),
    methods: {
        async obtenerProductos() {
            let products = await tiendaService.getProducts();
            this.productos = products.data;
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

h1{
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
</style>