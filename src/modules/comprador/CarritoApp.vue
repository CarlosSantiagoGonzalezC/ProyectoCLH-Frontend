<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="py-16">
        <v-card-text>
            <h1>
                Carrito de compras
            </h1>
            <v-data-table :headers="headers" :items="desserts" :search="search" class="tabla">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.id }}</td>
                        <td>{{ row.item.proCodigo }}</td>
                        <td>{{ row.item.proNombre }}</td>
                        <td>{{ row.item.proDescripcion }}</td>
                        <td>{{ row.item.proCantDisponible }}</td>
                        <td>COP {{ row.item.proPrecio }}</td>
                        <td>
                            <v-img lazy-src="https://picsum.photos/id/11/10/6" height="50" width="50"
                                :src="row.item.proImagen" class="ma-2 rounded-pill"></v-img>
                        </td>
                        <td>
                            <v-btn class="mx-2" fab dark small color="#925419" @click="eliminarProducto(row.item)"><v-icon
                                    dark>mdi-minus-box</v-icon></v-btn>
                        </td>
                    </tr>
                </template></v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import store from '@/store/store';

export default {
    name: 'CarritoApp',

    components: {
    },

    data() {
        return {
            search: '',
            headers: [
                { text: 'ID', align: 'start', filterable: false, value: 'id' },
                { text: 'Codigo', value: 'codigo' },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Descripción', value: 'descripcion' },
                { text: 'Cantidad', value: 'cant' },
                { text: 'Precio', value: 'precio' },
                { text: 'Imagen', value: 'imagen' },
                { text: 'Eliminar', value: 'eliminar' },
            ],
            desserts: [],
            items: [],
        }
    },

    computed: {
        datosProductoCarrito() {
            return this.$store.state.listaProductos;
        },
    },

    methods: {
        /**
         * Function para la alteracion del local storage al eliminar un producto
         * @param {Object} producto objeto con los datos del producto a eliminar
         */
        eliminarProducto(producto) {
            store.dispatch('productoEliminado', producto)
        }
    },

    mounted() {
        console.log(this.datosProductoCarrito);
        this.datosProductoCarrito.forEach(element => {
            this.desserts.push(element);
        });
    }
}
</script>

<style scoped>
.tabla {
    background: #7b5028;
}

.v-card {
    min-height: 60vh;
}

h1 {
    text-align: center;
    margin: 15px 0px;
}
</style>