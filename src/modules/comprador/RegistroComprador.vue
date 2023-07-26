<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="50%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>REGISTRO USUARIO</h1>
                    <div id="logoForm">
                        <i class="fa fa-user"></i>
                        <!-- <v-icon color="#331b05">mdi-account</v-icon> -->
                    </div>
                    <form class="mt-7">
                        <v-row>
                            <v-col class="6">
                                <v-text-field filled label="Nombres" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-card-account-details" class="ml-16"></v-text-field>
                            </v-col>
                            <v-col class="6">
                                <v-text-field filled label="Apellidos" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-card-account-details-outline" class="mr-16"></v-text-field>
                            </v-col>
                            <!-- <v-col class="6">
                                <v-text-field filled label="Correo eletronico" type="email" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-at" class="ml-16"></v-text-field>
                            </v-col>
                            <v-col class="6">
                                <v-text-field filled label="Contraseña" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-at" class="mr-16"></v-text-field>
                            </v-col>
                            <v-col class="6">
                                <v-text-field filled label="Confirmar contraseña" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-at" class="ml-16"></v-text-field>
                            </v-col>
                            <v-col class="6">
                                Recaptcha 
                            </v-col> -->
                        </v-row>
                        <v-btn class="mr-4 rounded-pill" color="#331b05">
                            Registrarse
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
import HeaderNav from '../general/components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css'

export default {
    name: 'RegistroComprador',

    components: {
        HeaderNav,
        FooterApp,
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
        },
    }),
    methods: {
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