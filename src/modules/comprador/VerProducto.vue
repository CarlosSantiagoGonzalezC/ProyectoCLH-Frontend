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
                            <p>Nuevo</p>
                            <p>10 vendidos</p>
                        </div>
                        <div class="title">
                            <h2>Q.coffe Gran Reserva Luxury</h2>
                            <h2>250 Gr</h2>
                        </div>
                        <div class="my-10">
                            <h2>$80.000</h2>
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
                        <h1>AlmaCafé</h1>
                        <p>AlmaCafé tuvo su origen en 1989 en Pitalito - Huila, donde por medio de un humilde productor
                            llamado Hernesto Perez, surgio esta gran empresa productora de café especial y que desde
                            entonces ha sido protagonista con sus ventas y productos de calidad. Con una gran finca
                            cafetera, se hace todo el proceso de produccion para que este gran producto pueda llegar a las
                            manos de las personas amantes del café.</p>
                    </div>
                    <img src="@/assets/finca.jpg" alt="">
                </div>
                <div class="input-comentario">
                    <textarea name="comentario" id="comentario" placeholder="Escribir comentario..."></textarea>
                    <div class="butons-comentario">
                        <button>Cancelar</button>
                        <button>Comentar</button>
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
import '@fortawesome/fontawesome-free/css/all.css'

export default {
    name: "VerProducto",

    components: {
        HeaderNav,
        FooterApp,
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
</style>