<template>
    <v-card color="#da9f68" dark width="70%" elevation="24" class="pl-16 pr-16">
        <v-card-text>
            <h1>MODIFICAR PRODUCTO</h1>
            <div id="logoForm">
                <i class="fa fa-edit"></i>
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
                                    @click="dialog = true; obtenerProductoId(row.item.id)"><v-icon
                                        dark>mdi-pencil</v-icon></v-btn>
                            </td>
                        </tr>
                    </template></v-data-table>
            </v-card>
        </v-card-text>
        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>MODIFICAR PRODUCTO</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-container class="mt-5">
                        <v-row>
                            <v-col class="col-6">
                                <v-text-field filled label="Nombre" :rules="[rules.required]" v-model="txtNombre"
                                    prepend-inner-icon="mdi-card-account-details"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Código" type="number" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-barcode" v-model="txtCodigo"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Cantidad disponible" type="number" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-sort-numeric-descending"
                                    v-model="txtCantDisponible"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Precio" type="number" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-cash" v-model="txtPrecio"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-textarea filled label="Descripción" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-text" rows="1" row-height="20" auto-grow
                                    v-model="txtDescripcion"></v-textarea>
                            </v-col>
                            <v-col class="col-6">
                                <v-file-input filled label="Imagen" :rules="[rules.required]" prepend-inner-icon="mdi-image"
                                    prepend-icon="" chips counter v-model="fileImagen"></v-file-input>
                            </v-col>
                            <v-col class="col-6">
                                <v-select prepend-inner-icon="mdi-list-box" :items="items" filled label="Categoria"
                                    v-model="txtCategoria" item-text="catNombre" item-value="id"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="rounded-pill text-white" color="#925419" @click="modificarProducto()">
                        Modificar
                    </v-btn>
                    <v-btn color="#925419" class="rounded-pill" @click="dialog = false">
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'ModificarProducto',

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
            { text: 'Modificar', value: 'modificar' },
        ],
        desserts: [],
        dialog: false,
        productos: null,
        product: [],
        idProducto: "",
        items: [],
        categorias: null,
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtCodigo: "",
        txtCantDisponible: "",
        txtPrecio: "",
        txtDescripcion: "",
        fileImagen: null,
        base64Image: null,
        txtCategoria: "",
    }),
    watch: {
        fileImagen: {
            handler: "convertToBase64",
            immediate: true,
        },
    },
    methods: {
        convertToBase64() {
            if (this.fileImagen) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.base64Image = e.target.result;
                };

                reader.readAsDataURL(this.fileImagen);
            }
        },
        async obtenerProductos() {
            let products = await tiendaService.getProductsSeller(localStorage.idUsuario);
            this.productos = products.data;
            this.productos.forEach(element => {
                this.desserts.push(element);
            });
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

        async obtenerCategorias() {
            let categories = await tiendaService.getCategories();
            this.categorias = categories.data;
            this.categorias.forEach(element => {
                this.items.push(element);
            });
        },

        async modificarProducto() {
            if (this.base64Image == null) {
                this.base64Image = this.product.proImagen;
            }

            axios
                .patch(this.url + "/product/update", {
                    id: this.idProducto,
                    proNombre: this.txtNombre,
                    proCodigo: this.txtCodigo,
                    proCantDisponible: this.txtCantDisponible,
                    proPrecio: this.txtPrecio,
                    proDescripcion: this.txtDescripcion,
                    proImagen: this.base64Image,
                    category_id: this.txtCategoria,
                    user_id: localStorage.idUsuario
                }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                .then(function (response) {
                    console.log(response);
                    if (response.data.result.error_id == 400) {
                        Swal.fire(
                            '¡Datos incorrectos!',
                            'Datos incompletos o con formato incorrecto',
                            'error'
                        )
                    } else {
                        Swal.fire(
                            '¡Producto modificado!',
                            'Se ha modificado el producto correctamente',
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
    },
    mounted() {
        this.obtenerProductos();
        this.obtenerCategorias()
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
</style>