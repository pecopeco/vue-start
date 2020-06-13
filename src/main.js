import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'
import Vant from 'vant'
import 'vant/lib/index.css'
import {Toast, Dialog} from 'vant'
import navBar from '@/components/navBar'
import tabBar from '@/components/tabBar'
import loading from '@/components/loading'

Vue.config.productionTip = false

Vue.component('nav-bar', navBar)
Vue.component('tab-bar', tabBar)
Vue.component('loading', loading)

Vue.mixin(mixin)
Vue.use(Vant)
Vue.use(Dialog)
Vue.use(Toast)

let config = {
  api_url: process.env.NODE_ENV !== 'production'
  ? '/api'
  : process.env.VUE_APP_MODE === 'test'
  ? 'https://test.baidu.com'
  : 'https://baidu.com'
}

Vue.prototype.config = config

let utils = {...mixin.methods}

utils.request.get = (url, form) => utils.request(url, form, 'get')
utils.request.post = (url, form) => utils.request(url, form, 'post')
utils.request.delete = (url, form) => utils.request(url, form, 'delete')
utils.request.put = (url, form) => utils.request(url, form, 'put')

Vue.prototype.http = utils.request

router.beforeEach(async (to, from, next) => {
  // 设置动画翻页方向
  utils.setSlide(to.name, from.name)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
