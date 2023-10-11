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
            <div class="busquedaRes">
                <v-autocomplete label="Buscar" :items="items" item-text="proNombre" item-value="id"
                    prepend-inner-icon="mdi-magnify" dense filled rounded solo v-model="busqueda"
                    @change="onProductChange()">
                    <template v-slot:item="{ item }">
                        <div class="product-item" @click="idUsuario = item.user_id">
                            <v-avatar>
                                <img :src="item.proImagen" class="product-image" />
                            </v-avatar>
                            <div class="product-name ml-4 mt-3">{{ item.proNombre }}</div>
                        </div>
                    </template>
                </v-autocomplete>
            </div>
            <router-link :to="{ name: 'Inicio' }" @click.native="showMenu = false">
                <v-icon>mdi-home</v-icon> Inicio
            </router-link>
            <router-link :to="{ name: 'Productos' }" @click.native="showMenu = false">
                <v-icon>mdi-coffee</v-icon> Productos
            </router-link>
            <router-link :to="{ name: 'Categorias' }" @click.native="showMenu = false">
                <v-icon>mdi-list-box</v-icon> Categorias
            </router-link>
            <router-link :to="{ name: 'Otros' }" @click.native="showMenu = false">
                <v-icon>mdi-plus-circle-multiple</v-icon> Otros
            </router-link>
            <a @click="descargarPDF">
                <v-icon>mdi-help-circle</v-icon> Ayuda
            </a>
        </div>
        <div class="flex">
            <div class="busqueda">
                <v-autocomplete label="Buscar" :items="items" item-text="proNombre" item-value="id"
                    prepend-inner-icon="mdi-magnify" dense filled rounded solo v-model="busqueda"
                    @change="onProductChange()">
                    <template v-slot:item="{ item }">
                        <div class="product-item" @click="idUsuario = item.user_id">
                            <v-avatar>
                                <img :src="item.proImagen" class="product-image" />
                            </v-avatar>
                            <div class="product-name ml-4 mt-3">{{ item.proNombre }}</div>
                        </div>
                    </template>
                </v-autocomplete>
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
        </div>
    </nav>
</template>
  
<script>
import Swal from 'sweetalert2';
import tiendaService from '@/services/tiendaService';

export default {
    name: 'NavComponent',

    components: {
    },

    data: () => ({
        items: [],
        show: false,
        busqueda: null,
        productos: null,
        idUsuario: null,
        showMenu: false,
    }),
    methods: {
        onProductChange() {
            // Aquí puedes acceder al producto seleccionado a través de this.busqueda
            // console.log('Producto seleccionado:', this.busqueda);
            localStorage.idProducto = this.busqueda;
            localStorage.idUser = this.idUsuario;
            if (this.busqueda) {
                this.$router.push({ name: 'producto' }).catch(() => { });
                // location.href = 'producto';
            }
        },
        async obtenerProductos() {
            let products = await tiendaService.getProducts();
            this.productos = products.data;
            this.productos.forEach(element => {
                this.items.push(element)
            });
            // console.log(this.items)
        },
        irAjustes() {
            this.$router.push({ name: 'actualizarUser' }).catch(() => { });
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
        this.obtenerProductos();
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

.menuBtn,
.busquedaRes {
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
    z-index: 1;
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

.flex {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 50px;
    width: 50%;
}

.opcUser {
    display: flex;
    margin-right: 20px;
}

.busqueda {
    width: 50%;
    max-width: 500px;
}

.busqueda div {
    position: relative;
    top: 12px;
}

.product-item {
    display: flex;
    margin-bottom: 10px;
    margin-top: 10px;
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

@media (max-width: 1100px) {
    .busqueda {
        display: none;
    }

    .busquedaRes{
        display: block;
    }

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