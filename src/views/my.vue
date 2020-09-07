<template lang="pug">
  v-touch.my(@swiperight="go('/about')")
    .name {{"username:" + userInfo.name}}
</template>

<script>

export default {
  name: 'my',
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

.my {
  touch-action pan-y!important
  .name {
    padding .2rem
  }
}
</style>
