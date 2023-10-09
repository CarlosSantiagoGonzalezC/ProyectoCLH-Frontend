<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <NavComponent @open="openCarrito"></NavComponent>
        <CarritoNav :show="show" @close="closeCarrito"></CarritoNav>
        <div class="content">
            <router-view></router-view>
        </div>
        <FooterApp></FooterApp>
    </div>
</template>

<script>

import HeaderComponent from '../general/components/HeaderComponent.vue';
import NavComponent from './components/NavComponent.vue';
import CarritoNav from './components/CarritoNav.vue';
import FooterApp from '../general/components/FooterApp.vue';

export default {
    name: 'CompradorApp',

    components: {
        HeaderComponent,
        NavComponent,
        CarritoNav,
        FooterApp,
    },
    data() {
        return {
            show: false
        }
    },
    methods:{
        closeCarrito(bolean){
            this.show = bolean
        },
        openCarrito(bolean){
            this.show = bolean
        },
    }
}
</script>

<style scoped>

*{
    font-weight: 500;
}

.content{
    display: flex;
    justify-content: center;
}

.v-card {
    min-height: 60vh;
}
</style>