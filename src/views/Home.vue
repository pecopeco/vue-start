<template lang="pug">
  .home
    .top
      img(src="@/assets/logo.png" @click="getData")
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
      text: '123'
    }
  },
  methods: {
    getData () {
      console.log('start get')
      this.Toast('开始获取')
      this.$store.dispatch('fetchUserInfo')
      this.formatDate()
      this.$http.get(this.$config.api_url + '/search').then((response) => {
        console.log(response)
      })
    },
    formatDate () {
      let now = new Date().getTime().toString()
      this.text = window.date('Y年m月d日 H:i', now.slice(0, 10))
    }
  }
}
</script>

<style scoped lang="stylus">

.top {
  padding-top: 20px;
}
</style>
