<template lang="pug">
  .home
    .top
      img(src="@/assets/logo.png" @click="getData")
    .about(@click="go('./about')") go about
    card(:text="text")
</template>

<script>
import mixin from '../mixin.js'
import Card from '@/components/Card'

export default {
  name: 'home',
  mixins: [mixin],
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
      this.$store.dispatch('fetchUserInfo', 'yang')
      this.text = await this.$http.put(this.$config.api_url + '/search', {id: 1})
    }
  },
  mounted () {
    this.getData()
    this.time = this.formatTime(this.time, '/', '/', '', true, true)
  }
}
</script>

<style scoped lang="stylus">
@import "../color"

.top {
  padding-top .2rem
}
.card {
  color theme
}
</style>
