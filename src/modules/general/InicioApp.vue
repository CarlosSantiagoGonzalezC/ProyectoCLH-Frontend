<template>
        <v-carousel v-model="model" class="slider" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(slider) in content" :key="slider">
                <v-sheet height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                        <div class="text">
                            {{ slider.text }}
                        </div>
                        <img :src="slider.img" height="300" class="ml-8 rounded-xxl">
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
</template>
  
<script>

export default {
    name: 'InicioApp',

    components: {
    },

    data: () => ({
        model: 0,
        content: [
            {
                text: "Coffee Line Huila te ofrece la oportunidad de adquirir el café especial de tu gusto a excelentes precios, además que podras tomar información de las fincas donde se cultivan estos productos y aprender más de este grandioso café.",
                img: "https://latinaintrade.com/wp-content/uploads/2021/05/Blog-7.png"
            }, {
                text: "Además, en Coffee Line Huila, tendras la dicha de poder conocer un poco más de la historia de las fincas cafeteras, con imagenes que probablemente no hayas visto de estso lugares tan espectaculares donde se produce este gran producto insignia de nuestro país colombiano.",
                img: "https://agraria.pe/imgs/a/lx/en-los-ultimos-10-anos-el-numero-de-marcas-de-cafe-en-nuestr-25475.jpg"
            }, {
                text: "En nuestra plataforma web tambien podras encontrar productos derivados del café donde tendrás gran variedad de productos como vinos, galletas, dulces, entre otros muchos más que seguramente serán irresistibles para ti, ya que son de gran calidad y excelente sabor para una mayor experiencia deleitiva.",
                img: "https://graoespecial.com.br/wp-content/uploads/2018/05/destaqie-voce-precisa-1.jpg"
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
    background: #da9f68;
}

.text {
    width: 50%;
}

.fill-height {
    height: 100%;
    background: #da9f68;
}
</style>