<template lang="pug">
  .home
    .top
      img(src="@/assets/logo.png" @click="getData")
    .about(@click="go('./about')") go about
    card(:text="text")
</template>

<script>
import Card from '@/components/card'

export default {
  name: 'home',
  components: {
    Card
  },
  data () {
    return {
      text: '',
      time: 1566274478
    }
  },
  methods: {
    async getData () {
      this.Toast('loading...')
      this.$store.dispatch('setUser', {name: 'yang'})
      this.text = await this.$http.get(this.$config.api_url + '/search', {id: 1})
    }
  },
  mounted () {
    this.getData()
    this.time = this.formatTime(this.time, '/', '/', '', true, true)
  }
}
</script>

<style scoped lang="stylus">
@import "~@/color"

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
