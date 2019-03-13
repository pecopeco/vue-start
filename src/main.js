import Vue from 'vue'
import App from './App.vue'
import fly from 'flyio'
import store from './store'
import config from './config'
import router from './router'
import {date} from 'phpjs'
import {Toast} from 'mint-ui'
import 'mint-ui/lib/toast/style.css'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$http = fly
Vue.prototype.Toast = Toast

window.date = date

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
