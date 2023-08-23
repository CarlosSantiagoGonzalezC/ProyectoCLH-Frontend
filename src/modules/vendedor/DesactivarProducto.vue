<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="70%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>DESACTIVAR PRODUCTO</h1>
                    <div id="logoForm">
                        <i class="fa fa-minus-square"></i>
                    </div>
                    <v-card class="mt-7 mb-5">
                        <v-card-title>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                                hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="desserts" :search="search">
                            <template v-slot:item="row">
                                <tr>
                                    <td>{{ row.item.id }}</td>
                                    <td>{{ row.item.proCodigo }}</td>
                                    <td>{{ row.item.proNombre }}</td>
                                    <td>{{ row.item.proDescripcion }}</td>
                                    <td>{{ row.item.proCantDisponible }}</td>
                                    <td>COP {{ row.item.proPrecio }}</td>
                                    <td>
                                        <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="100" max-width="100"
                                            :src="row.item.proImagen" class="ma-2 rounded-pill"></v-img>
                                    </td>
                                    <td>
                                        <v-btn class="mx-2" fab dark small color="#925419"
                                            @click="dialog = true; obtenerId(row.item.id)"><v-icon
                                                dark>mdi-minus-box</v-icon></v-btn>
                                    </td>
                                </tr>
                            </template></v-data-table>
                    </v-card>
                </v-card-text>
            </v-card>
        </div>

        <v-dialog v-model="dialog" persistent max-width="450px">
            <v-card>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>DESACTIVAR PRODUCTO</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-container class="mt-5 text-center">
                        <p class="body-1">¿Está seguro de eliminar este producto?</p>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="rounded-pill text-white" color="#925419" @click="desactivarProducto()">
                        Desactivar
                    </v-btn>
                    <v-btn color="#925419" class="rounded-pill" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <FooterApp></FooterApp>

    </v-app>
</template>
  
<script>
import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css';
//import store from '../store/store';
import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'DesactivarProducto',

    components: {
        HeaderNav,
        FooterApp,
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        search: '',
        headers: [
            {
                text: 'ID',
                align: 'start',
                filterable: false,
                value: 'id',
            },
            { text: 'Codigo', value: 'codigo' },
            { text: 'Nombre', value: 'nombre' },
            { text: 'Descripción', value: 'descripcion' },
            { text: 'Cantidad Disponible', value: 'cantDisponible' },
            { text: 'Precio', value: 'precio' },
            { text: 'Imagen', value: 'imagen' },
            { text: 'Modificar', value: 'modificar' },
        ],
        desserts: [],
        dialog: false,
        productos: null,
        idProducto: "",
        url: "http://127.0.0.1:8000/api",
    }),
    methods: {
        async obtenerProductos() {
            let products = await tiendaService.getProductsSeller(localStorage.idUsuario);
            this.productos = products.data;
            this.productos.forEach(element => {
                this.desserts.push(element);
            });
            console.log(this.desserts);

        },

        async desactivarProducto() {
            axios
                .delete(this.url + "/product/delete", {
                    data: {id: this.idProducto}
                })
                .then(function (response) {
                    console.log(response);
                    if (response.data.result.error_id == 400) {
                        Swal.fire(
                            '¡Error al desactivar!',
                            'Ha ocurrido un error al desactivar el producto',
                            'error'
                        )

                    } else {
                        Swal.fire(
                            '¡Producto desactivado!',
                            'Se ha desactivado el producto correctamente',
                            'success'
                        )
                        setTimeout(function () {
                            location.href = "/modificar-producto";
                        }, 3000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        obtenerId(id) {
            this.idProducto = id;
        }
    },
    mounted() {
        this.obtenerProductos()
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

.content-full {
    min-height: 60vh;
}
</style>