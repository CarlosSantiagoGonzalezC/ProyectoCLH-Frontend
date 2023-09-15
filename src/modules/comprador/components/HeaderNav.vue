<template>
    <div class="mb-10">
        <header>
            <img src="../assets/logoCoffee.png" alt="logo" class="logo">
        </header>

        <nav>
            <div class="navegacion">
                <router-link :to="{ name: 'Inicio' }">
                    <v-icon>mdi-home</v-icon> Inicio
                </router-link>
                <router-link :to="{ name: 'Productos' }">
                    <v-icon>mdi-coffee</v-icon> Productos
                </router-link>
                <router-link :to="{ name: 'Categorias' }">
                    <v-icon>mdi-list-box</v-icon> Categorias
                </router-link>
                <!-- <a>
                    <v-icon>mdi-tag</v-icon> Ofertas
                </a>
                <a>
                    <v-icon>mdi-star-circle</v-icon> Destacados
                </a> -->
                <router-link :to="{ name: 'Otros' }">
                    <v-icon>mdi-plus-circle-multiple</v-icon> Otros
                </router-link>
                <a @click="descargarPDF">
                    <v-icon>mdi-help-circle</v-icon> Ayuda
                </a>
            </div>
            <div class="opcUser">
                <button @click="open">
                    <v-icon>mdi-cart</v-icon>
                </button>
                <div class="dropdown">
                    <button class="drop-btn" @click="show = !show">
                        <v-icon>mdi-account-circle</v-icon>
                    </button>
                    <div class="dropdown-content" :class="show ? 'show' : 'hidden'">
                        <img src="@/assets/usuario.png" class="user-foto">
                        <div class="options">
                            <button @click="irAjustes()">
                                <v-icon>mdi-cogs</v-icon>
                                Ajustes
                            </button>
                            <button @click="salir()">
                                <v-icon>mdi-logout</v-icon>
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';

export default {
    name: 'HeaderNav',

    components: {
    },

    data: () => ({
    }),
    methods: {
        irAjustes() {
            this.$router.push({ name: 'actualizarUser' });
        },
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
        salir() {
            Swal.fire({
                title: '¿Estas seguro de cerrar sesión?',
                showCancelButton: true,
                confirmButtonText: 'Si, salir',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.$router.push({ name: "Inicio" }).catch(() => { })
                    localStorage.clear()
                    Swal.fire('¡Se ha cerrado la sesión!', '', 'success').then(() => {
                        location.reload()
                    })
                }
            });
        },
        open() {
            this.$emit('open', true)
        }
    },
    mounted() {
    }
};
</script>
  
<style scoped>
* {
    font-family: 'Lucida Sans', Geneva, sans-serif;
    text-decoration: none;
    color: #331b05;
    margin: 0;
    padding: 0;
}

/** encabezado */
header {
    text-align: center;
    background: #ece8e5;
}

.logo {
    padding: 10px;
    width: 300px;
}

/** barra de navegacion */
nav {
    position: sticky;
    top: 0px;
    background: #da9f68;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
}

.navegacion a {
    text-align: center;
    padding: 15px 16px;
    font-size: 17px;
    color: #331b05;
}

.navegacion a:hover {
    background-color: #925419;
    color: #f0e6dc;
}

.navegacion .router-link-exact-active {
    background-color: #80562f;
    color: #f0e6dc;
}

.opcUser {
    display: flex;
    margin-right: 20px;
}

/** botones */

.opcUser button,
#btnFinca {
    text-decoration: none;
    background-color: #80562f;
    color: white;
    padding: 8px 40px;
    border: none;
    border-radius: 18px;
    cursor: pointer;
    font-size: 17px;
}

button:hover {
    background-color: #9b7c5f;
}

/*? estilo del boton desplegable*/
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: flex;
    padding: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    visibility: hidden;
    transform: translate(-50%, 0px);
    background-color: #f1f1f1;
    min-width: 100px;
    min-height: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    visibility: visible;
}

.opcUser button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100%;
    margin: 5px;
}

.user-foto {
    height: 100px;
    width: 100px;
}

.options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.show {
    visibility: visible;
}

.hidden {
    visibility: hidden;
}

.user-foto {
    height: 100px;
    width: 100px;
}

.options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.show {
    visibility: visible;
}

.hidden {
    visibility: hidden;
}
</style>