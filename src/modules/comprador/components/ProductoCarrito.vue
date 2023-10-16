<template>
    <v-card width="90%">
        <div class="producto">
            <img :src="object.proImagen" alt="object.proNombre">
            <div class="info-producto">
                <h3>{{ object.proNombre }}</h3>
                <p>{{ object.proDescripcion }}</p>
                <div class="precio">
                    <div class="cantidad">
                        <button class="minus" @click="minus"><v-icon>mdi-minus</v-icon></button>
                        <input type="number" v-model="cantidad" @focusout="saveCantidad">
                        <button class="plus" @click="plus"><v-icon>mdi-plus</v-icon></button>
                    </div>
                    <p>${{ comaEnMiles(precio) }} COP</p>
                </div>
            </div>
            <v-btn icon @click="eliminar()"><v-icon>mdi-close</v-icon></v-btn>
        </div>
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
            cantidad: this.object.cantidad
        }
    },
    computed: {
        precio() {
            return this.object.proPrecio * this.cantidad
        }
    },
    methods: {
        eliminar() {
            this.$store.dispatch('productoEliminado', this.object)
        },
        saveCantidad() {
            if (this.object.proCantDisponible < this.cantidad || this.cantidad < 1) {
                this.cantidad = 1
            } else {
                let payload = {
                    id: this.object.id,
                    cantidad: this.cantidad
                }
                this.$store.dispatch('productoSetCantidad', payload)
            }
        },
        minus() {
            if (this.cantidad > 1) {
                --this.cantidad
            }
        },
        plus() {
            if (this.object.proCantDisponible > this.cantidad) {
                ++this.cantidad
            }
        },
        comaEnMiles(number) {
            let exp = /(\d)(?=(\d{3})+(?!\d))/g //* expresion regular que busca tres digitos
            let rep = '$1.' //parametro especial para splice porque los numeros no son menores a 100
            return number.toString().replace(exp, rep)
        },
    },
    watch: {
        cantidad: function () {
            this.saveCantidad()
        }
    }
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
    overflow: hidden;
    width: 100%;
    gap: 10px;
    background: rgb(195 195 195);
    border: #202020 solid 1px;
}

.info-producto {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
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
    align-items: center;
    flex-wrap: wrap;
}

.cantidad,
.precio p {
    width: 50%;
}

.cantidad {
    display: flex;
    align-items: center;
    justify-content: center;
}

.cantidad input {
    width: 30%;
    height: 30px;
    background: aliceblue;
    text-align: center;
    color: #202020;
}

.cantidad input::-webkit-inner-spin-button,
.cantidad input::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

.plus {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 5px;
    height: 30px;
    background: #a1ff5a;
    border-radius: 0px 5px 5px 0px;
}

.minus {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 5px;
    height: 30px;
    background: #ff6767;
    border-radius: 5px 0px 0px 5px;
}
</style>