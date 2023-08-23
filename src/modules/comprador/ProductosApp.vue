<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="90%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>PRODUCTOS</h1>
                    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
                        <template slot="progress">
                            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                        </template>

                        <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                        <v-card-title>Cafe Badilico</v-card-title>

                        <v-card-text>
                            <v-row align="center" class="mx-0">
                                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                                <div class="grey--text ms-4">
                                    4.5 (413)
                                </div>
                            </v-row>

                            <div class="my-4 text-subtitle-1">
                                $ • Italian, Cafe
                            </div>

                            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio
                                seating.
                            </div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-title>Tonight's availability</v-card-title>

                        <v-card-text>
                            <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                                <v-chip>5:30PM</v-chip>

                                <v-chip>7:30PM</v-chip>

                                <v-chip>8:00PM</v-chip>

                                <v-chip>9:00PM</v-chip>
                            </v-chip-group>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="deep-purple lighten-2" text @click="reserve">
                                Reserve
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-card-text>
            </v-card>

        </div>

        <FooterApp></FooterApp>
    </v-app>
</template>
  
<script>
import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';

export default {
    name: 'ProductosApp',

    components: {
        HeaderNav,
        FooterApp,
    },

    data: () => ({

    }),
    methods: {
    }
};
</script>
  
<style scoped>
.content-full {
    min-height: 60vh;
}
</style>