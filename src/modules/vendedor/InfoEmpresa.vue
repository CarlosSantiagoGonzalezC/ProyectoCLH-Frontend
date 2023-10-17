<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="px-5">
        <h1>MI FINCA/EMPRESA</h1>
        <div v-if="finca.comNombre !== ''" class="mt-12 contenido">
            <h1>{{ finca.comNombre }}</h1>
            <v-row id="descrip" class="ma-4" align-content="center">
                <v-col cols="12" md="6">
                    <div class="center">
                        <img :src="finca.comImagen" alt="" id="imgFinca">
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="center">
                        {{ finca.comHistoria }}
                    </div>
                </v-col>
            </v-row>
            <hr>
            <v-row id="infoFinca" class="mt-6 text-left">
                <v-col cols="12" md="6">
                    <div class="informacion">
                        <h2>Información empresa:</h2>
                        <ul>
                            <li>Municipio: {{ finca.comMunicipio }}</li>
                            <li>Dirección: {{ finca.comDireccion }}</li>
                            <li>Número NEQUI: {{ finca.comTelefono }}</li>
                            <li>Correo electrónico: {{ finca.comCorreo }}</li>
                        </ul>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="informacion">
                        <h2>Información vendedor:</h2>
                        <ul>
                            <li>Nombre: {{ usuario.useNombres + " " + usuario.useApellidos }}</li>
                            <li>Teléfono: {{ vendedor.selNumContacto }}</li>
                            <li>Dirección: {{ vendedor.selDireccion }}</li>
                            <li>Correo electrónico: {{ usuario.useCorreo }}</li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
            <div id="botones" class="my-5">
                <v-btn class="rounded-pill" color="#331b05" @click="dialog = true">
                    <v-icon>mdi-home-edit</v-icon>
                </v-btn>
                <v-btn color="#331b05" class="rounded-pill" :to="{ name: 'Inicio' }">
                    Volver
                </v-btn>
            </div>
        </div>
        <div class="text-center mt-15" v-else>
            <v-progress-circular class="text-center" :size="200" :width="20" color="brown"
                indeterminate></v-progress-circular>
            <h2 class="mt-12">Cargando datos...</h2>
        </div>
        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>ACTUALIZAR DATOS</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <form class="mt-7 ml-5 mr-5" @submit.prevent="actualizarEmpresa()">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field filled label="Nombre" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-card-account-details" v-model="txtNombre"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-file-input filled label="Imagen" prepend-inner-icon="mdi-image"
                                    prepend-icon="" chips counter v-model="fileImagen"></v-file-input>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea filled label="Historia o información" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-information" rows="1" row-height="20" auto-grow
                                    v-model="txtHistoria" required></v-textarea>
                            </v-col>
                            <v-col class="col-12">
                                <v-divider></v-divider>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field filled label="Municipio" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-map-marker" v-model="txtMunicipio" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field filled label="Dirección" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-map-marker-outline" v-model="txtDireccion"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field filled label="Telefono" type="number" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-cellphone" v-model="txtTelefono" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field filled label="Correo electrónico" type="email" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-at" v-model="txtCorreo" required></v-text-field>
                            </v-col>
                            <v-col class="gap">
                                <v-btn class="rounded-pill text-white mb-5" color="#925419" type="submit">
                                    Modificar
                                </v-btn>
                                <v-btn color="#925419" class="rounded-pill mb-5" @click="dialog = false">
                                    Cancelar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </v-card-text>
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
        txtNombre: "",
        txtHistoria: "",
        txtMunicipio: "",
        txtDireccion: "",
        txtTelefono: "",
        comImagen: "",
        finca: {
            comNombre: "",
            comHistoria: "",
            comCorreo: "",
            comDireccion: "",
            comImagen: "",
            comMunicipio: "",
            comTelefono: "",
        },
        vendedor: {
            selNumContacto: ""
        },
        usuario: {
            useNombres: "",
            useApellidos: "",
            useCorreo: "",
        },
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
            await this.obtenerVendedor()
            let empresa = await tiendaService.getCompanySeller(this.vendedor.id);
            if (!empresa.data[0]) {
                this.$router.push({ name: 'newEmpresa' })
            } else {
                this.finca = empresa.data[0];
                this.txtNombre = this.finca.comNombre;
                this.txtHistoria = this.finca.comHistoria;
                this.txtMunicipio = this.finca.comMunicipio;
                this.txtDireccion = this.finca.comDireccion;
                this.txtTelefono = this.finca.comTelefono;
                this.txtCorreo = this.finca.comCorreo;
            }
        },
        async obtenerVendedor() {
            let seller = await tiendaService.getSellerUser(localStorage.idUsuario);
            this.vendedor = seller.data[0];
        },
        async obtenerUsuario() {
            let user = await tiendaService.getUserId(localStorage.idUsuario);
            this.usuario = user.data;
        },
        async actualizarEmpresa() {
            if (this.base64Image == null) {
                this.base64Image = this.finca.comImagen;
            }

            axios
                .patch(this.url + "/company/update", {
                    id: this.finca.id,
                    comNombre: this.txtNombre,
                    comHistoria: this.txtHistoria,
                    comMunicipio: this.txtMunicipio,
                    comDireccion: this.txtDireccion,
                    comTelefono: this.txtTelefono,
                    comImagen: this.base64Image,
                    comCorreo: this.txtCorreo,
                    seller_id: this.vendedor.id
                }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                .then((response) => {
                    if (response.data.result.error_id == 400) {
                        Swal.fire(
                            '¡Datos incorrectos!',
                            'Datos incompletos o con formato incorrecto',
                            'error'
                        )
                    } else {
                        this.dialog = false
                        this.obtenerEmpresa()
                        Swal.fire(
                            'Datos modificados!',
                            'Se han modificado los datos de la finca/empresa',
                            'success'
                        )
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.obtenerEmpresa()
        this.obtenerUsuario()
    },
};
</script>
  
<style scoped>
#imgFinca {
    border-radius: 20px;
    width: 75%;
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
    gap: 5px;
}

.center {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.informacion {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.informacion ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.gap{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
</style>