<template>
    <nav class="mb-10 elevation-4">
        <div class="menuBtn">
            <button @click="showMenu = true">
                <v-icon>mdi-menu</v-icon>
            </button>
        </div>
        <div class="navegacion" :class="showMenu ? 'show' : 'hide'">
            <div class="menuBtn">
                <button @click="showMenu = false">
                    <v-icon>mdi-close</v-icon>
                </button>
            </div>
            <router-link :to="{ name: 'Inicio' }" @click.native="showMenu = false">
                <v-icon>mdi-home</v-icon> Inicio
            </router-link>
            <router-link :to="{ name: 'Productos' }" @click.native="showMenu = false">
                <v-icon>mdi-coffee</v-icon> Productos
            </router-link>
            <router-link :to="{ name: 'Categorias' }" @click.native="showMenu = false">
                <v-icon>mdi-list-box</v-icon> Categorías
            </router-link>
            <router-link :to="{ name: 'Otros' }" @click.native="showMenu = false">
                <v-icon>mdi-plus-circle-multiple</v-icon> Otros
            </router-link>
            <a @click="descargarPDF">
                <v-icon>mdi-help-circle</v-icon> Ayuda
            </a>
            <div class="loginRes">
                <router-link :to="{ name: 'login' }" @click.native="showMenu = false"><v-icon>mdi-login-variant</v-icon>Ingresar</router-link>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Registrarse
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <router-link :to="{ name: 'RegistroComprador' }" @click.native="showMenu = false">Como usuario</router-link>
                            <router-link :to="{ name: 'RegistroVendedor' }" @click.native="showMenu = false">Como vendedor</router-link>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>
        <div class="login">

            <div class="dropdown">
                <button class="drop-btn">
                    Registrarse
                </button>
                <div class="dropdown-content">
                    <router-link :to="{ name: 'RegistroComprador' }">Como usuario</router-link>
                    <router-link :to="{ name: 'RegistroVendedor' }">Como vendedor</router-link>
                </div>
            </div>

            <router-link :to="{ name: 'login' }">
                <button>
                    Ingresar
                </button>
            </router-link>
        </div>
    </nav>
</template>
  
<script>

export default {
    name: 'NavComponent',

    components: {
    },

    data: () => ({
        showMenu: false,
    }),
    methods: {
        descargarPDF() {
            // Ruta relativa al archivo PDF en la carpeta 'public'
            const pdfUrl = '/pdf/ManualSoftwareWEB.pdf';

            // Crea un elemento 'a' para simular un clic en el enlace de descarga
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'ManualSoftwareWEB.pdf'; // Nombre del archivo descargado
            link.target = '_blank'; // Abre el enlace en una nueva ventana/tab

            // Dispara el evento 'click' en el enlace
            link.click();
        },
    },
    mounted() {
    }
};
</script>
  
<style scoped>
* {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration: none;
    color: #331b05;
    margin: 0;
    padding: 0;
}

.menuBtn, .loginRes {
    display: none;
}

/** barra de navegacion */
nav {
    position: sticky;
    top: 0;
    background: #da9f68;
    display: flex;
    min-height: 50px;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
}

.navegacion {
    display: flex;
    height: 100%;
    width: 50%;
}

.navegacion a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0px 15px;
    font-size: clamp(10px, 15px, 17px);
    height: 100%;
    min-width: 20%;
    color: #331b05;
    transition: background-color color 0.5s;
    gap: 5px;
}

.navegacion a:hover {
    background-color: #925419;
    color: #f0e6dc;
}

.navegacion .router-link-exact-active {
    background-color: #80562f;
    color: #f0e6dc;
}

/** botones */

button,
#btnIngresar {
    text-decoration: none;
    margin-right: 10px;
    background-color: #80562f;
    color: white;
    padding: 5px 40px;
    border: none;
    border-radius: 18px;
    cursor: pointer;
    font-size: 17px;
}

button:hover,
#btnIngresar:hover {
    background-color: #9b7c5f;
}

/*? estilo del boton desplegable*/
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    visibility: hidden;
    transform: translate(-80px, 0px);
    background-color: #f1f1f1;
    min-width: 300px;
    min-height: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    transition: visibility 0.5s;
}

.dropdown-content a {
    color: black;
    width: 100%;
    text-align: center;
    padding: 16px 0px;
    text-decoration: none;
    display: block;
    font-size: 17px;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown:hover .dropdown-content {
    visibility: visible;
}

.dropdown:hover .drop-btn {
    background-color: #9b7c5f;
}

@media (max-width: 1100px) {
    .menuBtn {
        display: flex;
        align-self: flex-start;
        margin: 10px;
    }

    .menuBtn button {
        background: none;
        border-radius: 5px;
        border: #331b05 solid 1px;
    }

    .show {
        transform: translateX(0);
    }

    .hide {
        transform: translateX(-100%);
    }

    .navegacion {
        position: fixed;
        flex-direction: column;
        align-items: center;
        top: 0;
        width: 100%;
        max-width: 400px;
        height: 100vh;
        background: #ffffff;
        z-index: 3;
        transition: transform 0.25s;
    }

    .navegacion a {
        height: 50px;
        width: 95%;
        border-radius: 5px;
        justify-content: flex-start;
        gap: 5px;
    }
}

@media (max-width: 800px) {
    .login {
        display: none;
    }

    .loginRes{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 5px;
    }

    .v-expansion-panels{
        width: 95%
    }

    .v-expansion-panels button{
        background: none;
        color: black;
    }
}
</style>