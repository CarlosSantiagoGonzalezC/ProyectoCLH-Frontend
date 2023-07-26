<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16" align="center">
            <v-card color="#da9f68" dark width="50%">
                <v-card-text></v-card-text>
            </v-card>
        </div>

    </v-app>
</template>
  
<script>
import HeaderNav from './HeaderNav.vue';

export default {
    name: 'LoginApp',

    components: {
        HeaderNav,
    },

    data: () => ({
    }),
    methods: {
    }
};
</script>
  
<style scoped></style>