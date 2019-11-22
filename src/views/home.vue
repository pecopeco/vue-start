<template lang="pug">
  .home
    .top
      img(src="@/assets/logo.png" @click="getData")
    .about(@click="go('./about')") go about
    .text {{text}}
    .time {{time | formatTime(' - ', ' - ', '', true, true)}}
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      text: '123',
      time: 1566274478
    }
  },
  methods: {
    async getData () {
      this.$toast('loading...')
      this.$store.dispatch('setUser', {name: 'yang'})
      this.text = await this.$http.get('/search', {id: 1})
    }
  },
  mounted () {
    // this.getData()
  }
}
</script>

<style scoped lang="stylus">

.home {
  .top {
    width 1rem
    margin 0 auto
    padding-top .2rem
  }
  .card {
    color theme
  }
}
</style>
