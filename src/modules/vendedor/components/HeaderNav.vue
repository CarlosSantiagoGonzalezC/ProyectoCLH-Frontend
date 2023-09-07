<template>
    <div>
        <header>
            <img src="../assets/logoCoffee.png" alt="logo" class="logo">
        </header>

        <nav>
            <div class="navegacion">
                <a href="/inicio-vendedor">
                    <v-icon>mdi-home</v-icon> Inicio
                </a>
                <a href="/agregar-producto">
                    <v-icon>mdi-plus-circle</v-icon> Agregar
                </a>
                <a href="/modificar-producto">
                    <v-icon>mdi-pencil-circle</v-icon> Modificar
                </a>
                <a href="/desactivar-producto">
                    <v-icon>mdi-minus-circle-multiple</v-icon> Desactivar
                </a>
                <a @click="descargarPDF">
                    <v-icon>mdi-help-circle</v-icon> Ayuda
                </a>
            </div>
            <div class="opcVendedor">

                <div class="dropdown">

                    <button class="btn-options" @click="show = !show">
                        <v-icon>mdi-account-circle</v-icon>
                    </button>
                    <div class="dropdown-content" :class="show ? 'show' : 'hidden'">
                        <img src="@/assets/usuario.png" class="user-foto">
                        <div>
                            <img src="@/assets/divisas.png" alt="divisas" class="divisas">
                        </div>
                        <div class="options">
                            <button @click="irAjustes()" class="btn-options">
                                <v-icon>mdi-cogs</v-icon>
                                Ajustes
                            </button>
                            <button class="btn-options" @click="irHistorial()">
                                <v-icon aria-hidden="true">mdi-history</v-icon>
                                Historial
                            </button>
                            <a @click="salir" class="btn-options">
                                <v-icon aria-hidden="true">mdi-logout</v-icon>
                                Salir
                            </a>
                        </div>
                    </div>
                </div>

                <a href="/finca-empresa" id="btnFinca" class="ml-2"><v-icon>mdi-home-silo</v-icon></a>

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
        show: false
    }),
    methods: {
        irAjustes() {
            this.$router.push("actualizar-datos-vendedor");
        },
        irHistorial() {
            this.$router.push("historial");
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
                    this.$router.replace({ path: "inicio" });
                    Swal.fire('¡Se ha cerrado la sesión!', '', 'success');
                }
            });
        }
    },
    mounted() {
        let url = window.location.href
        let nav = document.querySelector("div.navegacion")
        let links = nav.querySelectorAll(`a`)
        links.forEach(link => {
            if (link.href == url) {
                link.className += "select"
            }
        });
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
    margin-bottom: 10px;
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

.select {
    background-color: #80562f;
    color: #f0e6dc;
}

.opcVendedor {
    display: flex;
    margin-right: 20px;
}

.user-foto {
    height: 100px;
    width: 100px;
}

/** botones */

.btn-options,
#btnFinca {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100%;
    margin: 5px;
    text-decoration: none;
    background-color: #80562f;
    color: white;
    padding: 8px 40px;
    border: none;
    border-radius: 18px;
    cursor: pointer;
    font-size: 17px;
}

.options {
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.btn-options:hover,
#btnFinca:hover {
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
    transform: translate(-80px, 0px);
    background-color: #f1f1f1;
    min-width: 280px;
    min-height: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    visibility: visible;
}

.dropdown:hover .drop-btn {
    background-color: #9b7c5f;
}

#create .v-speed-dial {
    position: absolute;
}

#create .v-btn--floating {
    position: relative;
}

.show {
    visibility: visible;
}

.hidden {
    visibility: hidden;
}

.divisas {
    margin: 10px 0px;
    height: 100px;
    width: 200px;
    border-radius: 5px;
}
</style>