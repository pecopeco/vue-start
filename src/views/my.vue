<template lang="pug">
  .my
    nav-bar(title="my")
    .name {{"username:" + userInfo.name}}
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
  .name {
    padding .2rem
  }
}
</style>
