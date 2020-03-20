<template lang="pug">
  .home
    .top
      img(src="@/assets/logo.png" @click="getData")
      img(:src="data.avatar || require('@/assets/default-avatar.png')" @error="resetImgUrl")
    .text {{data.text}}
    .time {{time | formatTime('-', '-', '', true, true)}}
    loading
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      data: {
        avatar: '111',
        text: '222'
      },
      time: 1566274478
    }
  },
  methods: {
    async getData () {
      this.$toast('loading...')
      this.data = await this.$http.get('/search', {id: 1})
    }
  },
  mounted () {
    this.$store.dispatch('setUser', {name: 'yang'})
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
  .btn-wrap {
    padding .2rem 0
    .btn:first-child {
      margin-right .2rem
    }
  }
  .text {
    padding .2rem 0
  }
}
</style>
