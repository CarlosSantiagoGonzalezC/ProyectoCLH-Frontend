<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <v-carousel v-model="model" class="slider" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(slider) in content" :key="slider">
                <v-sheet height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                        <div class="text">
                            {{ slider.text }}
                        </div>
                        <img :src="slider.img" height="100">
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>

	<FooterApp></FooterApp>
    </v-app>
</template>
  
<script>
import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';

export default {
    name: 'InicioComprador',

    components: {
        HeaderNav,
        FooterApp,
    },

    data: () => ({
        model: 0,
        content: [
            {
                text: "Coffee Line Huila te ofrece la oportunidad de adquirir el café especial de tu gusto a excelentes precios, además que podras tomar información de las fincas donde se cultivan estos productos y aprender más de este grandioso café.",
                img: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
            }, {
                text: "Además, en Coffee Line Huila, tendras la dicha de poder conocer un poco más de la historia de las fincas cafeteras, con imagenes que probablemente no hayas visto de estso lugares tan espectaculares donde se produce este gran producto insignia de nuestro país colombiano.",
                img: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
            }, {
                text: "En nuestra plataforma web tambien podras encontrar productos derivados del café donde tendrás gran variedad de productos como vinos, galletas, dulces, entre otros muchos más que seguramente serán irresistibles para ti, ya que son de gran calidad y excelente sabor para una mayor experiencia deleitiva.",
                img: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
            }
        ],
    }),
    methods: {
    }
};
</script>
  
<style scoped>
.slider {
    margin-top: 20px;
    align-self: center;
    width: 80%;
    border-radius: 5px;
}

.text {
    width: 50%;
}

.fill-height {
    height: 100%;
    background: #da9f68;
}
</style>