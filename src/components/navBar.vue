<template lang="pug">
  .nav-bar
    van-nav-bar(:title="title" left-arrow @click-left="goBack()")
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
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
    position fixed
    width 100%
    height .42rem
    z-index 9 !important
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
</style>
