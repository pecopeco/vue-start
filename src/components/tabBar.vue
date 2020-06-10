<template lang="pug">
  .tab-bar(v-if="$route.name === 'home' || $route.name === 'about' || $route.name === 'my'")
    .item(:class="{'checked': checkTab === 'home'}" @click="check('home')")
      .img-wrap
        img(:src="checkTab === 'home' ? require('@/assets/home-check.png') : require('@/assets/home.png')")
      span 首页
    .item(:class="{'checked': checkTab === 'about'}" @click="check('about')")
      .img-wrap
        img(:src="checkTab === 'about' ? require('@/assets/about-check.png') : require('@/assets/about.png')")
      span 关于
    .item(:class="{'checked': checkTab === 'my'}" @click="check('my')")
      .img-wrap
        img(:src="checkTab === 'my' ? require('@/assets/my-check.png') : require('@/assets/my.png')")
      span 我的
</template>

<script>

export default {
  props: {
  },
  model: {
  },
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    check (key) {
      this.$store.dispatch('setTab', key)
      this.go(`/${key}`)
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">

.tab-bar {
  position fixed
  left 0
  bottom 0
  display flex
  align-items center
  width 100%
  height .48rem
  min-height auto!important
  border-top 1px solid borderGray
  background #fff
  &:before {
    display none!important
  }
  .item {
    flex 1
    padding-top .02rem
    color fontGray
    .img-wrap {
      width .2rem
      height .2rem
      margin 0 auto .02rem
    }
    span {
      padding-top .02rem
      font-size .12rem
    }
  }
  .checked {
    color #000
  }
}

</style>
