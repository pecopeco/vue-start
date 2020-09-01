<template lang="pug">
  .toast.animated.faster(v-if="showToast" :class="toastClass")
    .toast-content
      .text {{toastText.length > 60 ? toastText.slice(0, 60) + '...' : toastText}}
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
      showToast: false,
      toastText: '',
      toastClass: '',
      animateTimer: '',
      statusTimer: ''
    }
  },
  watch: {
  },
  methods: {
    toast (text, delay = 1200) {
      if (this.showToast || this.animateTimer || this.statusTimer) {
        clearTimeout(this.animateTimer)
        clearTimeout(this.statusTimer)
        this.animateTimer = ''
        this.statusTimer = ''
        this.toastClass = 'zoomOut'
        setTimeout(() => {
          this.setToats(text, delay)
        }, 200)
      } else {
        this.setToats(text, delay)
      }
    },
    setToats (text, delay) {
      this.toastClass = 'bounceIn'
      this.toastText = text
      this.showToast = true
      this.animateTimer = setTimeout(() => {
        this.toastClass = 'zoomOut'
        this.statusTimer = setTimeout(() => {
          this.toastClass = ''
          this.showToast = false
        }, 400)
      }, delay)
    }
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
