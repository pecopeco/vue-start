<template lang="pug">
  #app(ref="app")
    transition(:name="transitionName")
      router-view
    tab-bar
</template>

<script>
import wx from 'weixin-js-sdk'

export default {
  name: 'app',
  data () {
    return {
      historyArr: sessionStorage.getItem('historyArr') ? sessionStorage.getItem('historyArr').split(',') : [location.hash]
    }
  },
  watch: {
    $route () {
      if (this.$route.name === 'home' || this.$route.name === 'about' || this.$route.name === 'my') {
        this.historyArr = [location.hash]
        sessionStorage.removeItem('historyArr')
        this.$refs.app.scrollTop = 0
        return
      }
      if (location.hash === this.historyArr[this.historyArr.length - 2]) {
        this.historyArr.pop()
        this.$store.dispatch('setSlide', 'slide-right')
      } else {
        this.historyArr.push(location.hash)
        this.$store.dispatch('setSlide', 'slide-left')
      }
      sessionStorage.setItem('historyArr', this.historyArr)
      this.$refs.app.scrollTop = 0
    }
  },
  methods: {
    async setJsSdkConfig () {
      const data = await this.$http.post('/wechat/jssdk', {
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
  mounted () {
    // this.setJsSdkConfig()
  }
}
</script>

<style lang="stylus">
  
html,body,#app {
  margin 0
  height 100%
}
#app {
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  font-size .14rem
  overflow auto
  & > div {
    width 100%
    min-height 100%
    &:before {
      display block
      content: ''
      width 100%
      height .42rem
    }
  }
}
.theme {
  color theme
}
.gray {
  color fontGray
}
.bold {
  font-weight bold
}
img {
  width 100%
}
.van-nav-bar {
  position fixed!important
  top 0
  left 0
  width 100%
  height .42rem!important
  line-height .42rem!important
  z-index 999!important
}
.fade-enter-active,
.fade-leave-active {
  transition all 0.3s ease
}
.fade-enter,
.fade-leave-active {
  opacity 0
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change transform
  transition all 0.3s ease
  position absolute
  top 0
}
.slide-right-enter {
  opacity 1
  transform translate3d(-100%, 0, 0)
}
.slide-right-leave-active {
  transform translate3d(100%, 0, 0)
}
.slide-left-enter {
  transform translate3d(100%, 0, 0)
}
.slide-left-leave-active {
  opacity 0
  transform translate3d(-50%, 0, 0)
}
</style>
