import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueHead from 'vue-head'
import store from './store/store'

Vue.use(VueHead)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,

  beforeCreate(){
    this.$store.commit('inicializarListaProductos')
  },

  render: h => h(App)
}).$mount('#app')
