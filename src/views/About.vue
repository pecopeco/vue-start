<template lang="pug">
  .about
    .title {{"username:" + userInfo.name}}
    .back(@click="goBack()") back home
</template>

<script>
import mixin from '../mixin.js'

export default {
  name: 'about',
  mixins: [mixin],
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
@import "../color"

</style>
