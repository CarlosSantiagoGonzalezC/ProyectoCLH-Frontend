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
                        <li><a><v-icon>mdi-home</v-icon> Inicio</a></li>
                        <li><a><v-icon>mdi-coffee</v-icon> Productos</a></li>
                        <li><a><v-icon>mdi-star-circle</v-icon> Destacados</a></li>
                        <li><a><v-icon>mdi-plus-circle-multiple</v-icon> Otros</a></li>
                        <li><a><v-icon>mdi-help-circle</v-icon> Ayuda</a></li>
                    </ul>
                    </p>
                </div>
                <div>
                    <h3>Redes sociales:</h3>
                    <p>
                    <ul>
                        <li><a href="https://www.facebook.com"><v-icon>mdi-facebook</v-icon> CoffeeLineHuila</a></li>
                        <li><a href="https://www.twitter.com"><v-icon>mdi-twitter</v-icon> @CoffeeLineHuila</a></li>
                        <li><a href="https://github.com/CarlosSantiagoGonzalezC"><v-icon>mdi-github</v-icon> CoffeeLineHuila</a></li>
                        <li><a href="https://www.instagram.com"><v-icon>mdi-instagram</v-icon> @CoffeeLineHuila.oficial</a></li>  
                        <li><a href="https://wa.me/+573136998962?text=Quiero%20el%20cafe"><v-icon>mdi-whatsapp</v-icon> +57 3125584562</a></li>
                    </ul>
                    </p>
                </div>
                <div>
                    <h3>Politica de privacidad:</h3>
                    <p>
                    <ul>
                        <li><a>Licencias</a></li>
                        <li><a>Politicas</a></li>
                        <li><a>Permisos</a></li>
                        <li><a>Ayudas</a></li>
                        <li><a>Utilidades</a></li>
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

a {
    text-decoration: none;
    color: #f0e6dc;
}

.around{
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

ul{
    list-style: none;
    padding: 0;
}
</style>