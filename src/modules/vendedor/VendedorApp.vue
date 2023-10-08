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
    name: 'GeneralApp',

    components: {
        HeaderNav,
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