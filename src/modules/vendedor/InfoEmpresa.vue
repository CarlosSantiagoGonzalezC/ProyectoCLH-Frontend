<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="65%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>MI FINCA/EMPRESA</h1>
                    <div class="mt-12 contenido">
                        <h1>Cafeteros Huilenses</h1>
                        <div id="descrip" class="ma-4">
                            <div>
                                <img src="https://www.bienestarcolsanitas.com/images/2-SECCIONES/TIEMPO-LIBRE/RECOMENDACIONES/FINCAS_CAFE/FINCAS_CAFE_1.jpg"
                                    alt="" style="width: 250px;" id="imgFinca">
                            </div>
                            <div>
                                <p>En cafeteros huilenses contamos con la mejor finca cafetera del Huila, la cual
                                    da sus inicios en 1989 con la curiosa finalidad de ser tomada para otras funcionalidades
                                    pero que al ver las tierras perfectas que la rodeaban, fue adaptada para la cosecha de
                                    café.
                                </p>
                            </div>
                        </div>
                        <hr>
                        <div id="infoFinca" class="mt-6 text-left">
                            <div>
                                <h2>Información empresa:</h2>
                                <p>
                                <ul>
                                    <li>Municipio: Rivera</li>
                                    <li>Dirección: Cra 50B #78-58</li>
                                    <li>Telefono: 3254859865</li>
                                    <li>Correo electronico: cafeteroshuila@gmail.com</li>
                                </ul>
                                </p>
                            </div>
                            <div>
                                <h2>Información vendedor:</h2>
                                <p>
                                <ul>
                                    <li>Nombre: Sebastian Gomez</li>
                                    <li>Telefono: 3254859865</li>
                                    <li>Ciudad: Neiva</li>
                                    <li>Correo electronico: sebas@gmail.com</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                        <div id="botones">
                            <v-btn class="mr-4 rounded-pill" color="#331b05" @click="dialog = true">
                                <v-icon>mdi-home-edit</v-icon>
                            </v-btn>
                            <v-btn color="#331b05" class="rounded-pill" to="/inicio-vendedor">
                                Volver
                            </v-btn>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>ACTUALIZAR DATOS</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <form class="mt-7 ml-5 mr-5">
                        <v-row>
                            <v-col class="col-6">
                                <v-text-field filled label="Nombre" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-card-account-details" value="Cafeteros Huilenses"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-file-input filled label="Imagen" :rules="[rules.required]" prepend-inner-icon="mdi-image"
                                    prepend-icon="" multiple chips counter></v-file-input>
                            </v-col>
                            <v-col class="col-6">
                                <v-textarea filled label="Historia o información" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-information" rows="1" row-height="20" auto-grow value="Desde 1989 siendo los mejores"></v-textarea>
                            </v-col>
                            <v-col class="col-12">
                                <v-divider></v-divider>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Municipio" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-map-marker" value="Rivera"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Direccion" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-map-marker-outline" value="Cra 50B #78-58"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Telefono" type="number" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-cellphone" value="3254859865"></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field filled label="Correo electronico" type="email" :rules="[rules.required]"
                                    prepend-inner-icon="mdi-at" value="cafeteroshuila@gmail.com"></v-text-field>
                            </v-col>
                        </v-row>
                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="rounded-pill text-white mb-5" color="#925419">
                        Modificar
                    </v-btn>
                    <v-btn color="#925419" class="rounded-pill mb-5" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <FooterApp></FooterApp>

    </v-app>
</template>
  
<script>
import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css'

export default {
    name: 'InfoEmpresa',

    components: {
        HeaderNav,
        FooterApp,
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        dialog: false,
    }),
    methods: {
    },
};
</script>
  
<style scoped>
#descrip {
    margin-left: 150px;
    margin-right: 150px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

#imgFinca {
    border-radius: 20px;
    margin-right: 20px;
}

#infoFinca {
    margin-left: 100px;
    margin-right: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.contenido {
    color: #331b05;
}

.content-full {
    min-height: 60vh;
}
</style>