<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="py-16">
        <v-card-text>
            <h1>
                Carrito de compras
            </h1>
            <v-data-table :headers="headers">

            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    name: 'CarritoApp',

    components: {
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
.v-card {
    min-height: 60vh;
}

h1 {
    text-align: center;
    margin: 15px 0px;
}
</style>