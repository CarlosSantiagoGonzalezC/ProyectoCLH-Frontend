<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="50%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>AGREGAR PRODUCTO</h1>
                    <div id="logoForm">
                        <i class="fa fa-plus-square"></i>
                    </div>
                    <form class="mt-7">
                        <v-row>
                            <v-col class="col-6">
                                <v-text-field filled label="Nombre" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-card-account-details" v-model="txtNombre"></v-text-field>
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
                                    prepend-icon="" v-model="fileImagen" accept="image/*" chips counter></v-file-input>
                            </v-col>
                            <v-col class="col-6">
                                <v-select prepend-inner-icon="mdi-list-box" :items="items" filled label="Categoria"
                                    v-model="txtCategoria" item-text="catNombre" item-value="id"></v-select>
                            </v-col>
                        </v-row>
                        <v-btn class="mr-4 rounded-pill" color="#331b05" @click="agregarProducto()">
                            Agregar
                        </v-btn>
                        <v-btn color="#331b05" class="rounded-pill">
                            Cancelar
                        </v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </div>

        <FooterApp></FooterApp>

    </v-app>
</template>
  
<script>
import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import Swal from 'sweetalert2';
//import store from '../store/store';
import tiendaService from '@/services/tiendaService';

export default {
    name: 'AgregarProducto',

    components: {
        HeaderNav,
        FooterApp,
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        url: "http://127.0.0.1:8000/api",
        txtNombre: "",
        txtCodigo: "",
        txtCantDisponible: "",
        txtPrecio: "",
        txtDescripcion: "",
        fileImagen: null,
        txtCategoria: "",
        base64Imagen: null,
        items: [],
        categorias: null,
    }),
    watch: {
        file: function (newFile) {
            if (newFile) {
                this.convertToBase64(newFile);
            }
        },
    },
    methods: {
        convertToBase64(file) {
            const reader = new FileReader();

            reader.onload = () => {
                this.base64Imagen = reader.result.split(',')[1];
            };

            reader.readAsDataURL(file);
        },
        async agregarProducto() {
            console.log(this.fileImagen);
            axios
                .post(this.url + "/product/create", {
                    proNombre: this.txtNombre,
                    proCodigo: this.txtCodigo,
                    proCantDisponible: this.txtCantDisponible,
                    proPrecio: this.txtPrecio,
                    proDescripcion: this.txtDescripcion,
                    proImagen: this.base64Imagen,
                    category_id: this.txtCategoria,
                    user_id: localStorage.idUsuario
                })
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
                            '¡Producto registrado!',
                            'Se ha registrado el producto correctamente',
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

        async obtenerCategorias() {
            let categories = await tiendaService.getCategories();
            this.categorias = categories.data;
            this.categorias.forEach(element => {
                this.items.push(element);
            });
        },
    },
    mounted() {
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

.content-full {
    min-height: 60vh;
}
</style>