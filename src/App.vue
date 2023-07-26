<template>
  <v-app>
    <v-main>
        <router-view />
    </v-main>
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
#app {
    background-image: url(./assets/fondo.jpeg);
    background-position: center;
}
</style>