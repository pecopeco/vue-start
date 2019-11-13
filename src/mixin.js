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
      this.$store.dispatch('setSlide', 'slide-left')
      this.$router.push(path)
    },
    goBack () {
      this.$store.dispatch('setSlide', 'slide-right')
      this.$router.go(-1)
    },
    // 非空验证
    validate (key) {
      return !key || key.match(/^[ ]+$/)
    },
    // 手机号验证
    isPhone (key) {
      return !(key.length === 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(key))
    },
    // 获取url参数
    getQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r !== null) return unescape(r[2])
      return null
    },
    async setJsSdkConfig () {
      const data = await this.$http.post(this.$config.api_url + '/wechat/jssdk', {
        url: encodeURIComponent(window.location.href.split('#')[0])
      })
      let apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
      wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: apiList
      })
      wx.ready(() => {
        wx.checkJsApi({
          jsApiList: apiList,
          success: function (res) {
            console.log('微信config配置成功，可用接口：', JSON.stringify(res))
          }
        })
        // wx.onMenuShareAppMessage({
        //   title: 'title',
        //   desc: 'desc',
        //   link: window.location.origin,
        //   imgUrl: 'imgUrl'
        // })
        // wx.onMenuShareTimeline({
        //   title: 'title',
        //   link: window.location.origin,
        //   imgUrl: 'imgUrl'
        // })
      })
      wx.error(function (res) {
        console.log('微信config配置错误：', res)
      })
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    transitionName () {
      return this.$store.state.transitionName
    }
  },
  watch: {
  },
  mounted () {
  },
  beforeDestory () {
  }
}
