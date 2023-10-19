<template>
    <v-card color="#da9f68" width="90%" elevation="24" class="px-5" max-width="1500px">

        <h1>PEDIDOS</h1>
        <div id="logoForm">
            <i class="fa fa-truck-ramp-box"></i>
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
                        <td>{{ row.item.order.ordDepartamento }}</td>
                        <td>{{ row.item.order.ordCiudad }}</td>
                        <td>{{ row.item.order.ordDireccion }}</td>
                        <td>{{ row.item.user.useNombres }} {{ row.item.user.useApellidos }}</td>
                        <td>
                            <v-btn class="mx-2" fab dark small color="#925419"
                                @click="dialog = true, dessertsP = row.item.purchases">
                                <v-icon dark>mdi-information</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" max-width="700px">
            <v-card>
                <v-card-title class="tabla">
                    <v-text-field v-model="searchP" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                        required></v-text-field>
                </v-card-title>
                <v-data-table :headers="headersP" :items="dessertsP" :search="searchP" class="tabla" multi-sort
                    :footer-props="{ itemsPerPageText: 'Número de filas', pageText: '{0}-{1} de {2}' }" :items-per-page="5"
                    :loading="loadingTable" loading-text="Cargando... Por favor espera" no-data-text="No hay prooductos"
                    no-results-text="No hay ningun producto que coincida">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.product.proCodigo }}</td>
                            <td>{{ row.item.product.proNombre }}</td>
                            <td>{{ row.item.cantidad }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </v-dialog>
    </v-card>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
//import store from '../store/store';
/*import tiendaService from '@/services/tiendaService';
import Swal from 'sweetalert2';*/

export default {
    name: 'PedidosApp',

    components: {
    },

    data: () => ({
        search: '',
        searchP: '',
        headers: [
            { text: 'Departamento', value: 'order.ordDepartamento' },
            { text: 'Ciudad', value: 'order.ordCiudad' },
            { text: 'Dirección', value: 'order.ordDireccion' },
            { text: 'Solicitada por', value: 'user.useNombres' },
            { text: 'Información', key: 'actions', sortable: false },
        ],
        headersP: [
            { text: 'Codigo', value: 'product.proCodigo' },
            { text: 'Nombre', value: 'product.proNombre' },
            { text: 'Cantidad', value: 'cantidad' },
        ],
        desserts: [],
        dessertsP: [],
        items: [],
        loadingTable: true,
        dialog: false,
        url: process.env.VUE_APP_URL_BASE_TIENDA,
    }),
    methods: {
        getPedidos() {
            this.loadingTable = true

            let id = localStorage.idUsuario

            let url = `${process.env.VUE_APP_URL_BASE_TIENDA}/order/vendedor/${id}`

            let config = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            }

            axios.get(url, config)
                .then(res => {
                    console.log(res);
                    this.loadingTable = false
                    this.desserts = res.data
                })
                .catch(err => {
                    console.log(err);
                    this.loadingTable = false
                })
        },
        // fechaFormat(date) {
        //     const fecha = new Date(date);

        //     const options = {
        //         year: 'numeric',
        //         month: 'long',
        //         day: 'numeric',
        //         hour: '2-digit',
        //         minute: '2-digit',
        //         second: '2-digit',
        //         timeZoneName: 'short'
        //     };

        //     const fechaLegible = fecha.toLocaleDateString('es-ES', options);

        //     return fechaLegible
        // }
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
        this.getPedidos()
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
    background: #ece8e5;
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