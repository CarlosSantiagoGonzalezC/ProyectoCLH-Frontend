import axios from 'axios';

const apiTienda = axios.create({
    baseURL: process.env.VUE_APP_URL_BASE_TIENDA
})

export default apiTienda;