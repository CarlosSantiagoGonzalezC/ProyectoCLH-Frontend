<template>
    <v-card color="#da9f68" dark width="90%" max-width="700px" elevation="24" class="px-5">
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
                <v-btn class="mr-4 rounded-pill" color="#331b05" type="submit" :loading="loading">
                    Actualizar
                </v-btn>
                <v-btn color="#331b05" class="rounded-pill" to="inicio-comprador">
                    Cancelar
                </v-btn>
            </v-row>
        </form>
        <v-dialog v-model="dialog" persistent max-width="700px">
            <v-card>
                <form class="form mt-8" @submit.prevent="cambiarContraseña()">
                    <h1>CAMBIAR CONTRASEÑA</h1>
                    <div id="logoForm" class="my-5">
                        <i class="fa fa-lock"></i>
                    </div>
                    <v-row class="pa-0 ma-0">
                        <v-col class="col-12">
                            <div class="center">
                                <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                                    label="Contraseña actual" hint="Minimo 5 caracteres" class="input-group--focused"
                                    @click:append="show3 = !show3" prepend-inner-icon="mdi-lock" v-model="txtPasswordActual"
                                    required></v-text-field>
                            </div>
                        </v-col>
                        <v-col class="col-12">
                            <div class="center">
                                <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min, rules.passReq]" :type="show3 ? 'text' : 'password'"
                                    name="input-10-2" label="Contraseña nueva" hint="Minimo 5 caracteres"
                                    class="input-group--focused" @click:append="show3 = !show3" prepend-inner-icon="mdi-lock"
                                    v-model="txtPasswordNueva" required></v-text-field>
                            </div>
                        </v-col>
                        <v-col class="col-12">
                            <div class="center">
                                <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                                    label="Confirmar contraseña" hint="Minimo 5 caracteres" class="input-group--focused"
                                    @click:append="show3 = !show3" prepend-inner-icon="mdi-lock" v-model="txtConfirPassword"
                                    required></v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="my-5 gap">
                        <v-btn class="rounded-pill" type="submit" :loading="loading">
                            Cambiar contraseña
                        </v-btn>
                        <v-btn class="rounded-pill" @click="dialog = false">
                            Cancelar
                        </v-btn>
                    </v-row>
                </form>
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
            passReq: value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(value) || 'Requiere al menos un número, una mayúscula y una minúscula',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtApellido: "",
        txtCorreo: "",
        usuario: null,
        loading: false,
        dialog: false,
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
            this.loading = true
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
                    this.loading = false
                    console.log(error);
                });
        },

        validarContraseña(contraseña) {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
            return regex.test(contraseña);
        },

        async cambiarContraseña() {
            if (!this.validarContraseña(this.txtPasswordNueva)) {
                Swal.fire(
                    '¡Error!',
                    'La contraseña debe contener al menos un número, una mayúscula y una minúscula.',
                    'error'
                );
                return;
            }

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
    color: #202020;
}

.form, .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form h1,
.form .v-input {
    width: 80%;
    text-align: center;
}

.gap{
    gap: 20px;
}
</style>