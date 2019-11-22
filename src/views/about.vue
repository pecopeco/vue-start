<template lang="pug">
  .about
    nav-bar(title="about")
    .title about
    .back(@click="goBack()") back
    .my(@click="go('./my')") go my
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
  },
  destroyed () {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style scoped lang="stylus">

.about {
}
</style>
