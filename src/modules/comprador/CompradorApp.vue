<template>
    <div>
        <HeaderNav></HeaderNav>
        <router-view></router-view>
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