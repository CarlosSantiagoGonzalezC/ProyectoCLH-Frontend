import apiTienda from './index.js';

const relative_path_product = '/product';
const relative_path_category = '/category';
const relative_path_company = '/company';
const relative_path_seller = '/seller';
const relative_path_comment = '/comment';
const relative_path_user = '/user';

let token = localStorage.token;
let autorizacion = {
    headers: { Authorization: `Bearer ${token}` },
};

export default {

    getProducts() {
        return apiTienda.get(relative_path_product + "/read");
    },

    getProductsSeller(id) {
        return apiTienda.get(relative_path_product + "?id=" + id, autorizacion);
    },

    getProductId(id) {
        return apiTienda.get(relative_path_product + "/read?id=" + id);
    },

    getCategories() {
        return apiTienda.get(relative_path_category + "/read");
    },

    getProductsCategory(id) {
        return apiTienda.get(relative_path_category + "?id=" + id);
    },

    getOthersProducts() {
        return apiTienda.get(relative_path_category + "?id=6");
    },

    getSellerUser(id) {
        return apiTienda.get(relative_path_seller + "?id=" + id, autorizacion);
    },

    getCompanySeller(id) {
        return apiTienda.get(relative_path_company + "?id=" + id, autorizacion);
    },

    getCommentsProduct(id) {
        return apiTienda.get(relative_path_comment + "?id=" + id, autorizacion);
    },

    getUser(id) {
        return apiTienda.get(relative_path_user + "?id=" + id);
    },

    getCompanyId(id) {
        return apiTienda.get(relative_path_company + "/read?id=" + id, autorizacion);
    },

    getSellerId(id) {
        return apiTienda.get(relative_path_seller + "/read?id=" + id, autorizacion);
    },

    getUserId(id) {
        return apiTienda.get(relative_path_user + "?id=" + id);
    },

}