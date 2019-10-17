<template lang="pug">
  #app
    transition(:name="transitionName")
      router-view
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
@import "./color"
  
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
  font-size .16rem
  overflow hidden
  & > div {
    width 100%
  }
}
.theme {
  color theme
}
.font-gray {
  color fontGray
}
.bold {
  font-weight bold
}
img {
  width 100%
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
  opacity 0.6
  transform translate3d(-50%, 0, 0)
}
</style>
