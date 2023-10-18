<template>
    <v-card color="#da9f68" dark width="90%" max-width="1000px" elevation="24" class="px-5">
        <v-card-text>
            <form class="form" @submit.prevent="actualizarDatos()">
                <h1>ACTUALIZAR DATOS</h1>
                <div id="logoForm" class="my-5">
                    <i class="fa fa-edit"></i>
                </div>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Nombres" :rules="[rules.required]"
                            prepend-inner-icon="mdi-card-account-details" v-model="txtNombre" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Apellidos" :rules="[rules.required]"
                            prepend-inner-icon="mdi-card-account-details-outline" v-model="txtApellido"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Correo eletronico" type="email" :rules="[rules.required]"
                            prepend-inner-icon="mdi-at" v-model="txtCorreo" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Dirección" :rules="[rules.required]" prepend-inner-icon="mdi-map-marker"
                            v-model="txtDireccion" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Numero de contacto" type="number" :rules="[rules.required]"
                            prepend-inner-icon="mdi-cellphone" v-model="txtNumContacto" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mb-5 gap">
                    <v-btn class="rounded-pill" color="#331b05" type="submit">
                        Actualizar
                    </v-btn>
                    <v-btn color="#331b05" class="rounded-pill" to="inicio">
                        Cancelar
                    </v-btn>
                </v-row>
            </form>

            <hr>

            <form class="form mt-8" @submit.prevent="cambiarContraseña()">
                <h1>CAMBIAR CONTRASEÑA</h1>
                <div id="logoForm" class="my-5">
                    <i class="fa fa-lock"></i>
                </div>
                <v-row>
                    <v-col class="col-6">
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                            label="Contraseña actual" hint="Minimo 5 caracteres" class="input-group--focused"
                            @click:append="show3 = !show3" prepend-inner-icon="mdi-lock" v-model="txtPasswordActual"
                            required></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min, rules.passReq]" :type="show3 ? 'text' : 'password'"
                            name="input-10-2" label="Contraseña nueva" hint="Minimo 5 caracteres"
                            class="input-group--focused" @click:append="show3 = !show3" prepend-inner-icon="mdi-lock"
                            v-model="txtPasswordNueva" required></v-text-field>
                    </v-col>
                    <v-col class="col-6">
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                            label="Confirmar contraseña" hint="Minimo 5 caracteres" class="input-group--focused"
                            @click:append="show3 = !show3" prepend-inner-icon="mdi-lock" v-model="txtConfirPassword"
                            required></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="my-5">
                    <v-btn class="mr-4 rounded-pill" color="#331b05" type="submit">
                        Cambiar contraseña
                    </v-btn>
                    <v-btn color="#331b05" class="rounded-pill" to="inicio-comprador">
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
            passReq: value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(value) || 'Requiere al menos un número, una mayúscula y una minúscula',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtApellido: "",
        txtCorreo: "",
        txtDireccion: "",
        txtNumContacto: "",
        txtPasswordActual: "",
        txtPasswordNueva: "",
        txtConfirPassword: "",
        usuario: null,
        vendedor: null,
    }),
    watch: {
        filePermiso: {
            handler: "convertToBase64",
            immediate: true,
        },
    },
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

        validarContraseña(contraseña) {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
            return regex.test(contraseña);
        },

        actualizarDatos() {
            axios
                .patch(this.url + "/user/update", {
                    id: localStorage.idUsuario,
                    useNombres: this.txtNombre,
                    useApellidos: this.txtApellido,
                    useCorreo: this.txtCorreo
                }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                .then(async (response) => {
                    console.log(response);
                    return axios
                        .patch(this.url + "/seller/update", {
                            id: localStorage.idVendedor,
                            selDireccion: this.txtDireccion,
                            selNumContacto: this.txtNumContacto
                        }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                        .then((respuesta) => {
                            console.log(respuesta);
                            Swal.fire(
                                '¡Datos actualizados!',
                                'Se han actualizado los datos correctamente',
                                'success'
                            ).then(
                                //window.location.reload()
                            )
                        })
                        .catch((error) => {
                            Swal.fire(
                                '¡Error al actualizar datos!',
                                'Verifique que esta haciendo el proceso correctamente',
                                'error'
                            )
                            console.log(error);
                        });

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

.gap {
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>