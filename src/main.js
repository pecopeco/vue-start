import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import config from './config'
import fly from 'flyio'
import {date} from 'phpjs'
import {Toast} from 'mint-ui'
import 'mint-ui/lib/toast/style.css'

Vue.config.productionTip = false

Vue.prototype.$config = config
Vue.prototype.$http = fly
Vue.prototype.Toast = Toast
Vue.prototype.date = date

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
