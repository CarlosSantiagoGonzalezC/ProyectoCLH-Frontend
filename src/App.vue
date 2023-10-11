<template>
    <v-app>
        <router-view />
    </v-app>
</template>

<script>

export default {
    name: "App",
    components: {
        // 
    },
    data: () => ({
        //
    }),
};
</script>

<style>
* {
    font-family: 'Lucida Sans', Geneva, sans-serif;
}

#app {
    background-image: url(./assets/fondo.jpeg);
    background-position: center;
}
</style>