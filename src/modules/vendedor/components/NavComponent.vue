<template>
    <nav class="mb-10 elevation-4">
        <div class="menuBtn">
            <button @click="showMenu = true">
                <v-icon>mdi-menu</v-icon>
            </button>
        </div>
        <div class="navegacion" :class="showMenu ? 'showMenu' : 'hideMenu'">
            <div class="menuBtn">
                <button @click="showMenu = false">
                    <v-icon>mdi-close</v-icon>
                </button>
            </div>
            <router-link :to="{ name: 'Inicio' }" @click.native="showMenu = false">
                <v-icon>mdi-home</v-icon> Inicio
            </router-link>
            <router-link :to="{ name: 'agregarProducto' }" @click.native="showMenu = false">
                <v-icon>mdi-plus-circle</v-icon> Agregar
            </router-link>
            <router-link :to="{ name: 'modificarProducto' }" @click.native="showMenu = false">
                <v-icon>mdi-cog-box</v-icon> Gestionar
            </router-link>
            <router-link :to="{ name: 'PedidosApp' }" @click.native="showMenu = false">
                <v-icon>mdi-truck-delivery</v-icon> Pedidos
            </router-link>
            <router-link :to="{ name: 'ConfirmarVenta' }" @click.native="showMenu = false">
                <v-icon>mdi-store-check-outline</v-icon> Ventas
            </router-link>
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
                        <router-link :to="{ name: 'actualizarVendedor' }" class="btn-options" @click.native="show = false">
                            <v-icon>mdi-cogs</v-icon>
                            Ajustes
                        </router-link>
                        <router-link :to="{ name: 'historial' }" class="btn-options" @click="irHistorial()">
                            <v-icon aria-hidden="true">mdi-history</v-icon>
                            Historial
                        </router-link>
                        <a @click="salir" class="btn-options">
                            <v-icon aria-hidden="true">mdi-logout</v-icon>
                            Salir
                        </a>
                    </div>
                </div>
            </div>

            <a @click="irFincaEmpresa" id="btnFinca" class="ml-2"><v-icon>mdi-home-silo</v-icon></a>

        </div>
    </nav>
</template>
  
<script>
import Swal from 'sweetalert2';
import tiendaService from '@/services/tiendaService';
// import axios from 'axios';

export default {
    name: 'HeaderNav',

    components: {
    },

    data: () => ({
        show: false,
        showMenu: false,
        finca: null,
        existeFinca: true,
        vendedor: null,
        nombre: null,
    }),
    methods: {
        async obtenerVendedor() {
            let seller = await tiendaService.getSellerUser(localStorage.idUsuario);
            this.vendedor = seller.data[0];
        },
        async validarRutaFinca() {
            await this.obtenerVendedor()
            let empresa = await tiendaService.getCompanySeller(this.vendedor.id);
            this.finca = empresa.data;
            this.finca.forEach(element => {
                this.nombre = element.comNombre
            });
            if (!this.nombre) {
                this.existeFinca = false
            }
        },
        irFincaEmpresa() {
            if (this.existeFinca) {
                this.$router.push({ name: 'empresa' }).catch(this.validarRutaFinca);
            } else {
                this.$router.push({ name: 'newEmpresa' }).catch(this.validarRutaFinca);
            }
            this.show = false
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
        }
    },
    mounted() {
        this.validarRutaFinca();
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

.menuBtn {
    display: none;
}

/** barra de navegacion */
nav {
    position: sticky;
    top: 0px;
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
    padding: 15px;
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
        padding: 5px 40px;
    }

    .showMenu {
        transform: translateX(0);
    }

    .hideMenu {
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
        z-index: 4;
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
</style>