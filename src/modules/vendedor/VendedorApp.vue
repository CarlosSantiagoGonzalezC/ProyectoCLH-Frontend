<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <NavComponent></NavComponent>
        <div class="content">
            <router-view></router-view>
        </div>
        <FooterApp></FooterApp>
    </div>
</template>

<script>
import HeaderComponent from '../general/components/HeaderComponent.vue';
import NavComponent from './components/NavComponent.vue';
import FooterApp from '../general/components/FooterApp.vue';

export default {
    name: 'GeneralApp',

    components: {
        HeaderComponent,
        NavComponent,
        FooterApp,
    },
}
</script>

<style scoped>
* {
    font-weight: 500;
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

.v-card {
    min-height: 60vh;
}
</style>