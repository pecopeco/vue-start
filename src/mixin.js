import fly from 'flyio'
import store from './store'
import router from './router'
import {Toast} from 'vant'

let requestUrl, requestForm

export default {
  components: {
  },
  data () {
    return {
    }
  },
  filters: {
    // 日期格式化
    formatTime (time, yearKey = '.', monthKey = '.', dayKey = '',
      hasHour, hasMinute) {
      let date = new Date(time * 1000)
      let y = 1900 + date.getYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      let hour = '0' + date.getHours()
      let minute = '0' + date.getMinutes()
      let resultTime = y + yearKey + m.substring(m.length - 2, m.length) + monthKey + d.substring(d.length - 2, d.length) + dayKey
      if (hasHour && !hasMinute) {
        return resultTime + ' ' + hour.substring(hour.length - 2, hour.length)
      } else if (hasHour && hasMinute) {
        return resultTime + ' ' + hour.substring(hour.length - 2, hour.length) + ':' + minute.substring(minute.length - 2, minute.length)
      }
      return resultTime
    }
  },
  methods: {
    go (path) {
      this.$router.push(path)
    },
    goBack () {
      this.$router.go(-1)
    },
    request (url, form = {}, type) {
      // 拦截重复请求
      if (requestUrl === url && this.isObjectValueEqual(requestForm, form)) {
        return
      }
      requestUrl = url
      requestForm = JSON.parse(JSON.stringify(form))
    
      let compleForm = form
      // let presetForm = {
      //   orgName: 123456
      // }
      // Object.assign(compleForm, presetForm)
      // if (type === 'post' || type === 'delete' || type === 'put') {
      //   let formData = new FormData()
      //   for (let key in form) {
      //     formData.append(key, form[key])
      //   }
      //   compleForm = formData
      // }
      let transUrl = url.indexOf("http") !== -1 ? url : config.api_url + url
      return fly.request(transUrl, compleForm, {
        method: type,
        headers: {
          uid: localStorage.getItem("localUid") || '',
          timestamp: localStorage.getItem("timestamp") || '',
          signature: localStorage.getItem("signature") || ''
        },
        timeout: 10000
      }).then((res) => {
        setTimeout(() => {
          requestUrl = ''
          requestForm = {}
        }, 300)
        if (type === 'delete' || res.status === 204) {
          return res.text()
        } else if (res.data.code == -99) {
          // token过期或未经过微信授权
          localStorage.removeItem("localToken")
          localStorage.removeItem("localUid")
          return this.auth()
        } else if (res.status === 200) {
          return res.data
        } else {
          Toast(JSON.parse(res.data).error.msg)
        }
      }).catch((err) => {
        setTimeout(() => {
          requestUrl = ''
          requestForm = {}
        }, 300)
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
    },
    isObjectValueEqual (objA, objB) {
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
    },
    setSlide (toName, fromName) {
      let pathArr = []
      router.options.routes.map((item) => {
        pathArr.push(item.name)
      })
      pathArr = [...new Set(pathArr)]
      let fromIndex, toIndex
      pathArr.map((item, index) => {
        if (item === fromName) {
          fromIndex = index
        }
        if (item === toName) {
          toIndex = index
        }
      })
      if (fromIndex < toIndex) {
        store.dispatch('setSlide', 'slide-left')
      } else {
        store.dispatch('setSlide', 'slide-right')
      }
    },
    // 键盘弹出隐藏fixed定位的按钮
    inputListen () {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      window.addEventListener("resize", () => {
        let nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight
        if (clientHeight > nowClientHeight) {
          //键盘弹出的事件处理
          store.dispatch('setShowBtn', false)
        }
        else {
          //键盘收起的事件处理
          store.dispatch('setShowBtn', true)
        }
      })
    },
    // 表单验证
    validate (arr) {
      let err = {}
      arr.some((item) => {
        // 数字转换字符串
        if (typeof (item.key) === 'number') {
          item.key = item.key.toString()
        }
        // 验证非空
        if (!item.key || item.key.match(/^[ ]+$/)) {
          err[item.type] = true
          return err.msg = '请填写' + item.name
        }
        // 验证姓名
        if (item.type === 'name' && (!/^[\u4e00-\u9fa5]+$/.test(item.key) || item.key.length < 2)) {
          err[item.type] = true
          return err.msg = '请输入正确的' + item.name
        }
        // 验证手机号
        if (item.type === 'phone' && !(item.key.length === 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(item.key))) {
          err[item.type] = true
          return err.msg = '请输入正确的' + item.name
        }
        // 验证身份证号
        if (item.type === 'idCard' && !/^\d{6}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(item.key)) {
          err[item.type] = true
          return err.msg = '请输入正确的' + item.name
        }
        // 验证金额
        if (item.type === 'price' && ((!Number.isFinite(Number(item.key)) || Number(item.key) <= 0) || (item.key.split('.')[1] && item.key.split('.')[1].length > 2))) {
          err = '请输入正确的' + item.name
        }
      })
      return Object.keys(err).length ? err : ''
    },
    // 获取url参数
    getQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let param = location.search || location.hash
      let r = param.substr(1).match(reg)
      if (r !== null) return unescape(r[2])
      return null
    },
    resetImgUrl (val) {
      if (this.maxErrorNum > 0) {
        --this.maxErrorNum
        val.οnerrοr = () => {
          this.resetImgUrl(val)
        }
        setTimeout(() => {
          // eslint-disable-next-line
          val.srcElement.src = val.srcElement.src
        }, 200)
      } else {
        val.οnerrοr = null
        val.srcElement.src = require('@/assets/default-avatar.png')
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    showBtn () {
      return store.state.showBtn
    },
    transitionName () {
      return this.$store.state.transitionName
    },
    checkTab () {
      return this.$store.state.checkTab
    }
  },
  watch: {
  },
  mounted () {
  },
  beforeDestory () {
  }
}
