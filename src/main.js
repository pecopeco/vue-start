import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'
import fly from 'flyio'
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

let config = {
  api_url: process.env.NODE_ENV !== 'production'
  ? '/api'
  : process.env.VUE_APP_MODE === 'test'
  ? 'https://test.baidu.com'
  : 'https://baidu.com'
}

let requestUrl, requestForm

// 重复请求延迟
function delayRequest () {
  setTimeout(() => {
    requestUrl = ''
    requestForm = {}
  }, 300)
}

// 判断两个对象属性是否完全相同
function isObjectValueEqual(objA, objB) {
  let aProps = Object.getOwnPropertyNames(objA)
  let bProps = Object.getOwnPropertyNames(objB)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i]
    let propA = objA[propName]
    let propB = objB[propName]
    if (typeof (propA) === 'object') {
      if (this.isObjectValueEqual(propA, propB)) {
        return true
      } else {
        return false
      }
    } else if (propA !== propB) {
      return false
    }
  }
  return true
}

function request (url, form = {}, type) {
  // 拦截重复请求
  if (requestUrl === url && isObjectValueEqual(requestForm, form)) {
    return
  }
  requestUrl = url
  requestForm = JSON.parse(JSON.stringify(form))

  let compleForm = form
  // let presetForm = {
  //   orgName: 123456
  // }
  // Object.assign(compleForm, presetForm)
  if (type === 'post' || type === 'delete' || type === 'put') {
    let formData = new FormData()
    for (let key in form) {
      formData.append(key, form[key])
    }
    compleForm = formData
  }
  let transUrl = url.indexOf("http") !== -1 ? url : config.api_url + url
  return fly.request(transUrl, compleForm, {
    method: type,
    timeout: 10000
  }).then((res) => {
    delayRequest()
    if (type === 'delete' || res.status === 204) {
      return res.text()
    } else if (res.status === 200) {
      return res.data
    } else {
      Toast(JSON.parse(res.data).error.msg)
    }
  }).catch((err) => {
    delayRequest()
    const codeMessage = {
      200: '服务器成功返回请求的数据.',
      201: '新建或修改数据成功.',
      202: '一个请求已经进入后台排队（异步任务）.',
      204: '删除数据成功.',
      400: '发出的请求有错误，服务器没有进行新建或修改数据的操作.',
      401: '用户没有权限（令牌、用户名、密码错误）.',
      403: '用户得到授权，但是访问是被禁止的.',
      404: '发出的请求针对的是不存在的记录，服务器没有进行操作.',
      406: '请求的格式不可得',
      410: '请求的资源被永久删除，且不会再得到的.',
      422: '当创建一个对象时，发生一个验证错误.',
      500: '服务器发生错误，请检查服务器.',
      502: '网关错误',
      503: '服务不可用，服务器暂时过载或维护.',
      504: '网关超时'
    }
    if (err.status >= 300) {
      const errortext = codeMessage[err.status] || err.response.statusText
      Toast(errortext)
    }
  })
}

request.get = (url, form) => request(url, form, 'get')
request.post = (url, form) => request(url, form, 'post')
request.delete = (url, form) => request(url, form, 'delete')
request.put = (url, form) => request(url, form, 'put')

Vue.prototype.$http = request

router.beforeEach(async (to, from, next) => {
  let pathArr = ['/', '/about', '/my']
  let fromIndex, toIndex
  pathArr.map((item, index) => {
    if (item === from.path) {
      fromIndex = index
    }
    if (item === to.path) {
      toIndex = index
    }
  })
  if (fromIndex < toIndex) {
    store.dispatch('setSlide', 'slide-left')
  } else {
    store.dispatch('setSlide', 'slide-right')
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
