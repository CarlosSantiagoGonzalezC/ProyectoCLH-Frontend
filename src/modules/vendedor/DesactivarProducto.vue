<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="px-5" max-width="1500px">
        <h1>DESACTIVAR PRODUCTO</h1>
        <div id="logoForm">
            <i class="fa fa-minus-square"></i>
        </div>
        <v-card class="mt-7 mb-5">
            <v-card-title class="tabla">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                    hide-details></v-text-field>
            </v-card-title>
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
                            <v-btn class="mx-2" fab dark small color="#925419"
                                @click="dialog = true; obtenerId(row.item.id)"><v-icon dark>mdi-minus-box</v-icon></v-btn>
                        </td>
                    </tr>
                </template></v-data-table>
        </v-card>
        
    </v-card>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
//import store from '../store/store';
import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'DesactivarProducto',

    components: {
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
            { text: 'Desactivar', value: 'desactivar' },
        ],
        desserts: [],
        dialog: false,
        productos: null,
        idProducto: "",
        url: process.env.VUE_APP_URL_BASE_TIENDA,
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
                    data: { id: this.idProducto }
                }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                .then((response) => {
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
                        ).then(
                            this.$router.push({ name: 'modificarProducto' })
                        )
                    }
                })
                .catch(function (error) {
                    Swal.fire(
                        '¡Error al desactivar producto!',
                        'Verifique que esta haciendo el proceso correctamente',
                        'error'
                    )
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

.tabla {
    background: #7b5028;
}

h1 {
    text-align: center;
    width: 100%;
}

h1,
h2 {
    text-wrap: balance;
}
</style>