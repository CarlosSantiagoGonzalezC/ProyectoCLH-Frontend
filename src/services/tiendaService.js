import apiTienda from './index.js';

const relative_path_product = '/product';
const relative_path_user = '/user';

export default {
    
    getProducts(){
        return apiTienda.get(relative_path_product);
    },

    getProductId(idProducto){
        return apiTienda.get(relative_path_product + "?id=" + idProducto);
    },

}