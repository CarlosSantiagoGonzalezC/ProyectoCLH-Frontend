import apiTienda from './index.js';

const relative_path_product = '/product';
const relative_path_category = '/category';
const relative_path_company = '/company';
const relative_path_seller = '/seller';
const relative_path_comment = '/comment';
const relative_path_user = '/user';

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

    getProductsCategory(id){
        return apiTienda.get(relative_path_category + "?id=" + id);
    },

    getOthersProducts(){
        return apiTienda.get(relative_path_category + "?id=6");
    },

    getSellerUser(id){
        return apiTienda.get(relative_path_seller + "?id=" + id);
    },

    getCompanySeller(id){
        return apiTienda.get(relative_path_company + "?id=" + id);
    },

    getCommentsProduct(id){
        return apiTienda.get(relative_path_comment + "?id=" + id);
    },

    getUser(id){
        return apiTienda.get(relative_path_user + "?id=" + id);
    },

    getCompanyId(id){
        return apiTienda.get(relative_path_company + "/read?id=" + id);
    },

    getSellerId(id){
        return apiTienda.get(relative_path_seller + "/read?id=" + id);
    },

    getUserId(id){
        return apiTienda.get(relative_path_user + "/read?id=" + id);
    },

}