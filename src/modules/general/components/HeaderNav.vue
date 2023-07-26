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
                <a>
                    <v-icon>mdi-coffee</v-icon> Productos
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
            <div class="login">

                <div class="dropdown">
                    <button class="drop-btn">
                        Registrarse
                    </button>
                    <div class="dropdown-content">
                        <a>Como usuario</a>
                        <a>Como vendedor</a>
                    </div>
                </div>

                <a>
                    <button>
                        Ingresar
                    </button>
                </a>
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
    height: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
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
</style>