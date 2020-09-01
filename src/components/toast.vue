<template lang="pug">
  .toast.animated.faster(v-if="toastObj.showToast" :class="toastObj.toastClass")
    .toast-content
      .text {{toastObj.toastText.length > 60 ? toastObj.toastText.slice(0, 60) + '...' : toastObj.toastText}}
</template>

<script>

export default {
  name: 'toast',
  props: {
  },
  components: {
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">

.toast {
  position fixed
  top 40%
  left calc(50% - 90px)
  width 180px
  z-index 99
  animation-duration .3s
  .toast-content {
    display flex
    flex-wrap wrap
    align-items center
    justify-content center
    border-radius 10px
    background #fff
    width fit-content
    max-width 180px
    min-height 36px
    margin 10px auto
    padding 12px 25px
    box-shadow 0 0 10px shadowGray
    .text {
      white-space normal
    }
  }
}
</style>
