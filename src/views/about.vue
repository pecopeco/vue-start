<template lang="pug">
  .about
    .title about
    .back(@click="goBack()") back
    .my(@click="go('./my')") go my
</template>

<script>

export default {
  name: 'about',
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
