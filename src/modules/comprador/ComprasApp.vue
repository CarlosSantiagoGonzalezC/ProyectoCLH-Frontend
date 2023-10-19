<template>
    <v-card color="#da9f68" width="90%" elevation="24" class="px-5" max-width="1500px">

        <h1>MIS COMPRAS</h1>
        <div id="logoForm">
            <i class="fa fa-cart-flatbed"></i>
        </div>
        <v-card class="mt-7 mb-5">
            <v-card-title class="tabla">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                    required></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" class="tabla" multi-sort
                :footer-props="{ itemsPerPageText: 'Número de filas', pageText: '{0}-{1} de {2}' }" :items-per-page="5"
                :loading="loadingTable" loading-text="Cargando... Por favor espera" no-data-text="No hay pedidos"
                no-results-text="No hay ninguna compra que coincida">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.product.proCodigo }}</td>
                        <td>
                            <v-img lazy-src="https://picsum.photos/id/11/10/6" height="50" width="50"
                                :src="row.item.product.proImagen" class="ma-2 rounded-pill"></v-img>
                        </td>
                        <td>{{ row.item.product.proNombre }}</td>
                        <td>
                            <v-img lazy-src="https://picsum.photos/id/11/10/6" height="50" width="50"
                                :src="row.item.comprobantePago" class="cursor ma-2" @click="ampliarComprobante(row.item.comprobantePago)"></v-img>
                        </td>
                        <td>{{ row.item.cantidad }}</td>
                        <td>$ {{ comaEnMiles(row.item.total) }} COP</td>
                        <td>{{ row.item.estado }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialogComprobante" persistent max-width="450px">
            <v-card>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>COMPROBANTE DE PAGO</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-img lazy-src="https://picsum.photos/id/11/10/6" height="450" width="450"
                        :src="imgComprobante" class="ma-2"></v-img>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#925419" class="rounded-pill" @click="dialogComprobante = false">
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
//import store from '../store/store';
import tiendaService from '@/services/tiendaService';
/*import axios from 'axios';
import Swal from 'sweetalert2';*/

export default {
    name: 'ComprasApp',

    components: {
    },

    data: () => ({
        search: '',
        headers: [
            { text: 'Código', value: 'product.proCodigo' },
            { text: 'Imagen', key: 'img', sortable: false },
            { text: 'Producto', value: 'product.proNombre' },
            { text: 'Comprobante', key: 'img', sortable: false },
            { text: 'Cantidad', value: 'cantidad' },
            { text: 'Total', value: 'total' },
            { text: 'Estado', value: 'estado' },
        ],
        desserts: [],
        loadingTable: true,
        compras: null,
        items: [],
        imgComprobante: null,
        dialogComprobante: false,
        url: process.env.VUE_APP_URL_BASE_TIENDA,
    }),
    methods: {
        async obtenerCompras() {
            this.loadingTable = true
            this.desserts = []
            let purchases = await tiendaService.getPurchasesUser(localStorage.idUsuario);
            this.compras = purchases.data;
            console.log(this.compras)
            this.compras.forEach(element => {
                this.desserts.push(element);
            });
            this.loadingTable = false
            console.log(this.desserts);
        },
        ampliarComprobante(comprobante) {
            this.dialogComprobante = true;
            this.imgComprobante = comprobante;
        },
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
        },
    },
    mounted() {
        this.obtenerCompras()
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
    background: #ece8e5;
}

.cursor{
    cursor: pointer;
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