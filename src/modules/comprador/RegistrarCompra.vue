<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="pa-5">
        <div class="center">
            <v-card-title class="tabla">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                    required></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" class="tabla mb-5" multi-sort
                :footer-props="{ itemsPerPageText: 'Número de filas', pageText: '{0}-{1} de {2}' }" :items-per-page="5"
                :loading="loadingTable" loading-text="Cargando... Por favor espera" no-data-text="No hay productos"
                no-results-text="No hay ningun producto que coincida">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.proCodigo }}</td>
                        <td>{{ row.item.proNombre }}</td>
                        <td>{{ row.item.proDescripcion }}</td>
                        <td>{{ row.item.proCantDisponible }}</td>
                        <td>{{ row.item.cantidad }}</td>
                        <td>$ {{ comaEnMiles(row.item.proPrecio * row.item.cantidad) }} COP</td>
                        <td>
                            <v-img lazy-src="https://picsum.photos/id/11/10/6" height="50" width="50"
                                :src="row.item.proImagen" class="ma-2 rounded-pill"></v-img>
                        </td>
                        <td>
                            <v-btn color="#331b05" @click="eliminar(row.item)">
                                <v-icon dark>mdi-close-box</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-btn color="#331b05" @click="dialogUbicacion = true, prepararCarrito()" max-width="200px">
                comprar
            </v-btn>
        </div>
        <v-dialog v-model="dialogUbicacion" persistent max-width="1000px">
            <v-card>
                <form @submit.prevent="comprar()" class="center">
                    <h1 class="mb-10">Ubicación del Pedido</h1>
                    <v-text-field filled label="Dirección" type="text" :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="direccion" required></v-text-field>
                    <v-text-field filled label="Ciudad" type="text" :rules="[rules.required]" prepend-inner-icon="mdi-city"
                        class="ml-16 mr-16" v-model="ciudad" required></v-text-field>
                    <v-text-field filled label="Departamento" type="text" :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="departamento" required></v-text-field>
                    <div class="total">
                        <h3>Total: ${{ comaEnMiles(total) }} COP</h3>
                    </div>
                    <div class="btns">
                        <v-btn type="submit">
                            Comprar
                        </v-btn>
                        <v-btn @click="dialogUbicacion = false">
                            Cancelar
                        </v-btn>
                    </div>
                </form>
            </v-card>
        </v-dialog>
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
            dialogUbicacion: false,
            rules: {
                required: value => !!value || 'Campo requerido.',
                min: v => v.length >= 5 || 'Mínimo 5 caracteres',
            },
            search: "",
            headers: [
                { text: 'Código', value: 'proCodigo' },
                { text: 'Nombre', value: 'proNombre' },
                { text: 'Descripción', value: 'proDescripcion' },
                { text: 'Disponibles', value: 'proCantDisponible' },
                { text: 'Cantidad', value: 'cantidad' },
                { text: 'Precio', value: 'proPrecio' },
                { text: 'Imagen', key: 'img', sortable: false },
                { text: '', key: 'actions', sortable: false },
            ],
            desserts: [],
            loadingTable: false,
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
            this.desserts = []
            this.$store.state.listaProductos.forEach(product => {
                let p = {
                    id: product.id,
                    cantidad: product.cantidad,
                    total: product.cantidad * product.proPrecio,
                }

                this.desserts.push(product)
                this.carrito.push(p)
                this.total += p.total
            });
        },
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
        },
        eliminar(object) {
            this.$store.dispatch('productoEliminado', object)
            this.prepararCarrito()
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

.tabla {
    background: #7b5028;
}

.center {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
}

.btns {
    display: flex;
    align-self: center;
    gap: 10px;
    width: 85%;
}

.total {
    align-self: center;
    width: 85%;
}
</style>