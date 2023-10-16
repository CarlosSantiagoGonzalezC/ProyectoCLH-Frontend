<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="pa-5">
        <h2>HISTORIAL/GRAFICAS</h2>
        <div class="mt-12 contenido">
            <Bar v-if="data.datasets[0].data.length > 0" :data="data" :options="options" />
            <div class="text-center mt-15" v-else>
                <v-progress-circular class="text-center" :size="200" :width="20" color="brown"
                    indeterminate></v-progress-circular>
                <h2 class="mt-12">Cargando datos...</h2>
            </div>
        </div>
    </v-card>
</template>
  
<script lang="ts">
import tiendaService from '@/services/tiendaService';
import '@fortawesome/fontawesome-free/css/all.css';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    name: 'HistorialGraficas',
    components: {
        Bar,
    },
    data: () => ({
        data: {
            labels: [],
            datasets: [{
                label: 'Cantidad disponible',
                data: [],
                backgroundColor: '#80562f',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'PRODUCTOS CON SU CANTIDAD DISPONIBLE'
                }
            }
        },
        productos: null,
        dataLoaded: false, // Variable de control
    }),
    methods: {
        async obtenerProductos() {
            let products = await tiendaService.getProductsSeller(localStorage.idUsuario);
            this.productos = products.data;
            this.data.labels = [];
            this.data.datasets[0].data = [];

            this.productos.forEach(element => {
                let nombre = element.proNombre;
                let cantidad = element.proCantDisponible;
                this.data.labels.push(nombre);
                this.data.datasets[0].data.push(cantidad);
            });

            this.dataLoaded = true; // Marcamos que los datos están cargados
        },
    },
    mounted() {
        this.obtenerProductos();
    },
}
</script>