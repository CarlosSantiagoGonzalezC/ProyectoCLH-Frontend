<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="px-5 py-10">
        <v-card-text>
            <form class="form" @submit.prevent="inicarSesion()">
                <h1>INICIAR SESIÓN</h1>
                <div id="logoForm" class="my-5">
                    <i class="fa fa-user"></i>
                    <!-- <v-icon color="#331b05">mdi-account</v-icon> -->
                </div>
                <v-text-field filled label="Correo electrónico" type="email" :rules="[rules.required]"
                    prepend-inner-icon="mdi-at" class="" v-model="txtCorreo" required></v-text-field>
                <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'" name="input-10-2" label="Contraseña" hint="Minimo 5 caracteres"
                    class="input-group--focused" @click:append="show3 = !show3" prepend-inner-icon="mdi-lock"
                    v-model="txtPassword" required></v-text-field>
                <vue-recaptcha @verify="onCaptchaVerified" sitekey="6LfGXWYlAAAAAHqCvlXfzzcM33f8CWYzi00xCzFj"
                    class="mb-3"></vue-recaptcha>
                <div class="btns">
                    <v-btn class="rounded-pill" color="#331b05" type="submit">
                        Iniciar sesión
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
import VueRecaptcha from "vue-recaptcha";
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'LoginApp',

    components: {
        VueRecaptcha
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
        txtCorreo: "",
        txtPassword: "",
        recaptcha: null,
    }),
    methods: {
        onCaptchaVerified(response) {
            // Manejar la respuesta del captcha aquí
            console.log("Captcha verificado:", response);
            this.recaptcha = response;
        },
        async inicarSesion() {
            if (!this.recaptcha) {
                Swal.fire(
                    '¡Validación fallida!',
                    'Por favor valide el recaptcha',
                    'error'
                )
            } else {
                axios
                    .post(this.url + "/auth", {
                        useCorreo: this.txtCorreo,
                        usePassword: this.txtPassword
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.data.result.error_id == 200) {
                            Swal.fire(
                                '¡Credenciales incorrectas!',
                                'Verifique que sus credenciales sean validas',
                                'error'
                            )
                        } else {
                            localStorage.idUsuario = response.data.result.id;
                            localStorage.token = response.data.result.token;
                            localStorage.rol = response.data.result.rol;
                            this.$router.push({ name: "Inicio" }).catch(() => { })
                            location.reload()
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire(
                            '¡Error al iniciar sesión!',
                            'Verifique que sus credenciales sean validas',
                            'error'
                        )
                    });
            }

        },
    },
    head: {
        script: [
            { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: true, body: true },
        ],
    },
    mounted() {
        if (localStorage.token) {
            this.$router.push({ name: "Inicio" }).catch(() => { })
        }
    }

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
    max-width: 500px;
}
</style>