<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="px-5">
        <v-card-text>
            <form class="form" @submit.prevent="registrarVendedor()">
                <h1>REGISTRO VENDEDOR</h1>
                <div id="logoForm" class="my-5">
                    <i class="fa fa-user-circle"></i>
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
                        <v-text-field filled label="Correo electrónico" type="email" :rules="[rules.required]"
                            prepend-inner-icon="mdi-at" v-model="txtCorreo" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Dirección" :rules="[rules.required]" prepend-inner-icon="mdi-map-marker"
                            v-model="txtDireccion" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-file-input filled label="RUNAPA o RENAC" accept=".pdf" show-size
                            :rules="[rules.required]" prepend-inner-icon="mdi-file-document" prepend-icon=""
                            v-model="filePermiso" required></v-file-input>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled label="Número de contacto" type="number" :rules="[rules.required]"
                            prepend-inner-icon="mdi-cellphone" v-model="txtNumContacto" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min, rules.passReq]" :type="show3 ? 'text' : 'password'"
                            name="input-10-2" label="Contraseña" hint="Mínimo 5 caracteres" class="input-group--focused"
                            @click:append="show3 = !show3" prepend-inner-icon="mdi-lock" v-model="txtPassword"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                            label="Confirmar contraseña" hint="Mínimo 5 caracteres" class="input-group--focused"
                            @click:append="show3 = !show3" prepend-inner-icon="mdi-lock" v-model="txtConfirPassword"
                            required></v-text-field>
                    </v-col>
                </v-row>
                <div class="btns">
                    <v-btn class="rounded-pill" color="#331b05" type="submit" :loading="loading">
                        Registrarse
                    </v-btn>
                    <v-btn color="#331b05" class="rounded-pill" to="inicio">
                        Cancelar
                    </v-btn>
                </div>
            </form>
        </v-card-text>
    </v-card>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'RegistroVendedor',

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
            passReq: value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(value) || 'Requiere al menos un número, una mayúscula y una minúscula',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtNombre: "",
        txtApellido: "",
        txtCorreo: "",
        txtDireccion: "",
        txtNomEmpresa: "",
        filePermiso: null,
        base64Archivo: null,
        txtNumContacto: "",
        txtPassword: "",
        txtConfirPassword: "",
        loading: false,
    }),
    watch: {
        filePermiso: {
            handler: "convertToBase64",
            immediate: true,
        },
    },
    methods: {
        convertToBase64() {
            if (this.filePermiso) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.base64Archivo = e.target.result;
                };

                reader.readAsDataURL(this.filePermiso);
            }
        },
        validarContraseña(contraseña) {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
            return regex.test(contraseña);
        },
        registrarVendedor() {
            this.loading = true
            if (!this.validarContraseña(this.txtPassword)) {
                Swal.fire(
                    '¡Error!',
                    'La contraseña debe contener al menos un número, una mayúscula y una minúscula.',
                    'error'
                );
                this.loading = false
                return;
            }

            if (this.txtPassword == this.txtConfirPassword) {
                axios
                    .post(this.url + "/user/create", {
                        useNombres: this.txtNombre,
                        useApellidos: this.txtApellido,
                        useCorreo: this.txtCorreo,
                        usePassword: this.txtPassword,
                        useRol: "Vendedor"
                    })
                    .then(async (response) => {
                        console.log(response);
                        return axios
                            .post(this.url + "/seller/create", {
                                selDireccion: this.txtDireccion,
                                selNumContacto: this.txtNumContacto,
                                selPermiso: this.base64Archivo,
                                user_id: response.data.result.id
                            })
                            .then((respuesta) => {
                                console.log(respuesta);
                                Swal.fire(
                                    '¡Usuario registrado!',
                                    'Se ha registrado el usuario correctamente',
                                    'success'
                                ).then(this.$router.push({ name: "login" }).catch(() => { }))
                            })
                            .catch((error) => {
                                Swal.fire(
                                    '¡Error al registrarse!',
                                    'Verifique que esta haciendo el proceso correctamente',
                                    'error'
                                )
                                console.log(error);
                                this.loading = false
                            });
                    })
                    .catch((error) => {
                        Swal.fire(
                            '¡Error al registrarse!',
                            'Verifique que esta haciendo el proceso correctamente',
                            'error'
                        )
                        this.loading = false
                        console.log(error);
                    });
            } else {
                Swal.fire(
                    '¡Las contraseñas no coinciden!',
                    'La confirmacion de contraseña no es correcta',
                    'error'
                )
                this.loading = false
            }

        },
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
.form .v-input,
.btns {
    width: 100%;
    text-align: center;
}

.btns {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.v-card {
    max-width: 800px;
}
</style>