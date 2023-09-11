<template>
    <v-card color="#da9f68" dark width="50%" elevation="24" class="pl-16 pr-16">
        <v-card-text>
            <form class="form">
                <h1>ACTUALIZAR DATOS</h1>
                <div id="logoForm" class="my-5">
                    <i class="fa fa-edit"></i>
                </div>
                <v-row>
                    <v-col class="col-6">
                        <v-text-field filled label="Nombres" :rules="[rules.required]"
                            prepend-inner-icon="mdi-card-account-details" v-model="txtNombre"></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled label="Apellidos" :rules="[rules.required]"
                            prepend-inner-icon="mdi-card-account-details-outline" v-model="txtApellido"></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled label="Correo eletronico" type="email" :rules="[rules.required]"
                            prepend-inner-icon="mdi-at" v-model="txtCorreo"></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled label="Dirección" :rules="[rules.required]" prepend-inner-icon="mdi-map-marker"
                            v-model="txtDireccion"></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled label="Numero de contacto" type="number" :rules="[rules.required]"
                            prepend-inner-icon="mdi-cellphone" v-model="txtNumContacto"></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                            label="Contraseña" hint="Minimo 5 caracteres" class="input-group--focused"
                            @click:append="show3 = !show3" prepend-inner-icon="mdi-lock"
                            v-model="txtPassword"></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                            label="Confirmar contraseña" hint="Minimo 5 caracteres" class="input-group--focused"
                            @click:append="show3 = !show3" prepend-inner-icon="mdi-lock"
                            v-model="txtConfirPassword"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-5">
                    <v-btn class="mr-4 rounded-pill" color="#331b05" @click="actualizarDatos()">
                        Actualizar
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
//import store from '../store/store';
import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'ActualizarDatos',

    components: {
    },

    data: () => ({
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtApellido: "",
        txtCorreo: "",
        txtDireccion: "",
        txtNumContacto: "",
        txtPassword: "",
        txtConfirPassword: "",
        usuario: null,
        vendedor: null,
    }),
    methods: {
        async obtenerUsuario() {
            let idUsuario = localStorage.idUsuario;
            let user = await tiendaService.getUser(idUsuario);
            let seller = await tiendaService.getSellerUser(idUsuario);
            this.usuario = user.data;
            this.vendedor = seller.data;
            this.txtNombre = this.usuario.useNombres;
            this.txtApellido = this.usuario.useApellidos;
            this.txtCorreo = this.usuario.useCorreo;
            this.txtDireccion = this.vendedor[0].selDireccion,
                this.txtNumContacto = this.vendedor[0].selNumContacto,
                console.log(this.vendedor);
        },

        async actualizarDatos() {
            if (this.txtPassword == this.txtConfirPassword) {

                axios
                    .patch(this.url + "/user/update", {
                        id: localStorage.idUsuario,
                        useNombres: this.txtNombre,
                        useApellidos: this.txtApellido,
                        useCorreo: this.txtCorreo,
                        usePassword: this.txtPassword,
                        useRol: "Comprador"
                    })
                    .then(function (response) {
                        console.log(response);
                        Swal.fire(
                            '¡Datos actualizados!',
                            'Se han actualizado los datos correctamente',
                            'success'
                        )
                        setTimeout(function () {
                            window.location.reload()
                        }, 3000);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                Swal.fire(
                    '¡Las contraseñas no coinciden!',
                    'La confirmacion de contraseña no es correcta',
                    'error'
                )
            }
        },

    },
    mounted() {
        this.obtenerUsuario();
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