<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="px-5" max-width="1500px">

        <h1>CONFIRMAR VENTA</h1>
        <div id="logoForm">
            <i class="fa fa-tag"></i>
        </div>
        <v-card class="mt-7 mb-5">
            <v-card-title class="tabla">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                    required></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" class="tabla" multi-sort
                :footer-props="{ itemsPerPageText: 'Número de filas', pageText: '{0}-{1} de {2}' }" :items-per-page="5"
                :loading="loadingTable" loading-text="Cargando... Por favor espera" no-data-text="No hay pedidos"
                no-results-text="No hay ningun pedido que coincida">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.proCodigo }}</td>
                        <td>{{ row.item.proNombre }}</td>
                        <td>{{ row.item.proDescripcion }}</td>
                        <td>{{ row.item.proCantDisponible }}</td>
                        <td>$ {{ comaEnMiles(row.item.proPrecio) }} COP</td>
                        <td>
                            <v-img lazy-src="https://picsum.photos/id/11/10/6" height="50" width="50"
                                :src="row.item.proImagen" class="ma-2 rounded-pill"></v-img>
                        </td>
                        <td>
                            <div class="btns">
                                <v-btn class="mx-2" fab dark small color="#925419"
                                    @click="dialogUpdate = true; obtenerProductoId(row.item.id)">
                                    <v-icon dark>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn class="mx-2" fab dark small color="#925419"
                                    @click="dialogDelete = true; obtenerProductoId(row.item.id)">
                                    <v-icon dark>mdi-minus-box</v-icon>
                                </v-btn>
                            </div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>


    </v-card>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
//import store from '../store/store';
/*import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';*/

export default {
    name: 'ConfirmarVenta',

    components: {
    },

    data: () => ({
        search: '',
        headers: [
            /*{ text: 'Código', value: 'proCodigo' },
            { text: 'Nombre', value: 'proNombre' },
            { text: 'Descripción', value: 'proDescripcion' },
            { text: 'Disponibles', value: 'proCantDisponible' },
            { text: 'Precio', value: 'proPrecio' },
            { text: 'Imagen', key: 'img', sortable: false },
            { text: 'Acciones', key: 'actions', sortable: false },*/
        ],
        desserts: [],
        loadingTable: true,
        /*productos: null,
        product: [],
        idProducto: "",*/
        items: [],
        url: process.env.VUE_APP_URL_BASE_TIENDA,
    }),
    /*watch: {
        fileImagen: {
            handler: "convertToBase64",
            immediate: true,
        },
    },*/
    methods: {
        /*async obtenerProductos() {
            this.loadingTable = true
            this.desserts = []
            let products = await tiendaService.getProductsSeller(localStorage.idUsuario);
            this.productos = products.data;
            this.productos.forEach(element => {
                this.desserts.push(element);
            });
            this.loadingTable = false
            console.log(this.desserts);
        },
        async obtenerProductoId(id) {
            this.idProducto = id;
            let producto = await tiendaService.getProductId(this.idProducto);
            this.product = producto.data;
            this.txtNombre = this.product.proNombre;
            this.txtCodigo = this.product.proCodigo;
            this.txtCantDisponible = this.product.proCantDisponible;
            this.txtPrecio = this.product.proPrecio;
            this.txtDescripcion = this.product.proDescripcion;
            this.txtCategoria = this.product.category_id;
        },
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
        },*/
    },
    mounted() {
        /*this.obtenerProductos();
        this.obtenerCategorias()*/
    },
};
</script>
  
<style scoped>
#logoForm {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    color: #331b05;
}

.tabla {
    background: #7b5028;
}

h1 {
    text-align: center;
}

h1,
h2 {
    text-wrap: balance;
}

.btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
</style>