<template>
    <div>
        <HeaderNav @open="openCarrito"></HeaderNav>
        <CarritoNav :show="show" @close="closeCarrito"></CarritoNav>
        <div class="content">
            <router-view></router-view>
        </div>
        <FooterApp></FooterApp>
    </div>
</template>

<script>

import HeaderNav from './components/HeaderNav.vue';
import CarritoNav from './components/CarritoNav.vue';
import FooterApp from '../general/components/FooterApp.vue';

export default {
    name: 'CompradorApp',

    components: {
        HeaderNav,
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

.content{
    display: flex;
    justify-content: center;
}

.v-card {
    min-height: 60vh;
}
</style>