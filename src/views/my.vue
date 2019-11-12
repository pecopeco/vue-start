<template lang="pug">
  .my
    van-nav-bar(title="my" left-arrow @click-left="goBack")
    .title {{"username:" + userInfo.name}}
    .back(@click="goBack()") back
</template>

<script>

export default {
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

.my {
}
</style>
