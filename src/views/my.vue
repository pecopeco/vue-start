<template lang="pug">
  .my
    nav-bar(title="my")
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
