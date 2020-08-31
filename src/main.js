import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'
import Vant from 'vant'
import 'vant/lib/index.css'
import {Toast, Dialog} from 'vant'
import VueTouch from 'vue-touch'

import navBar from '@/components/navBar'
import loading from '@/components/loading'
import toast from '@/components/toast'

Vue.config.productionTip = false

Vue.use(VueTouch, {name: 'v-touch'})

Vue.component('navBar', navBar)
Vue.component('loading', loading)
Vue.component('toast', toast)

Vue.mixin(mixin)
Vue.use(Vant)
Vue.use(Dialog)
Vue.use(Toast)

let utils = {...mixin.methods}
utils.setHttp()

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
