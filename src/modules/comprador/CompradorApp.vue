<template>
    <div>
        <HeaderNav></HeaderNav>
        <div class="content">
            <router-view></router-view>
        </div>
        <FooterApp></FooterApp>
    </div>
</template>

<script>

import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';

export default {
    name: 'CompradorApp',

    components: {
        HeaderNav,
        FooterApp,
    },
    data() {
        return {
        }
    },
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