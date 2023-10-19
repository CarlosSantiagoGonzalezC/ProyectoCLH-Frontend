<template>
    <v-card color="#da9f68" dark width="90%" elevation="24" class="pa-5">
        <h1>COMPRAR</h1>
        <div id="logoForm">
            <i class="fa fa-bag-shopping"></i>
        </div>
        <div class="center mt-8">
            <v-card-title class="tabla">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                    required></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" class="tabla mb-5" multi-sort
                :footer-props="{ itemsPerPageText: 'Número de filas', pageText: '{0}-{1} de {2}' }" :items-per-page="5"
                :loading="loadingTable" loading-text="Cargando... Por favor espera" no-data-text="No hay productos"
                no-results-text="No hay ningun producto que coincida">
                <!-- <template v-slot:top>
                    <v-card-title class="tabla">
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
                            required></v-text-field>
                    </v-card-title>
                </template> -->
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.proCodigo }}</td>
                        <td>{{ row.item.proNombre }}</td>
                        <td class="w-500">{{ row.item.proDescripcion }}</td>
                        <td>{{ row.item.proCantDisponible }}</td>
                        <td>{{ row.item.cantidad }}</td>
                        <td>$ {{ comaEnMiles(row.item.proPrecio * row.item.cantidad) }} COP</td>
                        <td>
                            <v-img lazy-src="https://picsum.photos/id/11/10/6" height="50" width="50"
                                :src="row.item.proImagen" class="ma-2 rounded-pill"></v-img>
                        </td>
                        <td>
                            <v-btn color="#925419" @click="eliminar(row.item)">
                                <v-icon dark>mdi-close-box</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-btn color="#925419" @click="dialogUbicacion = true, prepararCarrito()" max-width="200px">
                comprar
            </v-btn>
        </div>
        <v-dialog v-model="dialogUbicacion" persistent max-width="700px">
            <v-card>
                <form @submit.prevent="comprar()" class="center">
                    <h1 class="mb-10">Datos del Pedido</h1>
                    <v-text-field filled label="Dirección" type="text" :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="direccion" required></v-text-field>
                    <v-text-field filled label="Ciudad" type="text" :rules="[rules.required]" prepend-inner-icon="mdi-city"
                        class="ml-16 mr-16" v-model="ciudad" required></v-text-field>
                    <v-text-field filled label="Departamento" type="text" :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker" class="ml-16 mr-16" v-model="departamento"
                        required></v-text-field>
                    <div class="total">
                        <h4>Cuenta de NEQUI para cancelar compra: 3136998962</h4>
                    </div>
                    <v-file-input filled label="Comprobante de pago" :rules="[rules.required]"
                        prepend-inner-icon="mdi-tag-check" class="ml-16 mr-16" prepend-icon="" v-model="fileComprobante"
                        chips counter required></v-file-input>
                    <div class="total">
                        <h3>Total: ${{ comaEnMiles(total) }} COP</h3>
                    </div>
                    <div class="btns">
                        <v-btn type="submit" :loading="btnLoading">
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
import Swal from 'sweetalert2';

export default {
    name: 'RegistrarCompra',

    components: {
    },

    data() {
        return {
            direccion: "",
            ciudad: "",
            departamento: "",
            fileComprobante: null,
            base64Image: null,
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
            btnLoading: false,
            url: process.env.VUE_APP_URL_BASE_TIENDA,
        }
    },

    computed: {
    },

    watch: {
        fileComprobante: {
            handler: "convertToBase64",
            immediate: true,
        },
    },

    methods: {
        convertToBase64() {
            if (this.fileComprobante) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.base64Image = e.target.result;
                };

                reader.readAsDataURL(this.fileComprobante);
            }
        },
        comprar() {
            this.btnLoading = true
            this.prepararCarrito()

            let url = `${process.env.VUE_APP_URL_BASE_TIENDA}/purchase/create`

            let data = {
                id: localStorage.idUsuario,
                ordDireccion: this.direccion,
                ordCiudad: this.ciudad,
                ordDepartamento: this.departamento,
                ordTotal: this.total,
                carrito: this.carrito,
                comprobantePago: this.base64Image,
            }

            let config = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            }

            axios.post(url, data, config)
                .then(res => {
                    res
                    this.desserts = []
                    this.$store.dispatch('eliminarCarrito')
                    Swal.fire(
                        '¡Compra registrada!',
                        'Se ha registrado la compra, ahora debera esperar a que el vendedor la apruebe',
                        'success'
                    )
                    this.btnLoading = false
                }).catch(err => {
                    console.log(err);
                    this.btnLoading = false
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
        // registrarCompra() {
        //     this.prepararCarrito()
        //     axios
        //         .post(this.url + "/purchase/create", {
        //             user_id: localStorage.idUsuario,
        //             product_id: this.carrito[0].id,
        //             comprobantePago: this.base64Image,
        //             estado: "Por confirmar",
        //             total: this.carrito[0].total,
        //             cantidad: this.carrito[0].cantidad
        //         }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
        //         .then(async (response) => {
        //             console.log(response);
        //             return axios
        //                 .post(this.url + "/order/create", {
        //                     user_id: localStorage.idUsuario,
        //                     purchase_id: response.data.result.id,
        //                     ordDireccion: this.direccion,
        //                     ordCiudad: this.ciudad,
        //                     ordDepartamento: this.departamento,
        //                     ordEstado: "Por entregar",
        //                     ordTotal: this.carrito[0].total,
        //                 }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
        //                 .then(function (respuesta) {
        //                     console.log(respuesta);
        //                     /*setTimeout(function () {
        //                         location.href = "/login";
        //                     }, 3000);*/
        //                     Swal.fire(
        //                         '¡Compra registrada!',
        //                         'Se ha registrado la compra, ahora debera esperar a que el vendedor la apruebe',
        //                         'success'
        //                     )
        //                     this.$store.dispatch('eliminarCarrito')
        //                 })
        //                 .catch(function (error) {
        //                     Swal.fire(
        //                         '¡Error al comprar!',
        //                         'Verifique que esta haciendo el proceso correctamente',
        //                         'error'
        //                     )
        //                     console.log(error);
        //                 });
        //         })
        //         .catch(function (error) {
        //             Swal.fire(
        //                 '¡Error al comprar!',
        //                 'Verifique que esta haciendo el proceso correctamente',
        //                 'error'
        //             )
        //             console.log(error);
        //         });
        // },
    },

    mounted() {
        this.prepararCarrito()
    }
}
</script>

<style scoped>
#logoForm {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    color: #331b05;
}

.v-card {
    min-height: 60vh;
}

h1 {
    text-align: center;
    margin: 15px 0px;
}

.tabla {
    background: #ece8e5;
}

.center {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
}

.btns {
    display: flex;
    align-self: center;
    gap: 10px;
    width: 85%;
    margin-bottom: 20px;
}

.total {
    align-self: center;
    width: 85%;
}

.w-500 {
    max-width: 400px;
    text-wrap: balance;
}
</style>