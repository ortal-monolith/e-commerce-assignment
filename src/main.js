import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

function imager(url){
  return `https://fedtest.monolith.co.il/api/imager.php?url=${url}&type=fit&width=1000&height=1000&quality=70`
}

Vue.prototype.imager = imager;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')