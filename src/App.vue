<template lang="pug">
  #app(ref="app")
    transition(:name="transitionName")
      router-view
    .tab-bar(v-if="$route.name === 'home' || $route.name === 'about' || $route.name === 'my'")
      van-tabbar(route active-color="#1296db")
        van-tabbar-item(replace to="/")
          span 首页
          template(#icon="props")
            img(:src="props.active ? require('@/assets/home-check.png') : require('@/assets/home.png')")
        van-tabbar-item(replace to="/about")
          span 关于
          template(#icon="props")
            img(:src="props.active ? require('@/assets/about-check.png') : require('@/assets/about.png')")
        van-tabbar-item(replace to="/my")
          span 我的
          template(#icon="props")
            img(:src="props.active ? require('@/assets/my-check.png') : require('@/assets/my.png')")
</template>

<script>
import wx from 'weixin-js-sdk'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    async setJsSdkConfig () {
      const data = await this.http.post('/wechat/jssdk', {
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
@import "~@/animate.css"

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
.fadeIn {
  animation-duration 100ms
}
.nav-bar {
  width 100%
  min-height auto!important
  height .42rem!important
  .van-nav-bar {
    position fixed!important
    width 100%
    min-height auto!important
    height .42rem!important
    z-index 9!important
    .van-nav-bar__left {
      display flex
      align-items center
      height 100%
      .van-nav-bar__arrow {
        font-size 22px
        color #000
      }
    }
  }
}
.tab-bar {
  min-height auto!important
  height .48rem!important
  .van-tabbar {
    min-height auto!important
    height .48rem!important
    z-index 9!important
    img {
      width .2rem
      height .2rem!important
    }
    .van-tabbar-item__text {
      margin-top .02rem!important
    }
  }
}
.iframe-wrap {
  position fixed
  top .42rem
  right 0
  bottom 0
  left 0
  -webkit-overflow-scrolling: touch
  overflow-y scroll
  iframe {
    width 100%
    height 100%
    border none
  }
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
