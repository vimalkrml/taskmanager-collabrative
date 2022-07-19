import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './index.css'
import router from './router'
import index from './store/index'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  index,
  render: h => h(App)
}).$mount('#app')