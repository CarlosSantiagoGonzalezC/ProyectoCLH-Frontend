<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="pl-16 pr-16">
        <v-card-text>
            <form class="form">
                <h1>AGREGAR PRODUCTO</h1>
                <div id="logoForm">
                    <i class="fa fa-plus-square"></i>
                </div>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Nombre" :rules="[rules.required]"
                            prepend-inner-icon="mdi-card-account-details" v-model="txtNombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Código" type="number" :rules="[rules.required]"
                            prepend-inner-icon="mdi-barcode" v-model="txtCodigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Cantidad disponible" type="number" :rules="[rules.required]"
                            prepend-inner-icon="mdi-sort-numeric-descending" v-model="txtCantDisponible"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Precio" type="number" :rules="[rules.required]"
                            prepend-inner-icon="mdi-cash" v-model="txtPrecio"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-textarea filled label="Descripción" :rules="[rules.required]" prepend-inner-icon="mdi-text"
                            rows="1" row-height="20" auto-grow v-model="txtDescripcion"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-file-input filled label="Imagen" :rules="[rules.required]" prepend-inner-icon="mdi-image"
                            prepend-icon="" v-model="fileImagen" chips counter></v-file-input>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select prepend-inner-icon="mdi-list-box" :items="items" filled label="Categoria"
                            v-model="txtCategoria" item-text="catNombre" item-value="id"></v-select>
                    </v-col>
                </v-row>
                <v-row class="mb-5 gap">
                    <v-btn class="rounded-pill" color="#331b05" @click="agregarProducto()">
                        Agregar
                    </v-btn>
                    <v-btn color="#331b05" class="rounded-pill" to="inicio-vendedor">
                        Cancelar
                    </v-btn>
                </v-row>
            </form>
        </v-card-text>
    </v-card>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import Swal from 'sweetalert2';
//import store from '../store/store';
import tiendaService from '@/services/tiendaService';

export default {
    name: 'AgregarProducto',

    components: {
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtCodigo: "",
        txtCantDisponible: "",
        txtPrecio: "",
        txtDescripcion: "",
        fileImagen: null,
        txtCategoria: "",
        base64Image: null,
        items: [],
        categorias: null,
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
        async agregarProducto() {
            axios
                .post(this.url + "/product/create", {
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
                        ).then(() => {
                            this.$router.push({ name: "modificarProducto" }).catch(() => { });
                        })
                    }
                })
                .catch((error) => {
                    Swal.fire(
                        '¡Error al registrar producto!',
                        'Verifique que esta haciendo el proceso correctamente',
                        'error'
                    )
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

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form h1,
.form .v-input {
    width: 100%;
    text-align: center;
}

.v-card{
    max-width: 700px;
}

.gap{
    gap: 5px;
}
</style>