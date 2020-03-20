<template lang="pug">
  .tab-bar
    .item(:class="{'checked': checkTab === 'home'}" @click="check('home')")
      img(v-if="checkTab === 'home'" src="@/assets/home-check.png")
      img(v-else src="@/assets/home.png")
      span 首页
    .item(:class="{'checked': checkTab === 'about'}" @click="check('about')")
      img(v-if="checkTab === 'about'" src="@/assets/about-check.png")
      img(v-else src="@/assets/about.png")
      span 关于
    .item(:class="{'checked': checkTab === 'my'}" @click="check('my')")
      img(v-if="checkTab === 'my'" src="@/assets/my-check.png")
      img(v-else src="@/assets/my.png")
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
  width 100%
  min-height auto!important
  padding .07rem 0 .04rem
  border-top 1px solid borderGray
  background #fff
  &:before {
    display none!important
  }
  .item {
    flex 1
    display flex
    flex-direction column
    align-items center
    justify-content space-around
    color fontGray
    img {
      width .18rem
      height .18rem
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
