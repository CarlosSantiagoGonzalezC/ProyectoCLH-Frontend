<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="50%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>MI FINCA/EMPRESA</h1>
                    <div id="logoForm">
                        <i class="fa fa-home"></i>
                    </div>
                    <form class="mt-7">
                        <v-row>
                            <v-col class="col-6">
                                <v-text-field filled label="Nombre" :rules="[rules.required]"
                                prepend-inner-icon="mdi-card-account-details"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-file-input filled label="Imagen" :rules="[rules.required]"
                                prepend-inner-icon="mdi-image" prepend-icon="" multiple chips counter></v-file-input>
                            </v-col>
                            <v-col class="col-6">
                                <v-textarea filled label="Historia o información" :rules="[rules.required]"
                                prepend-inner-icon="mdi-information" rows="1" row-height="20" auto-grow></v-textarea>
                            </v-col>
                            <v-col class="col-12">
                                <v-divider></v-divider>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Municipio" :rules="[rules.required]"
                                prepend-inner-icon="mdi-map-marker"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Direccion" :rules="[rules.required]"
                                prepend-inner-icon="mdi-map-marker-outline"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Telefono" type="number" :rules="[rules.required]"
                                prepend-inner-icon="mdi-cellphone"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Correo electronico" type="email" :rules="[rules.required]"
                                prepend-inner-icon="mdi-at"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-btn class="mr-4 rounded-pill" color="#331b05" to="/info-empresa">
                            Guardar
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
import FooterApp from '../general/components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css'

export default {
    name: 'EmpresaVendedor',

    components: {
        HeaderNav,
        FooterApp,
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
    }),
    methods: {
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

.content-full {
    min-height: 60vh;
}
</style>