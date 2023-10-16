<template>
    <v-card color="#da9f68" dark width="90%" min-width="600px" elevation="24" class="px-16 py-10">
        <v-card-text>
            <form class="form">
                <h1>RECUPERAR CONTRASEÑA</h1>
                <div id="logoForm" class="my-5">
                    <i class="fa fa-lock"></i>
                </div>
                <v-text-field filled label="Correo electronico" type="email" :rules="[rules.required]"
                    prepend-inner-icon="mdi-at" class="" v-model="txtCorreo"></v-text-field>

                <div class="btns">
                    <v-btn class="rounded-pill" color="#331b05" @click="recuperarPassword()">
                        Enviar
                    </v-btn>
                    <v-btn color="#331b05" class="rounded-pill" to="inicio">
                        Cancelar
                    </v-btn>
                </div>
            </form>
        </v-card-text>
    </v-card>
</template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'RecuperarPassword',

    components: {
    },

    data: () => ({
        rules: {
            required: value => !!value || 'Campo requerido.',
            min: v => v.length >= 5 || 'Minimo 5 caracteres',
        },
        url: process.env.VUE_APP_URL_BASE_TIENDA,
        txtCorreo: "",
    }),
    methods: {
        async recuperarPassword() {
            axios
                .patch(this.url + "/user/recoverPassword", {
                    useCorreo: this.txtCorreo
                })
                .then((response) => {
                    console.log(response);
                    Swal.fire(
                        '¡Recuperación exitosa!',
                        'A su correo se le ha enviado su nueva contraseña, se recomienda ingresar y actualizarla a su gusto',
                        'success'
                    );
                    setTimeout(function () {
                        //this.$router.push({ name: "login" }).catch(() => { });
                        window.location.href = "login"
                    }, 5000);
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire(
                        '¡Error al recuperar contraseña!',
                        'Verifique que su correo sea correcto',
                        'error'
                    )
                });

        },
    },
    mounted() {
        if (localStorage.token) {
            this.$router.push({ name: "Inicio" }).catch(() => { })
        }
    }

};
</script>
  
<style scoped>
#logoForm {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    color: #331b05;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form h1,
.form .v-input,
.btns {
    width: 100%;
    text-align: center;
}

.btns {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.v-card {
    max-width: 500px;
}
</style>