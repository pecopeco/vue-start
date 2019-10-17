<template lang="pug">
  .my
    .title {{"username:" + userInfo.name}}
    .back(@click="goBack()") back
</template>

<script>

export default {
  name: 'my',
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
@import "~@/color"

.my {
}
</style>
