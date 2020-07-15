<template lang="pug">
  .nav-bar
    van-nav-bar(:title="title" left-arrow :left-text="leftText" @click-left="goBack()")
</template>

<script>

export default {
  name: 'navBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: '返回'
    }
  },
  model: {
    prop: 'visible'
  },
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">

.nav-bar {
  height .42rem
  .van-nav-bar {
    position fixed!important
    top 0
    left 0
    width 100%
    height .42rem!important
    line-height .42rem!important
    z-index 999!important
  }
}
</style>
