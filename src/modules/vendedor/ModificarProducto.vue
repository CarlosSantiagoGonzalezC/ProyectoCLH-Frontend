<template>
    <v-card color="#da9f68" width="90%" elevation="24" class="px-5" max-width="1500px">
        <h1>GESTIONAR PRODUCTOS</h1>
        <div id="logoForm">
            <i class="fa fa-gears"></i>
        </div>
        <v-card class="mt-7 mb-5">
            <v-card-title class="tabla">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                    required></v-text-field>
                <v-btn class="mx-5" color="#925419" :to="{ name: 'agregarProducto' }"><v-icon>mdi-plus-circle</v-icon>
                    Agregar</v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" class="tabla" multi-sort
                :footer-props="{ itemsPerPageText: 'Número de filas', pageText: '{0}-{1} de {2}' }" :items-per-page="5"
                :loading="loadingTable" loading-text="Cargando... Por favor espera" no-data-text="No hay productos"
                no-results-text="No hay ningun producto que coincida">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.proCodigo }}</td>
                        <td>{{ row.item.proNombre }}</td>
                        <td class="w-500">{{ row.item.proDescripcion }}</td>
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
        <v-dialog v-model="dialogUpdate" persistent max-width="1000px">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <h2>MODIFICAR PRODUCTO</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <form class="form mt-5" @submit.prevent="modificarProducto()">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field filled label="Nombre" :rules="[rules.required]" v-model="txtNombre"
                                prepend-inner-icon="mdi-card-account-details" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field filled label="Código" type="number" :rules="[rules.required]"
                                prepend-inner-icon="mdi-barcode" v-model="txtCodigo" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field filled label="Cantidad disponible" type="number" :rules="[rules.required]"
                                prepend-inner-icon="mdi-sort-numeric-descending" v-model="txtCantDisponible"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field filled label="Precio" type="number" :rules="[rules.required]"
                                prepend-inner-icon="mdi-cash" v-model="txtPrecio" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-file-input filled label="Imagen" accept="image/*" show-size prepend-inner-icon="mdi-image" prepend-icon="" chips counter
                                v-model="fileImagen"></v-file-input>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select prepend-inner-icon="mdi-list-box" :items="items" filled label="Categoría"
                                v-model="txtCategoria" item-text="catNombre" item-value="id"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea filled label="Descripción" :rules="[rules.required]" prepend-inner-icon="mdi-text"
                                rows="1" row-height="20" auto-grow v-model="txtDescripcion" required></v-textarea>
                        </v-col>
                    </v-row>
                    <div class="btns">
                        <v-btn class="rounded-pill text-white" color="#925419" type="submit">
                            Modificar
                        </v-btn>
                        <v-btn color="#925419" class="rounded-pill" @click="dialogUpdate = false">
                            Cancelar
                        </v-btn>
                    </div>
                </form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" persistent max-width="450px">
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
                    <v-btn color="#925419" class="rounded-pill" @click="dialogDelete = false">
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
            min: v => v.length >= 5 || 'Mínimo 5 caracteres',
        },
        search: '',
        headers: [
            { text: 'Código', value: 'proCodigo' },
            { text: 'Nombre', value: 'proNombre' },
            { text: 'Descripción', value: 'proDescripcion' },
            { text: 'Disponibles', value: 'proCantDisponible' },
            { text: 'Precio', value: 'proPrecio' },
            { text: 'Imagen', key: 'img', sortable: false },
            { text: 'Acciones', key: 'actions', sortable: false },
        ],
        desserts: [],
        dialogUpdate: false,
        dialogDelete: false,
        loadingTable: true,
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
            this.loadingTable = true
            this.desserts = []
            let products = await tiendaService.getProductsSeller(localStorage.idUsuario);
            this.productos = products.data;
            this.productos.forEach(element => {
                this.desserts.push(element);
            });
            this.loadingTable = false
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
                .then((response) => {
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
                        ).then(
                            this.dialogUpdate = false,
                            this.obtenerProductos()
                        )
                    }
                })
                .catch((error) => {
                    Swal.fire(
                        '¡Error al modificar producto!',
                        'Verifique que esta haciendo el proceso correctamente',
                        'error'
                    )
                    console.log(error);
                });
        },
        async desactivarProducto() {
            axios
                .delete(this.url + "/product/delete", {
                    data: { id: this.idProducto }
                }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                .then((response) => {
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
                            .then(
                                this.obtenerProductos(),
                                this.dialogDelete = false
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
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
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
    justify-content: start;
    gap: 10px;
    padding-bottom: 10px;
}

.form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
}

.w-500 {
    max-width: 400px;
    text-wrap: balance;
}
</style>