<template>
    <v-card color="#da9f68" dark width="90%" max-width="1000px" elevation="24" class="px-5">
        <v-card-text>
            <form class="form">
                <h1>MI FINCA/EMPRESA</h1>
                <div id="logoForm" class="my-5">
                    <i class="fa fa-home"></i>
                </div>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Nombre" :rules="[rules.required]"
                            prepend-inner-icon="mdi-card-account-details" v-model="txtNombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-file-input filled label="Imagen" :rules="[rules.required]" prepend-inner-icon="mdi-image"
                            prepend-icon="" chips counter v-model="fileImagen"></v-file-input>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-textarea filled label="Historia o información" :rules="[rules.required]"
                            prepend-inner-icon="mdi-information" rows="1" row-height="20" auto-grow
                            v-model="txtHistoria"></v-textarea>
                    </v-col>
                    <v-col class="col-12">
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Municipio" :rules="[rules.required]" prepend-inner-icon="mdi-map-marker"
                            v-model="txtMunicipio"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Direccion" :rules="[rules.required]"
                            prepend-inner-icon="mdi-map-marker-outline" v-model="txtDireccion"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Telefono" type="number" :rules="[rules.required]"
                            prepend-inner-icon="mdi-cellphone" v-model="txtTelefono"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Correo electronico" type="email" :rules="[rules.required]"
                            prepend-inner-icon="mdi-at" v-model="txtCorreo"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-5">
                    <v-btn class="mr-4 rounded-pill" color="#331b05" @click="agregarDatosEmpresa()">
                        Guardar
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
import '@fortawesome/fontawesome-free/css/all.css'
import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EmpresaVendedor',

    components: {
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtHistoria: "",
        txtMunicipio: "",
        txtDireccion: "",
        txtTelefono: "",
        fileImagen: null,
        base64Image: null,
        txtCorreo: "",
        idVendedor: "",
        vendedores: [],
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
        async obtenerIdVendedor() {
            let seller = await tiendaService.getSellerUser(localStorage.idUsuario);
            this.vendedor = seller.data;
            this.idVendedor = this.vendedor[0].id;
        },
        async agregarDatosEmpresa() {
            axios
                .post(this.url + "/company/create", {
                    comNombre: this.txtNombre,
                    comHistoria: this.txtHistoria,
                    comMunicipio: this.txtMunicipio,
                    comDireccion: this.txtDireccion,
                    comTelefono: this.txtTelefono,
                    comImagen: this.base64Image,
                    comCorreo: this.txtCorreo,
                    seller_id: this.idVendedor
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
                        localStorage.idFinca = response.data.result.id;
                        Swal.fire(
                            '¡Datos de finca/empresa agregados!',
                            'Se han agregado los datos correctamente',
                            'success'
                        ).then(
                            this.$router.push({ name: 'empresa' })
                        )
                    }
                })
                .catch(function (error) {
                    Swal.fire(
                        '¡Error al registrar finca/empresa!',
                        'Verifique que esta haciendo el proceso correctamente',
                        'error'
                    )
                    console.log(error);
                });
        },
    },
    mounted() {
        this.obtenerIdVendedor();
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
</style>