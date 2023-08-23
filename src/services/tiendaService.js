import apiTienda from './index.js';

const relative_path_product = '/product';
const relative_path_category = '/category';
// const relative_path_user = '/user';

export default {
    
    getProducts(){
        return apiTienda.get(relative_path_product + "/read");
    },

    getProductsSeller(idUsuario){
        return apiTienda.get(relative_path_product + "?id=" + idUsuario);
    },

    getProductId(idProducto){
        return apiTienda.get(relative_path_product + "/read?id=" + idProducto);
    },

    getCategories(){
        return apiTienda.get(relative_path_category + "/read");
    },

}