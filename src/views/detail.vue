<template lang="pug">
  .detail
    nav-bar(title="详情")
    .text 详情
    .time {{day().format('YYYY年MM月DD HH:mm:ss')}}
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data () {
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

.detail {
  .text {
    padding .2rem 0
  }
}
</style>
