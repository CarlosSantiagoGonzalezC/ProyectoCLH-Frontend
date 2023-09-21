<template>
    <v-card class="center" color="#da9f68" width="80%" elevation="24">
        <div v-if="producto" class="producto">
            <div class="foto-producto">
                <img :src="producto.proImagen" alt="">
            </div>
            <div class="info-producto">
                <div class="categoria-ventas">
                    <p>Cantidad:</p>
                    <p>{{ producto.proCantDisponible }} {{ producto.proCantDisponible > 1 ? 'disponibles' :
                        'disponible'
                    }}</p>
                </div>
                <div class="title">
                    <h2>{{ producto.proNombre }}</h2>
                </div>
                <div class="my-5">
                    <h2>${{ producto.proPrecio }} COP</h2>
                </div>
                <div>
                    <p class="my-5">{{ producto.proDescripcion }}</p>
                </div>
                <div class="envio">
                    <v-icon class="mr-5">mdi-truck</v-icon>
                    <p class="ma-0">Envio a nivel nacional</p>
                </div>
                <div class="estrellas">
                    <v-icon>mdi-star</v-icon>
                    <v-icon>mdi-star</v-icon>
                    <v-icon>mdi-star</v-icon>
                    <v-icon>mdi-star-half-full</v-icon>
                    <v-icon>mdi-star-outline</v-icon>
                </div>
                <div class="butons">
                    <button class="comprar" @click="comprar">Comprar ahora</button>
                    <button class="agregar" @click="añadirCarrito(producto.id)">Agregar al carrito</button>
                </div>
                <div class="garantia">
                    <i class="fa-solid fa-medal"></i>
                    <p>30 dias de garantia</p>
                </div>
            </div>
        </div>
        <div v-if="empresa" class="finca">
            <div class="info-finca">
                <h1>{{ empresa.comNombre }}</h1>
                <p>{{ empresa.comHistoria }}</p>
                <p>Municipio: {{ empresa.comMunicipio }}</p>
                <p>Dirección: {{ empresa.comDireccion }}</p>

                <p>E-mail: {{ empresa.comCorreo }}</p>
            </div>
            <img src="@/assets/finca.jpg" alt="">
        </div>
        <div v-if="producto" class="input-comentario">
            <textarea name="comentario" id="comentario" placeholder="Escribir comentario..."
                v-model="comentario"></textarea>
            <div class="butons-comentario">
                <button @click="comentario = ''">Cancelar</button>
                <button @click="comentar" :disabled="!comentario">Comentar</button>
            </div>
        </div>
        <div v-if="producto" class="container-comentarios">
            <div class="comentario" v-for="comentario in comentarios" :key="comentario.id">
                <div class="user-coment">
                    <img src="@/assets/usuario.png" class="user-foto">
                    <p>{{ comentario.usuario }}</p>
                </div>
                <div class="coment">
                    <p>{{ comentario.texto }}</p>
                </div>
            </div>
        </div>
        <div class="text-center mt-15" v-else>
            <v-progress-circular class="text-center" :size="200" :width="20" color="brown"
                indeterminate></v-progress-circular>
            <h2 class="mt-12">Cargando productos...</h2>
        </div>
    </v-card>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import store from '@/store/store';
