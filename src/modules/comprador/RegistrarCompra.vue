<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="py-16">
        <v-card-text>
            <form>
                <h1 class="mb-10">Ubicacion del Pedido</h1>
                <v-text-field filled label="Direccion" type="text" :rules="[rules.required]"
                    prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="direccion"></v-text-field>
                <v-text-field filled label="Ciudad" type="text" :rules="[rules.required]" prepend-inner-icon="mdi-city"
                    class="ml-16 mr-16" v-model="ciudad"></v-text-field>
                <v-text-field filled label="Departamento" type="text" :rules="[rules.required]"
                    prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="departamento"></v-text-field>
                <v-btn color="#331b05">
                    Comprar
                </v-btn>
            </form>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    name: 'RegistrarCompra',

    components: {
    },

    data() {
        return {
            direccion: "",
            ciudad: "",
            departamento: "",
            rules: {
                required: value => !!value || 'Campo requerido.',
                min: v => v.length >= 5 || 'Minimo 5 caracteres',
            },
        }
    },

    computed: {
    },

    methods: {
    },

    mounted() {
    }
}
</script>

<style scoped>

.v-card {
    min-height: 60vh;
}

h1 {
    text-align: center;
    margin: 15px 0px;
}
</style>