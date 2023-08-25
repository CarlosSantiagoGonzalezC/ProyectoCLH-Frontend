import apiTienda from './index.js';

const relative_path_product = '/product';
const relative_path_category = '/category';
const relative_path_company = '/company';
const relative_path_seller = '/seller';
// const relative_path_user = '/user';

export default {
    
    getProducts(){
        return apiTienda.get(relative_path_product + "/read");
    },

    getProductsSeller(id){
        return apiTienda.get(relative_path_product + "?id=" + id);
    },

    getProductId(id){
        return apiTienda.get(relative_path_product + "/read?id=" + id);
    },

    getCategories(){
        return apiTienda.get(relative_path_category + "/read");
    },

    getSellerUser(id){
        return apiTienda.get(relative_path_seller + "?id=" + id);
    },

    getCompanySeller(id){
        return apiTienda.get(relative_path_company + "?id=" + id);
    },

}