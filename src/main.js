import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './index.css'
import router from './router'
import task from './store/modules/task'
import user from './store/modules/user'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  task,
  user,
  render: h => h(App)
}).$mount('#app')