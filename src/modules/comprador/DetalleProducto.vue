<template>
    <div>
        <HeaderNav></HeaderNav>

        <div class="content-full">
            <v-card class="center" color="#da9f68" width="80%" elevation="24">
                <div class="producto">
                    <div class="fotos-producto">
                        <img src="@/assets/cafe1.png" alt="" height="100px">
                        <img src="@/assets/cafe1.png" alt="" height="100px">
                        <img src="@/assets/cafe1.png" alt="" height="100px">
                        <img src="@/assets/cafe1.png" alt="" height="100px">
                        <img src="@/assets/cafe1.png" alt="" height="100px">
                    </div>
                    <div class="foto-producto">
                        <img src="@/assets/cafe1.png" alt="">
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
                            <h2>250 Gr</h2>
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
                            <button class="comprar">Comprar ahora</button>
                            <button class="agregar">Agregar al carrito</button>
                        </div>
                        <div class="garantia">
                            <i class="fa-solid fa-medal"></i>
                            <p>30 dias de garantia</p>
                        </div>
                    </div>
                </div>
                <div class="finca">
                    <div class="info-finca">
                        <h1>{{ empresa.comNombre }}</h1>
                        <p>{{ empresa.comHistoria }}</p>
                        <p>Municipio: {{ empresa.comMunicipio }}</p>
                        <p>Dirección: {{ empresa.comDireccion }}</p>

                        <p>E-mail: {{ empresa.comCorreo }}</p>
                    </div>
                    <img src="@/assets/finca.jpg" alt="">
                </div>
                <div class="input-comentario">
                    <textarea name="comentario" id="comentario" placeholder="Escribir comentario..."
                        v-model="comentario"></textarea>
                    <div class="butons-comentario">
                        <button @click="comentario = ''">Cancelar</button>
                        <button @click="comentar" :disabled="!comentario">Comentar</button>
                    </div>
                </div>
                <div class="container-comentarios">
                    <div class="comentario">
                        <div class="user-coment">
                            <img src="@/assets/user.jpeg" class="user-foto">
                            <p>Santiago Cuellar</p>
                        </div>
                        <div class="coment">
                            <p>El café especial que venden en esta empresa es de muy buena calidad, ademas de que entregan
                                sus productos a tiempo.</p>
                        </div>
                    </div>
                    <div class="comentario">
                        <div class="user-coment">
                            <img src="@/assets/user.jpeg" class="user-foto">
                            <p>Santiago Cuellar</p>
                        </div>
                        <div class="coment">
                            <p>Me gustan las empanadas.</p>
                        </div>
                    </div>
                    <div class="comentario">
                        <div class="user-coment">
                            <img src="@/assets/user.jpeg" class="user-foto">
                            <p>Santiago Cuellar</p>
                        </div>
                        <div class="coment">
                            <p>Muy buen servicio.</p>
                        </div>
                    </div>
                    <div class="comentario">
                        <div class="user-coment">
                            <img src="@/assets/user.jpeg" class="user-foto">
                            <p>Santiago Cuellar</p>
                        </div>
                        <div class="coment">
                            <p>Comentario super importante !NO BORRAR</p>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>

        <FooterApp></FooterApp>
    </div>
</template>

<script>
import HeaderNav from '../comprador/components/HeaderNav.vue';
import FooterApp from '../general/components/FooterApp.vue';
import '@fortawesome/fontawesome-free/css/all.css';
//import store from '../store/store';
import tiendaService from '@/services/tiendaService';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "DetalleProducto",

    components: {
        HeaderNav,
        FooterApp,
    },
    data: () => ({
        producto: null,
        idVendedor: "",
        empresa: null,
        comentario: "",
        url: "http://127.0.0.1:8000/api",
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
                })
                .then(function (response) {
                    console.log(response);
                    if (response.data.result.error_id == 400) {
                        Swal.fire(
                            '¡Datos incorrectos!',
                            'Datos incompletos o con formato incorrecto',
                            'error'
                        )
                    } else {
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
                    console.log(error);
                });
        },
    },
    mounted() {
        this.obtenerProductoId(),
            this.obtenerVendedor()
    },

}
</script>

<style scoped>
.content-full {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

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

.fotos-producto {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
}

.fotos-producto img {
    background: #bebebe;
    object-fit: contain;
    object-position: center;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    transition: all 500ms;
}

.fotos-producto img:hover {
    background: #e7e7e7;
}

.foto-producto {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
    width: 60%;
}

.foto-producto img {
    background: #e7e7e7;
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
    width: 70px;
    height: 70px;
    border-radius: 50%;
}

button:disabled,
button:disabled:hover {
    background: #6186bf;
    color: #202020;
}
</style>