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
      text: ''
    }
  },
  methods: {
    async getData () {
      this.Toast('loading...')
      this.$store.dispatch('fetchUserInfo', 'yang')
      this.text = await this.$http.post(this.$config.api_url + '/search', {id: 1})
    },
    formatDate () {
      let now = new Date().getTime().toString()
      return this.date('Y年m月d日 H:i', now / 1000)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped lang="stylus">
@import "../color"

.top {
  padding-top: 20px;
}
.card {
  color: theme
}
</style>
