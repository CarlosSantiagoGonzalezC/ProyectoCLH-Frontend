<template>
    <v-app>
        <header>
            <img src="./assets/logoCoffee.png" alt="logo" class="logo">
        </header>
        <v-app-bar app color="#da9f68" dark class="mb-12">
            <div class="d-flex align-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ma-2" outlined color="white" v-bind="attrs" v-on="on" elevation="7">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item link>
                            <v-list-item-title v-on:click="salir">Cerrar Sesión</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-title>Lista Realizados</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </div>

            <v-spacer></v-spacer>

            <v-img alt="Logo RMV" class="shrink mr-2" contain src="https://redmedicavital.com/site/wp-content/uploads/2021/09/LOGO-simbolo.png" transition="scale-transition"
                width="40" />
        </v-app-bar>
    </v-app>
</template>
  
<script>

export default {
    name: 'HeaderNav',

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
    text-decoration: none;
    color: #331b05;
    margin: 0;
    padding: 0;
}

/** encabezado */
header {
    text-align: center;
    background: #e7e7e7;
}

.logo {
    padding: 10px;
    width: 300px;
}
</style>