import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "DetalleProducto",

    components: {
    },
    data: () => ({
        producto: null,
        comentarios: [],
        idVendedor: "",
        empresa: null,
        comentario: "",
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        productoCarrito: null
    }),

    methods: {
        async obtenerProductoId() {
            let id = localStorage.idProducto;
            let product = await tiendaService.getProductId(id);
            this.producto = product.data;
            console.log(this.producto);
        },
        async obtenerVendedor() {
            let id = localStorage.idUser;
            let vendedor = await tiendaService.getSellerUser(id);
            this.idVendedor = vendedor.data[0].id;
            this.obtenerEmpresa(this.idVendedor);
        },
        async obtenerEmpresa(id) {
            let empresa = await tiendaService.getCompanySeller(id);
            this.empresa = empresa.data[0];
            console.log(this.empresa);
        },
        async comentar() {
            axios
                .post(this.url + "/comment/create", {
                    comTexto: this.comentario,
                    product_id: localStorage.idProducto,
                    user_id: localStorage.idUsuario
                }, axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`)
                .then(function (response) {
                    console.log(response);
                    if (response.data.result.error_id == 400) {
                        Swal.fire(
                            '¡Datos incorrectos!',
                            'Datos incompletos o con formato incorrecto',
                            'error'
                        )
                    } else {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
                        Swal.fire(
                            '¡Comentario agregado!',
                            'Se ha agregado el comentario correctamente',
                            'success'
                        )
                        setTimeout(function () {
                            window.location.reload();
                        }, 3000);
                    }
                })
                .catch(function (error) {
                    Swal.fire(
                        '¡Error al registrar comentario!',
                        'Verifique que esta haciendo el proceso correctamente',
                        'error'
                    )
                    console.log(error);
                });

            this.obtenerComentarios();
        },
        async obtenerComentarios() {
            let id = localStorage.idProducto;
            let comments = await tiendaService.getCommentsProduct(id);
            // this.comentarios = comments.data;
            comments.data.forEach(async element => {
                let idUsuario = element.user_id;
                let usuario = await tiendaService.getUser(idUsuario);
                let nombre = `${usuario.data.useNombres} ${usuario.data.useApellidos}`;
                let comentario = {
                    texto: element.comTexto,
                    usuario: nombre
                };
                this.comentarios.push(comentario);
            });

            console.log(this.comentarios);
        },
        async añadirCarrito(idProducto) {
            let product = await tiendaService.getProductId(idProducto);
            this.productoCarrito = product.data;
            this.$set(this.productoCarrito, 'cantidad', 1)
            store.dispatch('productoAñadido', this.productoCarrito);
            console.log(store.state.listaProductos);
        },
        comprar() {
            this.$router.push({ name: 'compra' });
        }
    },
    mounted() {
        this.obtenerProductoId();
        this.obtenerVendedor();
        this.obtenerComentarios();
    },

}
</script>

<style scoped>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.producto {
    align-self: center;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    padding: 10px 0px;
}

.foto-producto {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
    width: 60%;
}

.foto-producto img {
    background: #fafaee;
    width: 90%;
    height: 100%;
    border-radius: 5px;
    object-fit: contain;
    object-position: center;
}

.info-producto {
    background: #e7e7e7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    border-radius: 5px;
    width: 30%;
}

.info-producto div {
    width: 90%;
    display: flex;
}

.categoria-ventas * {
    margin-right: 10px;
    color: #ac9580;
}

.title,
.butons {
    flex-direction: column;
}

.butons button {
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 10px;
    transition: all 0.5s;
}

.comprar {
    background: #3483FA;
    color: #EAF2FE;
}

.comprar:hover {
    background: #1768e0;
}

.agregar {
    background: #83b5ff;
    color: #287eff;
}

.agregar:hover {
    background: #4f8deb;
    color: #e7e7e7;
}

.garantia {
    justify-content: center;
}

/** finca */
.finca {
    background: #80562f;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    border-radius: 5px;
    margin: 5px 0px;
}

.info-finca {
    font-weight: 550;
    width: 50%;
}

.finca img {
    height: 30vh;
    margin: 5px 0px;
    border-radius: 5px;
}

/** input del comentario */
.input-comentario {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 5px;
}

#comentario {
    padding: 10px;
    width: 80%;
    min-height: 10vh;
    padding: 10px 40px;
    font-size: 18px;
    border: solid 1px #202020;
    margin: 5px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    resize: vertical;
}

#comentario:focus {
    outline: none;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(0, 140, 255, 0.6);
}

.butons-comentario {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 80%;
}

.butons-comentario button {
    background: #3483FA;
    color: #EAF2FE;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
}

.butons-comentario button:hover {
    background: #1768e0;
}

/** comentarios */
.container-comentarios {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.comentario {
    background: #ebd3b5;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px 0px;
    border-radius: 5px;
}

.user-coment {
    justify-self: start;
    display: flex;
    align-items: center;
    width: 90%;
    margin: 5px 0px;
}

.user-coment p {
    margin-left: 5px;
}

.coment {
    background: #ffffff;
    width: 90%;
    border-radius: 5px;
    margin-bottom: 5px;
}

.coment p {
    margin: 20px;
}

.user-foto {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

button:disabled,
button:disabled:hover {
    background: #6186bf;
    color: #202020;
}
</style>