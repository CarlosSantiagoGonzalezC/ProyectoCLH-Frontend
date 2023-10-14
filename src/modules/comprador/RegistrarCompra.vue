<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="py-16">
        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-cad>
                <v-card-title class="text-center">
                    <v-spacer></v-spacer>
                    <h2>Ubicacion Del Pedido</h2>
                    <v-spacer></v-spacer>
                </v-card-title>
            </v-cad>
        </v-dialog>
        <v-card-text>
            <form>
                <h1 class="mb-10">Ubicacion del Pedido</h1>
                <v-text-field filled label="Direccion" type="text" :rules="[rules.required]"
                    prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="direccion"></v-text-field>
                <v-text-field filled label="Ciudad" type="text" :rules="[rules.required]" prepend-inner-icon="mdi-city"
                    class="ml-16 mr-16" v-model="ciudad"></v-text-field>
                <v-text-field filled label="Departamento" type="text" :rules="[rules.required]"
                    prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="departamento"></v-text-field>
                <h3>{{ total }}</h3>
                <v-btn color="#331b05" @click="comprar">
                    Comprar
                </v-btn>
            </form>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';


export default {
    name: 'RegistrarCompra',

    components: {
    },

    data() {
        return {
            direccion: "",
            ciudad: "",
            departamento: "",
            total: 0,
            carrito: [],
            rules: {
                required: value => !!value || 'Campo requerido.',
                min: v => v.length >= 5 || 'Minimo 5 caracteres',
            },
        }
    },

    computed: {
    },

    methods: {
        comprar() {
            this.prepararCarrito()

            let url = `${process.env.VUE_APP_URL_BASE_TIENDA}/purchase/create`

            let data = {
                id: localStorage.idUsuario,
                ordDireccion: this.direccion,
                ordCiudad: this.ciudad,
                ordDepartamento: this.departamento,
                ordTotal: this.total,
                carrito: this.carrito,
            }

            let config = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            }

            axios.post(url, data, config)
                .then(res => {
                    console.log(res);
                    this.$store.dispatch('eliminarCarrito')
                }).catch(err => {
                    console.log(err);
                })
        },
        prepararCarrito() {
            this.total = 0
            this.carrito = []
            this.$store.state.listaProductos.forEach(product => {
                let p = {
                    id: product.id,
                    cantidad: product.cantidad,
                    total: product.cantidad * product.proPrecio,
                }

                this.carrito.push(p)
                this.total += p.total
            });
        },
    },

    mounted() {
        this.prepararCarrito()
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