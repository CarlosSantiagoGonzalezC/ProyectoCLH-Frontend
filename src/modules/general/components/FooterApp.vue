<template>
    <div>
        <v-footer dark color="#331b05" class="around mt-10">
<<<<<<< HEAD
            <h3 class="ma-6">
                Todos los derechos reservados <v-icon>mdi-copyright</v-icon>
            </h3>
=======
            <v-row justify="center" align="center" class="gap py-5">
                <h3>
                    Todos los derechos reservados
                </h3>
                <v-icon>mdi-copyright</v-icon>
            </v-row>
>>>>>>> 004ba87f1d1c2a516a7d3c8f5ce3e630849cd6ed

            <v-row class="evenly">
                <v-col cols="12" sm="6" md="3" class="center">
                    <h3>Información:</h3>
                    <ul>
                        <li><i class="fa-solid fa-envelope"></i> CoffeeLineHuila@outlook.com</li>
                        <li><i class="fa-solid fa-building"></i> SENA Industrial</li>
                        <li><i class="fa-solid fa-city"></i> Neiva - Huila</li>
                        <li><i class="fa-solid fa-location-dot"></i> Cra 5 #14-22</li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="center">
                    <h3>Redes Sociales:</h3>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com/coffeelinehuila.oficial/" target="_blank">
                                <i class="fa-brands fa-instagram"></i>
                                @CoffeeLineHuila.oficial
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/CoffeeLineHuila" target="_blank">
<<<<<<< HEAD
                                <i class="fa-brands fa-twitter"></i>
=======
                                <i class="fa-brands fa-x-twitter"></i>
>>>>>>> 004ba87f1d1c2a516a7d3c8f5ce3e630849cd6ed
                                @CoffeeLineHuila
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/+573136998962?text=Quiero%20el%20café" target="_blank">
                                <i class="fa-brands fa-whatsapp"></i>
                                +57 3136998962
                            </a>
                        </li>
                        <li>
                            <a href="https://web.facebook.com/profile.php?id=61552156058535" target="_blank">
                                <i class="fa-brands fa-facebook"></i>
                                CoffeeLineHuila
                            </a>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="center">
                    <h3>Política De Privacidad:</h3>
                    <ul>
                        <li><a>Utilidades</a></li>
                        <li><a>Licencias</a></li>
                        <li><a>Permisos</a></li>
                        <li><a>Políticas</a></li>
                    </ul>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="center">
                    <h3>Equipo:</h3>
                    <ul>
                        <li>
                            <a href="https://github.com/CarlosSantiagoGonzalezC" target="_blank">
                                <i class="fa-brands fa-github"></i>
                                Carlos Santiago Gonzalez Cuellar
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/tetraform69" target="_blank">
                                <i class="fa-brands fa-github"></i>
<<<<<<< HEAD
                                Oscar Yefrey Corredor Medina
=======
                                Oscar
>>>>>>> 004ba87f1d1c2a516a7d3c8f5ce3e630849cd6ed
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
    gap: 20px;
}

.gap h3 {
    max-width: 70%;
}

.gap {
    gap: 10px;
}

ul {
    display: flex;
    flex-direction: column;
    min-width: 70%;
    font-size: 15px;
    list-style: none;
    padding: 0;
    gap: 10px;
    font-weight: 250;
}

<<<<<<< HEAD
i {
=======
i{
>>>>>>> 004ba87f1d1c2a516a7d3c8f5ce3e630849cd6ed
    min-width: 20px;
    text-align: center;
}
</style>