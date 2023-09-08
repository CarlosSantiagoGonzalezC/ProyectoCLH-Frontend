<template>
    <v-app>
        <HeaderNav></HeaderNav>

        <div class="mt-16 content-full" align="center">
            <v-card color="#da9f68" dark width="80%" elevation="24" class="pl-16 pr-16">
                <v-card-text>
                    <h1>HISTORIAL/GRAFICAS</h1>
                    <div class="mt-12 contenido">
                        <Bar :data="data" :options="options" />
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <FooterApp></FooterApp>

    </v-app>
</template>
  
<script lang="ts">
import HeaderNav from './components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    name: 'HistorialGraficas',
    components: {
        Bar,
        HeaderNav,
        FooterApp,
    },
    data() {
        return {
            data: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            options: {
                responsive: true
            }
        }
    }
}
</script>