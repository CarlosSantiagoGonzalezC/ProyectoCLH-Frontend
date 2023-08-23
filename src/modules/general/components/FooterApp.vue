<template>
    <div>
        <v-footer dark padless color="#331b05" class="around mt-16">
            <div id="texto1" class="ma-3">
                <h3>Todos los derechos reservados
                    <i class="fa far fa-copyright"></i>
                </h3>
            </div>

            <div id="info" class="around">
                <div>
                    <h3>Información:</h3>
                    <p>
                    <ul>
                        <li>Cra 5 #14-22</li>
                        <li>sc805036@gmail.com</li>
                        <li>+57 3136998962</li>
                        <li>SENA Industrial</li>
                        <li>Neiva - Huila</li>
                    </ul>
                    </p>
                </div>
                <div>
                    <h3>Navegador:</h3>
                    <p>
                    <ul>
                        <li><a id="enlaces"><v-icon>mdi-home</v-icon> Inicio</a></li>
                        <li><a id="enlaces"><v-icon>mdi-coffee</v-icon> Productos</a></li>
                        <li><a id="enlaces"><v-icon>mdi-star-circle</v-icon> Destacados</a></li>
                        <li><a id="enlaces"><v-icon>mdi-plus-circle-multiple</v-icon> Otros</a></li>
                        <li><a id="enlaces"><v-icon>mdi-help-circle</v-icon> Ayuda</a></li>
                    </ul>
                    </p>
                </div>
                <div>
                    <h3>Redes sociales:</h3>
                    <p>
                    <ul>
                        <li><a id="enlaces"><v-icon>mdi-facebook</v-icon> CoffeeLineHuila</a></li>
                        <li><a id="enlaces"><v-icon>mdi-twitter</v-icon> @CoffeeLineHuila</a></li>
                        <li><a id="enlaces"><v-icon>mdi-github</v-icon> CoffeeLineHuila</a></li>
                        <li><a id="enlaces"><v-icon>mdi-instagram</v-icon> @CoffeeLineHuila.oficial</a></li>
                        <li><a id="enlaces"><v-icon>mdi-whatsapp</v-icon> +57 3125584562</a></li>
                    </ul>
                    </p>
                </div>
                <div>
                    <h3>Politica de privacidad:</h3>
                    <p>
                    <ul>
                        <li><a id="enlaces">Licencias</a></li>
                        <li><a id="enlaces">Politicas</a></li>
                        <li><a id="enlaces">Permisos</a></li>
                        <li><a id="enlaces">Ayudas</a></li>
                        <li><a id="enlaces">Utilidades</a></li>
                    </ul>
                    </p>
                </div>
            </div>
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
    font-family: 'Lucida Sans', Geneva, sans-serif;
}


#texto1 {
    display: flex;
    align-items: center;
    justify-content: center;
}

#info {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

#enlaces {
    text-decoration: none;
    color: #f0e6dc;
}

.around{
    align-items: center;
    justify-content: space-around;
    width: 100%;
}
</style>