<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="50%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>INICIAR SESIÓN</h1>
                    <div id="logoForm">
                        <i class="fa fa-user"></i>
                        <!-- <v-icon color="#331b05">mdi-account</v-icon> -->
                    </div>
                    <form class="mt-7">
                        <v-text-field filled label="Correo electronico" type="email" :rules="[rules.required]"
                            prepend-inner-icon="mdi-at" class="ml-16 mr-16"></v-text-field>
                        <v-text-field filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
                            label="Contraseña" hint="Minimo 5 caracteres" class="input-group--focused ml-16 mr-16"
                            @click:append="show3 = !show3" prepend-inner-icon="mdi-lock"></v-text-field>
                        <VueRecaptcha sitekey="6LdexlcnAAAAAAbOQ2nCABf0s3Tf8UCq7GGI2Afx" class="mb-3"></VueRecaptcha>
                        <v-btn class="mr-4 rounded-pill" color="#331b05">
                            Iniciar sesión
                        </v-btn>
                        <v-btn color="#331b05" class="rounded-pill">
                            Cancelar
                        </v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </div>

        <FooterApp></FooterApp>

    </v-app>
</template>
  
<script>
import HeaderNav from './components/HeaderNav.vue';
import FooterApp from './components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import VueRecaptcha from 'vue-recaptcha';

export default {
    name: 'LoginApp',

    components: {
        HeaderNav,
        FooterApp,
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
    }),
    methods: {
    },
    head: {
        script: [
            { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: true, body: true },
        ],
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

.content-full {
    min-height: 60vh;
}
</style>