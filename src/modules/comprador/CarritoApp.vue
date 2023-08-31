<template>
    <div>
        <HeaderNav></HeaderNav>

        <div class="content">
            <v-card color="#da9f68" dark width="90%" elevation="24" class="py-16">
                <v-card-text>
                    <h1>
                        Carrito de compras
                    </h1>
                    <v-data-table :headers="headers">

                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>

        <FooterApp></FooterApp>
    </div>
</template>

<script>

import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';

export default {
    name: 'CarritoApp',

    components: {
        HeaderNav,
        FooterApp,
    },

    data() {
        return {
            headers: [
                { text: 'ID', align: 'start', filterable: false, value: 'id' },
                { text: 'Codigo', value: 'codigo' },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Descripción', value: 'descripcion' },
                { text: 'Cantidad', value: 'cant' },
                { text: 'Precio', value: 'precio' },
                { text: 'Imagen', value: 'imagen' },
                { text: 'Modificar', value: 'modificar' },
            ],
        }
    },
}
</script>

<style scoped>
.content {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>