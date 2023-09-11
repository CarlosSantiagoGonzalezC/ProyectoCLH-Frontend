<template>
    <v-card color="#da9f68" dark width="65%" elevation="24" class="pl-16 pr-16">
        <v-card-text>
            <h1>MI FINCA/EMPRESA</h1>
            <div class="mt-12 contenido">
                <h1>{{ finca.comNombre }}</h1>
                <div id="descrip" class="ma-4">
                    <div>
                        <img :src="finca.comImagen" alt="" style="width: 250px;" id="imgFinca">
                    </div>
                    <div>
                        <p>{{ finca.comHistoria }}
                        </p>
                    </div>
                </div>
                <hr>
                <div id="infoFinca" class="mt-6 text-left">
                    <div>
                        <h2>Información empresa:</h2>
                        <p>
                        <ul>
                            <li>Municipio: {{ finca.comMunicipio }}</li>
                            <li>Dirección: {{ finca.comDireccion }}</li>
                            <li>Telefono: {{ finca.comTelefono }}</li>
                            <li>Correo electronico: {{ finca.comCorreo }}</li>
                        </ul>
                        </p>
                    </div>
                    <div>
                        <h2>Información vendedor:</h2>
                        <p>
                        <ul>
                            <li>Nombre: {{ usuario.useNombres + " " + usuario.useApellidos }}</li>
                            <li>Telefono: {{ vendedor.selNumContacto }}</li>
                            <li>Direccion: {{ vendedor.selDireccion }}</li>
                            <li>Correo electronico: {{ usuario.useCorreo }}</li>
                        </ul>
                        </p>
                    </div>
                </div>
                <div id="botones">
                    <v-btn class="mr-4 rounded-pill" color="#331b05" @click="dialog = true">
                        <v-icon>mdi-home-edit</v-icon>
                    </v-btn>
                    <v-btn color="#331b05" class="rounded-pill" to="/inicio-vendedor">
                        Volver
                    </v-btn>
                </div>
            </div>
        </v-card-text>
        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>ACTUALIZAR DATOS</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <form class="mt-7 ml-5 mr-5">
                        <v-row>
                            <v-col class="col-6">
                                <v-text-field filled label="Nombre" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-card-account-details" v-model="txtNombre"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-file-input filled label="Imagen" :rules="[rules.required]" prepend-inner-icon="mdi-image"
                                    prepend-icon="" chips counter v-model="fileImagen"></v-file-input>
                            </v-col>
                            <v-col class="col-6">
                                <v-textarea filled label="Historia o información" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-information" rows="1" row-height="20" auto-grow
                                    v-model="txtHistoria"></v-textarea>
                            </v-col>
                            <v-col class="col-12">
                                <v-divider></v-divider>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Municipio" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-map-marker" v-model="txtMunicipio"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Direccion" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-map-marker-outline" v-model="txtDireccion"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Telefono" type="number" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-cellphone" v-model="txtTelefono"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Correo electronico" type="email" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-at" v-model="txtCorreo"></v-text-field>
                            </v-col>
                        </v-row>
                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="rounded-pill text-white mb-5" color="#925419" @click="actualizarEmpresa()">
                        Modificar
                    </v-btn>
                    <v-btn color="#925419" class="rounded-pill mb-5" @click="dialog = false">
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
import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'InfoEmpresa',

    components: {
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        fileImagen: null,
        base64Image: null,
        txtCorreo: "",
        dialog: false,
        finca: {
            txtNombre: "",
            txtHistoria: "",
            txtMunicipio: "",
            txtDireccion: "",
            txtTelefono: "",
            comImagen: "",
        },
        vendedor: null,
        usuario: null,
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
        async obtenerEmpresa() {
            let empresa = await tiendaService.getCompanySeller(localStorage.idVendedor);
            this.finca = empresa.data[0];
            this.txtNombre = this.finca.comNombre;
            this.txtHistoria = this.finca.comHistoria;
            this.txtMunicipio = this.finca.comMunicipio;
            this.txtDireccion = this.finca.comDireccion;
            this.txtTelefono = this.finca.comTelefono;
            this.txtCorreo = this.finca.comCorreo;
            console.log(this.finca);
        },
        async obtenerVendedor() {
            let seller = await tiendaService.getSellerId(localStorage.idVendedor);
            this.vendedor = seller.data;
            console.log(this.vendedor);
        },
        async obtenerUsuario() {
            let user = await tiendaService.getUserId(localStorage.idUsuario);
            this.usuario = user.data;
            console.log(this.usuario);
        },
        async actualizarEmpresa() {
            if (this.base64Image == null) {
                this.base64Image = this.finca.comImagen;
            }

            axios
                .patch(this.url + "/company/update", {
                    id: localStorage.idFinca,
                    comNombre: this.txtNombre,
                    comHistoria: this.txtHistoria,
                    comMunicipio: this.txtMunicipio,
                    comDireccion: this.txtDireccion,
                    comTelefono: this.txtTelefono,
                    comImagen: this.base64Image,
                    comCorreo: this.txtCorreo,
                    seller_id: localStorage.idVendedor
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
                        setTimeout(function () {
                            window.location.reload();
                        }, 3000);

                        Swal.fire(
                            'Datos modificados!',
                            'Se han modificado los datos de la finca/empresa',
                            'success'
                        )
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.obtenerEmpresa();
        this.obtenerVendedor();
        this.obtenerUsuario();
    },
};
</script>
  
<style scoped>
#descrip {
    margin-left: 150px;
    margin-right: 150px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

#imgFinca {
    border-radius: 20px;
    margin-right: 20px;
}

#infoFinca {
    margin-left: 100px;
    margin-right: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.contenido {
    color: #331b05;
}

h1 {
    text-align: center;
}

#botones {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>