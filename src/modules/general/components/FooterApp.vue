<template>
    <div>
        <v-footer dark color="#331b05" class="around mt-10">

            <v-row justify="center" align="center" class="gap py-5">
                <h3>
                    Todos los derechos reservados
                </h3>
                <v-icon>mdi-copyright</v-icon>
            </v-row>

            <v-row class="evenly">
                <v-col cols="12" sm="6" md="3" class="center">
                    <h4>Información:</h4>
                    <ul>
                        <li>sc805036@gmail.com</li>
                        <li>+57 3136998962</li>
                        <li>SENA Industrial</li>
                        <li>Neiva - Huila</li>
                        <li>Cra 5 #14-22</li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="center">
                    <h4>Redes Sociales:</h4>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com" target="_blank">
                                <v-icon>mdi-instagram</v-icon>
                                @CoffeeLineHuila.oficial
                            </a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com" target="_blank">
                                <v-icon>mdi-twitter</v-icon>
                                @CoffeeLineHuila
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/+573136998962?text=Quiero%20el%20cafe" target="_blank">
                                <v-icon>mdi-whatsapp</v-icon>
                                +57 3136998962
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com" target="_blank">
                                <v-icon>mdi-facebook</v-icon>
                                CoffeeLineHuila
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/CarlosSantiagoGonzalezC" target="_blank">
                                <v-icon>mdi-github</v-icon>
                                CoffeeLineHuila
                            </a>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="center">
                    <h4>Política De Privacidad:</h4>
                    <ul>
                        <li><a>Utilidades</a></li>
                        <li><a>Licencias</a></li>
                        <li><a>Permisos</a></li>
                        <li><a>Politicas</a></li>
                        <li><a>Ayudas</a></li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="center">
                    <h4>Equipo:</h4>
                    <ul>
                        <li>
                            <a href="https://github.com/CarlosSantiagoGonzalezC" target="_blank">
                                <v-icon>mdi-github</v-icon>
                                Desarrollador Principal
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/tetraform69" target="_blank">
                                <v-icon>mdi-github</v-icon>
                                Oscar
                            </a>
                        </li>
                    </ul>
                </v-col>
            </v-row>
            <p></p>
        </v-footer>
    </div>
</template>
  
<script>

export default {
    name: 'FooterApp',

    components: {
    },

    data: () => ({
    }),
    methods: {
    }
};
</script>
  
<style scoped>
* {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    letter-spacing: 2px;
}

a {
    text-decoration: none;
    color: #ffffffab;
}

a:hover {
    color: #ffffff;
}

.around {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.evenly {
    justify-content: space-evenly;
    width: 100%;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.gap {
    gap: 5px;
}

ul {
    display: flex;
    flex-direction: column;
    min-width: 70%;
    list-style: none;
    padding: 0;
    gap: 10px;
}
</style>