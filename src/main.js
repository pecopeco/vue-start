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

let utils = {...mixin.methods}

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
