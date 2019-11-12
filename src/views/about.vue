<template lang="pug">
  .about
    van-nav-bar(title="about" left-arrow @click-left="goBack")
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
  }
}
</script>

<style scoped lang="stylus">

.about {
}
</style>
