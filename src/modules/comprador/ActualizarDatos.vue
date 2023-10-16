<template>
    <v-card color="#da9f68" dark width="90%" max-width="500px" elevation="24" class="px-5">
        <form class="form" @submit.prevent="actualizarDatos()">
            <h1>ACTUALIZAR DATOS</h1>
            <div id="logoForm" class="my-5">
                <i class="fa fa-edit"></i>
            </div>
            <v-row>
                <v-col cols="12">
                    <v-text-field filled label="Nombres" :rules="[rules.required]"
                        prepend-inner-icon="mdi-card-account-details" v-model="txtNombre" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field filled label="Apellidos" :rules="[rules.required]"
                        prepend-inner-icon="mdi-card-account-details-outline" v-model="txtApellido" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field filled label="Correo electrónico" type="email" :rules="[rules.required]"
                        prepend-inner-icon="mdi-at" v-model="txtCorreo" required></v-text-field>
                </v-col>
            </v-row>
            <v-row class="my-5">
                <v-btn class="mr-4 rounded-pill" color="#331b05" type="submit">
                    Actualizar
                </v-btn>
                <v-btn color="#331b05" class="rounded-pill" to="inicio-comprador">
                    Cancelar
                </v-btn>
            </v-row>
        </form>
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
            min: v => v.length >= 5 || 'Mínimo 5 caracteres',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtApellido: "",
        txtCorreo: "",
        usuario: null,
    }),
    methods: {
        async obtenerUsuario() {
            let idUsuario = localStorage.idUsuario;
            let user = await tiendaService.getUser(idUsuario);
            this.usuario = user.data;
            this.txtNombre = this.usuario.useNombres;
            this.txtApellido = this.usuario.useApellidos;
            this.txtCorreo = this.usuario.useCorreo;
        },
        async actualizarDatos() {
            axios
                .patch(this.url + "/user/update", {
                    id: localStorage.idUsuario,
                    useNombres: this.txtNombre,
                    useApellidos: this.txtApellido,
                    useCorreo: this.txtCorreo
                }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                .then(function (response) {
                    console.log(response);
                    Swal.fire(
                        '¡Datos actualizados!',
                        'Se han actualizado los datos correctamente',
                        'success'
                    )
                        .then(this.$router.push({ name: "Inicio" }))
                })
                .catch((error) => {
                    Swal.fire(
                        '¡Error al actualizar datos!',
                        'Verifique que esta haciendo el proceso correctamente',
                        'error'
                    )
                    console.log(error);
                });
        },

        async cambiarContraseña() {
            if (this.txtPasswordNueva == this.txtConfirPassword) {

                axios
                    .patch(this.url + "/user/editPassword", {
                        id: localStorage.idUsuario,
                        passwordActual: this.txtPasswordActual,
                        passwordNueva: this.txtPasswordNueva
                    }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                    .then(function (response) {
                        console.log(response);
                        if (response.data.result.error_id == "200") {
                            Swal.fire(
                                '¡Contraseña incorrecta!',
                                'La contraseña actual no es correcta',
                                'error'
                            )
                        } else {
                            Swal.fire(
                                '¡Contraseña actualizada!',
                                'Se ha actualizado la contraseña correctamente',
                                'success'
                            )
                            setTimeout(function () {
                                window.location.reload()
                            }, 3000);
                        }

                    })
                    .catch(function (error) {
                        Swal.fire(
                            '¡Error al actualizar contraseña!',
                            'Verifique que su contraseña actual sea correcta',
                            'error'
                        )
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