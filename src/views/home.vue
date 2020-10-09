<template lang="pug">
  v-touch.home(@swipeleft="go('/about')")
    .top
      img(src="@/assets/logo.png" @click="getData")
      img(:src="info.avatar || require('@/assets/default-avatar.png')" @error="resetImgUrl")
    .text {{info.text}}
    .time {{day().format('YYYY年MM月DD HH:mm:ss')}}
    van-button(@click="go('/detail')") 详情
    loading
    .text 详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      info: {
        avatar: '111',
        text: '222'
      },
      time: 1566274478000
    }
  },
  methods: {
    async getData () {
      this.toast('loading...')
      this.info = await this.http.get('/search', {id: 1})
    }
  },
  mounted () {
    // this.getData()
    this.$store.dispatch('setUser', {name: 'yang'})
  }
}
</script>

<style scoped lang="stylus">

.home {
  touch-action pan-y!important
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
