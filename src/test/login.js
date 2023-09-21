import axios from 'axios';

let url = process.env.VUE_APP_URL_BASE_TIENDA
let correo = 'sc805036@gmail.com'
let password = '123456'

export async function login() {
    await axios
        .post(url + "/auth", {
            useCorreo: correo,
            usePassword: password
        })
        .then((response) => {
            return 'ok'
        })
        .catch((error) => {
            return 'error'
        });

}