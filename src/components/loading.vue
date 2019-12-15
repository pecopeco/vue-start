<template lang="pug">
  van-loading.loading(type="circular" color="#1989fa")
</template>

<script>

export default {
  props: {
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

.loading {
  display flex
  align-items center
  justify-content center
  width 100%
  height 1.4rem
  font-size .14rem
}
</style>
