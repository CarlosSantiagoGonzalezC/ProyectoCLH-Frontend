<template>
    <v-card width="90%">
        <v-text class="producto">
            <img :src="object.proImagen" alt="object.proNombre">
            <div class="info-producto">
                <h3>{{ object.proNombre }}</h3>
                <p>{{ object.proDescripcion }}</p>
                <div class="precio">
                    <input type="number" :value="object.cantidad">
                    <p>${{ precio }} COP</p>
                </div>
            </div>
            <v-btn icon @click="eliminar()"><v-icon>mdi-close</v-icon></v-btn>
        </v-text>
    </v-card>
</template>

<script>
export default {
    name: 'ProductoCarrito',
    props: {
        object: Object,
    },
    data() {
        return {
        }
    },
    computed: {
        precio() {
            return this.object.proPrecio * this.object.cantidad
        }
    },
    methods: {
        eliminar() {
            this.$store.dispatch('productoEliminado', this.object)
        }
    },
}
</script>

<style scoped>
.producto img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    background: #202020;
    object-position: center;
    border-radius: 5px 0px 0px 5px;
}

.producto {
    display: flex;
    min-height: 100px;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    background: rgb(218, 159, 104);
}

.info-producto {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 60%;
}

.info-producto button {
    align-self: flex-end;
    justify-self: flex-end;
}

.info-producto p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
}

.precio {
    display: flex;
}

.precio input,
.precio p {
    width: 50%;
}
</style>