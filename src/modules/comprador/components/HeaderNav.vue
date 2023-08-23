<template>
    <div>
        <header>
            <img src="../assets/logoCoffee.png" alt="logo" class="logo">
        </header>

        <nav>
            <div class="navegacion">
                <a class="select">
                    <v-icon>mdi-home</v-icon> Inicio
                </a>
                <a href="/productos">
                    <v-icon>mdi-coffee</v-icon> Productos
                </a>
                <a>
                    <v-icon>mdi-list-box</v-icon> Categorias
                </a>
                <a>
                    <v-icon>mdi-tag</v-icon> Ofertas
                </a>
                <a>
                    <v-icon>mdi-star-circle</v-icon> Destacados
                </a>
                <a>
                    <v-icon>mdi-plus-circle-multiple</v-icon> Otros
                </a>
                <a>
                    <v-icon>mdi-help-circle</v-icon> Ayuda
                </a>
		</div>
            <div class="opcUser">
            <a href="">
                <button>
                    <v-icon>mdi-cart</v-icon>
                </button>
            </a>
            <div class="dropdown">
                <button class="drop-btn">
                    <v-icon>mdi-account-circle</v-icon>
                </button>
                <div class="dropdown-content">
                    <div>
                        <img src="" class="user-foto">
                    </div>
                    <div class="options">
                        <button>
                            <v-icon>mdi-cogs</v-icon>
                            Ajustes
                        </button>
                        <button>
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

export default {
    name: 'HeaderNav',

    components: {
    },

    data: () => ({
    }),
    methods: {
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
    background: #e7e7e7;
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

/** botones */

button,
#btnFinca {
    text-decoration: none;
    margin-right: 10px;
    background-color: #80562f;
    color: white;
    padding: 8px 40px;
    border: none;
    border-radius: 18px;
    cursor: pointer;
    font-size: 17px;
}

button:hover,
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
</style>